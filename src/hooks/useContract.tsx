import { useColorScheme } from "@mui/joy";
import { ethers, formatUnits } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TrixABI from "src/abi/Trix.abi.json";
import ERC20ABI from "src/abi/erc20.abi.json";
import { networks } from "src/globals/networks";
import { useWalletContext } from "src/providers/WalletProvider";
import { Erc20Abi, TrixAbi } from "src/types/contract";

export type TxStep = "none" | "approving" | "sending" | "done";

export const useContract = () => {
  const { provider, signer, network } = useWalletContext();
  const [contract, setContract] = useState<TrixAbi | null>(null);
  const { mode } = useColorScheme();
  const [transactionStep, setTransactionStep] = useState<TxStep>("none");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const contractAddress =
      networks[network]?.contract || Object.values(networks)[0]?.contract;

    const contractInstance = new ethers.Contract(
      contractAddress,
      TrixABI,
      signer
    ) as unknown as TrixAbi;

    setContract(contractInstance);
  }, [TrixABI, signer, network]);

  const sendDonation = async (
    to: ethers.AddressLike,
    username: string,
    message: string,
    amount: bigint // ether
  ) => {
    if (!contract) {
      return;
    }

    try {
      const wei = formatUnits(amount, "wei");

      setTransactionStep("approving");

      setTransactionStep("sending");

      const sendTx = await contract
        .connect(signer)
        .sendDonation(to, username, message, {
          value: wei,
        });

      await sendTx.wait();

      setTransactionStep("done");

      toast(`Your donation was sent to streamer`, {
        type: "success",
        theme: mode,
        position: "bottom-center",
        onClose: () => {
          setTransactionStep("none");
        },
      });
    } catch (error) {
      setIsError(true);
      toast(`Transaction reverted. Reason: ${error}`, {
        type: "error",
        theme: mode,
        position: "bottom-center",
        onClose: () => {
          setTransactionStep("none");
          setIsError(false);
        },
      });
    }
  };

  const sendDonationErc20 = async (
    to: ethers.AddressLike,
    username: string,
    message: string,
    amount: bigint,
    token: string
  ) => {
    if (!contract) {
      return;
    }

    try {
      const wei = formatUnits(amount, "wei");
      console.log("Formatted amount in wei:", wei);

      setTransactionStep("approving");

      // Approve the transaction
      const approvalResult = await approveErc20(token, wei);
      if (!approvalResult) {
        console.error("Approval failed");
        return;
      }

      setTransactionStep("sending");

      const gasLimit = BigInt(45000 * 2);

      console.log("Sending transaction with parameters:");
      console.log("To:", to);
      console.log("Username:", username);
      console.log("Message:", message);
      console.log("Token:", token);
      console.log("Wei:", wei.toString());
      console.log("GasLimit:", gasLimit.toString());

      // Sending the transaction
      const sendTx = await contract
        .connect(signer)
        .sendTokenDonation(to, username, message, token, wei);

      await sendTx.wait();

      setTransactionStep("done");

      toast(`Your donation was sent to streamer`, {
        type: "success",
        theme: mode,
        position: "bottom-center",
        onClose: () => {
          setTransactionStep("none");
        },
      });
    } catch (error) {
      setIsError(true);

      toast(`Transaction reverted. Reason: ${error}`, {
        type: "error",
        theme: mode,
        position: "bottom-center",
        onClose: () => {
          setTransactionStep("none");
          setIsError(false);
        },
      });
    }
  };

  const approveErc20 = async (token: string, amount: string) => {
    try {
      if (!signer?.address) {
        console.error("Signer address is not defined");
        return false;
      }

      const tokenContract = (await new ethers.Contract(
        token,
        ERC20ABI,
        provider
      )) as unknown as Erc20Abi;
      const contractAddress = await contract?.getAddress();

      if (contractAddress) {
        const approveTx = await tokenContract
          .connect(signer)
          .approve(contractAddress, amount);

        console.log("Approve transaction sent:", approveTx);

        await approveTx.wait();
      } else {
        throw new Error("Contract not found");
      }

      return true;
    } catch (error) {
      setIsError(true);

      toast(`Transaction reverted. Reason: ${error}`, {
        type: "error",
        theme: mode,
        position: "bottom-center",
        onClose: () => {
          setTransactionStep("none");
          setIsError(false);
        },
      });
      return false;
    }
  };

  return {
    transactionStep,
    isError,
    sendDonation,
    sendDonationErc20,
  };
};

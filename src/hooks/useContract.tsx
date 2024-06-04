import { useColorScheme } from "@mui/joy";
import { ethers, formatUnits } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TrixABI from "src/abi/Trix.abi.json";
import ERC20ABI from "src/abi/erc20.abi.json";
import { networks } from "src/globals/networks";
import { useWalletContext } from "src/providers/WalletProvider";
import { Erc20Abi, TrixAbi } from "src/types/contract";

export const useContract = () => {
  const { provider, signer, network } = useWalletContext();
  const [contract, setContract] = useState<TrixAbi | null>(null);
  const { mode } = useColorScheme();

  const contractAddress =
    networks[network]?.contract || Object.values(networks)[0]?.contract;

  useEffect(() => {
    const contractInstance = new ethers.Contract(
      contractAddress,
      TrixABI,
      signer
    ) as unknown as TrixAbi;

    setContract(contractInstance);
  }, [contractAddress, TrixABI]);

  const calculateGasLimit = async (_tx: ethers.TransactionRequest) => {
    if (!provider) return BigInt(100000);

    const gasLimit = await provider.estimateGas(_tx);
    return (gasLimit * BigInt(110)) / BigInt(100);
  };

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

      const gasLimit = await calculateGasLimit({
        to: to,
        value: wei,
        from: signer?.address,
      });

      const sendTx = await contract
        .connect(signer)
        .sendDonation(to, username, message, {
          value: wei,
          gasLimit: gasLimit * BigInt(100),
        });

      await sendTx.wait();

      toast(`Your donation was sent to streamer`, {
        type: "success",
        theme: mode,
        position: "bottom-center",
      });
    } catch (error) {
      toast(`Transaction reverted. Reason: ${error}`, {
        type: "error",
        theme: mode,
        position: "bottom-center",
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

      // Approve the transaction
      const approvalResult = await approveErc20(token, wei);
      if (!approvalResult) {
        console.error("Approval failed");
        return;
      }

      const gasLimit = BigInt(45000);

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

      console.log("Transaction sent:", sendTx);

      await sendTx.wait();

      toast(`Your donation was sent to streamer`, {
        type: "success",
        theme: mode,
        position: "bottom-center",
      });
    } catch (error) {
      toast(`Transaction reverted. Reason: ${error}`, {
        type: "error",
        theme: mode,
        position: "bottom-center",
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
      const approveTx = await tokenContract
        .connect(signer)
        .approve(contractAddress, amount);

      console.log("Approve transaction sent:", approveTx);

      await approveTx.wait();

      return true;
    } catch (error) {
      console.error("Error during approve:", error);
      return false;
    }
  };

  return {
    sendDonation,
    sendDonationErc20,
  };
};

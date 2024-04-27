import { useColorScheme } from "@mui/joy";
import { Contract, ethers, formatUnits, parseEther, parseUnits } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TrixABI from "src/abi/Trix.abi.json";
import ERC20ABI from "src/abi/erc20.abi.json";
import { networks } from "src/globals/networks";
import { useWalletContext } from "src/providers/WalletProvider";
import { Erc20Abi, TrixAbi, TrixAbi__factory } from "src/types/contract";

export const useContract = () => {
  const { provider, signer, network } = useWalletContext();
  const [contract, setContract] = useState<TrixAbi | null>(null);
  const { mode } = useColorScheme();
  const contractAddress = networks[network].contract;

  useEffect(() => {
    const contractInstance = new ethers.Contract(
      contractAddress,
      TrixABI,
      signer
    ) as unknown as TrixAbi;

    setContract(contractInstance);
  }, [contractAddress, TrixABI]);

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

      const sendTx = await contract
        .connect(signer)
        .sendDonation(to, username, message, {
          value: wei,
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
      await approveErc20(token, wei);

      const sendTx = await contract
        .connect(signer)
        .sendTokenDonation(to, username, message, token, {
          value: wei,
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

  const approveErc20 = async (token: string, amount: string) => {
    if (!signer?.address) return;

    const tokenContract = (await new ethers.Contract(
      token,
      ERC20ABI,
      signer
    )) as unknown as Erc20Abi;
    const approveTx = await tokenContract.approve(contractAddress, amount);
    await approveTx.wait();
  };

  return {
    sendDonation,
    sendDonationErc20,
  };
};

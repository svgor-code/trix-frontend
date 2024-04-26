import { Contract, ethers, formatUnits, parseEther, parseUnits } from "ethers";
import React, { useEffect, useState } from "react";
import TrixABI from "src/abi/Trix.abi.json";
import ERC20ABI from "src/abi/erc20.abi.json";
import { useWalletContext } from "src/providers/WalletProvider";
import { Erc20Abi, TrixAbi, TrixAbi__factory } from "src/types/contract";

const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

export const useContract = () => {
  const { provider, signer } = useWalletContext();
  const [contract, setContract] = useState<TrixAbi | null>(null);

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

    const wei = formatUnits(amount, "wei");

    const sendTx = await contract.sendDonation(to, username, message, {
      value: wei,
    });

    await sendTx.wait();

    console.log(sendTx.data);
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

    const wei = formatUnits(amount, "wei");

    const approveResult = await approveErc20(token, wei);

    console.log(approveResult);

    const sendTx = await contract.sendTokenDonation(
      to,
      username,
      message,
      token,
      {
        value: wei,
      }
    );

    await sendTx.wait();

    console.log(sendTx.data);
  };

  const approveErc20 = async (token: string, amount: string) => {
    if (!signer?.address) return;

    const tokenContract = (await new ethers.Contract(
      token,
      ERC20ABI,
      signer
    )) as unknown as Erc20Abi;
    const approveTx = await tokenContract.approve(contractAddress, amount);
    return await approveTx.wait();
  };

  return {
    sendDonation,
    sendDonationErc20,
  };
};

import { Contract, ethers, formatUnits, parseEther, parseUnits } from "ethers";
import React, { useEffect, useState } from "react";
import TrixABI from "src/abi/Trix.abi.json";
import { useWalletContext } from "src/providers/WalletProvider";
import { TrixAbi, TrixAbi__factory } from "src/types/contract";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

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

    const wei = formatUnits(amount, 'wei');

    const sendTx = await contract.connect(signer).sendDonation(to, username, message, {
      value: wei,
    });

    await sendTx.wait();

    console.log(sendTx.data);
  };

  return {
    sendDonation
  };
};

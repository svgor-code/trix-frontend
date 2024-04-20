import { ethers } from "ethers";

export const exchangeFiatToCrypto = (exchangeRate: number, amount: number) => {
  return convertStringToEther((amount / exchangeRate).toFixed(6));
};

export const exchangeCryptoToFiat = (exchangeRate: number, amount: bigint) => {
  return (parseFloat(ethers.formatUnits(amount, "ether")) * exchangeRate).toFixed(
    2
  );
};

export const convertStringToEther = (amount: string) => {
  return ethers.parseEther(amount);
};

export const convertWeiToEther = (amount: bigint) => {
  return ethers.formatEther(amount);
};

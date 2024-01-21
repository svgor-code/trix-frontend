export const reduceWalletAddress = (wallet?: string) => {
  if (!wallet) {
    return "0x000...0000";
  }

  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
};

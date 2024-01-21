export const networks = {
  ethereum: {
    chainId: 1, // Ethereum Mainnet
    name: "ethereum",
  },
  avalanche: {
    chainId: 43114, // Avalanche C-Chain
    name: "avalanche",
  },
  arbitrum: {
    chainId: 42161, // Arbitrum One
    name: "arbitrum",
  },
};

export const getNetworkByChainId = (chainId: number) => {
  return Object.values(networks).find(
    (network) => network.chainId === chainId
  );
}

export type NetworkName = keyof typeof networks;

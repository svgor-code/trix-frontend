import { INetwork, networks } from "src/globals/networks";

export const getNetworkByChainId = (chainId: number) => {
  return Object.values(networks).find((network) => network.chainId === chainId);
};

export const getTokenByTokenAddress = (
  network: INetwork,
  tokenAddress?: string
) => {
  const { tokens } = network;

  if (!tokenAddress) {
    return tokens.find((token) => token.native);
  }

  return tokens.find((token) => token.address === tokenAddress);
};

export type NetworkName = keyof typeof networks;

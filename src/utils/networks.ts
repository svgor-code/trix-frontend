import { networks } from "src/globals/networks";

export const getNetworkByChainId = (chainId: number) => {
  return Object.values(networks).find(
    (network) => network.chainId === chainId
  );
}

export type NetworkName = keyof typeof networks;

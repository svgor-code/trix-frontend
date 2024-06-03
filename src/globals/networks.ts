export interface INetwork {
  name: string;
  chainId: number;
  rpc: string;
  tokens: IToken[];
  contract: string;
}

export interface IToken {
  symbol: string;
  address: string;
  native?: boolean;
  name: string;
}

const stagingNetworks: Record<string, INetwork> = {
  arbitrum: {
    name: "arbitrum",
    chainId: 42161, // Arbitrum
    rpc: "https://arbitrum.llamarpc.com",
    contract: "0x02D4E1Aedc2C00dd3e4746d6533D902091Ef22C2",
    tokens: [
      {
        symbol: "ETH",
        address: "",
        native: true,
        name: "Etherium",
      },
      {
        symbol: "ARB",
        address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
        name: "Arbitrum",
      },
      {
        symbol: "USDT",
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        name: "Tether USD",
      },
    ],
  },
};

const productionNetworks: Record<string, INetwork> = {};

export const networks = import.meta.env.PROD
  ? productionNetworks
  : stagingNetworks;

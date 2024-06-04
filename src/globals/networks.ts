export interface INetwork {
  name: string;
  slug: string;
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

export const networks: Record<string, INetwork> = {
  42161: {
    name: "Arbitrum One",
    slug: "arbitrum-one",
    chainId: 42161, // Arbitrum
    rpc: "https://arbitrum.llamarpc.com",
    contract: "0x58902d75E12a47E3EB7aC6bc328e88098916ddC9",
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

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
    contract: "0xd77b93d252c7f768526c4bad4bb1fcbf227a14ef",
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
  56: {
    name: "BNB Smart Chain",
    slug: "bnb",
    chainId: 56,
    rpc: "https://api.tatum.io/v3/blockchain/node/bsc-mainnet",
    contract: "0x20De84d627D88e99dAe7C78f34b724578fE0F4C6",
    tokens: [
      {
        symbol: "BNB",
        address: "",
        native: true,
        name: "BNB",
      },
      {
        symbol: "USDT",
        address: "0x55d398326f99059fF775485246999027B3197955",
        name: "Tether USD",
      },
      {
        symbol: "USDC",
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        name: "USD Coin",
      },
    ],
  },
};

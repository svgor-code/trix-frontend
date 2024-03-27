export interface INetwork {
  name: string;
  chainId: number;
  rpc: string;
  tokens: IToken[];
}

export interface IToken {
  name: string;
  address: string;
  native?: boolean;
  title: string;
  icon: string;
}

export const networks: Record<string, INetwork> = {
  arbitrum: {
    name: "arbitrum",
    chainId: 42161, // Arbitrum One
    rpc: "https://arb1.arbitrum.io/rpc",
    tokens: [],
  },
  avalanche: {
    name: "avalanche",
    chainId: 43114, // Avalanche C-Chain
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    tokens: [
      {
        name: "AVAX",
        native: true,
        address: "",
        title: "Avalanche",
        icon: "https://traderjoexyz.com/static/media/avalanche.7c81486190237e87e238c029fd746008.svg",
      },
      {
        name: "BTC.b",
        address: "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
        title: "Bitcoin",
        icon: "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x152b9d0FdC40C096757F570A51E494bd4b943E50/logo.png",
      },
      {
        name: "USDC",
        address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        title: "USD Coin",
        icon: "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E/logo.png",
      },
    ],
  },
};

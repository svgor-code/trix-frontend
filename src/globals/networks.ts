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
  icon: string;
}

export const networks: Record<string, INetwork> = {
  arbitrum: {
    name: "arbitrum",
    chainId: 421614, // Arbitrum Sepolia
    rpc: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public ",
    contract: "0xe8743ad77669904446bFb49c577Ce89a970CB7D2",
    tokens: [
      {
        symbol: "ETH",
        address: "",
        native: true,
        icon: "",
        name: "Etherium",
      },
      {
        symbol: "ARB",
        address: "0x3a12ea1bEa9b04f5541affBe1F6Dd83a72a9bbd7",
        name: "Arbitrum",
        icon: "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x912CE59144191C1204E64559FE8253a0e49E6548/logo.png",
      },
      {
        symbol: "USDT",
        address: "0x9aA40Cc99973d8407a2AE7B2237d26E615EcaFd2",
        name: "Tether",
        icon: "",
      },
    ],
  },
  avalanche: {
    name: "avalanche",
    chainId: 43113, // Avalanche C-Chain Fuji
    rpc: "https://api.avax-test.network/ext/bc/C/rpc",
    contract: "0x8D22F2c4B719A8C61625aFc40FDb2a3F5df67308",
    tokens: [
      {
        symbol: "AVAX",
        native: true,
        address: "",
        name: "Avalanche",
        icon: "https://traderjoexyz.com/static/media/avalanche.7c81486190237e87e238c029fd746008.svg",
      },
      {
        symbol: "BTC",
        address: "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
        name: "Bitcoin",
        icon: "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x152b9d0FdC40C096757F570A51E494bd4b943E50/logo.png",
      },
      {
        symbol: "USDC",
        address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        name: "USD Coin",
        icon: "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E/logo.png",
      },
    ],
  }
};

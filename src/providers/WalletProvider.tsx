import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ethers,
  BrowserProvider,
  Eip1193Provider,
  JsonRpcSigner,
} from "ethers";
import { INetwork, IToken, networks } from "src/globals/networks";
import { Erc20Abi } from "src/types/contract";

declare global {
  interface Window {
    ethereum?: Eip1193Provider | null;
  }
}

interface ITokenWithBalance extends IToken {
  balance: string;
}

interface IWalletContext {
  isConnected: boolean;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  network: number;
  error: string;
  walletTokens: ITokenWithBalance[];
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  switchNetwork: (networkChainId: number) => Promise<void>;
}

const defaultWalletState = {
  isConnected: false,
  provider: null,
  signer: null,
  walletAddress: "",
  network: 0,
  walletTokens: [],
  error: "",
};

const WalletContext = React.createContext<IWalletContext | null>(null);

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<{
    isConnected: boolean;
    signer: JsonRpcSigner | null;
    provider: BrowserProvider | null;
    network: number;
    walletTokens: ITokenWithBalance[];
    error: string;
  }>(defaultWalletState);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        setState((prev) => ({
          ...prev,
          provider: null,
        }));

        throw new Error(
          "Wallet not detected. Connect or install wallet and retry"
        );
      } else {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();
        const currentNetwork = await getCurrentNetwork();

        setState((prev) => ({
          ...prev,
          provider,
          signer,
          isConnected: true,
          network: currentNetwork?.chainId || 0,
          error: "",
        }));
      }
    } catch (error: any) {
      if (error instanceof Error) {
        console.log(error);
        setState((prev) => ({ ...prev, error: error.message }));
      }
    }
  };

  const disconnect = async () => {
    if (!state.isConnected || !state.provider || !state.signer) {
      return;
    }

    await state.provider.removeAllListeners();
    await state.provider.destroy();

    setState(defaultWalletState);
  };

  const switchNetwork = async (networkChainId: number) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toQuantity(networkChainId) }],
      });

      const currentNetwork = await getCurrentNetwork();

      setState((prev) => ({ ...prev, network: currentNetwork?.chainId || 0 }));
    } catch (switchError) {
      console.log(switchError);
    }
  };

  const getCurrentNetwork = async () => {
    if (!window.ethereum) return;

    try {
      const chainIdHex = await window.ethereum.request({
        method: "eth_chainId",
      });
      const chainId = parseInt(chainIdHex, 16);
      const currentNetwork = networks[chainId];

      return currentNetwork;
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        connect();
      }
    }
  };

  const fetchTokenBalance = async (
    token: IToken,
    userAddress: string,
    network: INetwork
  ) => {
    const tokenABI = [
      "function balanceOf(address owner) view returns (uint256)",
    ];
    const provider = new ethers.JsonRpcProvider(network.rpc);
    let balance = ethers.toBigInt(0);

    if (token.native && state.signer) {
      balance = await provider.getBalance(state.signer.address);
    } else {
      const tokenContract = new ethers.Contract(
        token.address,
        tokenABI,
        provider
      ) as unknown as Erc20Abi;

      balance = await tokenContract.balanceOf(userAddress);
    }

    return {
      ...token,
      balance: ethers.formatUnits(balance, "ether"),
    };
  };

  const setTokensBalances = useCallback(async () => {
    if (!state.signer?.address || !networks[state.network]) {
      return;
    }
    try {
      const currentNetwork = networks[state.network];
      const tokens = currentNetwork.tokens;
      const walletAddress = state.signer.address;

      const tokensWithBalance = await Promise.all(
        tokens.map((token) =>
          fetchTokenBalance(token, walletAddress, currentNetwork)
        )
      );

      setState((state) => ({ ...state, walletTokens: tokensWithBalance }));
    } catch (error) {
      console.log(error);
    }
  }, [state.network]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    setTokensBalances();
  }, [state.network, state.isConnected]);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("WalletProvider is not found");
  }

  return context;
};

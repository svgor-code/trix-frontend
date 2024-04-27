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
import { NetworkName, getNetworkByChainId } from "src/utils/networks";
import { UserProvider } from "./UserProvider";
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
  network: string;
  walletTokens: ITokenWithBalance[];
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  switchNetwork: (networkName: NetworkName) => Promise<void>;
}

const defaultWalletState = {
  isConnected: false,
  provider: null,
  signer: null,
  walletAddress: "",
  network: "",
  walletTokens: [],
};

const WalletContext = React.createContext<IWalletContext | null>(null);

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<{
    isConnected: boolean;
    signer: JsonRpcSigner | null;
    provider: BrowserProvider | null;
    network: string;
    walletTokens: ITokenWithBalance[];
  }>(defaultWalletState);

  const connect = async () => {
    if (!window.ethereum) {
      setState((prev) => ({
        ...prev,
        provider: ethers.getDefaultProvider("") as BrowserProvider,
      }));
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
        network: currentNetwork?.name || "",
      }));
    }
  };

  const disconnect = async () => {
    if (!state.isConnected || !state.provider || !state.signer) {
      return;
    }

    await state.provider.destroy();

    setState(defaultWalletState);
  };

  const switchNetwork = async (networkName: NetworkName) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toQuantity(networks[networkName].chainId) }],
      });

      const currentNetwork = await getCurrentNetwork();

      setState((prev) => ({ ...prev, network: currentNetwork?.name || "" }));
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
      const currentNetwork = getNetworkByChainId(chainId);

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

      console.log(tokensWithBalance, "fetch tokens");
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
  }, [state.network]);

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

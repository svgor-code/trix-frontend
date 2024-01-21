import React, {
  PropsWithChildren,
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
import { NetworkName, networks, getNetworkByChainId } from "src/utils/networks";

declare global {
  interface Window {
    ethereum?: Eip1193Provider | null;
  }
}

interface IAuthContext {
  isConnected: boolean;
  isAuthenticated: boolean;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  network: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  switchNetwork: (networkName: NetworkName) => Promise<void>;
}

const defaultAuthState = {
  isAuthenticated: false,
  isConnected: false,
  provider: null,
  signer: null,
  walletAddress: "",
  network: "",
};

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<{
    isConnected: boolean;
    isAuthenticated: boolean;
    signer: JsonRpcSigner | null;
    provider: BrowserProvider | null;
    network: string;
  }>(defaultAuthState);

  console.log(state);

  const connect = async () => {
    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults");
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

    setState(defaultAuthState);
  };

  const switchNetwork = async (networkName: NetworkName) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(networks[networkName].chainId) }],
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

  useEffect(() => {
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

    checkIfWalletIsConnected();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        switchNetwork,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthProvider is not found");
  }

  return context;
};

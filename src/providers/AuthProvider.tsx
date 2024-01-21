import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Signer, ethers, BrowserProvider, Eip1193Provider } from "ethers";
import { useLocation, useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: Eip1193Provider | null;
  }
}

interface IAuthContext {
  isConnected: boolean;
  isAuthenticated: boolean;
  signer: Signer | null;
  provider: BrowserProvider | null;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

const defaultAuthState = {
  isAuthenticated: false,
  isConnected: false,
  provider: null,
  signer: null,
};

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<{
    isConnected: boolean;
    isAuthenticated: boolean;
    signer: Signer | null;
    provider: BrowserProvider | null;
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
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      setState((prev) => ({ ...prev, provider, signer, isConnected: true }));
    }
  };

  const disconnect = async () => {
    if (!state.isConnected || !state.provider || !state.signer) {
      return;
    }

    await state.provider.destroy();

    setState(defaultAuthState);
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

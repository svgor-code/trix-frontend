import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateNonce, login } from "src/api/auth";
import { isTokenValid } from "src/utils/auth";
import { UserProvider } from "./UserProvider";
import { useWalletContext } from "./WalletProvider";

interface IAuthContext {
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { signer, isConnected } = useWalletContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = async () => {
    const existingToken = localStorage.getItem("access_token");

    if (existingToken && isTokenValid(existingToken, signer)) {
      return setIsAuthenticated(true);
    }

    if (!signer) return;

    const walletAddress = signer.address;

    const nonce = await generateNonce(walletAddress);
    const signature = await signer.signMessage(nonce);
    const loginRes = await login(walletAddress, signature);

    localStorage.setItem("access_token", loginRes.access_token);

    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (!isConnected) return;

    auth();
  }, [isConnected]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
      }}
    >
      <UserProvider>{children}</UserProvider>
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

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
import { toast } from "react-toastify";

interface IAuthContext {
  isAuthenticated: boolean;
  auth: () => Promise<boolean>;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { signer, isConnected } = useWalletContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = async () => {
    try {
      const existingToken = localStorage.getItem("access_token");

      if (existingToken && isTokenValid(existingToken, signer)) {
        setIsAuthenticated(true);
        return true;
      }

      if (!signer) {
        throw new Error(
          "You need to connect your wallet to change your account settings."
        );
      }

      const walletAddress = signer.address;

      const nonce = await generateNonce(walletAddress);
      const signature = await signer.signMessage(nonce);
      const loginRes = await login(walletAddress, signature);

      localStorage.setItem("access_token", loginRes.access_token);

      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast(error.message, {
          theme: "dark",
          type: "error",
          position: "bottom-center",
        });
      }

      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
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

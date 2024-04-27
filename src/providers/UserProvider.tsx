import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser, updateAlertSettings, updateUserSettings } from "src/api/user";
import { useAuthContext } from "./AuthProvider";
import { IAlertSettings, IUser, IUserSettings } from "src/types/user";
import { toast } from "react-toastify";
import { useColorScheme } from "@mui/joy";
import { useWalletContext } from "./WalletProvider";

interface IUserContext {
  user?: IUser;
  saveUserSettings: (userSettings: IUserSettings) => Promise<void>;
  saveAlertSettings: (alertSettings: IAlertSettings) => Promise<void>;
}

const UserContext = React.createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { signer } = useWalletContext();
  const { mode } = useColorScheme();
  const { isAuthenticated } = useAuthContext();
  const walletAddress = signer?.address;

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    fetchUser();
  }, [walletAddress]);

  const fetchUser = async () => {
    if (!walletAddress) {
      return;
    }

    try {
      const userRes = await getUser(walletAddress);
      setUser(userRes);
    } catch (error) {
      if (!isAuthenticated) {
        return;
      }

      toast(`Fetch user error: ${error}`, {
        type: "error",
        theme: mode,
        position: "bottom-center",
      });
    }
  };

  const saveAlertSettings = async (alertSettings: IAlertSettings) => {
    if (!walletAddress) return;

    const res = await updateAlertSettings(walletAddress, alertSettings);

    if (res.status === 200) {
      toast("Alert settings updated", {
        theme: mode,
        type: "success",
        position: "bottom-center",
      });
    }

    await fetchUser();
  };

  const saveUserSettings = async (userSettings: IUserSettings) => {
    if (!walletAddress) return;

    const res = await updateUserSettings(walletAddress, userSettings);

    if (res.status === 200) {
      toast("User settings updated", {
        theme: mode,
        type: "success",
        position: "bottom-center",
      });
    }

    await fetchUser();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        saveUserSettings,
        saveAlertSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserProvider is not found");
  }

  return context;
};

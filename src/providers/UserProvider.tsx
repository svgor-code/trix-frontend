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

interface IUserContext {
  user?: IUser;
  saveUserSettings: (userSettings: IUserSettings) => Promise<void>;
  saveAlertSettings: (alertSettings: IAlertSettings) => Promise<void>;
}

const UserContext = React.createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { signer } = useAuthContext();
  const { mode } = useColorScheme();
  const walletAddress = signer?.address;

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    fetchUser();
  }, [walletAddress]);

  const fetchUser = async () => {
    if (walletAddress) {
      getUser(walletAddress).then((res) => setUser(res));
    }
  };

  const saveAlertSettings = async (alertSettings: IAlertSettings) => {
    if (!walletAddress) return;

    const res = await updateAlertSettings(walletAddress, alertSettings);

    if (res.status === 200) {
      toast("Alert settings updated", {
        theme: mode,
        type: "success",
        position: 'bottom-center',
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
        position: 'bottom-center',
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

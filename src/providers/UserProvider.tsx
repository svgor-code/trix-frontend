import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAlertPageSettings,
  getDonationPageSettings,
  getUser,
  updateAlertSettings,
  updateUserSettings,
} from "src/api/user";
import { useAuthContext } from "./AuthProvider";
import {
  IAlertSettings,
  IDonationPageSettings,
  IUser,
  IUserSettings,
} from "src/types/user";
import { toast } from "react-toastify";
import { useColorScheme } from "@mui/joy";
import { useWalletContext } from "./WalletProvider";

interface IUserContext {
  user?: IUser;
  loading: boolean;
  alertSettings?: IAlertSettings;
  donationPageSettigs?: IDonationPageSettings;
  saveUserSettings: (userSettings: IUserSettings) => Promise<void>;
  saveAlertSettings: (alertSettings: IAlertSettings) => Promise<void>;
}

const UserContext = React.createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { signer } = useWalletContext();
  const { mode } = useColorScheme();
  const { isAuthenticated, auth } = useAuthContext();
  const walletAddress = signer?.address;

  const [user, setUser] = useState<IUser>();
  const [alertSettings, setAlertSettings] = useState<IAlertSettings>();
  const [donationPageSettigs, setDonationPageSettings] =
    useState<IDonationPageSettings>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [walletAddress]);

  const fetchUser = async () => {
    if (!walletAddress) {
      return;
    }

    try {
      setLoading(true);

      const userRes = await getUser(walletAddress);
      const alertSettings = await getAlertPageSettings(userRes.id);
      const donationPageSettigs = await getDonationPageSettings(userRes.id);
      setUser(userRes);
      setAlertSettings(alertSettings);
      setDonationPageSettings(donationPageSettigs);
    } catch (error) {
      if (!isAuthenticated) {
        return;
      }

      toast(`Fetch user error: ${error}`, {
        type: "error",
        theme: mode,
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    return await auth();
  };

  const saveAlertSettings = async (alertSettings: IAlertSettings) => {
    const isSuccessAuth = await checkAuth();
    if (!isSuccessAuth) {
      return;
    }

    const res = await updateAlertSettings(walletAddress || "", alertSettings);

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
    const isSuccessAuth = await checkAuth();
    if (!isSuccessAuth) {
      return;
    }

    const res = await updateUserSettings(walletAddress || "", userSettings);

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
        loading,
        alertSettings,
        donationPageSettigs,
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

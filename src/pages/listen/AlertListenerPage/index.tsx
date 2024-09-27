import { Box, Sheet, Typography, useTheme } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import { config } from "src/api/config";
import { getAlertPageSettings, getUser, getUserById } from "src/api/user";
import { DEFAULT_ALERT_IMAGE } from "src/globals/alert";
import { networks } from "src/globals/networks";
import { IAlertSettings, IUser } from "src/types/user";
import { convertStringToWei, convertWeiToEther } from "src/utils/currency";
import { getTokenByTokenAddress } from "src/utils/networks";

type Alert = {
  amount: string;
  message: string;
  to: string;
  username: string;
  chainId: number;
  token: string;
};

const fetchAlertSettings = async (
  walletAddress: string,
  cb: (user: IUser, alertSettings: IAlertSettings) => void
) => {
  const userRes = await getUser(walletAddress);
  const alertSettings = await getAlertPageSettings(userRes.id);

  cb(userRes, alertSettings);
};

export const AlertListenerPage = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const userWallet = searchParams.get("user_wallet");
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const [settings, setSettings] = useState<IAlertSettings>({
    id: 0,
    image: DEFAULT_ALERT_IMAGE,
    colorAmount: "#fff",
    colorUser: "#fff",
    colorText: "#fff",
    duration: 10,
    showAmount: false,
    showImage: false,
    showMessage: false,
    showUsername: false,
  });
  const [alert, setAlert] = useState<Alert | null>(null);

  useEffect(() => {
    if (!userWallet) return;

    fetchAlertSettings(userWallet, (user, alertSettings) => {
      setWalletAddress(user.walletAddress);
      setSettings((state) => ({
        ...state,
        ...alertSettings,
        image: alertSettings.image || DEFAULT_ALERT_IMAGE,
      }));
    });
  }, [userWallet]);

  useEffect(() => {
    if (!walletAddress) return;

    const socket = io(config.WS_API, {
      query: {
        walletAddress,
      },
    });

    socket.on("donat", (newAlert: Alert) => {
      setAlert(newAlert);
    });
  }, [walletAddress]);

  useEffect(() => {
    if (!alert) return;

    setTimeout(() => {
      setAlert(null);
    }, settings.duration * 1000);
  }, [alert]);

  const { image, colorAmount, colorText, colorUser } = settings;

  if (!alert) {
    return <></>;
  }

  return (
    <Sheet
      sx={{
        background: "transparent",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {settings.showImage && (
          <img style={{ width: "300px", height: "300px" }} src={image} />
        )}
        <Box display="flex" gap={1} alignItems="center" justifyContent="center">
          {settings.showAmount && (
            <Typography
              sx={{
                fontSize: theme.fontSize.xl2,
                fontWeight: theme.fontWeight.xl,
                color: colorAmount,
                textAlign: "center",
              }}
            >
              {convertWeiToEther(convertStringToWei(alert.amount))}{" "}
              {
                getTokenByTokenAddress(networks[alert.chainId], alert.token)
                  ?.symbol
              }
            </Typography>
          )}

          {settings.showUsername && (
            <Typography
              sx={{
                fontSize: theme.fontSize.xl2,
                fontWeight: theme.fontWeight.xl,
                color: colorUser,
                textAlign: "center",
              }}
            >
              {settings.showAmount && "-"} @{alert.username}
            </Typography>
          )}
        </Box>

        {settings.showMessage && (
          <Box sx={{ width: "300px" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: theme.fontWeight.md,
                color: colorText,
              }}
            >
              {alert.message}
            </Typography>
          </Box>
        )}
      </Box>
    </Sheet>
  );
};

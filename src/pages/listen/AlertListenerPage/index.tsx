import { Box, Sheet, Typography, useTheme } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getUserById } from "src/api/user";
import { DEFAULT_ALERT_IMAGE } from "src/globals/alert";
import { networks } from "src/globals/networks";
import { IAlertSettings } from "src/types/user";
import { convertStringToWei, convertWeiToEther } from "src/utils/currency";

type Alert = {
  amount: string;
  message: string;
  network: string;
  to: string;
  username: string;
};

export const AlertListenerPage = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id');
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const [settings, setSettings] = useState<IAlertSettings>({
    image: DEFAULT_ALERT_IMAGE,
    color_amount: "#fff",
    color_user: "#fff",
    color_text: "#fff",
    duration: 10,
    showAmount: false,
    showImage: false,
    showMessage: false,
    showUsername: false,
  });
  const [alert, setAlert] = useState<Alert | null>(null);

  useEffect(() => {
    if (!userId) return;

    getUserById(userId).then((user) => {
      setWalletAddress(user.walletAddress);
      setSettings((state) => ({
        ...state,
        ...user.alert,
        image: user.alert.image || DEFAULT_ALERT_IMAGE,
      }));
    });
  }, [userId]);

  useEffect(() => {
    if (!walletAddress) return;

    const socket = io("ws://localhost:8080", {
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

  const { image, color_amount, color_text, color_user } = settings;

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
                color: color_amount,
                textAlign: "center",
              }}
            >
              {convertWeiToEther(convertStringToWei(alert.amount))}{" "}
              {networks[alert.network].tokens[0].symbol}
            </Typography>
          )}

          {settings.showUsername && (
            <Typography
              sx={{
                fontSize: theme.fontSize.xl2,
                fontWeight: theme.fontWeight.xl,
                color: color_user,
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
                color: color_text,
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

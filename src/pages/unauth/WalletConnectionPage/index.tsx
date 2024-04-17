import { Box, Button, Sheet, Typography, useTheme } from "@mui/joy";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/providers/AuthProvider";
import { useWalletContext } from "src/providers/WalletProvider";
import { ConnectWalletForm } from "./ConnectWalletForm";

export const WalletConnectionPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isConnected } = useWalletContext();

  useEffect(() => {
    if (isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  return (
    <Sheet
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.background.surface,
      }}
    >
      <ConnectWalletForm />
    </Sheet>
  );
};

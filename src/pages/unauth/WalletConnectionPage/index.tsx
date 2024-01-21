import { Box, Button, Sheet, Typography, useTheme } from "@mui/joy";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/providers/AuthProvider";

export const WalletConnectionPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { connect, isConnected } = useAuthContext();

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.background.surface,
      }}
    >
      <Box display="flex" flexDirection="column">
        <Button onClick={connect}>Connect wallet</Button>
      </Box>
    </Sheet>
  );
};

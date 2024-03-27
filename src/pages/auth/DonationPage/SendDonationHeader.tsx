import { Box, Button, Sheet, Typography, useTheme } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NetworkDropdown } from "src/components/MainHeader/components/NetworksDropdown";

export const SendDonationHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Sheet
      sx={(theme) => ({
        width: "100%",
        height: "80px",
        display: "flex",
        alignItems: "center",
        background: theme.palette.background.level1,
        justifyContent: "space-between",
        padding: theme.spacing(0, 2),
        position: "fixed",
        top: 0,
        zIndex: 1000,
      })}
    >
      <Box>
        <Typography
          sx={{
            fontSize: theme.fontSize.xl2,
            fontWeight: theme.fontWeight.lg,
          }}
        >
          Support the streamer
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(2),
        })}
      >
        <NetworkDropdown />
        <Button onClick={() => navigate("/connect-wallet")}>Launch App</Button>
      </Box>
    </Sheet>
  );
};

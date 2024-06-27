import { Box, Button, Sheet, Typography, useTheme } from "@mui/joy";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NetworkDropdown } from "src/components/MainHeader/components/NetworksDropdown";
import { WalletDropdown } from "src/components/MainHeader/components/WalletDropdown";
import { useWalletContext } from "src/providers/WalletProvider";

export const SendDonationHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isConnected, connect } = useWalletContext();
  const [open, setOpen] = useState(false);

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
            fontSize: theme.fontSize.md,
            fontWeight: theme.fontWeight.lg,
          }}
        >
          <a
            href="https://trix-donations.xyz"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
          >
            TRIX DONATIONS
          </a>
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
        {!isConnected && <Button onClick={connect}>Connect wallet</Button>}
        {isConnected && <WalletDropdown open={open} setOpen={setOpen} />}
      </Box>
    </Sheet>
  );
};

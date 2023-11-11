import { Box, Button, Sheet } from "@mui/joy";
import React from "react";
import { HeaderLink } from "./components/HeaderButton";
import { NetworkDropdown } from "./components/NetworksDropdown";
import { WalletDropdown } from "./components/WalletDropdown";

export const MainHeader = () => {
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
      })}
    >
      <Box>
        <HeaderLink title="Dashboard" href="/" />
        <HeaderLink title="Alert" href="/alert" />
        <HeaderLink title="Donation" href="/donation" />
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(2),
        })}
      >
        <NetworkDropdown />
        <WalletDropdown />
      </Box>
    </Sheet>
  );
};

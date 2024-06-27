import { Box, Sheet } from "@mui/joy";
import React, { useState } from "react";
import { HeaderLink } from "./components/HeaderButton";
import { NetworkDropdown } from "./components/NetworksDropdown";
import { WalletDropdown } from "./components/WalletDropdown";
import { useTranslation } from "react-i18next";

export const MainHeader = () => {
  const { t } = useTranslation();
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);

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
        <HeaderLink title={t("Dashboard")} href="/" />
        <HeaderLink title={t("Alert")} href="/alert" />
        <HeaderLink title={t("Donation page")} href="/donation" />
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(2),
        })}
      >
        <NetworkDropdown />
        <WalletDropdown open={isWalletDropdownOpen} setOpen={setIsWalletDropdownOpen} />
      </Box>
    </Sheet>
  );
};

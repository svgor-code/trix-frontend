import { Box, Button, Sheet } from "@mui/joy";
import React, { useState } from "react";
import { HeaderLink } from "./components/HeaderButton";
import { NetworkDropdown } from "./components/NetworksDropdown";
import { WalletDropdown } from "./components/WalletDropdown";
import { useTranslation } from "react-i18next";
import {
  AdjustmentsHorizontalIcon,
  BellAlertIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useWalletContext } from "src/providers/WalletProvider";
import { ConnectWalletModal } from "./components/ConnectWalletModal";

export const MainHeader = () => {
  const { t } = useTranslation();
  const { isConnected } = useWalletContext();
  const [openConnectModal, setOpenConnectModal] = useState(false);
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
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "flex",
          },
        })}
      >
        <HeaderLink
          title={t("Dashboard")}
          href="/"
          Icon={AdjustmentsHorizontalIcon}
        />
        <HeaderLink title={t("Alert")} href="/alert" Icon={BellAlertIcon} />
        <HeaderLink
          title={t("Donation page")}
          href="/donation"
          Icon={UserIcon}
        />
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(2),
        })}
      >
        {isConnected && <NetworkDropdown />}
        {isConnected && (
          <WalletDropdown
            open={isWalletDropdownOpen}
            setOpen={setIsWalletDropdownOpen}
          />
        )}
        {!isConnected && (
          <Button onClick={() => setOpenConnectModal(true)}>
            Connect Wallet
          </Button>
        )}
      </Box>

      <ConnectWalletModal
        open={openConnectModal}
        setOpen={setOpenConnectModal}
      />
    </Sheet>
  );
};

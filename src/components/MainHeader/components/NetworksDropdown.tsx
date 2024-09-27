import {
  Box,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { useWalletContext } from "src/providers/WalletProvider";
// import { NetworkIcon } from "@token-icons/react";
import { networks } from "src/globals/networks";
import { NetworkIcon } from "src/components/TokenIcons";

export const NetworkDropdown = () => {
  const { switchNetwork, network: currentNetwork } = useWalletContext();

  const activeNetwork = Object.values(networks).find(
    (network) => network.chainId === currentNetwork
  ) || {
    chainId: 0,
    icon: "",
    name: "wrong",
    title: "Wrong network",
  };

  return (
    <Dropdown>
      <MenuButton
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          borderRadius: theme.radius.lg,
          height: "48px",
        })}
        color={activeNetwork.name === "wrong" ? "danger" : "neutral"}
      >
        {activeNetwork.name !== "wrong" && (
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",

              "& img": {
                marginRight: theme.spacing(1),
              },

              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            })}
          >
            <NetworkIcon chainId={activeNetwork.chainId} size={20} />
          </Box>
        )}
        <Typography
          variant="plain"
          textTransform="capitalize"
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              fontSize: "12px",
            },
          })}
        >
          {activeNetwork.name}
        </Typography>
        <Box
          sx={(theme) => ({
            width: "20px",
            display: "flex",
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          })}
        >
          <ChevronDownIcon />
        </Box>
      </MenuButton>
      <Menu
        sx={(theme) => ({
          width: "260px",
          padding: theme.spacing(1),
          borderRadius: theme.radius.lg,
          gap: theme.spacing(1),
          background: theme.palette.background.popup,
        })}
        popperOptions={{
          placement: "bottom-start",
        }}
        defaultValue={currentNetwork}
      >
        {Object.values(networks).map((network) => (
          <MenuItem
            onClick={() => switchNetwork(network.chainId)}
            key={network.name}
            selected={currentNetwork === network.chainId}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              minHeight: "42px",
              borderRadius: theme.radius.lg,
            })}
          >
            <Box
              sx={() => ({
                display: "flex",
                alignItems: "center",
              })}
            >
              <NetworkIcon chainId={network.chainId} size={20} />
            </Box>
            <Typography
              textTransform="capitalize"
              sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                  fontSize: "14px",
                },
              })}
            >
              {network.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

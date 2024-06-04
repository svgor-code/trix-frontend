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

import { NetworkName } from "src/utils/networks";
import { useWalletContext } from "src/providers/WalletProvider";
import { NetworkIcon } from "@token-icons/react";
import { networks } from "src/globals/networks";

export const NetworkDropdown = () => {
  const { switchNetwork, network: currentNetwork } = useWalletContext();

  const activeNetwork = Object.values(networks).find(
    (network) => network.chainId === currentNetwork
  ) || {
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

              "& svg": {
                marginRight: theme.spacing(1),
              },
            })}
          >
            <NetworkIcon
              network={activeNetwork.name}
              variant="branded"
              size={24}
            />
          </Box>
        )}
        <Typography variant="plain" textTransform="capitalize">
          {activeNetwork.name}
        </Typography>
        <Box
          sx={(theme) => ({
            marginLeft: theme.spacing(1),
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
              <NetworkIcon network={network.name} variant="branded" />
            </Box>
            <Typography textTransform="capitalize">{network.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

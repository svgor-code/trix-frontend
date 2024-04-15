import {
  Box,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import React, { ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { AvalancheIcon} from "src/assets/icons/networks/AvalancheIcon";
import { ArbitrumIcon } from "src/assets/icons/networks/ArbitrumIcon";
import { NetworkName } from "src/utils/networks";
import { useWalletContext } from "src/providers/WalletProvider";

const networksMap: {
  name: NetworkName;
  title: string;
  icon: ReactElement;
}[] = [
  {
    name: "avalanche",
    icon: <AvalancheIcon />,
    title: "Avalanche",
  },
  {
    name: "arbitrum",
    icon: <ArbitrumIcon />,
    title: "Arbitrum",
  },
];

export const NetworkDropdown = () => {
  const { switchNetwork, network: currentNetwork } = useWalletContext();

  const activeNetwork = networksMap.find(
    (network) => network.name === currentNetwork
  ) || {
    icon: "",
    name: "wrong",
    title: "Wrong network",
  };

  return (
    <Dropdown>
      <MenuButton
        sx={(theme) => ({
          borderRadius: theme.radius.lg,
          height: "48px",
        })}
        color={activeNetwork.name === "wrong" ? "danger" : "neutral"}
      >
        {activeNetwork.icon && (
          <Box
            sx={(theme) => ({
              "& svg": {
                width: theme.spacing(2.5),
                height: theme.spacing(2.5),
                marginRight: theme.spacing(1),

              },
            })}
          >
            {activeNetwork.icon}
          </Box>
        )}
        <Typography variant="plain">{activeNetwork.title}</Typography>
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
        {networksMap.map((network) => (
          <MenuItem
            onClick={() => switchNetwork(network.name)}
            key={network.name}
            selected={currentNetwork === network.name}
            sx={(theme) => ({
              minHeight: "42px",
              borderRadius: theme.radius.lg,
            })}
          >
            <Box
              sx={(theme) => ({
                "& img": {
                  width: theme.spacing(2.5),
                  height: theme.spacing(2.5),
                },
              })}
            >
              {network.icon}
            </Box>
            {network.title}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

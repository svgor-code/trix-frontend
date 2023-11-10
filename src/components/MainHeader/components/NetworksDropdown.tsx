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

import AvalancheIcon from "../../../assets/icons/networks/avalanche.svg?";
import ArbitrumIcon from "../../../assets/icons/networks/arbitrum.svg?";
import { useIcon } from "src/hooks/useIcon";

const networksMap = [
  {
    name: "avalanche",
    icon: AvalancheIcon,
    title: "Avalanche",
  },
  {
    name: "arbitrum",
    icon: ArbitrumIcon,
    title: "Arbitrum",
  },
];

export const NetworkDropdown = () => {
  const activeNetwork = networksMap[0];
  const { Icon } = useIcon();

  return (
    <Dropdown>
      <MenuButton
        sx={(theme) => ({
          borderRadius: theme.radius.lg,
          height: "48px",
        })}
      >
        <Box
          sx={(theme) => ({
            "& img": {
              width: theme.spacing(2.5),
              height: theme.spacing(2.5),
              marginRight: theme.spacing(1),
            },
          })}
        >
          {Icon(activeNetwork.icon)}
        </Box>
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
        })}
        popperOptions={{
          placement: 'bottom-start'
        }}
      >
        {networksMap.map((network) => (
          <MenuItem
            key={network.name}
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
              {Icon(network.icon)}
            </Box>
            {network.title}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

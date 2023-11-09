import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import React from "react";

import { AvalancheIcon } from "src/assets/icons/networks/avalanche";
import { ArbitrumIcon } from "src/assets/icons/networks/arbitrum";

const networksMap = [
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
  const activeNetwork = networksMap[0];

  return (
    <Dropdown>
      <MenuButton>
        {activeNetwork.icon} {activeNetwork.title}
      </MenuButton>
      <Menu>
        {networksMap.map((network) => (
          <MenuItem key={network.name}>
            {network.icon} {network.title}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

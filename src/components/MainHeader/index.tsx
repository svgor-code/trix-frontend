import { Box, Button, Sheet } from "@mui/joy";
import React from "react";
import { HeaderLink } from "./components/HeaderButton";
import { NetworkDropdown } from "./components/NetworksDropdown";

export const MainHeader = () => {
  return (
    <Sheet
      sx={(theme) => ({
        width: "100%",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(0, 2),
      })}
    >
      <Box>
        <HeaderLink title="Dashboard" href="/" />
        <HeaderLink title="Alert" href="/alert" />
        <HeaderLink title="Donation" href="/donation" />
      </Box>
      <Box>
        <NetworkDropdown />
      </Box>
    </Sheet>
  );
};

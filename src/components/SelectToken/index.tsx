import {
  Box,
  Button,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/joy";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

export const SelectToken = () => {
  const theme = useTheme();

  return (
    <>
      <Dropdown>
        <MenuButton
          sx={(theme) => ({
            borderRadius: theme.radius.lg,
            height: "48px",
            display: "flex",
            alignItems: "center",
          })}
          color="neutral"
        >
          <img
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: theme.radius.lg,
              width: theme.spacing(2.5),
              height: theme.spacing(2.5),
              marginRight: theme.spacing(1),
            }}
            src="https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E/logo.png"
          />
          <Typography variant="plain">USDC</Typography>
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
            placement: "bottom-start",
          }}
          defaultValue={"USDC"}
        >
          <MenuItem
            onClick={() => undefined}
            selected={true}
            sx={(theme) => ({
              minHeight: "42px",
              borderRadius: theme.radius.lg,
            })}
          >
            <img
              style={{
                borderRadius: theme.radius.lg,
                width: theme.spacing(2.5),
                height: theme.spacing(2.5),
              }}
              src="https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E/logo.png"
            />
            USDC
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
};

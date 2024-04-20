import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Box,
  Button,
  Divider,
  Dropdown,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Select,
  Sheet,
  Typography,
  selectClasses,
  useTheme,
  Option,
} from "@mui/joy";
import React from "react";

import { PersonIcon } from "src/assets/icons/PersonIcon";
import {
  ArrowTopRightOnSquareIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

import { ToggleTheme } from "src/components/ToggleTheme";
import { reduceWalletAddress } from "src/utils/wallet";
import { useWalletContext } from "src/providers/WalletProvider";
import { TokenIcon } from "@token-icons/react";

export const WalletDropdown = () => {
  const theme = useTheme();
  const { signer, walletTokens, disconnect } = useWalletContext();
  const walletAddress = reduceWalletAddress(signer?.address);

  return (
    <Dropdown>
      <MenuButton
        sx={(theme) => ({
          borderRadius: theme.radius.lg,
          height: "48px",
        })}
      >
        <Typography variant="plain">{walletAddress}</Typography>
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
          width: "450px",
          padding: theme.spacing(1),
          borderRadius: theme.radius.lg,
        })}
        popperOptions={{
          placement: "bottom-end",
        }}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "56px",
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(2),
            paddingX: theme.spacing(2),
            paddingBottom: theme.spacing(1),

            "& img": {
              borderRadius: "50%",
              width: "48px",
            },
          })}
        >
          <PersonIcon />
          <Box>
            <Typography
              variant="plain"
              sx={(theme) => ({
                fontSize: theme.fontSize.xs,
                color: theme.palette.neutral[400],
              })}
            >
              Connected Account:
            </Typography>
            <Link
              sx={(theme) => ({
                color: theme.palette.text.primary,
                fontWeight: theme.fontWeight.lg,
                display: "flex",
                alignItems: "center",
                textDecorationColor: theme.palette.text.primary,

                "& svg": {
                  marginLeft: theme.spacing(1),
                  width: "15px",
                  paddingBottom: "2px",
                },
              })}
            >
              {walletAddress} <ArrowTopRightOnSquareIcon />
            </Link>
          </Box>
        </Box>
        <Divider />
        <Box
          padding={theme.spacing(2)}
          display="flex"
          gap={theme.spacing(3)}
          flexDirection="column"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={theme.fontWeight.lg}>Theme:</Typography>
            <ToggleTheme />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={theme.fontWeight.lg}>Language:</Typography>
            <Select
              value="en"
              indicator={<ChevronDownIcon />}
              sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              <Option value="en">English</Option>
            </Select>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {walletTokens.map((token) => (
            <Box
              key={token.symbol}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: theme.spacing(2),
                borderRadius: theme.radius.lg,
                paddingY: theme.spacing(1),
              }}
            >
              <TokenIcon symbol={token.symbol} variant="branded" size={36} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="plain"
                  sx={{
                    fontSize: theme.fontSize.sm,
                    fontWeight: 600,
                    color: theme.palette.neutral.mainChannel,
                  }}
                >
                  {token.symbol}
                </Typography>
                <Typography
                  variant="plain"
                  sx={{
                    fontSize: theme.fontSize.sm,
                    color: theme.palette.neutral[400],
                  }}
                >
                  {token.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "auto",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "right",
                    fontWeight: 600,
                    fontSize: theme.fontSize.md,
                    color: theme.palette.neutral.mainChannel,
                  }}
                >
                  {parseFloat(token.balance).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box padding={theme.spacing(2)} paddingBottom={theme.spacing(1)}>
          <MenuItem
            onClick={disconnect}
            sx={(theme) => ({
              minHeight: "38px",
              borderRadius: theme.radius.lg,
            })}
          >
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",

                "& svg": {
                  color: theme.palette.danger[500],
                },
              })}
            >
              <PowerIcon strokeWidth={3} />
            </Box>
            <Typography fontWeight={theme.fontWeight.lg}>Disconnect</Typography>
          </MenuItem>
        </Box>
      </Menu>
    </Dropdown>
  );
};

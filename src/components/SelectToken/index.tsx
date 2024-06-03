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
import { useWalletContext } from "src/providers/WalletProvider";
import { IToken } from "src/globals/networks";
import { TokenIcon } from "@token-icons/react";

type Props = {
  selectedToken: IToken;
  onSelectToken: (token: IToken) => void;
};

export const SelectToken = ({ selectedToken, onSelectToken }: Props) => {
  const theme = useTheme();
  const { walletTokens } = useWalletContext();

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
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: theme.radius.lg,
              marginRight: theme.spacing(1),
            }}
          >
            <TokenIcon
              symbol={selectedToken.symbol}
              variant="branded"
              size={24}
            />
          </Box>
          <Typography variant="plain">{selectedToken.symbol}</Typography>
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
          defaultValue={selectedToken.symbol}
        >
          {walletTokens.map((token) => (
            <MenuItem
              key={token.symbol}
              onClick={() => onSelectToken(token)}
              selected={token.symbol === selectedToken.symbol}
              sx={(theme) => ({
                minHeight: "42px",
                borderRadius: theme.radius.lg,
              })}
            >
              <Box
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
                <TokenIcon symbol={token.symbol} variant="branded" size={48} />
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
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </>
  );
};

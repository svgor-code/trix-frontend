import React from "react";
import { Box, Typography, useColorScheme, useTheme } from "@mui/joy";
import { useWalletContext } from "src/providers/WalletProvider";

export const ConnectWalletForm = () => {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const { connect } = useWalletContext();

  return (
    <Box
      sx={{
        minWidth: "420px",
        marginY: theme.spacing(2),
        paddingY: theme.spacing(4),
        paddingX: theme.spacing(6),
        background:
          mode === "light"
            ? theme.palette.background.body
            : theme.palette.background.level1,
        borderRadius: theme.radius.lg,
        border: "1px solid",
        borderColor: theme.palette.neutral.outlinedBorder,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          Connect a wallet
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" mt={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            borderRadius: theme.radius.lg,
            border: "1px solid",
            borderColor: theme.palette.neutral.outlinedBorder,
            paddingX: theme.spacing(2),
            paddingY: theme.spacing(1),
            cursor: "pointer",

            "&:hover": {
              background: theme.palette.neutral.outlinedBorder,
            },

            "& img": {
              width: "32px",
              height: "32px",
            },
          }}
          onClick={connect}
        >
          <Typography fontSize="18px">Browser wallet</Typography>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" />
        </Box>
      </Box>
    </Box>
  );
};

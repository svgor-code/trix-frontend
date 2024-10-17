import {
  Box,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/joy";
import React, { useEffect } from "react";
import { useWalletContext } from "src/providers/WalletProvider";

import BrowserWalletIcon from "src/assets/icons/BrowserWallet.svg";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ConnectWalletModal = ({ open, setOpen }: Props) => {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const { connect, isConnected, error } = useWalletContext();

  useEffect(() => {
    if (isConnected) {
      setOpen(false);
    }
  }, [isConnected]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog layout="center" size="lg" variant="plain">
        <ModalClose />
        <Typography fontSize="20px" fontWeight={600}>
          Connect a wallet
        </Typography>

        <Box
          sx={{
            minWidth: "420px",
            marginY: theme.spacing(2),
          }}
        >
          <Box display="flex" flexDirection="column" mt={2}>
            {error && (
              <Box
                sx={{
                  borderRadius: theme.radius.lg,
                  border: "1px solid",
                  borderColor: theme.palette.danger[700],
                  background: theme.palette.danger[300],
                  color: theme.palette.danger[700],
                  fontSize: "14px",
                  padding: theme.spacing(2),
                  marginBottom: theme.spacing(4),
                }}
              >
                {error}
              </Box>
            )}

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
              <img src={BrowserWalletIcon} />
            </Box>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

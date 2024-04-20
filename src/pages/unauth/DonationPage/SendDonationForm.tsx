import {
  Box,
  Button,
  Input,
  Sheet,
  Skeleton,
  Textarea,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/joy";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "src/api/user";
import { AmountInput } from "src/components/AmountInput";
import { FormField } from "src/components/Form/FormField";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { useContract } from "src/hooks/useContract";
import { useWalletContext } from "src/providers/WalletProvider";
import { ISendDonation } from "src/types/donation";
import { IUser } from "src/types/user";

export const SendDonationForm = () => {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const { walletAddress } = useParams<{ walletAddress: string }>();
  const { sendDonation } = useContract();
  const { signer } = useWalletContext();

  const [streamer, setStreamer] = useState<IUser | undefined>(undefined);

  const [state, setState] = useState<ISendDonation>({
    username: "",
    message: "",
    network: "",
    amount: BigInt(0),
  });

  useEffect(() => {
    const fetchUser = async (walletAddress: string) => {
      const user = await getUser(walletAddress);

      if (!user) {
        toast("Streamer not found :(", {
          position: "bottom-center",
          type: "error",
          theme: mode,
        });
      }

      setStreamer(user);
    };

    if (walletAddress) {
      fetchUser(walletAddress);
    }
  }, [walletAddress]);

  const onChange = (field: keyof ISendDonation, value: string | bigint) => {
    setState((state) => ({ ...state, [field]: value }));
  };

  const onSend = () => {
    sendDonation(
      walletAddress as ethers.AddressLike,
      state.username,
      state.message,
      state.amount
    );
  };

  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingY: theme.spacing(4),
      }}
    >
      <Sheet sx={{ minWidth: "50%", maxWidth: "420px" }}>
        <SettingsFormWrapper>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: theme.spacing(4),
              gap: theme.spacing(2),

              "& img": {
                borderRadius: "100%",
                width: "72px",
                height: "72px",
              },
            }}
          >
            {!streamer ? (
              <Skeleton variant="circular" width="72px" height="72px" />
            ) : (
              <img src={streamer.avatar} />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontSize: theme.fontSize.xl2, fontWeight: 600 }}
              >
                {!streamer ? (
                  <Skeleton
                    variant="rectangular"
                    width="100px"
                    height="20px"
                    sx={{ marginBottom: theme.spacing(1) }}
                  />
                ) : (
                  streamer.username || "Unkown person"
                )}
              </Typography>
              <Typography sx={{ fontSize: theme.fontSize.md }}>
                {!streamer && (
                  <Skeleton variant="rectangular" width="60px" height="14px" />
                )}
                {streamer?.donationPage.welcomeText}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={4}>
            <FormField label="Your username">
              <Input
                size="lg"
                variant="outlined"
                placeholder="Username"
                sx={{ borderRadius: theme.radius.lg }}
                value={state.username}
                onChange={(e) => onChange("username", e.target.value)}
              />
            </FormField>

            <FormField label="Donation message">
              <Textarea
                minRows={5}
                variant="outlined"
                placeholder="Message"
                size="lg"
                sx={{ borderRadius: theme.radius.lg }}
                value={state.message}
                onChange={(e) => onChange("message", e.target.value)}
              />
            </FormField>

            <FormField label="Amount">
              <AmountInput
                amount={state.amount}
                setAmount={(amount) => onChange("amount", amount)}
              />
            </FormField>

            <Box display="flex" flexDirection="row-reverse">
              <Button size="lg" onClick={onSend}>
                Donate
              </Button>
            </Box>
          </Box>
        </SettingsFormWrapper>
      </Sheet>
    </Sheet>
  );
};

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
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDonationPageSettings, getUser } from "src/api/user";
import { AmountInput } from "src/components/AmountInput";
import { FormField } from "src/components/Form/FormField";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { IToken, networks } from "src/globals/networks";
import { useContract } from "src/hooks/useContract";
import { useWalletContext } from "src/providers/WalletProvider";
import { ISendDonation } from "src/types/donation";
import { IDonationPageSettings, IUser } from "src/types/user";
import { TransactionProgress } from "./components/TransactionProgress";
import { useTranslation } from "react-i18next";

export const SendDonationForm = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { mode } = useColorScheme();
  const [searchParams] = useSearchParams();
  const walletAddress = searchParams.get("wallet");
  const { transactionStep, isError, sendDonation, sendDonationErc20 } =
    useContract();
  const { network } = useWalletContext();

  const [selectedToken, setSelectedToken] = useState<IToken>(
    networks[network || Object.keys(networks)[0]].tokens[0]
  );
  const [streamer, setStreamer] = useState<IUser | undefined>(undefined);
  const [donationPageSettings, setDonationPageSettings] = useState<
    IDonationPageSettings | undefined
  >();

  const [state, setState] = useState<ISendDonation>({
    username: "",
    message: "",
    network: 0,
    amount: BigInt(0),
  });

  useEffect(() => {
    const fetchUser = async (walletAddress: string) => {
      const user = await getUser(walletAddress);
      const donationSettings = await getDonationPageSettings(user.id);

      if (!user) {
        toast("Streamer not found :(", {
          position: "bottom-center",
          type: "error",
          theme: mode,
        });
      }

      setStreamer(user);
      setDonationPageSettings(donationSettings);
    };

    if (walletAddress) {
      fetchUser(walletAddress);
    }
  }, [walletAddress]);

  const onChange = (field: keyof ISendDonation, value: string | bigint) => {
    setState((state) => ({ ...state, [field]: value }));
  };

  const onSend = async () => {
    if (selectedToken.native) {
      await sendDonation(
        walletAddress as ethers.AddressLike,
        state.username,
        state.message,
        state.amount
      );
    } else {
      await sendDonationErc20(
        walletAddress as ethers.AddressLike,
        state.username,
        state.message,
        state.amount,
        selectedToken.address
      );
    }
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
                {donationPageSettings?.welcomeText}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <FormField label={t("Your username")}>
              <Input
                size="lg"
                variant="outlined"
                placeholder={t("Username")}
                sx={{ borderRadius: theme.radius.lg }}
                value={state.username}
                onChange={(e) => onChange("username", e.target.value)}
              />
            </FormField>

            <FormField label={t("Your message")}>
              <Textarea
                minRows={3}
                variant="outlined"
                placeholder={t("Message")}
                size="lg"
                sx={{ borderRadius: theme.radius.lg }}
                value={state.message}
                onChange={(e) => onChange("message", e.target.value)}
              />
            </FormField>

            <FormField label={t("Amount")}>
              <AmountInput
                amount={state.amount}
                setAmount={(amount) => onChange("amount", amount)}
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
              />
            </FormField>

            <Box display="flex" flexDirection="row-reverse">
              <Button
                size="lg"
                onClick={onSend}
                disabled={transactionStep !== "none"}
              >
                {t("Donate")}
              </Button>
            </Box>

            <Box m={1}>
              <TransactionProgress
                transactionStep={transactionStep}
                isError={isError}
              />
            </Box>
          </Box>
        </SettingsFormWrapper>
      </Sheet>
    </Sheet>
  );
};

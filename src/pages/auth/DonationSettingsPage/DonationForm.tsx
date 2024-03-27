import { Box, Button, Grid, Input, Sheet, useTheme } from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";
import { FormField } from "src/components/Form/FormField";
import { ImageUploader } from "src/components/ImageUploader";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { useAuthContext } from "src/providers/AuthProvider";
import { useUserContext } from "src/providers/UserProvider";
import { IUserSettings } from "src/types/user";
import { useWalletContext } from "src/providers/WalletProvider";

type KDonationForm = keyof IUserSettings;

const DEFAULT_AVATAR =
  "https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png";

export const DonationForm = () => {
  const theme = useTheme();
  const { signer } = useWalletContext();
  const { user, saveUserSettings } = useUserContext();
  const ref = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<IUserSettings>({
    avatar: DEFAULT_AVATAR,
    username: "",
  });

  useEffect(() => {
    if (user) {
      setState({
        avatar: user.avatar || DEFAULT_AVATAR,
        username: user.username || "",
      });
    }
  }, [user]);

  const donationPageUrl = `${window.location.origin}/d/${signer?.address}`;

  const onChange = (field: KDonationForm, value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onUseDefaultImage = () => {
    setState((prev) => ({
      ...prev,
      avatar: DEFAULT_AVATAR,
    }));
  };

  const onSave = () => {
    saveUserSettings(state);
  };

  const onCopyDonationPageUrl = () => {
    navigator.clipboard.writeText(donationPageUrl);
  };

  const onDownloadQR = async () => {
    if (!ref.current) {
      return;
    }

    const canvas = await html2canvas(ref.current);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{
        marginX: theme.spacing(8),
        paddingY: theme.spacing(4),
      }}
    >
      <Grid lg={6} md={12} xs={12}>
        <SettingsFormWrapper>
          <Box display="flex" flexDirection="column" gap={4}>
            <FormField label="Your avatar">
              <Box display="flex" width={1} gap={2}>
                <Box width="200px">
                  <ImageUploader
                    image={state.avatar}
                    setImage={(image) => onChange("avatar", image)}
                  />
                </Box>
                <Box width={1 / 2}>
                  Use{" "}
                  <a
                    style={{
                      color: theme.palette.primary[500],
                      cursor: "pointer",
                    }}
                    onClick={onUseDefaultImage}
                  >
                    default image
                  </a>
                </Box>
              </Box>
            </FormField>

            <FormField label="Your username">
              <Input
                size="lg"
                variant="outlined"
                placeholder="Your username"
                value={state.username}
                sx={{ borderRadius: theme.radius.lg }}
                onChange={(e) => onChange("username", e.target.value)}
              />
            </FormField>

            <Box display="flex" flexDirection="row-reverse">
              <Button
                sx={{ borderRadius: theme.radius.lg }}
                size="lg"
                onClick={onSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </SettingsFormWrapper>
      </Grid>

      {user && (
        <Grid lg={6} md={12} xs={12}>
          <SettingsFormWrapper>
            <FormField label="Your donation page url">
              <Input
                value={donationPageUrl}
                size="lg"
                variant="outlined"
                sx={{ borderRadius: theme.radius.lg }}
                endDecorator={
                  <Button
                    sx={{ cursor: "pointer", borderRadius: theme.radius.lg }}
                    onClick={onCopyDonationPageUrl}
                  >
                    Copy
                  </Button>
                }
              />
            </FormField>
          </SettingsFormWrapper>

          <SettingsFormWrapper>
            <FormField label="Your QR code">
              <Grid container spacing={2} mt={2}>
                <Grid lg={4} md={6} xs={6}>
                  <Sheet
                    sx={{
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    <div ref={ref}>
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={donationPageUrl}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </Sheet>
                </Grid>
                <Grid lg={8} md={6} xs={6}>
                  <Button
                    sx={{ cursor: "pointer", borderRadius: theme.radius.lg }}
                    onClick={onDownloadQR}
                  >
                    Download QR code
                  </Button>
                </Grid>
              </Grid>
            </FormField>
          </SettingsFormWrapper>
        </Grid>
      )}
    </Grid>
  );
};

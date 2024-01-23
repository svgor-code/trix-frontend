import { Box, Button, Grid, Input, useTheme } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { ColorPicker } from "src/components/ColorPicker";
import { FormField } from "src/components/Form/FormField";
import { ImageUploader } from "src/components/ImageUploader";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { useAuthContext } from "src/providers/AuthProvider";
import { useUserContext } from "src/providers/UserProvider";
import { IUserSettings } from "src/types/user";

type KDonationForm = keyof IUserSettings;

const DEFAULT_AVATAR =
  "https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png";

export const DonationForm = () => {
  const theme = useTheme();
  const { signer } = useAuthContext();
  const { user, saveUserSettings } = useUserContext();

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
                value={state.username}
                onChange={(e) => onChange("username", e.target.value)}
              />
            </FormField>

            <Box display="flex" flexDirection="row-reverse">
              <Button size="lg" onClick={onSave}>
                Save
              </Button>
            </Box>
          </Box>
        </SettingsFormWrapper>
      </Grid>

      <Grid lg={6} md={12} xs={12}>
        <SettingsFormWrapper>
          <FormField label="Your donation page url">
            <Input
              value={donationPageUrl}
              endDecorator={
                <Button
                  sx={{ cursor: "pointer" }}
                  onClick={onCopyDonationPageUrl}
                >
                  Copy
                </Button>
              }
            />
          </FormField>
        </SettingsFormWrapper>
      </Grid>
    </Grid>
  );
};

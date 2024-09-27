import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Sheet,
  Skeleton,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/joy";
import { IAlertSettings } from "src/types/user";
import { DEFAULT_ALERT_IMAGE } from "src/globals/alert";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { FormField } from "src/components/Form/FormField";
import { useUserContext } from "src/providers/UserProvider";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const AlertPreview = ({
  image,
  colorText,
  colorAmount,
  colorUser,
  duration,
  showImage,
  showAmount,
  showMessage,
  showUsername,
}: IAlertSettings) => {
  const theme = useTheme();
  const { user, loading } = useUserContext();
  const { mode } = useColorScheme();
  const { t } = useTranslation();

  const onCopyAlertPageUrl = () => {
    navigator.clipboard.writeText(alertPageURL);

    toast("Successfully copied", {
      theme: mode,
      type: "success",
      position: "bottom-center",
    });
  };

  const alertPageURL = `${window.location.origin}/l/?user_wallet=${user?.walletAddress}`;

  return (
    <>
      <SettingsFormWrapper>
        {loading ? (
          <Box
            width="100%"
            height="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {user ? (
              <FormField label={t("Paste this link into OBS")}>
                <Input
                  size="lg"
                  sx={{ borderRadius: theme.radius.lg }}
                  value={alertPageURL}
                  endDecorator={
                    <Button
                      sx={{
                        cursor: "pointer",
                        borderRadius: theme.radius.lg,
                        mr: "1px",
                      }}
                      onClick={onCopyAlertPageUrl}
                    >
                      {t("Copy")}
                    </Button>
                  }
                />
              </FormField>
            ) : (
              <Box>
                <Typography style={{ color: "red", fontSize: "18px" }}>
                  {t("Click on the Save settings button to create a profile")}
                </Typography>
              </Box>
            )}
          </>
        )}
      </SettingsFormWrapper>
      {user && (
        <Sheet
          sx={{
            mt: theme.spacing(2),
            background: `url(https://i.pcmag.com/imagery/articles/049zi8OCKMGMf1zQYUoDBII-4.fit_lim.size_1600x900.v1679505245.jpg)`,
            borderRadius: theme.radius.lg,
            border: "1px solid",
            borderColor: theme.palette.neutral.outlinedBorder,
            height: "400px",
            backgroundPosition: "top",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {showImage && (
            <img
              style={{ width: "100px", height: "100px" }}
              src={image || DEFAULT_ALERT_IMAGE}
            />
          )}

          <Box display="flex" gap={1} alignItems="center">
            {showAmount && (
              <Typography
                sx={{
                  fontSize: theme.fontSize.xl2,
                  fontWeight: theme.fontWeight.xl,
                  color: colorAmount,
                }}
              >
                1.3 ETH
              </Typography>
            )}

            {showUsername && (
              <Typography
                sx={{
                  fontSize: theme.fontSize.xl2,
                  fontWeight: theme.fontWeight.xl,
                  color: colorUser,
                }}
              >
                {showAmount && "-"} @username
              </Typography>
            )}
          </Box>

          {showMessage && (
            <Box sx={{ width: "300px" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: theme.fontWeight.md,
                  color: colorText,
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                iste consequatur eveniet cupiditate blanditiis.
              </Typography>
            </Box>
          )}
        </Sheet>
      )}
    </>
  );
};

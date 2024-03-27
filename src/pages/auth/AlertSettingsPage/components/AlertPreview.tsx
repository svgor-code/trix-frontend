import React from "react";
import { Box, Button, Input, Sheet, Typography, useColorScheme, useTheme } from "@mui/joy";
import { IAlertSettings } from "src/types/user";
import { DEFAULT_ALERT_IMAGE } from "src/globals/alert";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { FormField } from "src/components/Form/FormField";
import { useUserContext } from "src/providers/UserProvider";
import { toast } from "react-toastify";

export const AlertPreview = ({
  image,
  color_text,
  color_amount,
  color_user,
}: IAlertSettings) => {
  const theme = useTheme();
  const { user } = useUserContext();
  const { mode } = useColorScheme();

  const onCopyAlertPageUrl = () => {
    navigator.clipboard.writeText(alertPageURL);

    toast("Successfully copied", {
      theme: mode,
      type: "success",
      position: 'bottom-center',
    });
  };

  const alertPageURL = `${window.location.origin}/l/${user?._id}`;

  return (
    <>
      {user && (
        <SettingsFormWrapper>
          <FormField label="Paste this link into broadcasting software you use and display your incoming donations">
            <Input
              value={alertPageURL}
              endDecorator={
                <Button sx={{ cursor: "pointer" }} onClick={onCopyAlertPageUrl}>
                  Copy
                </Button>
              }
            />
          </FormField>
        </SettingsFormWrapper>
      )}
      <Sheet
        sx={{
          mt: theme.spacing(2),
          background: `url(src/assets/preview.jpeg)`,
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
        <img
          style={{ width: "100px", height: "100px" }}
          src={image || DEFAULT_ALERT_IMAGE}
        />

        <Box display="flex" gap={1} alignItems="center">
          <Typography
            sx={{
              fontSize: theme.fontSize.xl2,
              fontWeight: theme.fontWeight.xl,
              color: color_amount,
            }}
          >
            300 ETH
          </Typography>

          <Typography
            sx={{
              fontSize: theme.fontSize.xl2,
              fontWeight: theme.fontWeight.xl,
              color: color_user,
            }}
          >
            - @username
          </Typography>
        </Box>

        <Box sx={{ width: "300px" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: theme.fontWeight.md,
              color: color_text,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere iste
            consequatur eveniet cupiditate blanditiis.
          </Typography>
        </Box>
      </Sheet>
    </>
  );
};

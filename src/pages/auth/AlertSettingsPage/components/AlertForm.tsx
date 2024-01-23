import { Box, Button, Grid, useTheme } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { ColorPicker } from "src/components/ColorPicker";
import { FormField } from "src/components/Form/FormField";
import { ImageUploader } from "src/components/ImageUploader";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { AlertPreview } from "./AlertPreview";
import { useUserContext } from "src/providers/UserProvider";
import { IAlertSettings } from "src/types/user";

export const DEFAULT_IMAGE =
  "https://media.tenor.com/cr1crWcl8KkAAAAi/reaction-funny.gif";

type KAlertForm = keyof IAlertSettings;

export const AlertForm = () => {
  const theme = useTheme();
  const { user, saveAlertSettings } = useUserContext();

  const [state, setState] = useState<IAlertSettings>({
    image: user?.alert.image || DEFAULT_IMAGE,
    color_user: user?.alert.color_user || theme.palette.common.white,
    color_text: user?.alert.color_text || theme.palette.common.white,
    color_amount: user?.alert.color_amount || theme.palette.common.white,
    duration: 10,
  });

  useEffect(() => {
    if (user) {
      setState({
        image: user.alert.image || DEFAULT_IMAGE,
        color_user: user.alert.color_user,
        color_text: user.alert.color_text,
        color_amount: user.alert.color_amount,
        duration: 10,
      });
    }
  }, [user]);

  const onChange = (field: KAlertForm, value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onUseDefaultImage = () => {
    setState((prev) => ({
      ...prev,
      image: DEFAULT_IMAGE,
    }));
  };

  const onSave = () => {
    saveAlertSettings(state);
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
            <FormField label="Upload image">
              <Box display="flex" width={1} gap={2}>
                <Box width="200px">
                  <ImageUploader
                    image={state.image}
                    setImage={(image) => onChange("image", image)}
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

            <FormField label="User color">
              <ColorPicker
                color={state.color_user}
                setColor={(color) => onChange("color_user", color)}
              />
            </FormField>

            <FormField label="Amount color">
              <ColorPicker
                color={state.color_amount}
                setColor={(color) => onChange("color_amount", color)}
              />
            </FormField>

            <FormField label="Text color">
              <ColorPicker
                color={state.color_text}
                setColor={(color) => onChange("color_text", color)}
              />
            </FormField>

            {/* Switcher for donation text */}

            <Box display="flex" flexDirection="row-reverse">
              <Button size="lg" onClick={onSave}>
                Save
              </Button>
            </Box>
          </Box>
        </SettingsFormWrapper>
      </Grid>
      <Grid lg={6} md={12} xs={12}>
        <AlertPreview
          image={state.image}
          color_user={state.color_user}
          color_text={state.color_text}
          color_amount={state.color_amount}
        />
      </Grid>
    </Grid>
  );
};

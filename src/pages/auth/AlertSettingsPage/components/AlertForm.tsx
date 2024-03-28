import { Box, Button, Grid, Input, useTheme } from "@mui/joy";
import React from "react";
import { ColorPicker } from "src/components/ColorPicker";
import { FormField } from "src/components/Form/FormField";
import { ImageUploader } from "src/components/ImageUploader";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { AlertPreview } from "./AlertPreview";
import { IAlertSettings, IUser } from "src/types/user";
import { DEFAULT_ALERT_IMAGE } from "src/globals/alert";

type KAlertForm = keyof IAlertSettings;

type Props = {
  user: IUser | undefined;
  state: IAlertSettings;
  setState: React.Dispatch<React.SetStateAction<IAlertSettings>>;
  saveAlertSettings: (alertSettings: IAlertSettings) => Promise<void>;
};

export const AlertForm = ({
  user,
  state,
  setState,
  saveAlertSettings,
}: Props) => {
  const theme = useTheme();

  const onChange = (field: KAlertForm, value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onUseDefaultImage = () => {
    setState((prev) => ({
      ...prev,
      image: DEFAULT_ALERT_IMAGE,
    }));
  };

  const onSave = () => {
    saveAlertSettings(state);
  };

  return (
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

        <FormField label="Username color">
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
          <Button
            sx={{ borderRadius: theme.radius.lg }}
            size="lg"
            onClick={onSave}
          >
            Save settings
          </Button>
        </Box>
      </Box>
    </SettingsFormWrapper>
  );
};

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Input,
  Sheet,
  Slider,
  useTheme,
} from "@mui/joy";
import React from "react";
import { ColorPicker } from "src/components/ColorPicker";
import { FormField } from "src/components/Form/FormField";
import { ImageUploader } from "src/components/ImageUploader";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { AlertPreview } from "./AlertPreview";
import { IAlertSettings, IUser } from "src/types/user";
import { DEFAULT_ALERT_IMAGE } from "src/globals/alert";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const onChange = (
    field: KAlertForm,
    value: string | boolean | number | number[]
  ) => {
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
        <FormField label={t("Upload image")}>
          <Box display="flex" width={1} gap={2}>
            <Box width="200px">
              <ImageUploader
                image={state.image}
                setImage={(image) => onChange("image", image)}
              />
            </Box>
            <Box width={1 / 2}>
              {t("Use")}{" "}
              <a
                style={{
                  color: theme.palette.primary[500],
                  cursor: "pointer",
                }}
                onClick={onUseDefaultImage}
              >
                {t("default image")}
              </a>
            </Box>
          </Box>
        </FormField>

        <Sheet
          sx={{
            display: "flex",
            background: "transparent",
            justifyContent: "space-between",
          }}
        >
          <Sheet
            sx={{
              width: "50%",
              padding: theme.spacing(2),
              background: "transparent",
              borderRadius: theme.radius.lg,
              border: "1px solid",
              borderColor: theme.palette.neutral.outlinedBorder,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormField
              label={t("Show image")}
              flexDirection="row"
              alignItems="center"
            >
              <Checkbox
                checked={state.showImage}
                onChange={(e) => onChange("showImage", e.target.checked)}
                sx={{ marginLeft: "auto" }}
              />
            </FormField>
            <FormField
              label={t("Show username")}
              flexDirection="row"
              alignItems="center"
            >
              <Checkbox
                checked={state.showUsername}
                onChange={(e) => onChange("showUsername", e.target.checked)}
                sx={{ marginLeft: "auto" }}
              />
            </FormField>
            <FormField
              label={t("Show amount")}
              flexDirection="row"
              alignItems="center"
            >
              <Checkbox
                checked={state.showAmount}
                onChange={(e) => onChange("showAmount", e.target.checked)}
                sx={{ marginLeft: "auto" }}
              />
            </FormField>
            <FormField
              label={t("Show message")}
              flexDirection="row"
              alignItems="center"
            >
              <Checkbox
                checked={state.showMessage}
                onChange={(e) => onChange("showMessage", e.target.checked)}
                sx={{ marginLeft: "auto" }}
              />
            </FormField>

            <Box my={1}></Box>

            <FormField
              label={t("Duration (in seconds)")}
              flexDirection="column"
            >
              <Slider
                value={state.duration}
                onChange={(_, value) => onChange("duration", value)}
                max={10}
                valueLabelDisplay="on"
              />
            </FormField>
          </Sheet>
          <Sheet
            sx={{
              width: "45%",
              padding: theme.spacing(2),
              background: "transparent",
              borderRadius: theme.radius.lg,
              border: "1px solid",
              borderColor: theme.palette.neutral.outlinedBorder,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormField
              label={t("Username color")}
              flexDirection="row"
              alignItems="center"
            >
              <ColorPicker
                color={state.color_user}
                setColor={(color) => onChange("color_user", color)}
                style={{ marginLeft: "auto" }}
              />
            </FormField>

            <FormField
              label={t("Amount color")}
              flexDirection="row"
              alignItems="center"
            >
              <ColorPicker
                color={state.color_amount}
                setColor={(color) => onChange("color_amount", color)}
                style={{ marginLeft: "auto" }}
              />
            </FormField>

            <FormField
              label={t("Text color")}
              flexDirection="row"
              alignItems="center"
            >
              <ColorPicker
                color={state.color_text}
                setColor={(color) => onChange("color_text", color)}
                style={{ marginLeft: "auto" }}
              />
            </FormField>
          </Sheet>
        </Sheet>

        <Box display="flex" flexDirection="row-reverse">
          <Button
            sx={{ borderRadius: theme.radius.lg }}
            size="lg"
            onClick={onSave}
          >
            {t("Save settings")}
          </Button>
        </Box>
      </Box>
    </SettingsFormWrapper>
  );
};

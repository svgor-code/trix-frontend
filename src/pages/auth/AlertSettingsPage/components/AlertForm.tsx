import { Box, Button, Grid, useTheme } from "@mui/joy";
import React, { useState } from "react";
import { ColorPicker } from "src/components/ColorPicker";
import { FormField } from "src/components/Form/FormField";
import { ImageUploader } from "src/components/ImageUploader";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { AlertPreview } from "./AlertPreview";

export interface TAlertForm {
  image: string;
  color_user: string;
  color_text: string;
  color_amount: string;
}

export const DEFAULT_IMAGE =
  "https://media.tenor.com/cr1crWcl8KkAAAAi/reaction-funny.gif";

type KAlertForm = keyof TAlertForm;

export const AlertForm = () => {
  const theme = useTheme();

  const [state, setState] = useState<TAlertForm>({
    image: DEFAULT_IMAGE,
    color_user: theme.palette.common.white,
    color_text: theme.palette.common.white,
    color_amount: theme.palette.common.white,
  });

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
                <Box width={1 / 3}>
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

            {/* Switcher a for donation text */}


            <Box display="flex" flexDirection="row-reverse">
              <Button>Save</Button>
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

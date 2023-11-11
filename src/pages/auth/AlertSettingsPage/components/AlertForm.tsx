import { Box, Typography, useTheme } from "@mui/joy";
import React from "react";
import { ImageUploader } from "src/components/ImageUploader";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";

export const AlertForm = () => {
  const theme = useTheme();

  return (
    <SettingsFormWrapper>
      <Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography sx={{
            fontSize: theme.fontSize.lg,
            fontWeight: theme.fontWeight.lg,
            color: theme.palette.neutral.outlinedColor,
          }}>Upload image</Typography>
          <ImageUploader />
        </Box>
      </Box>
    </SettingsFormWrapper>
  );
};

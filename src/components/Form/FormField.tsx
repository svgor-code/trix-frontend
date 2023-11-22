import { Box, Typography, useTheme } from "@mui/joy";
import React, { PropsWithChildren } from "react";

type Props = {
  label: string;
};

export const FormField = ({ children, label }: PropsWithChildren<Props>) => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography
        sx={{
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.lg,
          color: theme.palette.neutral.outlinedColor,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

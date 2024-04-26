import { Box, Typography, useTheme } from "@mui/joy";
import React, { PropsWithChildren } from "react";

type Props = {
  label: string;
  flexDirection?: "row" | "column";
  alignItems?: "center";
};

export const FormField = ({
  children,
  label,
  flexDirection = "column",
  alignItems,
}: PropsWithChildren<Props>) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      gap={2}
      alignItems={alignItems}
    >
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

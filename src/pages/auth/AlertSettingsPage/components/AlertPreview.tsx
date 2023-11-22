import React from "react";
import { Box, Sheet, Typography, useColorScheme, useTheme } from "@mui/joy";
import { DEFAULT_IMAGE, TAlertForm } from "./AlertForm";

export const AlertPreview = ({
  image,
  color_text,
  color_amount,
  color_user,
}: TAlertForm) => {
  const theme = useTheme();
  const { mode } = useColorScheme();

  return (
    <Sheet
      sx={{
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
        src={image || DEFAULT_IMAGE}
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
  );
};

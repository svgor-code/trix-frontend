import { Box, Container, Grid, Sheet, Typography, useTheme } from "@mui/joy";
import React from "react";

type Props = {
  title: string;
  description: string;
};

export const SettingsPageHeader = ({ title, description }: Props) => {
  const theme = useTheme();

  return (
    <Sheet
      sx={{
        height: "100px",
        background: theme.palette.background.level1,
      }}
    >
      <Grid sx={{ height: "100%", marginX: theme.spacing(8) }}>
        <Box display="flex" alignItems="center" height="100%">
          <Box>
            <Typography
              sx={{
                fontSize: theme.fontSize.xl4,
                fontWeight: theme.fontWeight.lg,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.fontSize.sm,
                color: theme.palette.neutral[500],
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Sheet>
  );
};

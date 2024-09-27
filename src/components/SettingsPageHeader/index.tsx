import { Box, Container, Grid, Sheet, Typography, useTheme } from "@mui/joy";
import React, { ReactElement } from "react";

type Props = {
  title: string;
  description: string;
  rightElement?: ReactElement;
};

export const SettingsPageHeader = ({
  title,
  description,
  rightElement,
}: Props) => {
  const theme = useTheme();

  return (
    <Sheet
      sx={{
        height: "100px",
        background: theme.palette.background.level1,
      }}
    >
      <Grid
        sx={(theme) => ({
          height: "100%",
          marginX: theme.spacing(8),
          [theme.breakpoints.down("md")]: {
            marginX: theme.spacing(2),
          },
        })}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          <Box>
            <Typography
              sx={(theme) => ({
                fontSize: theme.fontSize.xl4,
                fontWeight: theme.fontWeight.lg,

                [theme.breakpoints.down("md")]: {
                  fontSize: theme.fontSize.md,
                },
              })}
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
          <Box>{rightElement}</Box>
        </Box>
      </Grid>
    </Sheet>
  );
};

import { Box, Container, Grid, Sheet, Typography, useTheme } from "@mui/joy";
import React from "react";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AuthLayout } from "src/layouts/AuthLayout";
import { AlertForm } from "./components/AlertForm";

const AlertSettingsPage = () => {
  const theme = useTheme();

  return (
    <AuthLayout>
      <>
        <SettingsPageHeader title="Alert" description="Set up your alert." />
        <Container sx={{
          paddingY: theme.spacing(4),
        }}>
          <Grid container spacing={4}>
            <Grid md={6}>
              <AlertForm />
            </Grid>
            <Grid md={6}>123</Grid>
          </Grid>
        </Container>
      </>
    </AuthLayout>
  );
};

export default AlertSettingsPage;

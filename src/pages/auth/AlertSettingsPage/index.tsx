import React from "react";
import { Container, Grid, useTheme } from "@mui/joy";

import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AuthLayout } from "src/layouts/AuthLayout";
import { AlertForm } from "./components/AlertForm";
import { AlertPreview } from "./components/AlertPreview";

const AlertSettingsPage = () => {
  const theme = useTheme();

  return (
    <AuthLayout>
      <>
        <SettingsPageHeader title="Alert" description="Set up your alert." />
        <AlertForm />
      </>
    </AuthLayout>
  );
};

export default AlertSettingsPage;

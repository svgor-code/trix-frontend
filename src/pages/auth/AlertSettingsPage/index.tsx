import React from "react";

import { AuthLayout } from "src/layouts/AuthLayout";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AlertForm } from "./components/AlertForm";

const AlertSettingsPage = () => {

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

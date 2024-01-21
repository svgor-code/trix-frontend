import React from "react";

import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AlertForm } from "./components/AlertForm";
import { Sheet } from "@mui/joy";

const AlertSettingsPage = () => {
  return (
    <Sheet>
      <SettingsPageHeader title="Alert" description="Set up your alert." />
      <AlertForm />
    </Sheet>
  );
};

export default AlertSettingsPage;

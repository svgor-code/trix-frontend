import { Sheet } from "@mui/joy";
import React from "react";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AuthLayout } from "src/layouts/AuthLayout";
import { DonationForm } from "./DonationForm";

const DonationSettingsPage = () => {
  return (
    <Sheet>
      <SettingsPageHeader
        title="Donation page"
        description="Set up your donation page."
      />
      <DonationForm />
    </Sheet>
  );
};

export default DonationSettingsPage;

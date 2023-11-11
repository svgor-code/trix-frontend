import { Sheet } from "@mui/joy";
import React from "react";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AuthLayout } from "src/layouts/AuthLayout";

const DonationSettingsPage = () => {
  return (
    <AuthLayout>
      <Sheet
        sx={{
          height: "100px",
        }}
      >
        <SettingsPageHeader
          title="Donation"
          description="Set up your donation page."
        />
      </Sheet>
    </AuthLayout>
  );
};

export default DonationSettingsPage;

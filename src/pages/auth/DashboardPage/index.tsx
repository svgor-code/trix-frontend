import { Sheet } from "@mui/joy";
import React from "react";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";
import { AuthLayout } from "src/layouts/AuthLayout";

export const DashboardPage = () => {
  return (
    <Sheet
      sx={{
        height: "100px",
      }}
    >
      <SettingsPageHeader
        title="Dashboard"
        description="Watch your statistics."
      />
    </Sheet>
  );
};

import { Sheet } from "@mui/joy";
import React from "react";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AuthLayout } from "src/layouts/AuthLayout";
import { DonationForm } from "./DonationForm";
import { useTranslation } from "react-i18next";

const DonationSettingsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader
        title={t("Donation page")}
        description={t("Set up your donation page")}
      />
      <DonationForm />
    </>
  );
};

export default DonationSettingsPage;

import { Sheet } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { getDonats } from "src/api/dashboard";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";
import { AuthLayout } from "src/layouts/AuthLayout";
import { useWalletContext } from "src/providers/WalletProvider";
import { IDonatItem } from "src/types/donation";
import { convertStringToWei, convertWeiToEther } from "src/utils/currency";
import { DonatsList } from "./DonatsList";

export const DashboardPage = () => {
  const { signer } = useWalletContext();
  const [donats, setDonats] = useState<IDonatItem[]>([]);

  useEffect(() => {
    if (signer) {
      getDonats(signer?.address).then((records) => {
        setDonats(
          records.map((record) => ({
            ...record,
            amount: convertWeiToEther(convertStringToWei(record.amount)),
            timestamp: new Date(record.timestamp).toDateString(),
          }))
        );
      });
    }
  }, [signer]);

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
      <DonatsList donats={donats} />
    </Sheet>
  );
};

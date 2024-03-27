import { Sheet, useTheme } from "@mui/joy";
import React from "react";
import { SendDonationForm } from "./SendDonationForm";
import { SendDonationHeader } from "./SendDonationHeader";

const DonationPage = () => {
  const theme = useTheme();

  return (
    <Sheet>
      <Sheet
        sx={{
          height: "100px",
          background: theme.palette.background.level1,
        }}
      >
        <SendDonationHeader />
      </Sheet>
      <SendDonationForm />
    </Sheet>
  );
};

export default DonationPage;

import { Box, Button, Grid, Sheet, Typography, useTheme } from "@mui/joy";
import React from "react";
import { SendDonationForm } from "./SendDonationForm";
import { useNavigate } from "react-router-dom";

const DonationPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Sheet>
      <Sheet
        sx={{
          height: "100px",
          background: theme.palette.background.level1,
        }}
      >
        <Grid sx={{ height: "100%", marginX: theme.spacing(8) }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
            <Box>
              <Typography
                sx={{
                  fontSize: theme.fontSize.xl4,
                  fontWeight: theme.fontWeight.lg,
                }}
              >
                Support the streamer
              </Typography>
            </Box>
            <Button onClick={() => navigate('/connect-wallet')}>Launch App</Button>
          </Box>
        </Grid>
      </Sheet>
      <SendDonationForm />
    </Sheet>
  );
};

export default DonationPage;

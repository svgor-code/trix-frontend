import React, { useEffect, useState } from "react";

import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AlertForm } from "./components/AlertForm";
import { Grid, Sheet, useTheme } from "@mui/joy";
import { useUserContext } from "src/providers/UserProvider";
import { IAlertSettings } from "src/types/user";
import { DEFAULT_ALERT_IMAGE } from "src/globals/alert";
import { AlertPreview } from "./components/AlertPreview";

const AlertSettingsPage = () => {
  const theme = useTheme();
  const { user, saveAlertSettings } = useUserContext();

  const [state, setState] = useState<IAlertSettings>({
    image: user?.alert.image || DEFAULT_ALERT_IMAGE,
    color_user: user?.alert.color_user || theme.palette.common.white,
    color_text: user?.alert.color_text || theme.palette.common.white,
    color_amount: user?.alert.color_amount || theme.palette.common.white,
    duration: 10,
  });

  useEffect(() => {
    if (user) {
      setState({
        image: user.alert.image || DEFAULT_ALERT_IMAGE,
        color_user: user.alert.color_user,
        color_text: user.alert.color_text,
        color_amount: user.alert.color_amount,
        duration: 10,
      });
    }
  }, [user]);

  return (
    <Sheet>
      <SettingsPageHeader title="Alert" description="Set up your alert." />
      <Grid
        container
        spacing={4}
        sx={{
          marginX: theme.spacing(8),
          paddingY: theme.spacing(4),
        }}
      >
        <Grid lg={5} md={12} xs={12}>
          <AlertForm
            user={user}
            state={state}
            setState={setState}
            saveAlertSettings={saveAlertSettings}
          />
        </Grid>
        <Grid lg={7} md={12} xs={12}>
          <AlertPreview
            image={state.image}
            color_user={state.color_user}
            color_text={state.color_text}
            color_amount={state.color_amount}
            duration={0}
          />
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default AlertSettingsPage;

import React, { useEffect, useState } from "react";

import { SettingsPageHeader } from "src/components/SettingsPageHeader";

import { AlertForm } from "./components/AlertForm";
import { Grid, Sheet, useTheme } from "@mui/joy";
import { useUserContext } from "src/providers/UserProvider";
import { IAlertSettings } from "src/types/user";
import { DEFAULT_ALERT_IMAGE } from "src/globals/alert";
import { AlertPreview } from "./components/AlertPreview";
import { useTranslation } from "react-i18next";

const AlertSettingsPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { user, alertSettings, saveAlertSettings } = useUserContext();

  const [state, setState] = useState<IAlertSettings>({
    id: alertSettings?.id || 0,
    image: alertSettings?.image || DEFAULT_ALERT_IMAGE,
    colorUser: alertSettings?.colorUser || theme.palette.common.white,
    colorText: alertSettings?.colorText || theme.palette.common.white,
    colorAmount: alertSettings?.colorAmount || theme.palette.common.white,
    duration: alertSettings?.duration || 10,
    showImage: alertSettings?.showImage || true,
    showUsername: alertSettings?.showUsername || true,
    showAmount: alertSettings?.showAmount || true,
    showMessage: alertSettings?.showMessage || true,
  });

  useEffect(() => {
    if (!alertSettings) {
      return;
    }

    setState({
      id: alertSettings.id,
      image: alertSettings.image || DEFAULT_ALERT_IMAGE,
      colorUser: alertSettings.colorUser,
      colorText: alertSettings.colorText,
      colorAmount: alertSettings.colorAmount,
      duration: alertSettings.duration || 10,
      showImage: alertSettings.showImage,
      showUsername: alertSettings.showUsername,
      showAmount: alertSettings.showAmount,
      showMessage: alertSettings.showMessage,
    });
  }, [user]);

  return (
    <>
      <SettingsPageHeader
        title={t("Alert")}
        description={t("Set up your alert")}
      />
      <Grid
        container
        spacing={4}
        sx={{
          marginX: theme.spacing(8),
          paddingY: theme.spacing(4),

          [theme.breakpoints.down("md")]: {
            marginX: theme.spacing(0),
          },
        }}
      >
        <Grid lg={6} md={12} xs={12}>
          <AlertForm
            user={user}
            state={state}
            setState={setState}
            saveAlertSettings={saveAlertSettings}
          />
        </Grid>
        <Grid lg={6} md={12} xs={12}>
          <AlertPreview
            id={state.id}
            image={state.image}
            colorUser={state.colorUser}
            colorText={state.colorText}
            colorAmount={state.colorAmount}
            duration={state.duration}
            showImage={state.showImage}
            showUsername={state.showUsername}
            showMessage={state.showMessage}
            showAmount={state.showAmount}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AlertSettingsPage;

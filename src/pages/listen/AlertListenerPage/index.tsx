import { Box, Sheet, Typography, useTheme } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserAlertSettings } from "src/api/user";
import { IAlertSettings } from "src/types/user";

export const AlertListenerPage = () => {
  const theme = useTheme();
  const { userId } = useParams<{ userId: string }>();
  const [settings, setSettings] = useState<IAlertSettings>({
    image: "https://media.tenor.com/cr1crWcl8KkAAAAi/reaction-funny.gif",
    color_amount: "#fff",
    color_user: "#fff",
    color_text: "#fff",
    duration: 10,
  });

  useEffect(() => {
    if (!userId) return;

    getUserAlertSettings(userId).then(({ data }) => {
      setSettings(data);
    });
  }, [userId]);

  const { image, color_amount, color_text, color_user } = settings;

  return (
    <Sheet
      sx={{
        background: "transparent",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <img style={{ width: "300px", height: "300px" }} src={image} />
        <Box display="flex" gap={1} alignItems="center" justifyContent="center">
          <Typography
            sx={{
              fontSize: theme.fontSize.xl2,
              fontWeight: theme.fontWeight.xl,
              color: color_amount,
              textAlign: "center",
            }}
          >
            300 ETH
          </Typography>

          <Typography
            sx={{
              fontSize: theme.fontSize.xl2,
              fontWeight: theme.fontWeight.xl,
              color: color_user,
              textAlign: "center",
            }}
          >
            - @username
          </Typography>
        </Box>

        <Box sx={{ width: "300px" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: theme.fontWeight.md,
              color: color_text,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere iste
            consequatur eveniet cupiditate blanditiis.
          </Typography>
        </Box>
      </Box>
    </Sheet>
  );
};

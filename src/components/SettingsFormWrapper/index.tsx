import { Sheet, useColorScheme, useTheme } from "@mui/joy";
import React, { PropsWithChildren } from "react";

export const SettingsFormWrapper = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const { mode } = useColorScheme();

  return (
    <Sheet
      sx={{
        paddingY: theme.spacing(4),
        paddingX: theme.spacing(6),
        background:
          mode === "light"
            ? theme.palette.background.body
            : theme.palette.background.level1,
        borderRadius: theme.radius.lg,
        border: "1px solid",
        borderColor: theme.palette.neutral.outlinedBorder,
      }}
    >
      {children}
    </Sheet>
  );
};

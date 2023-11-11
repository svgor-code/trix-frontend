import { Sheet, useTheme } from "@mui/joy";
import React, { PropsWithChildren } from "react";
import { MainHeader } from "src/components/MainHeader";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  return (
    <Sheet>
      <MainHeader />
      <Sheet
        sx={{
          background: theme.palette.background.surface,
        }}
      >
        {children}
      </Sheet>
    </Sheet>
  );
};

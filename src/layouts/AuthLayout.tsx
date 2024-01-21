import React, { useEffect } from "react";
import { Sheet, useTheme } from "@mui/joy";
import { Outlet, useNavigate } from "react-router-dom";
import { MainHeader } from "src/components/MainHeader";
import { AuthProvider, useAuthContext } from "src/providers/AuthProvider";

export const AuthLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isConnected } = useAuthContext();

  useEffect(() => {
    if (!isConnected) {
      navigate("/connect-wallet");
    }
  }, [isConnected]);

  return (
    <Sheet>
      <MainHeader />
      <Sheet
        sx={{
          marginTop: "80px",
          background: theme.palette.background.surface,
        }}
      >
        <Outlet />
      </Sheet>
    </Sheet>
  );
};

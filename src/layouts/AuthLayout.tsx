import React, { useEffect } from "react";
import { Sheet, useTheme } from "@mui/joy";
import { Outlet, useNavigate } from "react-router-dom";
import { MainHeader } from "src/components/MainHeader";
import { AuthProvider } from "src/providers/AuthProvider";
import { useWalletContext } from "src/providers/WalletProvider";

export const AuthLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isConnected } = useWalletContext();

  useEffect(() => {
    if (!isConnected) {
      navigate("/connect-wallet");
    }
  }, [isConnected]);

  return (
    <AuthProvider>
      <Sheet>
        <MainHeader />
        <Sheet
          sx={{
            marginTop: "80px",
            height: '100%',
            background: theme.palette.background.body,
          }}
        >
          <Outlet />
        </Sheet>
      </Sheet>
    </AuthProvider>
  );
};

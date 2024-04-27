import { createBrowserRouter } from "react-router-dom";

import { DashboardPage } from "./pages/auth/DashboardPage";
import AlertSettingsPage from "./pages/auth/AlertSettingsPage";
import DonationSettingsPage from "./pages/auth/DonationSettingsPage";
import { AlertListenerPage } from "./pages/listen/AlertListenerPage";
import { WalletConnectionPage } from "./pages/unauth/WalletConnectionPage";

import { AuthLayout } from "./layouts/AuthLayout";
import DonationPage from "./pages/unauth/DonationPage";


export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "alert",
        Component: AlertSettingsPage,
      },
      {
        path: "donation",
        Component: DonationSettingsPage,
      },
    ],
  },
  {
    path: "/connect-wallet",
    Component: WalletConnectionPage,
  },
  {
    id: 'listeners',
    path: "/l",
    Component: AlertListenerPage
  },
  {
    id: "send-donation",
    path: "/d",
    Component: DonationPage,
  },
  {
    path: "/disconnect",
  },
]);

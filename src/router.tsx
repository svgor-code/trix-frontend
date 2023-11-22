import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import { DashboardPage } from "./pages/auth/DashboardPage";
import AlertSettingsPage from './pages/auth/AlertSettingsPage';
import DonationSettingsPage from './pages/auth/DonationSettingsPage';
import { AlertListenerPage } from './pages/listen/AlertListenerPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />
  },
  {
    path: '/alert',
    element: <AlertSettingsPage />
  },
  {
    path: '/donation',
    element: <DonationSettingsPage />
  },
  {
    path: '/l',
    element: <AlertListenerPage />
  }
])
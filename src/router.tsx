import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import { DashboardPage } from "./pages/auth/DashboardPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />
  }
])
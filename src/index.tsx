import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import GlobalStyles from "@mui/joy/GlobalStyles";
import { ToastContainer } from "react-toastify";

import { injectStyle as ReactToastifyCss } from "react-toastify/dist/inject-style";
import "@fontsource/inter";

import { router } from "./router";
import { WalletProvider } from "./providers/WalletProvider";

import './i18n';

import './index.scss';

ReactToastifyCss();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = extendTheme({
  components: {
    JoyInput: {
      styleOverrides: {
        root: {
          paddingTop: "12px",
          paddingBottom: "12px",
        },
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "50": "#fbe9e7",
          "100": "#ffccbc",
          "200": "#ffab91",
          "300": "#ff8a65",
          "400": "#ff7043",
          "500": "#ff5722",
          "600": "#f4511e",
          "700": "#e64a19",
          "800": "#d84315",
          "900": "#bf360c",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          "50": "#fbe9e7",
          "100": "#ffccbc",
          "200": "#ffab91",
          "300": "#ff8a65",
          "400": "#ff7043",
          "500": "#ff5722",
          "600": "#f4511e",
          "700": "#e64a19",
          "800": "#d84315",
          "900": "#bf360c",
        },
      },
    },
  },
  fontFamily: {
    display: "Montserrat, var(--joy-fontFamily-fallback)",
    body: "Montserrat, var(--joy-fontFamily-fallback)",
  },
});

root.render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme} defaultMode="dark">
    <GlobalStyles
      styles={{
        svg: {
          color: "var(--Icon-color)",
          margin: "var(--Icon-margin)",
          fontSize: "var(--Icon-fontSize, 20px)",
        },
      }}
    />
    <CssBaseline />
    <ToastContainer />
    <WalletProvider>
      <RouterProvider router={router} />
    </WalletProvider>
  </CssVarsProvider>
  // </React.StrictMode>
);

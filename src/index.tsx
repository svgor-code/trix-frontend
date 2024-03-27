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
import { AuthProvider } from "./providers/AuthProvider";
import { WalletProvider } from "./providers/WalletProvider";

ReactToastifyCss();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // affects all Joy components that has `color="primary"` prop.
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          // 300, 400, ..., 800,
          900: '#78350f',
        },
      },
    },
  },
  fontFamily: {
    display: 'Montserrat, var(--joy-fontFamily-fallback)',
    body: 'Montserrat, var(--joy-fontFamily-fallback)',
  },
});


root.render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <GlobalStyles
        styles={{
          svg: {
            color: "var(--Icon-color)",
            margin: "var(--Icon-margin)",
            fontSize: "var(--Icon-fontSize, 20px)",
            width: "1em",
            height: "1em",
          },
        }}
      />
      <CssBaseline />
      <ToastContainer />
      <WalletProvider>
        <RouterProvider router={router} />
      </WalletProvider>
    </CssVarsProvider>
  </React.StrictMode>
);

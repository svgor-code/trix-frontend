import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button, Switch, useColorScheme, useTheme } from "@mui/joy";
import React, { useState } from "react";

export const ToggleTheme = () => {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();

  const dark = mode === 'dark';

  return (
    <Switch
      color={!dark ? 'warning' : 'neutral'}
      startDecorator={
        <SunIcon
          style={{ color: dark ? theme.palette.neutral.lightChannel : theme.palette.neutral.darkChannel }}
        />
      }
      endDecorator={
        <MoonIcon
          style={{ color: dark ? "primary.500" : "text.tertiary" }}
        />
      }
      checked={dark}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setMode(event.target.checked ? 'dark' : 'light')
      }
    />
  );
};

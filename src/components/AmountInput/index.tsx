import React from "react";
import { SelectToken } from "../SelectToken";
import { Input, useTheme } from "@mui/joy";

export const AmountInput = () => {
  const theme = useTheme();

  return (
    <Input
      sx={{
        height: '4rem',
        fontWeight: 500,
        fontSize: '1.875rem',
        borderRadius: theme.radius.lg,
      }}
      inputMode="decimal"
      type="text"
      placeholder="0.0"
      endDecorator={<SelectToken />}
    ></Input>
  );
};

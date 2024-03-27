import React, { useState } from "react";
import { SelectToken } from "../SelectToken";
import { Input, useTheme } from "@mui/joy";
import { useWalletContext } from "src/providers/WalletProvider";
import { IToken, networks } from "src/globals/networks";

export const AmountInput = () => {
  const theme = useTheme();
  const { network } = useWalletContext();
  const [selectedToken, setSelectedToken] = useState<IToken>(
    networks[network || Object.keys(networks)[1]].tokens[0]
  );

  return (
    <Input
      sx={{
        height: "4rem",
        fontWeight: 500,
        fontSize: "1.875rem",
        borderRadius: theme.radius.lg,
      }}
      inputMode="decimal"
      type="text"
      placeholder="0.0"
      endDecorator={
        <SelectToken
          selectedToken={selectedToken}
          onSelectToken={setSelectedToken}
        />
      }
    ></Input>
  );
};

import React, { useEffect, useState } from "react";
import { SelectToken } from "../SelectToken";
import { Box, Button, Input, Typography, useTheme } from "@mui/joy";
import { useWalletContext } from "src/providers/WalletProvider";
import { IToken, networks } from "src/globals/networks";
import { getPrices } from "src/api/prices";

type Props = {
  amount: number;
  setAmount: (amount: number) => void;
};

export const AmountInput = ({ amount, setAmount }: Props) => {
  const theme = useTheme();
  const { network } = useWalletContext();
  const [selectedToken, setSelectedToken] = useState<IToken>(
    networks[network || Object.keys(networks)[0]].tokens[0]
  );
  const [priceInDollars, setPriceInDollars] = useState<number>(0);

  useEffect(() => {
    getPrices(selectedToken.symbol).then((value) => setPriceInDollars(value));
  }, [selectedToken]);

  useEffect(() => {
    setSelectedToken(networks[network || Object.keys(networks)[0]].tokens[0]);
  }, [network]);

  return (
    <Box>
      <Input
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
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
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>${(priceInDollars * amount).toFixed(2)}</Typography>
            <SelectToken
              selectedToken={selectedToken}
              onSelectToken={setSelectedToken}
            />
          </Box>
        }
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={1}
        mt={1}
      >
        {[5, 10, 50].map((suggAmount) => (
          <Button
            key={suggAmount}
            variant="outlined"
            onClick={() => setAmount(suggAmount / priceInDollars)}
          >
            <Typography>${suggAmount}</Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

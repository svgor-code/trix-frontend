import { InboxIcon } from "@heroicons/react/24/outline";
import { Box, Skeleton, Table, Typography, useTheme } from "@mui/joy";
// import { TokenIcon } from "@token-icons/react";
import { ethers } from "ethers";
import React from "react";
import { networks as cNetworks } from "src/globals/networks";
import { IDonatItem } from "src/types/donation";

type Props = {
  donats: IDonatItem[];
  listLoading: boolean;
};

export const DonatsList = ({ donats, listLoading }: Props) => {
  const theme = useTheme();

  const getSymbol = (chainId: number, token: string) => {
    if (token === ethers.ZeroAddress) {
      return cNetworks[chainId].tokens[0].symbol;
    }

    return (
      cNetworks[chainId].tokens.find((item) => item.address === token)
        ?.symbol || ""
    );
  };

  return (
    <Box sx={{ overflowY: "scroll" }}>
      {!donats.length && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            "& svg": { width: "40px", height: "40px" },
          }}
        >
          <InboxIcon />
          <Typography fontSize={theme.fontSize.md}>No data</Typography>
        </Box>
      )}

      {donats.map((donat) => (
        <Box
          key={donat.transactionHash}
          sx={{
            padding: "20px",
            borderRadius: "10px",
            background: theme.palette.neutral[900],
            marginBottom: "10px",
            position: "relative",
          }}
        >
          <Typography>
            <b>{donat.username || "Anonim"}</b> donated{" "}
            <b>
              {donat.amount} {getSymbol(donat.chainId, donat.token)}
            </b>{" "}
            ($
            {donat.amountInDollars})
          </Typography>
          {donat.message && (
            <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>
              {donat.message}
            </Typography>
          )}

          <Box
            sx={{
              gap: "5px",
              position: "absolute",
              top: "5px",
              right: "10px",
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              {new Date(donat.timestamp * 1000).toLocaleTimeString("es")}{" "}
              {new Date(donat.timestamp * 1000).toLocaleDateString("es")}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

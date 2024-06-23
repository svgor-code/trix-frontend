import { Box, Skeleton, Table, Typography, useTheme } from "@mui/joy";
import { TokenIcon } from "@token-icons/react";
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
      cNetworks[chainId].tokens.find((item) => item.address === token)?.symbol ||
      ""
    );
  };

  return (
    <Table borderAxis="bothBetween">
      <thead>
        <tr>
          <th>From / Message</th>
          <th>Amount</th>
          <th>Network</th>
          <th>Date / Time</th>
        </tr>
      </thead>
      <tbody>
        {donats.length === 0 && (
          <>
            <tr>
              <td colSpan={4} rowSpan={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="300px"
                >
                  NO DATA
                </Box>
              </td>
            </tr>
          </>
        )}
        {donats
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((donat) => (
            <tr key={donat.transactionHash}>
              <td>
                <Box display="flex" flexDirection="column">
                  <Box>
                    <Typography
                      sx={{
                        fontSize: theme.fontSize.md,
                        fontWeight: theme.fontWeight.md,
                      }}
                    >
                      From:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: theme.fontSize.md,
                        fontWeight: theme.fontWeight.sm,
                      }}
                    >
                      {donat.username || "-"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: theme.fontSize.md,
                        fontWeight: theme.fontWeight.md,
                      }}
                    >
                      Message:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: theme.fontSize.md,
                        fontWeight: theme.fontWeight.sm,
                      }}
                    >
                      {donat.message || "-"}
                    </Typography>
                  </Box>
                </Box>
              </td>
              <td>
                <Box display="flex" alignItems="center">
                  <TokenIcon
                    symbol={getSymbol(donat.chainId, donat.token)}
                    variant="branded"
                    size={24}
                  />
                  {donat.amount}
                  <Typography
                    sx={{ marginLeft: 1, color: theme.palette.neutral[100] }}
                  >
                    (${donat.amountInDollars})
                  </Typography>
                </Box>
              </td>
              <td style={{ textTransform: "capitalize" }}>{donat.network}</td>
              <td>
                <Box>
                  <Typography>
                    {new Date(donat.timestamp * 1000).toLocaleTimeString()}
                  </Typography>
                  <Typography>
                    {new Date(donat.timestamp * 1000).toLocaleDateString()}
                  </Typography>
                </Box>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

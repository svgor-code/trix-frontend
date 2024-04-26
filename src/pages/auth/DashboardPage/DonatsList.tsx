import { Box, Skeleton, Table } from "@mui/joy";
import { TokenIcon } from "@token-icons/react";
import { ethers } from "ethers";
import React from "react";
import { networks } from "src/globals/networks";
import { IDonatItem } from "src/types/donation";

type Props = {
  donats: IDonatItem[];
  listLoading: boolean;
};

export const DonatsList = ({ donats, listLoading }: Props) => {
  const getSymbol = (network: string, token: string) => {
    if (token === ethers.ZeroAddress) {
      return networks[network].tokens[0].symbol;
    }

    return (
      networks[network].tokens.find((item) => item.address === token)?.symbol ||
      ""
    );
  };

  if (!donats?.length && listLoading) {
    return <Skeleton variant="rectangular" width="100%" height="300px" />;
  }

  return (
    <Table borderAxis="both">
      <thead>
        <tr>
          <th>From</th>
          <th>Message</th>
          <th>Amount</th>
          <th>Network</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {donats.map((donat) => (
          <tr key={donat.transactionHash}>
            <td>{donat.username || "-"}</td>
            <td>{donat.message || "-"}</td>
            <td>
              <Box display="flex" alignItems="center">
                {donat.amount}
                <TokenIcon
                  symbol={getSymbol(donat.network, donat.token)}
                  variant="branded"
                  size={24}
                />
              </Box>
            </td>
            <td style={{ textTransform: "capitalize" }}>{donat.network}</td>
            <td>{new Date(donat.timestamp * 1000).toLocaleTimeString()}</td>
            <td>{new Date(donat.timestamp * 1000).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

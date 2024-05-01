import {
  Box,
  CircularProgress,
  Dropdown,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  useColorScheme,
  useTheme,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { getDonats } from "src/api/dashboard";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";
import { useWalletContext } from "src/providers/WalletProvider";
import { IDonatItem } from "src/types/donation";
import {
  convertStringToWei,
  convertWeiToEther,
  exchangeCryptoToFiat,
} from "src/utils/currency";
import { DonatsList } from "./DonatsList";
import { JsonRpcSigner, Signer, ethers } from "ethers";
import { toast } from "react-toastify";
import { DonatsDiagram } from "./DonatsDiagram";
import { getCoinPrice, getPrices } from "src/api/prices";
import { networks } from "src/globals/networks";
import { useAuthContext } from "src/providers/AuthProvider";

export enum Period {
  LAST_HOUR,
  LAST_24_HOURS,
  LAST_WEEK,
  ALL,
}

const PeriodStringMap: Record<Period, string> = {
  [Period.LAST_HOUR]: "Last hour",
  [Period.LAST_24_HOURS]: "Last 24 hours",
  [Period.LAST_WEEK]: "Last week",
  [Period.ALL]: "All",
};

const getAmountInDollars = (
  symbol: string | undefined,
  amount: string,
  prices: { price: number; symbol: string }[]
) => {
  const priceInDollars = prices.find((i) => i.symbol === symbol)?.price;

  if (!priceInDollars) return "0.00";

  return exchangeCryptoToFiat(priceInDollars, convertStringToWei(amount));
};

export const DashboardPage = () => {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const { signer } = useWalletContext();
  const { isAuthenticated } = useAuthContext();
  const [donats, setDonats] = useState<IDonatItem[]>([]);
  const [period, setPeriod] = useState<Period>(Period.LAST_24_HOURS);
  const [listLoading, setListLoading] = useState(false);

  const fetchDonatsList = async (signer: JsonRpcSigner) => {
    try {
      const [records, coinsPrices] = await Promise.all([
        getDonats(signer.address, period),
        getPrices(),
      ]);

      setDonats(
        records.map((record) => {
          const symbol =
            record.token !== ethers.ZeroAddress
              ? networks[record.network].tokens.find(
                  (i) => i.address === record.token
                )?.symbol
              : networks[record.network].tokens[0].symbol;

          return {
            ...record,
            amount: convertWeiToEther(convertStringToWei(record.amount)),
            timestamp: record.timestamp,
            amountInDollars: Number(
              getAmountInDollars(symbol, record.amount, coinsPrices)
            ),
          };
        })
      );
    } catch (error) {
      toast(`Fetch list error: ${error}`, {
        type: "error",
        theme: mode,
        position: "bottom-center",
      });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    if (!signer?.address || !isAuthenticated) {
      return;
    }

    setListLoading(true);
    fetchDonatsList(signer);

    const loopingInterval = setInterval(() => {
      fetchDonatsList(signer);
    }, 60000);

    return () => {
      clearInterval(loopingInterval);
    };
  }, [signer, period, isAuthenticated]);

  return (
    <Sheet
      sx={{
        height: "100px",
      }}
    >
      <SettingsPageHeader
        title="Dashboard"
        description="Watch your statistics."
        rightElement={
          <Dropdown>
            <MenuButton>{PeriodStringMap[period]}</MenuButton>
            <Menu>
              <MenuItem onClick={() => setPeriod(Period.LAST_HOUR)}>
                {PeriodStringMap[Period.LAST_HOUR]}
              </MenuItem>
              <MenuItem onClick={() => setPeriod(Period.LAST_24_HOURS)}>
                {PeriodStringMap[Period.LAST_24_HOURS]}
              </MenuItem>
              <MenuItem onClick={() => setPeriod(Period.LAST_WEEK)}>
                {PeriodStringMap[Period.LAST_WEEK]}
              </MenuItem>
              {/* <MenuItem onClick={() => setPeriod(Period.ALL)}>
                {PeriodStringMap[Period.ALL]}
              </MenuItem> */}
            </Menu>
          </Dropdown>
        }
      />
      <Box display="flex">
        <Sheet
          sx={{
            width: "50%",
            marginY: theme.spacing(4),
            marginLeft: theme.spacing(8),
            marginRight: theme.spacing(2),
            borderRadius: theme.spacing(2),
            display: listLoading ? "flex" : "block",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {listLoading ? (
            <CircularProgress />
          ) : (
            <DonatsList donats={donats} listLoading={listLoading} />
          )}
        </Sheet>
        <Sheet
          sx={{
            width: "50%",
            height: "350px",
            marginY: theme.spacing(4),
            marginRight: theme.spacing(8),
            marginLeft: theme.spacing(2),
            borderRadius: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {listLoading ? (
            <CircularProgress />
          ) : (
            <DonatsDiagram
              donats={donats}
              period={period}
              listLoading={listLoading}
            />
          )}
        </Sheet>
      </Box>
    </Sheet>
  );
};

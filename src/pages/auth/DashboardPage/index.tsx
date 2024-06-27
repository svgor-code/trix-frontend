import {
  Box,
  CircularProgress,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Typography,
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
import { JsonRpcSigner, ethers } from "ethers";
import { toast as Toast } from "react-toastify";
import { DonatsDiagram } from "./DonatsDiagram";
import { getPrices } from "src/api/prices";
import { networks as cNetworks } from "src/globals/networks";
import { useAuthContext } from "src/providers/AuthProvider";
import { useTranslation } from "react-i18next";

export enum Period {
  LAST_HOUR,
  LAST_24_HOURS,
  LAST_WEEK,
  ALL,
}

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
  const { t } = useTranslation();
  const { mode } = useColorScheme();
  const { signer } = useWalletContext();
  const { isAuthenticated } = useAuthContext();
  const [donats, setDonats] = useState<IDonatItem[]>([]);
  const [period, setPeriod] = useState<Period>(Period.LAST_24_HOURS);
  const [listLoading, setListLoading] = useState(false);

  const PeriodStringMap: Record<Period, string> = {
    [Period.LAST_HOUR]: t("Last hour"),
    [Period.LAST_24_HOURS]: t("Last 24 hours"),
    [Period.LAST_WEEK]: t("Last week"),
    [Period.ALL]: "All",
  };

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
              ? cNetworks[record.chainId].tokens.find(
                  (i) => i.address === record.token
                )?.symbol
              : cNetworks[record.chainId].tokens[0].symbol;

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
      Toast(`Fetch list error: ${error}`, {
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
        title={t("Dashboard")}
        description={t("Watch your statistics")}
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
            </Menu>
          </Dropdown>
        }
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingX: "20px",
          alignItems: "flex-start",
          gap: "20px",
          marginX: theme.spacing(4),
        }}
      >
        <Sheet
          sx={{
            width: "100%",
            height: "350px",
            marginY: theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background:
              mode === "light"
                ? theme.palette.background.body
                : theme.palette.background.level1,
            borderRadius: theme.radius.lg,
            border: "1px solid",
            borderColor: theme.palette.neutral.outlinedBorder,
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "15px",
              paddingTop: 0,
              borderBottom: `1px solid ${theme.palette.neutral.outlinedColor}`,
              borderColor: theme.palette.neutral.outlinedBorder,
              marginBottom: "15px",
            }}
          >
            <Typography
              sx={{ color: "#ffffff", fontSize: "16px", fontWeight: 500 }}
            >
              {t("Dynamics")}
            </Typography>
          </Box>
          {listLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DonatsDiagram
              donats={donats}
              period={period}
              listLoading={listLoading}
            />
          )}
        </Sheet>
        <Sheet
          sx={{
            width: "100%",
            marginY: theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            maxHeight: "800px",
            background:
              mode === "light"
                ? theme.palette.background.body
                : theme.palette.background.level1,
            borderRadius: theme.radius.lg,
            border: "1px solid",
            borderColor: theme.palette.neutral.outlinedBorder,
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "15px",
              paddingTop: 0,
              borderBottom: `1px solid ${theme.palette.neutral.outlinedColor}`,
              borderColor: theme.palette.neutral.outlinedBorder,
              marginBottom: "15px",
            }}
          >
            <Typography
              sx={{ color: "#ffffff", fontSize: "16px", fontWeight: 500 }}
            >
              {t("Last alerts")}
            </Typography>
          </Box>
          {listLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "800px",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DonatsList donats={donats} listLoading={listLoading} />
          )}
        </Sheet>
      </Box>
    </Sheet>
  );
};

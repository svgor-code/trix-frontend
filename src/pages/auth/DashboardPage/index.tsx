import {
  Dropdown,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  useTheme,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { getDonats } from "src/api/dashboard";
import { SettingsPageHeader } from "src/components/SettingsPageHeader";
import { useWalletContext } from "src/providers/WalletProvider";
import { IDonatItem } from "src/types/donation";
import { convertStringToWei, convertWeiToEther } from "src/utils/currency";
import { DonatsList } from "./DonatsList";
import { JsonRpcSigner, Signer } from "ethers";
import { toast } from "react-toastify";

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

export const DashboardPage = () => {
  const theme = useTheme();
  const { signer } = useWalletContext();
  const [donats, setDonats] = useState<IDonatItem[]>([]);
  const [period, setPeriod] = useState<Period>(Period.LAST_24_HOURS);
  const [listLoading, setListLoading] = useState(false);

  const fetchDonatsList = async (signer: JsonRpcSigner) => {
    try {
      const records = await getDonats(signer.address, period);

      setDonats(
        records.map((record) => ({
          ...record,
          amount: convertWeiToEther(convertStringToWei(record.amount)),
          timestamp: record.timestamp,
        }))
      );
    } catch (error) {
      toast(`Fetch list error: ${error}`, {
        type: "error",
      });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    if (!signer?.address) {
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
  }, [signer, period]);

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
              <MenuItem onClick={() => setPeriod(Period.ALL)}>
                {PeriodStringMap[Period.ALL]}
              </MenuItem>
            </Menu>
          </Dropdown>
        }
      />
      <Sheet
        sx={{
          marginY: theme.spacing(4),
          marginX: theme.spacing(8),
          borderRadius: theme.spacing(2),
        }}
      >
        <DonatsList donats={donats} listLoading={listLoading} />
      </Sheet>
    </Sheet>
  );
};

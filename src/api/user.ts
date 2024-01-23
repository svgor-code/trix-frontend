import { IAlertSettings } from "src/types/user";
import { instance } from "./config";

export const getUser = async (walletAddress: string) => {
  const res = await instance.get(`users/${walletAddress}`);
  return res.data;
};

export const updateAlertSettings = async (
  walletAddress: string,
  alertSettings: IAlertSettings
) => {
  const res = await instance.patch(`users/alert/${walletAddress}`, {
    ...alertSettings,
  });
  return res;
};

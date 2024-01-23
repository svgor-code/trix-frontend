import { IAlertSettings, IUserSettings } from "src/types/user";
import { instance } from "./config";

export const getUser = async (walletAddress: string) => {
  const res = await instance.get(`users/${walletAddress}`);
  return res.data;
};

export const updateUserSettings = async (
  walletAddress: string,
  userSettings: IUserSettings
) => {
  const res = await instance.patch(`users/${walletAddress}`, {
    ...userSettings,
  });
  return res;
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

import {
  IAlertSettings,
  IDonationPageSettings,
  IUser,
  IUserSettings,
} from "src/types/user";
import { instance } from "./config";

export const getUser = async (walletAddress: string) => {
  const res = await instance.get<IUser>(`users/${walletAddress}`);
  return res.data;
};

export const getAlertPageSettings = async (userId: number) => {
  const res = await instance.get<IAlertSettings>(`users/alert/${userId}`);
  return res.data;
};

export const getDonationPageSettings = async (userId: number) => {
  const res = await instance.get<IDonationPageSettings>(
    `users/donation-page/${userId}`
  );
  return res.data;
};

export const getUserById = async (userId: string) => {
  const res = await instance.get<IUser>(`users/id/${userId}`);
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

export const getUserAlertSettings = async (userId: string) => {
  const res = await instance.get(`users/alert/${userId}`);
  return res;
};

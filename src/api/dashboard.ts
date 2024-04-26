import { IDonatEventRecord } from "src/types/donation";
import { instance } from "./config";
import { Period } from "src/pages/auth/DashboardPage";

export const getDonats = async (walletAddress: string, period: Period) => {
  const res = await instance.get<IDonatEventRecord[]>(
    `donat/${walletAddress}?period=${period}`
  );
  return res.data;
};

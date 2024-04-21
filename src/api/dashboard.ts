import { IDonatEventRecord } from "src/types/donation";
import { instance } from "./config";

export const getDonats = async (walletAddress: string) => {
  const res = await instance.get<IDonatEventRecord[]>(`donat/${walletAddress}`);
  return res.data;
};
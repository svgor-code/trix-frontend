import { instance } from "./config";

export const getPrices = async (symbol: string) => {
  const res = await instance.get<number>(`prices/${symbol}`);
  return res.data;
};

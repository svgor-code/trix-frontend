import { instance } from "./config";

export const getCoinPrice = async (symbol: string) => {
  const res = await instance.get<number>(`prices/${symbol}`);
  return res.data;
};

export const getPrices = async () => {
  const res = await instance.get<{ price: number; symbol: string }[]>('prices');
  return res.data;
}
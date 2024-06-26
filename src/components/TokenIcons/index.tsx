import React from "react";

import ETH from "./tokens/ETH.svg";
import ARB from "./tokens/ARB.svg";
import USDC from "./tokens/USDC.svg";
import USDT from "./tokens/USDT.svg";
import BNB from "./tokens/BNB.svg";

import Arbitrum from "./networks/Arbitrum.svg";
import Binance from "./networks/Binance.svg";

const tokenIconsMap: Record<string, string> = {
  ETH,
  ARB,
  USDC,
  USDT,
  BNB,
};

const networkIconMap: Record<number, string> = {
  42161: Arbitrum,
  56: Binance,
};

export const TokenIcon = ({
  size,
  symbol,
}: {
  symbol: string;
  size: number;
}) => {
  return <img src={tokenIconsMap[symbol]} width={size} height={size} />;
};

export const NetworkIcon = ({
  chainId,
  size,
}: {
  chainId: number;
  size: number;
}) => {
  return <img src={networkIconMap[chainId]} width={size} height={size} />;
};

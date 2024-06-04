export interface ISendDonation {
  username: string;
  message: string;
  amount: bigint;
  network: number;
}

export interface IDonatEventRecord {
  amount: string;
  createdAt: string;
  from: string;
  message: string;
  to: string;
  to_username_index: string;
  transactionHash: string;
  timestamp: number;
  updatedAt: string;
  username: string;
  network: string;
  token: string;
  chainId: number;
}

export interface IDonatItem {
  amount: string;
  createdAt: string;
  from: string;
  message: string;
  to: string;
  timestamp: number;
  transactionHash: string;
  updatedAt: string;
  username: string;
  network: string;
  chainId: number;
  token: string;
  amountInDollars: number;
}

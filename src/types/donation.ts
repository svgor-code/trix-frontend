export interface ISendDonation {
  username: string;
  message: string;
  amount: bigint;
  network: string;
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
}

export interface IDonatItem {
  amount: string;
  createdAt: string;
  from: string;
  message: string;
  to: string;
  timestamp: string;
  transactionHash: string;
  updatedAt: string;
  username: string;
}

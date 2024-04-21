import { Sheet, Table } from '@mui/joy';
import React from 'react';
import { IDonatItem } from 'src/types/donation';

type Props = {
  donats: IDonatItem[];
}

export const DonatsList = ({ donats }: Props) => {

  return (
    <Sheet>
      <Table>
        <thead>
          <tr>
            <th>From</th>
            <th>Amount</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {donats.map((donat) => (
            <tr key={donat.transactionHash}>
              <td>{donat.username}</td>
              <td>{donat.amount}</td>
              <td>{donat.message}</td>
              <td>{donat.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
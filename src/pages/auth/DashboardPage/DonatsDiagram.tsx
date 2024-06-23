import { Box, CircularProgress, Skeleton, useTheme } from "@mui/joy";
import React, { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { IDonatItem } from "src/types/donation";
import { Period } from ".";

type Props = {
  donats: IDonatItem[];
  period: Period;
  listLoading: boolean;
};

export const DonatsDiagram = ({ donats, period, listLoading }: Props) => {
  const theme = useTheme();

  const { palette } = theme;

  const getDateByPeriod = (timestamp: number) => {
    if (period === Period.LAST_HOUR || period === Period.LAST_24_HOURS) {
      const time = new Date(timestamp * 1000).toLocaleTimeString();

      const [hour, minuts] = time.split(":");
      const [_, dayPeriod] = time.split(" ");
      return dayPeriod ? `${hour}:${minuts} ${dayPeriod}` : `${hour}:${minuts}`;
    }

    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const lineChartData = useMemo(() => {
    return Object.values(
      donats
        .sort((a, b) => a.timestamp - b.timestamp)
        .reduce<Record<string, IDonatItem & { date: string }>>((acc, donat) => {
          const date = getDateByPeriod(donat.timestamp);

          return {
            ...acc,
            [date]: {
              ...(acc[date] || {}),
              date: date,
              amountInDollars:
                (acc[date]?.amountInDollars || 0) + donat.amountInDollars,
            },
          };
        }, {})
    );
  }, [donats, period]);

  return (
    <Box width="100%" height="300px">
      {donats.length === 0 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          NO DATA
        </Box>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={lineChartData}
          margin={{
            top: 0,
            right: 0,
            left: -12,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke={theme.palette.divider} strokeDasharray="3 3"/>
          <XAxis
            dataKey="date"
            strokeWidth={0}
            fontSize={11}
            dy={13}
            interval="preserveStartEnd"
          />
          <YAxis
            dataKey="amountInDollars"
            tickLine={false}
            tick={{ fontSize: 12, color: "#6C6B6B" }}
            fontSize={11}
            interval="preserveStartEnd"
            tickFormatter={(value) => `$${value}`}
          />
          <Area
            type="monotone"
            dataKey="amountInDollars"
            label="Amount"
            fill="url(#colorAmountInDollars)"
            stroke={palette.primary[500]}
            strokeWidth={1.4}
            dot={(props) => {
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={3}
                  style={{
                    boxShadow: `0px 1.7px 4.8px ${palette.primary[500]}`,
                  }}
                  stroke={palette.primary[500]}
                  strokeWidth={2}
                  fill={palette.primary[500]}
                />
              );
            }}
          />
          <defs>
            <linearGradient
              id="colorAmountInDollars"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={palette.primary[500]}
                stopOpacity={0.46}
              />
              <stop
                offset="79%"
                stopColor={palette.primary[500]}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorSecond" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={palette.primary[500]}
                stopOpacity={0.46}
              />
              <stop
                offset="79%"
                stopColor={palette.primary[500]}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

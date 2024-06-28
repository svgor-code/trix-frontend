import { Box, CircularProgress, Skeleton, useTheme } from "@mui/joy";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { IDonatItem } from "src/types/donation";
import { Period } from ".";

type Props = {
  donats: IDonatItem[];
  period: Period;
  listLoading: boolean;
};

const TEN_MINUTES = 1000 * 60 * 10;
const ONE_HOUR = TEN_MINUTES * 6;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;

const getDateByPeriod = (period: Period, timestamp: number) => {
  if (period === Period.LAST_HOUR || period === Period.LAST_24_HOURS) {
    const time = new Date(timestamp).toLocaleTimeString();

    const [hour, minuts] = time.split(":");
    const [_, dayPeriod] = time.split(" ");
    return dayPeriod ? `${hour}:${minuts} ${dayPeriod}` : `${hour}:${minuts}`;
  }

  return new Date(timestamp)
    .toLocaleDateString("es")
    .split("/")
    .splice(0, 2)
    .join("/");
};

const getPeriodMinDate = (period: Period) => {
  if (period === Period.LAST_HOUR) {
    return ONE_HOUR;
  } else if (period === Period.LAST_24_HOURS) {
    return ONE_DAY;
  } else if (period === Period.LAST_WEEK) {
    return ONE_WEEK;
  } else {
    return ONE_WEEK;
  }
};

const generatePeriodDraft = (period: Period) => {
  let subtractedTimeOnStep = 0;
  let countOfSteps = 0;
  const nowInMilliseconds = new Date().getTime();

  if (period === Period.LAST_HOUR) {
    subtractedTimeOnStep = TEN_MINUTES;
    countOfSteps = 6;
  } else if (period === Period.LAST_24_HOURS) {
    subtractedTimeOnStep = ONE_HOUR;
    countOfSteps = 24;
  } else if (period === Period.LAST_WEEK) {
    subtractedTimeOnStep = ONE_DAY;
    countOfSteps = 7;
  } else {
    subtractedTimeOnStep = ONE_DAY;
    countOfSteps = 7;
  }

  return new Array(countOfSteps).fill({}).reduce((acc, _, index) => {
    const timestamp = nowInMilliseconds - subtractedTimeOnStep * index;
    const date = getDateByPeriod(period, timestamp);

    return {
      ...acc,
      [date]: {
        date,
        timestamp,
        amountInDollars: 0,
      },
    };
  }, {});
};

export const DonatsDiagram = ({ donats, period, listLoading }: Props) => {
  const theme = useTheme();

  const { palette } = theme;

  const chartData = useMemo(() => {
    const generatedData = structuredClone(generatePeriodDraft(period));
    const currentTimestamp = new Date().getTime();
    const minDate = getPeriodMinDate(period);

    donats
      .filter((donat) => currentTimestamp - minDate < donat.timestamp * 1000)
      .forEach((donat) => {
        const date = getDateByPeriod(period, donat.timestamp * 1000);

        generatedData[date] = {
          ...generatedData[date],
          date: date,
          timestamp: donat.timestamp * 1000,
          amountInDollars:
            donat.amountInDollars + (generatedData[date]?.amountInDollars || 0),
        };
      }, {});

    return Object.values(generatedData).sort(
      (a: any, b: any) => a.timestamp - b.timestamp
    );
  }, [period]);

  return (
    <Box width="100%" height="300px">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke={theme.palette.divider} strokeDasharray="3 3" />
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

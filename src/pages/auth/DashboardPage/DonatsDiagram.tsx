import { Box, useTheme } from "@mui/joy";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { IDonatItem } from "src/types/donation";

type Props = {
  donats: IDonatItem[];
};

export const DonatsDiagram = ({ donats }: Props) => {
  const theme = useTheme();

  const { palette } = theme;

  return (
    <Box width="100%" height="240px">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={donats}
          margin={{
            top: 0,
            right: 0,
            left: -12,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="timestamp"
            strokeWidth={0}
            fontSize={11}
            dy={13}
            interval="preserveStartEnd"
            tickFormatter={(value) => new Date(value * 1000).toLocaleDateString()}
          />
          <YAxis
            dataKey="amount"
            tickLine={false}
            tick={{ fontSize: 12, color: "#6C6B6B" }}
            fontSize={11}
            interval="preserveStartEnd"
          />
          <Area
            type="monotone"
            dataKey="visits"
            label="Visits"
            fill="url(#colorVisits)"
            stroke={palette.primary.mainChannel}
            strokeWidth={1.4}
            activeDot={(props) => {
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={3}
                  style={{
                    boxShadow: `0px 1.7px 4.8px ${palette.primary.mainChannel}`,
                  }}
                  stroke={palette.primary.mainChannel}
                  strokeWidth={2}
                  fill="#ffffff"
                />
              );
            }}
          />
          <defs>
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={palette.primary.mainChannel}
                stopOpacity={0.46}
              />
              <stop
                offset="79%"
                stopColor={palette.primary.mainChannel}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorSecond" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={palette.primary.mainChannel}
                stopOpacity={0.46}
              />
              <stop
                offset="79%"
                stopColor={palette.primary.mainChannel}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

// ChartCard.tsx  ✅ GÜNCELLENDİ
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./ChartCard.module.css";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectDailyPost } from "../../features/dailyPostSlice";

const ChartCard = () => {
  const { data } = useSelector(selectDailyPost);

  const chartData = useMemo(
    () =>
      data.map((d) => ({
        name: d.day.slice(5),
        posts: d.count,
        full: d.day,
      })),
    [data]
  );

  const chart = useChart({
    data: chartData,
    series: [{ name: "posts", color: "#4641E0" }],
  });

  return (
    <div className={styles.group1}>
      <div className={styles.graph}>
        <Chart.Root
          width={1165.0762939453125}
          height={244.6275634765625}
          chart={chart}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart accessibilityLayer data={chart.data}>
              {chart.series.map((item) => (
                <defs key={item.name}>
                  <Chart.Gradient
                    id={`${item.name}-gradient`}
                    stops={[
                      { offset: "0%", color: item.color, opacity: 1 },
                      { offset: "100%", color: item.color, opacity: 0.01 },
                    ]}
                  />
                </defs>
              ))}

              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />

              <Tooltip
                labelFormatter={(_label, payload) =>
                  payload?.[0]?.payload?.full ?? ""
                }
                formatter={(val: number) => [Number(val), "Posts"]}
              />

              {chart.series.map((item) => (
                <Area
                  activeDot={{ stroke: chart.color("bg") }}
                  key={item.name}
                  isAnimationActive={false}
                  dataKey={chart.key(item.name)}
                  fill={chart.color(item.color)}
                  fillOpacity={0.2}
                  stroke={chart.color(item.color)}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </Chart.Root>
      </div>
    </div>
  );
};

export default ChartCard;

// DashboardChart.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DashboardChart.module.css";
import ChartButton from "../Atom/ChartButton";
import ChartCard from "../Atom/ChartCard";
import {
  selectDailyPost,
  setDailyPostMonth,
} from "../../features/dailyPostSlice";
import { getDailyPosts } from "../../features/dailyPostThunk";
import type { AppDispatch } from "../../app/store";

const DashboardChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { month, loading } = useSelector(selectDailyPost);

  useEffect(() => {
    const p = dispatch(getDailyPosts({ month }));
    return () => {
      p.abort(); 
    };
  }, [dispatch, month]);

  return (
    <div className={styles.frame48}>
      <ChartButton
        value={month}
        onChange={(m) => dispatch(setDailyPostMonth(m))}
      />
      {loading ? <div>Loading…</div> : <ChartCard />}
    </div>
  );
};

export default DashboardChart;

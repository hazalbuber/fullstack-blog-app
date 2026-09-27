import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hook";
import { selectStats } from "../../../features/statsSlice";

import {
  getCommentCount,
  getLikeCount,
  getPostCount,
  getUserCount,
} from "../../../features/statsThunk";
import StatsCards from "../../../components/Molecules/StatsCards";
import DashboardChart from "../../../components/Molecules/DashboardChart";
import PostsTable from "../../../components/Molecules/PostsTable";
import styles from "./Dashboard.module.css";
import Navbar from "../../../components/MainLayout/NavbarDashboard/Navbar";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { postCount, commentCount, userCount, likeCount } =
    useSelector(selectStats);

  useEffect(() => {
    dispatch(getPostCount());
    dispatch(getCommentCount());
    dispatch(getUserCount());
    dispatch(getLikeCount());
  }, [dispatch]);

  // Memorize stats data to prevent unnecessary re-renders
  const statsData = useMemo(
    () => [
      { title: "Total User", value: userCount },
      { title: "Total Post", value: postCount },
      { title: "Total Comment", value: commentCount },
      { title: "Total Like", value: likeCount },
    ],
    [userCount, postCount, commentCount, likeCount]
  );

  return (
    <div>
      <Navbar />
      <div className={styles.frame46}>
        <h2 className={styles.header}>Dashboard</h2>

        <div className={styles.cards}>
          {statsData.map((stat, i) => (
            <StatsCards key={i} title={stat.title} value={stat.value} />
          ))}
        </div>

        <DashboardChart />
        <PostsTable />
      </div>
    </div>
  );
};

export default Dashboard;

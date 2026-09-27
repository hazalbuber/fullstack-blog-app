import React from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import MainLayout from "../../components/MainLayout/MainLayout";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <MainLayout />
    </div>
  );
};

export default Dashboard;

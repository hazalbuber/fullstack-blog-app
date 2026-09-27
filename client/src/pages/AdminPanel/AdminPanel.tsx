import React from "react";
import styles from "./AdminPanel.module.css";
import Dashboard from "../../components/Organisms/Dashboard/Dashboard";
import Sidebar from "../../components/Sidebar/Sidebar";

const AdminPanel = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar></Sidebar>
      <Dashboard></Dashboard>
    </div>
  );
};

export default AdminPanel;

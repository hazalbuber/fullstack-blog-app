import React from "react";
import styles from "./UserSetting.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingMain from "../../components/Settings/SettingMain";
import { useSelector } from "react-redux";

const selectUser = (state: any) => state.auth?.user;

const Dashboard = () => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <SettingMain user={user} />
    </div>
  );
};

export default Dashboard;

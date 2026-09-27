import React from "react";
import styles from "./SettingMain.module.css";
import Navbar from "../MainLayout/NavbarDashboard/Navbar";
import UserUpdate from "./Settings";

interface SettingMainProps {
  user: any;
}
const SettingMain = ({ user }: SettingMainProps) => {
  return (
    <div className={styles.mainLayout}>
      <Navbar></Navbar>
      <UserUpdate user={user} />
    </div>
  );
};

export default SettingMain;

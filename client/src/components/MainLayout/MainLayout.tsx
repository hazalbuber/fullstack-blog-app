import React from "react";
import Navbar from "./NavbarDashboard/Navbar";
import styles from "./MainLayout.module.css";
import CreateBox from "./CreateBox/CreateBox";

const MainLayout = () => {
  return (
    <div className={styles.mainLayout }>
      <Navbar></Navbar>
      <CreateBox></CreateBox>
    </div>
  );
};

export default MainLayout;

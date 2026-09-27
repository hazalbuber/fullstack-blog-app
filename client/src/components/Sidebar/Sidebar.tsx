import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo/LogoS";
import MenuList2 from "./MenuList/MenuList";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <MenuList2></MenuList2>
  
    </div>
  );
};

export default Sidebar;


 
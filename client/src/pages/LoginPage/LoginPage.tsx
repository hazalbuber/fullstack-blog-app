import React from "react";
import styles from "./LoginPage.module.css";
import LoginCard from "../../components/LoginCard/LoginCard";
import Top from "../../components/Top/Top";

const LoginPage = () => {

  
  return (
    <div className={styles.login}>
      <Top></Top>
      <LoginCard></LoginCard>
    </div>
  );
};

export default LoginPage;

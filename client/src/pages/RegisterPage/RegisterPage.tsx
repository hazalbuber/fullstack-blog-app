import React from "react";
import Top from "../../components/Top/Top";
import styles from "./RegisterPage.module.css";
import RegisterCard from "../../components/RegisterCard/RegisterCard";

const RegisterPage = () => {
  return (
    <div className={styles.register}>
      <div>
        <Top></Top>
        <RegisterCard></RegisterCard>
      </div>
    </div>
  );
};

export default RegisterPage;

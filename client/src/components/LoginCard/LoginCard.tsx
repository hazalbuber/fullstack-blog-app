import React from "react";
import styles from "./LoginCard.module.css";
import LoginBox from "../LoginBox/LoginBox";
import { Link } from "react-router-dom";

const LoginCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.text}>
          <p className={styles.text1}>
            Welcome to <span className={styles.color2}>LOREM</span>
          </p>
          <p className={styles.text2}>
            <span className={styles.color1}>No Account ?</span>
            <Link to="/register" className={styles.color2}>
              Sign up
            </Link>
          </p>
        </div>
        <h1 className={styles.header}>Sign in</h1>
      </div>

      <div className={styles.formWrap}>
        <LoginBox />
      </div>
    </div>
  );
};

export default LoginCard;

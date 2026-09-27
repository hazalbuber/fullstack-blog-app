import React from "react";
import styles from "./RegisterCard.module.css";
import RegisterBox from "../RegisterBox/RegisterBox";
import { Link } from "react-router-dom";

const RegisterCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.text}>
          <div className={styles.text1}>
            Welcome to <span className={styles.color2}>LOREM</span>
          </div>
          <div className={styles.text2}>
            <div className={styles.color1}>
              No Account ?
              <Link to="/login" className={styles.color2}>
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.header}>Sign up</div>
      </div>

      <div>
        <RegisterBox></RegisterBox>
      </div>
    </div>
  );
};

export default RegisterCard;

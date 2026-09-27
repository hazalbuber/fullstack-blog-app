import React from "react";
import styles from "./StatsCards.module.css";
import { Box } from "@chakra-ui/react";

type StatsCardsProps = {
  title: string;
  value: string | number;
};
const StatsCards = ({ title, value }: StatsCardsProps) => {
  return (
    <Box className={styles.frame42}>
      <div className={styles.frame40}>
        <div className={styles.frame39}>
          <h3 className={styles.totalUser}>{title}</h3>
          <span className={styles.total}>{value}</span>
        </div>
        <div className={styles.icon}>
          <svg
            width="61"
            height="60"
            viewBox="0 0 61 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.21"
              d="M37.5 0C50.2025 0 60.5 10.2975 60.5 23V37C60.5 49.7025 50.2025 60 37.5 60H23.5C10.7975 60 0.5 49.7025 0.5 37V23C0.5 10.2975 10.7975 0 23.5 0H37.5Z"
              fill="#908DEC"
            />
            <path
              opacity="0.587821"
              d="M38.4998 24.667C40.7089 24.667 42.4998 26.4579 42.4998 28.667C42.4996 30.876 40.7088 32.667 38.4998 32.667C36.2909 32.6668 34.4999 30.8759 34.4998 28.667C34.4998 26.458 36.2908 24.6672 38.4998 24.667ZM26.4998 18C29.4452 18 31.8336 20.3876 31.8337 23.333C31.8337 26.2785 29.4453 28.667 26.4998 28.667C23.5544 28.6668 21.1667 26.2784 21.1667 23.333C21.1669 20.3877 23.5545 18.0002 26.4998 18Z"
              fill="#908DEC"
            />
            <path
              d="M26.4774 31.3333C32.8611 31.3333 38.1061 34.3908 38.497 40.933C38.5125 41.1936 38.4966 42.0003 37.495 42.0003H15.4696C15.1351 41.9999 14.4727 41.2785 14.5009 40.932C15.0178 34.5687 20.1824 31.3334 26.4774 31.3333ZM37.9686 34.0023C42.5103 34.0521 46.2187 36.3469 46.4979 41.1996C46.5092 41.395 46.4977 42.0003 45.7743 42.0003H40.6337C40.6337 38.9996 39.6416 36.2304 37.9686 34.0023Z"
              fill="#908DEC"
            />
          </svg>
        </div>
      </div>
      <div className={styles.frame41}>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
              fill="#00AEEF"
            />
          </svg>
        </div>
        <div className={styles.text}>8.5% Up from yesterday</div>
      </div>
    </Box>
  );
};

export default StatsCards;

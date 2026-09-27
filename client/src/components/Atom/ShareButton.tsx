import React from "react";
import { IconButton, Text } from "@chakra-ui/react";
import styles from "./ShareButton.module.css";

const ShareButton = () => {
  return (
    <div>
      <IconButton className={styles.shareContainer}>
        <svg
          className={styles.icon}
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.3653 10.1347L1.47655 7.9125C0.803741 7.60668 0.832446 6.64138 1.52223 6.37608L13.7499 1.67313C14.4238 1.41392 15.086 2.07612 14.8268 2.75007L10.1239 14.9777C9.85858 15.6675 8.89328 15.6962 8.58746 15.0234L6.3653 10.1347ZM6.3653 10.1347L10.0192 6.48083"
            stroke="#9A9AB8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <Text className={styles.shareText}>204</Text>
      </IconButton>
    </div>
  );
};

export default ShareButton;

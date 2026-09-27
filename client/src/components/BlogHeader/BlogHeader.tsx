import React from "react";
import styles from "./BlogHeader.module.css";

const BlogHeader = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lorem ipsum dolor sit</h1>
      <div className={styles.textContainer}>
        <p className={styles.subtitle}>Lorem</p>
        <p className={styles.paragraph}>Lorem ipsum dolor sit amet consectetur. A mauris elit turpis arcu scelerisque egestas laoreet viverra quisque. Purus aliquam tellus eget euismod sit facilisis turpis.</p>
      </div>
    </div>
  );
};

export default BlogHeader;

import React from "react";
import styles from "./BlogDetail.module.css";
import BlogDeatilTemp from "../../components/Templates/BlogDeatilTemp";

const BlogDetail = () => {
  return (
    <div className={styles.blogDetail}>
      <BlogDeatilTemp />
    </div>
  );
};

export default BlogDetail;

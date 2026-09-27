import React from "react";
import styles from "./BlogDeleteUpdate.module.css";
import BlogDeleteUpdateBox from "./BlogDeleteUpdateBox/BlogDeleteUpdateBox";
import Navbar from "../MainLayout/NavbarDashboard/Navbar";

const BlogDeleteUpdate = ({ post }: { post: any }) => {
  return (
    <div className={styles.mainLayout}>
      <Navbar></Navbar>
      <BlogDeleteUpdateBox post={post} />
    </div>
  );
};

export default BlogDeleteUpdate;
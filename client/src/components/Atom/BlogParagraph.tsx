import React from "react";
import styles from "./BlogParagraph.module.css";
import { Text } from "@chakra-ui/react";

type BlogData = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  blog: BlogData;
};

const BlogParagraph = ({ blog }: Props) => {
  return (
    <div>
      <Text className={styles.mainHeading}>{blog.title}</Text>
      <div className={styles.mainFrame}>
        <div className={styles.frame}>
          <p className={styles.paragraph}>{blog.content} </p>
        </div>
      </div>
    </div>
  );
};


export default BlogParagraph;

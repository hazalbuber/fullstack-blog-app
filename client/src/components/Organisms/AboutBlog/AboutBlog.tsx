import BlogParagraph from "../../../components/Atom/BlogParagraph";
import LikeButton from "../../../components/Atom/LikeButton";
import ShareButton from "../../../components/Atom/ShareButton";
import styles from "./AboutBlog.module.css";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectPosts } from "../../../features/postSlice";
import { listAllPost } from "../../../features/postThunk";

const AboutBlog = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(listAllPost());
  }, [dispatch]);

  const post = posts.find((p) => String(p.id) === String(postId));
  if (!posts || posts.length === 0) {
    return <div>Posts loading..</div>;
  }
  return (
    <div className={styles.mainFrame}>
      <BlogParagraph blog={post} />

      <Box className={styles.frame}>
        <div className={styles.buttonsContianer}>
          <LikeButton postId={post.id} />
          <ShareButton></ShareButton>
        </div>

        <div className={styles.container}>
          <HStack>
            <div className={styles.dateContainer}>
              <h1 className={styles.dateHeading}>Publication Date</h1>
              <Text className={styles.dateText}>
                {new Date(post.createdAt).toLocaleString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </div>
            <div className={styles.autherContainer}>
              <h1 className={styles.autherHeading}>Author Name</h1>
              <Text className={styles.autherText}>
                {post?.author?.name} {post?.author?.surname}
              </Text>
            </div>
          </HStack>
        </div>

        <div className={styles.table}>
          <h1 className={styles.heading}>Table of Contents</h1>
          <Box className={styles.textContainer}>
            <li className={styles.text}>Lorem ipsum dolor sit amet</li>
            <li className={styles.text}>Lorem ipsum dolor sit amet</li>
            <li className={styles.text}>Lorem ipsum dolor sit amet</li>
            <li className={styles.text}> ...</li>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default AboutBlog;

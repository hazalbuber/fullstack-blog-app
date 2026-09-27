import CardMolecules from "../../Molecules/CardMolecules";
import { useDispatch, useSelector } from "react-redux";
import { listAllPost } from "../../../features/postThunk";
import { selectPosts } from "../../../features/postSlice";
import React, { useEffect } from "react";
import { IconButton, Text } from "@chakra-ui/react";
import styles from "./SimilarNews.module.css";

const SimilarNews = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(listAllPost());
  }, [dispatch]);

  return (
    <div className={styles.mainFrame}>
      <div className={styles.frame}>
        <span className={styles.container}>
          <h1 className={styles.heading}>Recent Blogs</h1>
          <IconButton
            type="button"
            onClick={() => {
              window.location.href = `/`;
            }}
            className={styles.button}
          >
            <Text className={styles.children}> View All Blogs</Text>
            <span className={styles.rightIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00016 2.66663C8.36835 2.66663 8.66683 2.9651 8.66683 3.33329V12.6666C8.66683 13.0348 8.36835 13.3333 8.00016 13.3333C7.63197 13.3333 7.3335 13.0348 7.3335 12.6666V3.33329C7.3335 2.9651 7.63197 2.66663 8.00016 2.66663Z"
                  fill="#1B1B60"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.86177 7.52864C3.12212 7.26829 3.54423 7.26829 3.80458 7.52864L7.99984 11.7239L12.1951 7.52864C12.4554 7.26829 12.8776 7.26829 13.1379 7.52864C13.3983 7.78899 13.3983 8.2111 13.1379 8.47145L8.47124 13.1381C8.21089 13.3985 7.78878 13.3985 7.52843 13.1381L2.86177 8.47145C2.60142 8.2111 2.60142 7.78899 2.86177 7.52864Z"
                  fill="#1B1B60"
                />
              </svg>
            </span>
          </IconButton>
        </span>

        <div className={styles.cardFrame}>
          {posts.slice(0, 3).map((post) => (
            <CardMolecules key={post.id} blog={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarNews;

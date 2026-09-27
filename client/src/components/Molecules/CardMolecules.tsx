import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import styles from "./Card.module.css";
import { Box, Button, Text } from "@chakra-ui/react";
import LikeButton from "../Atom/LikeButton";
import ShareButton from "../Atom/ShareButton";

type BlogData = {
  id: number;
  title: string;
};

type Props = {
  blog: BlogData;
};

const CardMolecules = ({ blog }: Props) => {
  return (
    <Box>
      <div>
        <div className={styles.image}></div>
      </div>

      <div>
        <div className={styles.textContainer}>
          <h1 className={styles.heading}>{blog.title}</h1>

          <Text className={styles.text}>Lorem</Text>
        </div>

        <div className={styles.subContainer}>
          <span className={styles.container}>
            <LikeButton postId={blog.id} />
            <ShareButton></ShareButton>
          </span>

          <span>
            <Button
              className={styles.button}
              type="button"
              onClick={() => {
                window.location.href = `/blog/${blog.id}`;
              }}
            >
              <GoArrowUpRight className={styles.rightIcon} />
              <Text className={styles.childeren}>Read More</Text>
            </Button>
          </span>
        </div>
      </div>
    </Box>
  );
};

export default CardMolecules;

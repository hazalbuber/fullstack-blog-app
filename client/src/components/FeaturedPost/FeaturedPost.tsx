import React from "react";
import styles from "./FeaturedPost.module.css";
import { Button, IconButton, Text } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";

const FeaturedPost = () => {
  return (
    <div className={styles.frame1}>
      <div className={styles.image}></div>

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.textContainer_heading}>
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p className={styles.textContainer_paragraph}>
            Lorem ipsum dolor sit amet consectetur. Viverra faucibus nulla elit
            eget bibendum. Tortor risus feugiat amet vitae sem urna viverra.
          </p>
        </div>

        <div className={styles.sub_container}>
          <div className={styles.textContainer1}>
            <h2 className={styles.textContainer1_heading}>Category</h2>
            <p className={styles.textContainer1_text}>Enviroment</p>
          </div>
          <div className={styles.textContainer2}>
            <h1 className={styles.textContainer2_headding}>Publication Date</h1>
            <p className={styles.textContainer2_text}>October 10,2023</p>
          </div>
          <div className={styles.textContainer3}>
            <h1 className={styles.textContainer2_headding}>Author</h1>
            <p className={styles.textContainer3_text}> Jane Smith</p>
          </div>
        </div>

        <div className={styles.sub_container2}>
          <div className={styles.container2}>
            <IconButton className={styles.container2_sub1}>
              <AiOutlineHeart className={styles.icon} />
              <Text className={styles.textColor}>14k</Text>
            </IconButton>

            <IconButton className={styles.container2_sub2}>
              <FaRegPaperPlane className={styles.icon} />
              <Text className={styles.textColor}>204</Text>
            </IconButton>
          </div>

          <div className={styles.button}>
            <Button className={styles.childeren}> Read More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;

//<FaRegPaperPlane />

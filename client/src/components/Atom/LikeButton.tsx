import React, { useEffect, useState } from "react";
import { IconButton, Text } from "@chakra-ui/react";
import styles from "./LikeButton.module.css";
import { useAppDispatch } from "../../app/hook";
import {
  createLike,
  deleteLike,
  likeCountPost,
  likePost,
} from "../../features/likeThunk";
import { useSelector } from "react-redux";
import { selectLikeCount } from "../../features/likeSlice";

type Props = {
  postId: number;
};

const LikeButton = ({ postId }: Props) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(likeCountPost({ id: postId }));
  }, [dispatch, postId]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const result = await dispatch(likePost({ id: postId }));
      if (likePost.fulfilled.match(result)) {
        setLiked(result.payload);
      }
    };
    fetchLikeStatus();
  }, [dispatch, postId]);

  const count = useSelector(selectLikeCount(postId));

  const handleLike = async () => {
    if (!liked) {
      await dispatch(createLike({ id: postId }));
      setLiked(true);
    } else {
      await dispatch(deleteLike({ id: postId }));
      setLiked(false);
    }
    dispatch(likeCountPost({ id: postId }));
  };

  return (
    <div>
      <IconButton className={styles.likeContainer} onClick={handleLike}>
        {liked ? (
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.497 29.6234L16.4878 29.6185L16.4557 29.6011C16.4284 29.5862 16.3893 29.5648 16.3392 29.5369C16.2391 29.481 16.0951 29.3993 15.9134 29.2923C15.55 29.0786 15.0353 28.7639 14.4196 28.3546C13.1902 27.5373 11.5476 26.336 9.90051 24.8006C6.64107 21.7622 3.1875 17.2481 3.1875 11.6875C3.1875 7.53942 6.6776 4.25 10.8906 4.25C13.3682 4.25 15.5866 5.38204 17 7.15643C18.4134 5.38204 20.6318 4.25 23.1094 4.25C27.3224 4.25 30.8125 7.53942 30.8125 11.6875C30.8125 17.2481 27.3589 21.7622 24.0995 24.8006C22.4524 26.336 20.8098 27.5373 19.5804 28.3546C18.9647 28.7639 18.45 29.0786 18.0866 29.2923C17.9049 29.3993 17.7609 29.481 17.6608 29.5369C17.6107 29.5648 17.5716 29.5862 17.5443 29.6011L17.5122 29.6185L17.503 29.6234L17.4991 29.6255C17.1874 29.791 16.8126 29.791 16.5009 29.6255L16.497 29.6234Z"
              fill="#FF5500"
            />
          </svg>
        ) : (
          <svg
            className={styles.icon}
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00008 2.58672C8.54235 1.95703 9.4805 1.25 10.909 1.25C13.407 1.25 15.0834 3.57813 15.0834 5.74609C15.0834 10.2781 9.39943 13.75 8.00008 13.75C6.60073 13.75 0.916748 10.2781 0.916748 5.74609C0.916748 3.57813 2.59314 1.25 5.09119 1.25C6.51966 1.25 7.45781 1.95703 8.00008 2.58672Z"
              stroke="#9A9AB8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <Text className={styles.likeText}>{count}</Text>
      </IconButton>
    </div>
  );
};

export default LikeButton;

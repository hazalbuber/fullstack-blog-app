import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllPost } from "../../features/postThunk";
import {
  selectLimit,
  selectLoading,
  selectPage,
  selectPosts,
} from "../../features/postSlice";
import styles from "./CardGrid.module.css";
import BlogCard from "./BlogCard";

const CardGrid = () => {
  const dispatch = useDispatch<any>();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);

  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);

  useEffect(() => {
    dispatch(listAllPost({ page, limit }));
  }, [dispatch, page, limit]);

  const postsArray = Array.isArray(posts) ? posts : [];

  if (loading) {
    return (
      <div className={styles.container}>
        <div>Loading posts...</div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {postsArray.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        postsArray.map((post) => <BlogCard key={post.id} blog={post} />)
      )}
    </div>
  );
};

export default CardGrid;

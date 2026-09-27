import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./BlogSetting.module.css";
import BlogDeleteUpdate from "../../components/BlogDeleteUpdate/BlogDeleteUpdate";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts } from "../../features/postSlice";
import { listAllPost } from "../../features/postThunk";

const BlogSetting = () => {
  const { postId } = useParams();
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(listAllPost({}));
    }
  }, [dispatch, posts]);

  const post = posts.find((p) => String(p.id) === String(postId));

  return (
    <div className={styles.blogDetail}>
      <Sidebar />
      <BlogDeleteUpdate post={post} />
    </div>
  );
};

export default BlogSetting;

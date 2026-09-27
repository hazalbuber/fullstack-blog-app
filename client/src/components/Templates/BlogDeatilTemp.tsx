import React, { useEffect } from "react";
import Navbar from "../Organisms/Navbar/Navbar";
import SimilarNews from "../Organisms/SimilarNews/SimilarNews";
import styles from "./BlogDetailTemp.module.css";
import AboutBlog from "../Organisms/AboutBlog/AboutBlog";
import CommentBox from "../Molecules/CommentArea";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../features/postSlice";
import { listAllPost } from "../../features/postThunk";

const BlogDeatilTemp = () => {
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

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <div className={styles.image}></div>

      <AboutBlog></AboutBlog>
      <Navbar></Navbar>
      <SimilarNews></SimilarNews>
      <CommentBox blog={post}></CommentBox>

    </div>
  );
};

export default BlogDeatilTemp;
 
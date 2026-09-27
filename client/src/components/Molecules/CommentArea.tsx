import React, { useEffect } from "react";
import Comment from "../Atom/Comment";
import { useDispatch, useSelector } from "react-redux";
import { selectComment, selectLoading } from "../../features/commentSlice";
import { listComment } from "../../features/commentThunk";
import CommnetCard from "../Atom/CommnetCard";
import styles from "./CommentArea.module.css";

type BlogData = {
  id: number;
};

type CommentData = {
  id: number;
  text: string;
  createdAt: string;
  author: {
    name?: string;
    surname?: string;
  };
  postId: number;
};

type Props = {
  blog: BlogData;
};

const CommentBox = ({ blog }: Props) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComment);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (blog.id) {
      dispatch(listComment({ id: blog.id }));
    }
  }, [dispatch, blog.id]);

  return (
    <div className={styles.frame}>
      <div className={styles.frame2}>
        <div className={styles.container}>
          <h3 className={styles.heading}> Comments </h3>
        </div>
        <Comment postId={blog.id} />
        {loading && <p>Loading ...</p>}
        {comments && comments.length > 0 ? (
          comments
            .filter((comment: CommentData) => comment.postId === blog.id)
            .map((comment: CommentData, idx: number) => (
              <CommnetCard key={comment.id || idx} comment={comment} />
            ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentBox;

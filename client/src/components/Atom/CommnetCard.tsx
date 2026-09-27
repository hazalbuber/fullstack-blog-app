import { Text, Avatar } from "@chakra-ui/react";
import styles from "./CommentCard.module.css";
type CommentData = {
  text: string;
  createdAt: string;
  author: {
    name?: string;
    surname?: string;
  };
};
type Props = {
  comment: CommentData;
};

const CommnetCard = ({ comment }: Props) => {
  return (
    <div className={styles.frame}>
      <div className={styles.frame2}>
        <div className={styles.user}>
          <Avatar.Root className={styles.photo}>
            <Avatar.Fallback />
          </Avatar.Root>

          <Text className={styles.name}>
            {comment.author?.name} {comment.author?.surname}
          </Text>
        </div>
        <div className={styles.date}>
          {new Date(comment.createdAt).toLocaleString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      <div className={styles.frame3}>
        <div className={styles.vector}>
          <svg
            width="4"
            height="96"
            viewBox="0 0 4 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 0L2 96" stroke="#EDECFC" strokeWidth="3" />
          </svg>
        </div>

        <p className={styles.text}> {comment.text}</p>
      </div>
    </div>
  );
};

export default CommnetCard;

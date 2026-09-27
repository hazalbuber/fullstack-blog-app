import { useAppDispatch } from "../../app/hook";
import { createComment } from "../../features/commentThunk";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { IconButton, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectLoading } from "../../features/commentSlice";
import styles from "./Commnet.module.css";
import { Avatar } from "@chakra-ui/react";
type Props = {
  postId: number;
};

const Comment = ({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);

  const [formData, setFormData] = useState({
    text: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { text } = formData;

    const result = await dispatch(createComment({ text, id: postId }));

    if (!result.error) {
      //console.log({ text });
      window.location.href = `/blog/${postId}`;
    }
  };

  return (
    <div>
      <div className={styles.frame}>
        <div className={styles.photo}>
          <Avatar.Root>
            <Avatar.Fallback />
          </Avatar.Root>
        </div>

        <Input
          className={styles.textArea}
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
          type="text"
          placeholder="Hello..."
        />

        <IconButton
          className={styles.button}
          onClick={handleSubmit}
          disabled={loading ? true : false}
        >
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
              d="M15.1379 0.861888C15.3983 1.12224 15.3983 1.54435 15.1379 1.8047L7.80458 9.13803C7.54423 9.39838 7.12212 9.39838 6.86177 9.13803C6.60142 8.87768 6.60142 8.45557 6.86177 8.19522L14.1951 0.861888C14.4554 0.601539 14.8776 0.601539 15.1379 0.861888Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1379 0.861907C15.319 1.043 15.3804 1.31182 15.2957 1.55354L10.6291 14.8869C10.5388 15.1449 10.3001 15.3216 10.027 15.3328C9.7539 15.3439 9.50165 15.1872 9.39063 14.9374L6.8281 9.17171L1.06242 6.60919C0.812628 6.49817 0.655919 6.24592 0.667061 5.9728C0.678204 5.69968 0.85494 5.46104 1.11294 5.37074L14.4463 0.704072C14.688 0.619469 14.9568 0.680815 15.1379 0.861907ZM3.14056 6.07371L7.60393 8.05744C7.75475 8.12447 7.87535 8.24506 7.94238 8.39588L9.9261 12.8593L13.5799 2.41996L3.14056 6.07371Z"
              fill="white"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  );
};

export default Comment;

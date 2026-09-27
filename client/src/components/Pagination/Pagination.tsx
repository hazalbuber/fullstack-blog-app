import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectLimit, selectPage, selectTotal } from "../../features/postSlice";
import { listAllPost } from "../../features/postThunk";

const PaginationRoot = () => {
  const dispatch = useDispatch<any>();
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  const total = useSelector(selectTotal);

  return (
    <Pagination.Root
      className={styles.pagination}
      count={total}
      pageSize={limit}
      defaultPage={page}
      onPageChange={(details) => {
        dispatch(listAllPost({ page: details.page, limit }));
      }}
    >
      <ButtonGroup gap="480px" size="sm" variant="ghost">
        <Pagination.PrevTrigger asChild>
          <IconButton className={styles.previousFrame}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.70703 16.7069C9.5195 16.8944 9.2652 16.9997 9.00003 16.9997C8.73487 16.9997 8.48056 16.8944 8.29303 16.7069L2.29303 10.7069C2.10556 10.5194 2.00024 10.2651 2.00024 9.99992C2.00024 9.73475 2.10556 9.48045 2.29303 9.29292L8.29303 3.29292C8.48163 3.11076 8.73424 3.00997 8.99643 3.01224C9.25863 3.01452 9.50944 3.11969 9.69485 3.3051C9.88026 3.49051 9.98543 3.74132 9.98771 4.00352C9.98998 4.26571 9.88919 4.51832 9.70703 4.70692L5.41403 8.99992H17C17.2652 8.99992 17.5196 9.10528 17.7071 9.29281C17.8947 9.48035 18 9.7347 18 9.99992C18 10.2651 17.8947 10.5195 17.7071 10.707C17.5196 10.8946 17.2652 10.9999 17 10.9999H5.41403L9.70703 15.2929C9.8945 15.4804 9.99982 15.7348 9.99982 15.9999C9.99982 16.2651 9.8945 16.5194 9.70703 16.7069Z"
                fill="#676795"
              />
            </svg>
            <span className={styles.previousText}> Previous</span>
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.PageText className={styles.text} />

        <Pagination.NextTrigger asChild>
          <IconButton className={styles.nextFrame}>
            <span className={styles.nextText}> Next</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.293 3.29303C10.4805 3.10556 10.7348 3.00024 11 3.00024C11.2652 3.00024 11.5195 3.10556 11.707 3.29303L17.707 9.29303C17.8945 9.48056 17.9998 9.73487 17.9998 10C17.9998 10.2652 17.8945 10.5195 17.707 10.707L11.707 16.707C11.5184 16.8892 11.2658 16.99 11.0036 16.9877C10.7414 16.9854 10.4906 16.8803 10.3052 16.6948C10.1198 16.5094 10.0146 16.2586 10.0123 15.9964C10.01 15.7342 10.1108 15.4816 10.293 15.293L14.586 11H3C2.73478 11 2.48043 10.8947 2.29289 10.7071C2.10536 10.5196 2 10.2652 2 10C2 9.73481 2.10536 9.48046 2.29289 9.29292C2.48043 9.10539 2.73478 9.00003 3 9.00003H14.586L10.293 4.70703C10.1055 4.5195 10.0002 4.26519 10.0002 4.00003C10.0002 3.73487 10.1055 3.48056 10.293 3.29303Z"
                fill="#676795"
              />
            </svg>
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default PaginationRoot;

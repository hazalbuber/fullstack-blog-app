import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PostsTable.module.css";
import { Box, IconButton, Text, Table, Menu, Portal } from "@chakra-ui/react";
import { listPostsLatest } from "../../features/postThunk";
import { selectPosts } from "../../features/postSlice";

const PostsTable = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(listPostsLatest({ sort: "latest" }));
  }, [dispatch]);

  const postsArray = Array.isArray(posts) ? posts : [];

  const [, setSortLabel] = useState<
    "latest" | "oldest" | "likes" | "comments"
  >("latest");

  const handleSort = (nextSort: "latest" | "oldest" | "likes" | "comments") => {
    setSortLabel(nextSort);
    dispatch(listPostsLatest({ sort: nextSort }));
  };

  return (
    <Box className={styles.frame49}>
      <div className={styles.frame47}>
        <Text className={styles.dashboard}> Lorem Ipsum</Text>
        <div className={styles.frame50}>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton className={styles.buttonFilter}>
                <Text className={styles.textFilter}>Filter</Text>
                <div>
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.637441 0.625603C0.733025 0.41959 0.939486 0.287781 1.16659 0.287781H12.8333C13.0604 0.287781 13.2668 0.41959 13.3624 0.625603C13.458 0.831615 13.4253 1.07438 13.2787 1.24779L8.74993 6.60303V11.3711C8.74993 11.5733 8.64525 11.761 8.47327 11.8673C8.30129 11.9736 8.08655 11.9833 7.90572 11.8929L5.57239 10.7262C5.37476 10.6274 5.24993 10.4254 5.24993 10.2044V6.60303L0.721177 1.24779C0.574529 1.07438 0.541857 0.831615 0.637441 0.625603ZM2.42385 1.45445L6.27868 6.01277C6.36773 6.11808 6.41659 6.25153 6.41659 6.38945V9.84393L7.58326 10.4273V6.38945C7.58326 6.25153 7.63212 6.11808 7.72118 6.01277L11.576 1.45445H2.42385Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="likes" onClick={() => handleSort("likes")}>
                    Most liked
                  </Menu.Item>
                  <Menu.Item
                    value="comments"
                    onClick={() => handleSort("comments")}
                  >
                    Most Comments
                  </Menu.Item>
                  <Menu.Item
                    value="latest"
                    onClick={() => handleSort("latest")}
                  >
                    From new to old
                  </Menu.Item>
                  <Menu.Item
                    value="oldest"
                    onClick={() => handleSort("oldest")}
                  >
                    From old to new
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <IconButton className={styles.buttonCreate}>
            <Text className={styles.childerenCreate}> Create</Text>
            <div className={styles.addIcon}>
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 0.121094C7.23206 0.121094 7.45462 0.213281 7.61872 0.377375C7.78281 0.54147 7.875 0.764029 7.875 0.996094V6.24609H13.125C13.3571 6.24609 13.5796 6.33828 13.7437 6.50238C13.9078 6.66647 14 6.88903 14 7.12109C14 7.35316 13.9078 7.57572 13.7437 7.73981C13.5796 7.90391 13.3571 7.99609 13.125 7.99609H7.875V13.2461C7.875 13.4782 7.78281 13.7007 7.61872 13.8648C7.45462 14.0289 7.23206 14.1211 7 14.1211C6.76794 14.1211 6.54538 14.0289 6.38128 13.8648C6.21719 13.7007 6.125 13.4782 6.125 13.2461V7.99609H0.875C0.642936 7.99609 0.420376 7.90391 0.256282 7.73981C0.0921872 7.57572 0 7.35316 0 7.12109C0 6.88903 0.0921872 6.66647 0.256282 6.50238C0.420376 6.33828 0.642936 6.24609 0.875 6.24609H6.125V0.996094C6.125 0.764029 6.21719 0.54147 6.38128 0.377375C6.54538 0.213281 6.76794 0.121094 7 0.121094V0.121094Z"
                  fill="#5954E3"
                />
              </svg>
            </div>
          </IconButton>
        </div>
      </div>
      <div className={styles.frame29}>
        <Table.Root>
          <Table.Caption />
          <Table.Header>
            <Table.Row className={styles.row}>
              <Table.ColumnHeader className={styles.header}>
                Title
              </Table.ColumnHeader>
              <Table.ColumnHeader className={styles.header}>
                Author
              </Table.ColumnHeader>
              <Table.ColumnHeader className={styles.header}>
                Tags
              </Table.ColumnHeader>
              <Table.ColumnHeader className={styles.header}>
                Comments
              </Table.ColumnHeader>
              <Table.ColumnHeader className={styles.header}>
                Likes
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {postsArray.slice(0, 4).map((post) => (
              <Table.Row key={post.id}>
                <Table.Cell className={styles.text}>{post.title}</Table.Cell>
                <Table.Cell>
                  {post.author?.name} {post.author?.surname}
                </Table.Cell>
                <Table.Cell>
                  {post.tags?.map((tag: any) => tag.name)}
                </Table.Cell>
                <Table.Cell>{post._count?.comments ?? 0}</Table.Cell>
                <Table.Cell>{post._count?.like ?? 0}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </Box>
  );
};

export default PostsTable;

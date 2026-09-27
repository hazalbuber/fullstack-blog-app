import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./BlogDeleteUpdateBox.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HStack,
  Breadcrumb,
  Text,
  IconButton,
  Input,
  Field,
  Textarea,
} from "@chakra-ui/react";
import { LiaSlashSolid } from "react-icons/lia";
import { useAppDispatch } from "../../../app/hook";
import { selectLoading } from "../../../features/postSlice";
import { deletePost, listPost, putPost } from "../../../features/postThunk";
import {
  createTag,
  listTagsOfPost,
  setTagsToPost,
} from "../../../features/tagThunk";
import { selectTags } from "../../../features/tagSlice";

const BlogDeleteUpdateBox = ({ post }: { post: any }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);
  const tags = useSelector(selectTags);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [formTag, setFormTag] = useState({
    name: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
      });
      dispatch(listTagsOfPost({ postId: post.id }));
    }
  }, [post, dispatch]);

  useEffect(() => {
    if (tags?.length > 0) {
      setFormTag({ name: tags[0].name });
    } else {
      setFormTag({ name: "" });
    }
  }, [tags]);

  //take tag and post
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormTag((prev) => ({ ...prev, [name]: value }));
  };

  //tag and post update
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const { name } = formTag;
    const { title, content } = formData;

    const result = await dispatch(putPost({ id: post.id, title, content }));

    if (!result.error) {
      if (name.trim()) {
        const tagResult = await dispatch(createTag({ name }));
        if (!tagResult.error) {
          const tagId = tagResult.payload.id;
          await dispatch(setTagsToPost({ postId: post.id, tagIds: [tagId] }));
          setFormTag({ name: "" });
        }
      }
      navigate("/new");
    }
  };

  //delete tag and post
  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();

    await dispatch(setTagsToPost({ postId: post.id, tagIds: [] }));
    const result = await dispatch(deletePost({ id: post.id }));

    if (!result.error) {
      dispatch(listPost());
      navigate("/new");
    } else {
      console.error("Delete error:", result.error);
    }
  };

  return (
    <div className={styles.frame}>
      <div className={styles.frame2}>
        <div>
          <HStack>
            <div className={styles.frame51}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.707 16.293L10.414 12L14.707 7.707L13.293 6.293L7.58603 12L13.293 17.707L14.707 16.293Z"
                  fill="#02024E"
                />
              </svg>
              <Text className={styles.back}> Back</Text>
            </div>

            <svg
              className={styles.ellipse2}
              width="5"
              height="6"
              viewBox="0 0 5 6"
              fill="none"
            >
              <circle cx="2.5" cy="3" r="2.5" fill="#02024E" />
            </svg>

            <HStack className={styles.breadcrumb}>
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Lorem Ipsum</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <LiaSlashSolid />
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.CurrentLink color="#4641E0">
                      Edit Post
                    </Breadcrumb.CurrentLink>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </HStack>
          </HStack>
        </div>

        <HStack>
          <IconButton
            onClick={handleUpdate}
            disabled={loading}
            className={styles.buttonUpdate}
          >
            <Text className={styles.children2}>Update</Text>
          </IconButton>

          <IconButton
            onClick={handleDelete}
            disabled={loading}
            className={styles.buttonDelete}
          >
            <Text className={styles.children2}>Delete</Text>
          </IconButton>
        </HStack>
      </div>

      <div>
        <Text className={styles.dashboardTitle}>Edit or Delete Post</Text>
      </div>

      <div className={styles.frame44}>
        <div className={styles.frame42}>
          <div className={styles.frame57}>
            <div className={styles.frame56}>
              <Text className={styles.loremIpsumTitle}>Lorem Ipsum</Text>
            </div>

            <div className={styles.frame54}>
              <Field.Root className={styles.frame22}>
                <Field.Label>Title</Field.Label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="Enter title"
                />
              </Field.Root>

              <Field.Root className={styles.frame3}>
                <Field.Label>Tag</Field.Label>
                <Input
                  name="name"
                  value={formTag.name}
                  onChange={handleTagChange}
                  type="text"
                  required
                  placeholder="technology, software, health"
                />
              </Field.Root>
            </div>

            <div className={styles.frame55}>
              <Field.Root className={styles.frame22}>
                <Field.Label>Lorem Ipsum</Field.Label>
                <Input placeholder="Enter Lorem Ipsum" />
              </Field.Root>

              <Field.Root className={styles.frame3}>
                <Field.Label>Lorem Ipsum</Field.Label>
                <Input placeholder="Enter Lorem Ipsum" />
              </Field.Root>
            </div>
          </div>

          <div className={styles.frame60}>
            <div className={styles.frame56}>
              <Text className={styles.title}>Content</Text>
            </div>

            <div className={styles.frame54}>
              <Field.Root className={styles.frame22}>
                <Textarea
                  value={formData.content}
                  name="content"
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Hello..."
                />
              </Field.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDeleteUpdateBox;

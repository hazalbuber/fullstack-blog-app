import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./CreateBox.module.css";
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
import { createPost } from "../../../features/postThunk";
import { createTag, setTagsToPost } from "../../../features/tagThunk";

const CreateBox = () => {
  
  /* const items = [
  { value: "1", label: "Seçenek 1" },
  { value: "2", label: "Seçenek 2" },
  { value: "3", label: "Seçenek 3" },
]; */

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [formTag, setFormTag] = useState({
    name: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTag = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormTag((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { title, content } = formData;
    const { name } = formTag;
    let tagId = null;

    if (!name.trim()) {
      return;
    }

    const tagResult = await dispatch(createTag({ name }));
    if (!tagResult.error) {
      setFormTag({ name: "" });
      tagId = tagResult.payload.id;
    }

    const result = await dispatch(createPost({ title, content }));

    if (!result.error) {
      const postId = result.payload.id;
      if (tagId) {
        await dispatch(setTagsToPost({ postId, tagIds: [tagId] }));
      }
      navigate("/");
    }
  };

  return (
    <div className={styles.frame}>
      <div className={styles.frame2}>
        <div>
          <HStack>
            <div className={styles.frame51}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.707 16.293L10.414 12L14.707 7.707L13.293 6.293L7.58603 12L13.293 17.707L14.707 16.293Z"
                  fill="#02024E"
                />
              </svg>

              <Text className={styles.back}> Back </Text>
            </div>

            <svg
              className={styles.ellipse2}
              width="5"
              height="6"
              viewBox="0 0 5 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
                      Create Post
                    </Breadcrumb.CurrentLink>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </HStack>
          </HStack>
        </div>

        <IconButton
          onClick={handleSubmit}
          disabled={loading ? true : false}
          className={styles.button}
        >
          <Text className={styles.children2}>Create </Text>

          <svg
            className={styles.right_icon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C8.26522 0 8.51957 0.105357 8.70711 0.292893C8.89464 0.48043 9 0.734784 9 1V7H15C15.2652 7 15.5196 7.10536 15.7071 7.29289C15.8946 7.48043 16 7.73478 16 8C16 8.26522 15.8946 8.51957 15.7071 8.70711C15.5196 8.89464 15.2652 9 15 9H9V15C9 15.2652 8.89464 15.5196 8.70711 15.7071C8.51957 15.8946 8.26522 16 8 16C7.73478 16 7.48043 15.8946 7.29289 15.7071C7.10536 15.5196 7 15.2652 7 15V9H1C0.734784 9 0.48043 8.89464 0.292893 8.70711C0.105357 8.51957 0 8.26522 0 8C0 7.73478 0.105357 7.48043 0.292893 7.29289C0.48043 7.10536 0.734784 7 1 7H7V1C7 0.734784 7.10536 0.48043 7.29289 0.292893C7.48043 0.105357 7.73478 0 8 0V0Z"
              fill="white"
            />
          </svg>
        </IconButton>
      </div>

      <div>
        <Text className={styles.dashboardTitle}> Create Post</Text>
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
                  onChange={handleTag}
                  required
                  type="text"
                  placeholder="technology, health, education..."
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

export default CreateBox;

/* 

  <div className={styles.frame59}>
  <div className={styles.frame56}>
    <Text className={styles.title}>Lorem Ipsum</Text>
  </div>

  <div className={styles.frame54}>
    <RadioGroup.Root className={styles.frame22} defaultValue="1">
      <Text> Lorem Ipsum</Text>
      <HStack>
        {items.map((item) => (
          <RadioGroup.Item
            className={styles.radio}
            key={item.value}
            value={item.value}
          >
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator
              className={styles.indicator}
            />
            <RadioGroup.ItemText className={styles.children}>
              {item.label}
            </RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  </div>
  </div>

*/

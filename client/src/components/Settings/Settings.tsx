import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Settings.module.css";

import {
  HStack,
  Breadcrumb,
  Text,
  IconButton,
  Input,
  Field,
} from "@chakra-ui/react";
import { LiaSlashSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { getUser, updateUser } from "../../features/authThunk";

const UserUpdate = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    password: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        password: "",
        phoneNumber: user.phoneNumber || "",
      });
      dispatch(getUser({ user: user.id }));
    }
  }, [user, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    const { name, surname, password, phoneNumber } = formData;

    const result = await dispatch(
      updateUser({ id: user.id, name, surname, password, phoneNumber })
    );

    if (!result.error) {
      navigate("/new");
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
                      Update User
                    </Breadcrumb.CurrentLink>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </HStack>
          </HStack>
        </div>

        <HStack>
          <IconButton onClick={handleUpdate} className={styles.buttonUpdate}>
            <Text className={styles.children2}>Update</Text>
          </IconButton>
        </HStack>
      </div>

      <div>
        <Text className={styles.dashboardTitle}>Update User</Text>
      </div>

      <div className={styles.frame44}>
        <div className={styles.frame42}>
          <div className={styles.frame57}>
            <div className={styles.frame56}>
              <Text className={styles.loremIpsumTitle}>Lorem Ipsum</Text>
            </div>

            <div className={styles.frame54}>
              <Field.Root className={styles.frame22}>
                <Field.Label>Name</Field.Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter name"
                />
              </Field.Root>

              <Field.Root className={styles.frame3}>
                <Field.Label>Surname</Field.Label>
                <Input
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter surname"
                />
              </Field.Root>
            </div>

            <div className={styles.frame55}>
              <Field.Root className={styles.frame3}>
                <Field.Label>Phone Number</Field.Label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Enter phone number"
                />
              </Field.Root>

              <Field.Root className={styles.frame3}>
                <Field.Label>Password</Field.Label>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter password"
                />
              </Field.Root>
            </div>
          </div>

          <div className={styles.frame60}></div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;

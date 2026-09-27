import React, { ChangeEvent, useState, FormEvent } from "react";
import styles from "./RegisterBox.module.css";
import { Button, Field, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hook";
import { selectLoading } from "../../features/authSlice";
import { clientRegister } from "../../features/authThunk";
import { toaster } from "../ui/toaster";

const RegisterBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phoneNumber: "",
    verifyPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);

  //formda değişen alanı tutyoruz...
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.verifyPassword) {
      toaster.create({
        title: "Warning",
        description: "Passwords are not same",
        type: "warning",
        closable: true,
      });

      return;
    }

    const { email, password, name, surname, phoneNumber } = formData;
    const result = await dispatch(
      clientRegister({ email, password, name, surname, phoneNumber })
    );
    if (!result.error) {
      navigate("/login");
    } else if (!email || !password || !name || !surname || !phoneNumber) {
      toaster.create({
        title: "Warning",
        description: "Please fill in your email and password",
        type: "warning",
        closable: true,
      });
      return;
    }
  };

  return (
    <div className={styles.frame}>
      <div className={styles.frame2}>
        <div className={styles.frame3}>
          <div className={styles.frame7}>
            <Field.Root>
              <Field.Label className={styles.text1}>Name</Field.Label>

              <Input
                value={formData.name}
                name="name"
                onChange={handleChange}
                required
                autoComplete="name"
                type="text"
                className={styles.input1}
                placeholder="Enter name"
              />
            </Field.Root>
          </div>

          <div className={styles.frame8}>
            <Field.Root>
              <Field.Label className={styles.text1}>Surname</Field.Label>
              <Input
                value={formData.surname}
                name="surname"
                onChange={handleChange}
                required
                autoComplete="surname"
                type="text"
                className={styles.input1}
                placeholder="Enter surname"
              />
            </Field.Root>
          </div>
        </div>

        <div className={styles.frame4}>
          <div className={styles.frame7}>
            <Field.Root>
              <Field.Label className={styles.text1}>Email</Field.Label>
              <Input
                value={formData.email}
                name="email"
                onChange={handleChange}
                required
                autoComplete="email"
                type="email"
                className={styles.input1}
                placeholder="Enter an email"
              />
            </Field.Root>
          </div>

          <div className={styles.frame8}>
            <Field.Root>
              <Field.Label className={styles.text1}>Phone Number</Field.Label>
              <Input
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                required
                autoComplete="phoneNumber"
                type="text"
                className={styles.input1}
                placeholder="Enter phone number"
              />
            </Field.Root>
          </div>
        </div>

        <div className={styles.frame5}>
          <div>
            <Field.Root>
              <Field.Label className={styles.textPassword}>
                Password
              </Field.Label>
              <Input
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
                type="password"
                className={styles.inputPassword}
                placeholder="Enter password"
              />
            </Field.Root>
          </div>
        </div>

        <div className={styles.frame6}>
          <div>
            <Field.Root>
              <Field.Label className={styles.textPassword}>
                Verify Password
              </Field.Label>
              <Input
                value={formData.verifyPassword}
                name="verifyPassword"
                onChange={handleChange}
                required
                type="password"
                className={styles.inputPassword}
                placeholder="Enter verify password"
              />
            </Field.Root>
          </div>
        </div>
      </div>

      <div className={styles.button}>
        <Button
          type="submit"
          disabled={loading ? true : false}
          className={styles.button}
          onClick={handleSubmit}
        >
          Sing up
        </Button>
      </div>
    </div>
  );
};

export default RegisterBox;

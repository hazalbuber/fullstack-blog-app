import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./LoginBox.module.css";
import { Button, Field, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { selectCurrentToken, selectLoading } from "../../features/authSlice";
import { useSelector } from "react-redux";
import { clientLogin } from "../../features/authThunk";
import { toaster } from "../ui/toaster";

const LoginBox = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);
  const token = useSelector(selectCurrentToken);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (token) {
      navigate("/new");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toaster.create({
        title: "Warning",
        description: "Please fill in your email and password",
        type: "warning",
        closable: true,
      });
      return;
    }
    await dispatch(clientLogin({ email, password }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Field.Root>
          <Field.Label className={styles.text1}>
            Enter your email address
          </Field.Label>
          <Input
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
            autoComplete="email"
            type="email"
            className={styles.input1}
            placeholder="Enter your email address"
          />
        </Field.Root>
      </div>

      <div className={styles.box2}>
        <div>
          <Field.Root>
            <Field.Label className={styles.text2}>
              Enter your Password
            </Field.Label>
            <Input
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              type="password"
              className={styles.input2}
              placeholder="Enter Password "
            />
          </Field.Root>
        </div>
        <div className={styles.text3}>Forgot Password</div>
      </div>

      <div className={styles.button}>
        <Button
          type="submit"
          disabled={loading ? true : false}
          className={styles.button}
          onClick={handleSubmit}
        >
          Sing in
        </Button>
      </div>
    </div>
  );
};

export default LoginBox;

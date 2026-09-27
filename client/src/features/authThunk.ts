import { getToken, removeToken } from "../app/utils";
import { post, get, put } from "../app/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Register
export const clientRegister: any = createAsyncThunk<
  { token: string },
  {
    email: string;
    password: string;
    name: string;
    surname: string;
    phoneNumber: string;
  }
>("v1/client-register", async (payload, { rejectWithValue }) => {
  try {
    const { email, password, name, surname, phoneNumber } = payload;
    const response = await post("v1/auth/register", {
      email,
      password,
      name,
      surname,
      phoneNumber,
    });
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

//Login
export const clientLogin = createAsyncThunk<
  { token: string },
  { email: string; password: string }
>("v1/client-login", async (payload, { rejectWithValue }) => {
  try {
    const { email, password } = payload;
    const response = await post("v1/auth/login", { email, password });

    const token = response?.data?.token;

    if (!token) {
      const msg = response?.data?.message || "Invalid email or password.";
      return rejectWithValue({ message: msg });
    }
    return { token };
  } catch (e: any) {
    if (!e.response) throw e;
    return rejectWithValue(e.response.data);
  }
});

//Log out
export const logOut = createAsyncThunk("v1/log-out", async () => {
  removeToken();
});

export const getUser: any = createAsyncThunk<
  { user: { name: string; surname: string; role: string }; token: string },
  void
>("v1/get-user", async (payload, { rejectWithValue }) => {
  try {
    const token = getToken() || undefined;
    const response = await get(`v1/auth/getUser`, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const updateUser = createAsyncThunk<
  any,
  {
    id: number | string;
    password: string;
    name: string;
    surname: string;
    phoneNumber: string;
  }
>("v1/update-user", async (payload, { rejectWithValue }) => {
  try {
    const { id, password, name, surname, phoneNumber } = payload;
    const token = getToken() || undefined;
    const response = await put(
      `v1/updateUser/${id}`,
      { password, name, surname, phoneNumber },
      token
    );
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

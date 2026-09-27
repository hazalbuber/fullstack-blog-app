import { del, post, get } from "../app/authApi";
import { getToken } from "../app/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createLike: any = createAsyncThunk<
  { token: string },
  {
    id: number;
  }
>("v1/create-like", async (payload, { rejectWithValue }) => {
  try {
    const { id } = payload;
    const token = getToken() || undefined;
    const response = await post(`v1/like/create/${id}`, undefined, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const deleteLike: any = createAsyncThunk<
  { token: string },
  {
    id: number;
  }
>("v1/delete-like", async (payload, { rejectWithValue }) => {
  try {
    const { id } = payload;
    const token = getToken() || undefined;
    const response = await del(`v1/like/delete/${id}`, undefined, token);

    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const likePost: any = createAsyncThunk<
  { token: string; liked: boolean },
  { id: number }
>("v1/likePost", async (payload, { rejectWithValue }) => {
  try {
    const { id } = payload;
    const token = getToken() || undefined;
    const response = await get(`v1/like/like-post/${id}`, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const likeCountPost: any = createAsyncThunk<any, { id: number }>(
  "v1/like-count",
  async (payload, { rejectWithValue }) => {
    try {
      const { id } = payload;
      const token = getToken() || undefined;
      const response = await get(`v1/like/list/${id}`, token);
      return { id, data: response.data };
    } catch (e: any) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

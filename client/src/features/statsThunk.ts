import { getToken } from "../app/utils";
import { get } from "../app/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPostCount: any = createAsyncThunk<{ token: string }, void>(
  "v1/get-post-count",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken() || undefined;
      const response = await get("v1/count/posts", token);
      return response.data;
    } catch (e: any) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

export const getCommentCount: any = createAsyncThunk<{ token: string }, void>(
  "v1/get-comment-count",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken() || undefined;
      const response = await get("v1/count/comments", token);
      return response.data;
    } catch (e: any) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

export const getUserCount: any = createAsyncThunk<{ token: string }, void>(
  "v1/get-user-count",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken() || undefined;
      const response = await get("v1/count/users", token);
      return response.data;
    } catch (e: any) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

export const getLikeCount: any = createAsyncThunk<{ token: string }, void>(
  "v1/get-like-count",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken() || undefined;
      const response = await get("v1/count/likes", token);
      return response.data;
    } catch (e: any) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

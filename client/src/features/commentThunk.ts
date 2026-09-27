import { getToken } from "../app/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { del, post, put, get } from "../app/authApi";

export const createComment: any = createAsyncThunk<
  { token: string },
  { id: number; text: string }
>("v1/create-comment", async (payload, { rejectWithValue }) => {
  try {
    const { text, id } = payload;
    const token = getToken() || undefined;
    const response = await post(`v1/comment/create/${id}`, { text }, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const deleteComment: any = createAsyncThunk<
  { token: string },
  {
    id: number;
  }
>("v1/delete-comment", async (payload, { rejectWithValue }) => {
  try {
    const { id } = payload;
    const token = getToken() || undefined;
    const response = await del(`v1/comment/delete/${id}`, undefined, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const putComment: any = createAsyncThunk<
  { token: string },
  { id: number; text: string }
>("v1/update-comment", async (payload, { rejectWithValue }) => {
  try {
    const { text, id } = payload;
    const token = getToken() || undefined;
    const response = await put(`v1/comment/update/${id}`, { text }, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const listComment: any = createAsyncThunk<
  { token: string },
  {
    id: number;
  }
>("v1/list-comment", async (payload, { rejectWithValue }) => {
  try {
    const { id } = payload;
    const token = getToken() || undefined;
    const response = await get(`v1/comment/list/${id}`, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

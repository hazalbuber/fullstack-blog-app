import { getToken } from "../app/utils";
import { post, put, get, del } from "../app/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTag: any = createAsyncThunk<
  { token: string },
  { name: string }
>("v1/create-tag", async (payload, { rejectWithValue }) => {
  try {
    const { name } = payload;
    const token = getToken() || undefined;
    const response = await post(
      "v1/tag/create",
      {
        name,
      },
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

export const updateTag: any = createAsyncThunk<
  { token: string },
  {
    id: string;
    name: string;
  }
>("v1/update-tag", async (payload, { rejectWithValue }) => {
  try {
    const { name, id } = payload;
    const token = getToken() || undefined;
    const response = await put(`v1/tag/update/${id}`, { name }, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const setTagsToPost: any = createAsyncThunk<
  { token: string },
  { postId: number; tagIds: string[] }
>("v1/set-tags-to-post", async (payload, { rejectWithValue }) => {
  try {
    const { postId, tagIds } = payload;
    const token = getToken() || undefined;
    const response = await put(`v1/tag/update/${postId}`, { tagIds }, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const listTagsOfPost: any = createAsyncThunk<
  { token: string },
  { postId: number }
>("v1/list-tags-of-post", async (payload, { rejectWithValue }) => {
  try {
    const { postId } = payload;
    const token = getToken() || undefined;
    const response = await get(`v1/tag/list/${postId}`, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const deleteTag: any = createAsyncThunk<
  { token: string },
  { id: string }
>("v1/delete-tag", async (payload, { rejectWithValue }) => {
  try {
    const { id } = payload;
    const token = getToken() || undefined;
    const response = await del(`v1/tag/delete/${id}`, undefined, token);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

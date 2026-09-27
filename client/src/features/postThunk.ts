import { getToken } from "../app/utils";
import { del, post, put, get } from "../app/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPost: any = createAsyncThunk<
  { token: string },
  {
    title: string;
    content: string;
  }
>("v1/create-post", async (payload, { rejectWithValue }) => {
  try {
    const { title, content } = payload;
    const token = getToken() || undefined;
    const response = await post(
      "v1/post/create",
      {
        title,
        content,
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

export const deletePost: any = createAsyncThunk<
  { token: string },
  {
    id: number;
  }
>("v1/delete-post", async (payload, { rejectWithValue }) => {
  try {
    const { id } = payload;
    const token = getToken() || undefined;
    const response = await del(`v1/post/delete/${id}`, undefined, token);

    return response.data;
  } catch (e: any) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const putPost: any = createAsyncThunk<
  { token: string },
  {
    id: number;
    title: string;
    content: string;
  }
>("v1/update-post", async (payload, { rejectWithValue }) => {
  try {
    const { title, content, id } = payload;
    const token = getToken() || undefined;
    const response = await put(
      `v1/post/update/${id}`,
      { title, content },
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

export const listPost: any = createAsyncThunk<{ token: string }, void>(
  "v1/list-post",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getToken() || undefined;
      const response = await get(`v1/post/list`, token);
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

export const listAllPost = createAsyncThunk(
  "v1/list-all-post",
  async ({ page = 1, limit = 15 }: any = {}, { rejectWithValue }) => {
    try {
      const token = getToken() || undefined;
      const response = await get(
        `v1/post/listAll?page=${page}&limit=${limit}`,
        token
      );
      return response.data; // { page, limit, total, totalPages, posts }
    } catch (e: any) {
      if (!e.response) throw e;
      return rejectWithValue(e.response.data);
    }
  }
);

export const listPostsLatest: any = createAsyncThunk<
  any,
  { sort?: "latest" | "oldest" | "likes" | "comments" } | void
>("v1/list-posts-latest", async (arg, { rejectWithValue }) => {
  try {
    const token = getToken() || undefined;
    const sort = arg?.sort ?? "latest";

    const response = await get(`v1/post/listLatest`, token, {
      params: { sort },
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

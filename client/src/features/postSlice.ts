import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../app/store";
import {
  createPost,
  deletePost,
  listAllPost,
  listPost,
  putPost,
  listPostsLatest,
} from "./postThunk";

interface Createstate {
  loading: boolean;
  posts: any[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const initialState: Createstate = {
  loading: false,
  posts: [],
  page: 1,
  limit: 15,
  total: 0,
  totalPages: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //create
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })

      .addCase(createPost.fulfilled, (state) => {
        toast.success("Post creation is successful");
        state.loading = false;
      })

      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      })

      // delete
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        toast.success("Post deleted successfully");
        state.loading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        const message = (action.payload as any)?.message || "Delete failed.";
        toast.error(message);
      })

      // update
      .addCase(putPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(putPost.fulfilled, (state) => {
        toast.success("Post updated successfully");
        state.loading = false;
      })
      .addCase(putPost.rejected, (state, action) => {
        state.loading = false;
        const message = (action.payload as any)?.message || "Update failed.";
        toast.error(message);
      })

      // list
      .addCase(listPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(listPost.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message || "Somethings wrong...";
        toast.error(message);
      })

      //listAll
      .addCase(listAllPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAllPost.fulfilled, (state, action) => {
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.posts = action.payload.posts;
        state.loading = false;
      })
      .addCase(listAllPost.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message || "Somethings wrong...";
        toast.error(message);
      })

      // list latest posts(comment, author, like, tags)
      .addCase(listPostsLatest.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPostsLatest.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(listPostsLatest.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message || "Somethings wrong...";
        toast.error(message);
      });
  },
});

export default postSlice.reducer;
export const selectLoading = (state: RootState) => state.post.loading;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectPage = (state: RootState) => state.post.page;
export const selectLimit = (state: RootState) => state.post.limit;
export const selectTotal = (state: RootState) => state.post.total;
export const selectTotalPages = (state: RootState) => state.post.totalPages;

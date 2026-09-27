import { createSlice } from "@reduxjs/toolkit";
import { createLike, deleteLike, likeCountPost, likePost } from "./likeThunk";
import { toast } from "react-toastify";
import { RootState } from "../app/store";

interface Createstate {
  loading: boolean;
  likes: Record<number, number>; // { postId: likeCount }
}
const initialState: Createstate = {
  loading: false,
  likes: {},
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //create
      .addCase(createLike.pending, (state) => {
        state.loading = true;
      })

      .addCase(createLike.fulfilled, (state) => {
        toast.success("Liked");
        state.loading = false;
      })

      .addCase(createLike.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Sometihng is wrong... Try again.";
        toast.error(message);
      })

      //delete
      .addCase(deleteLike.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteLike.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Sometihng is wrong... Try again.";
        toast.error(message);
      })

      //liked post
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Sometihng is wrong... Try again.";
        toast.error(message);
      })

      //count of like
      .addCase(likeCountPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeCountPost.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.likes[id] = data;
        state.loading = false;
      })
      .addCase(likeCountPost.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Sometihng is wrong... Try again.";
        toast.error(message);
      });
  },
});

export default likeSlice.reducer;
export const selectLoading = (state: RootState) => state.like.loading;
export const selectLikeCount = (postId: number) => (state: RootState) =>
  state.like.likes[postId];

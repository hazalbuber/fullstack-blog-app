import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../app/store";
import {
  getCommentCount,
  getLikeCount,
  getPostCount,
  getUserCount,
} from "./statsThunk";
interface StatsState {
  loading: boolean;
  postCount: number;
  commentCount: number;
  userCount: number;
  likeCount: number;
}
const initialState: StatsState = {
  loading: false,
  postCount: 0,
  commentCount: 0,
  userCount: 0,
  likeCount: 0,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get post count
      .addCase(getPostCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostCount.fulfilled, (state, action) => {
        state.loading = false;
        state.postCount = action.payload.count;
      })
      .addCase(getPostCount.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      })

      // get comment count
      .addCase(getCommentCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentCount.fulfilled, (state, action) => {
        state.loading = false;
        state.commentCount = action.payload.count;
      })
      .addCase(getCommentCount.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      })

      // get user count
      .addCase(getUserCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCount.fulfilled, (state, action) => {
        state.loading = false;
        state.userCount = action.payload.count;
      })
      .addCase(getUserCount.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      })

      // get like count
      .addCase(getLikeCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikeCount.fulfilled, (state, action) => {
        state.loading = false;
        state.likeCount = action.payload.count;
      })
      .addCase(getLikeCount.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      });
  },
});

export default statsSlice.reducer;
export const selectStats = (state: RootState) => state.stats;
export const selectLoadingStats = (state: RootState) => state.stats.loading;

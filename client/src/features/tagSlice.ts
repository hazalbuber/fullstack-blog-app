import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../app/store";
import { createSlice } from "@reduxjs/toolkit";
import {
  createTag,
  deleteTag,
  listTagsOfPost,
  setTagsToPost,
  updateTag,
} from "./tagThunk";

interface Createstate {
  loading: boolean;
  tags: any[];
}
const initialState: Createstate = {
  loading: false,
  tags: [],
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //crate
      .addCase(createTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTag.fulfilled, (state) => {
        toast.success("Tag added successfully");
        state.loading = false;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      })

      //update
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTag.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      })

      //add-update tag in post

      .addCase(setTagsToPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(setTagsToPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setTagsToPost.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      })

      //list tags of post
      .addCase(listTagsOfPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(listTagsOfPost.fulfilled, (state, action) => {
        state.tags = action.payload.tags;
        state.loading = false;
      })
      .addCase(listTagsOfPost.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      })

      //delete tag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTag.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message ||
          "Something is wrong... Try again.";
        toast.error(message);
      });
  },
});

export default tagSlice.reducer;
export const selectLoading = (state: RootState) => state.tag.loading;
export const selectTags = (state: RootState) => state.tag.tags;

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../app/store";
import {
  createComment,
  deleteComment,
  listComment,
  putComment,
} from "./commentThunk";

interface Createstate {
  loading: boolean;
  comments: any[];
}
const initialState: Createstate = {
  loading: false,
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //creat comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })

      .addCase(createComment.fulfilled, (state, action) => {
        toast.success("Comment creation is succesful");
        state.loading = false;
      })

      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message || "Something is wrong...Try again";
        toast.error(message);
      })

      //delete comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        toast.success("Comment deleted successfully");
        state.loading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        const message = (action.payload as any)?.message || "Delete failed...";
        toast.error(message);
      })

      //comment update
      .addCase(putComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(putComment.fulfilled, (state) => {
        toast.success("Comment update successfully");
        state.loading = false;
      })
      .addCase(putComment.rejected, (state, action) => {
        const message = (action.payload as any)?.message || "Update failed..";
        toast.error(message);
      })

      //comment list
      .addCase(listComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(listComment.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(listComment.rejected, (state, action) => {
        state.loading = false;
        const message =
          (action.payload as any)?.message || "Somethings wrong...";
        toast.error(message);
      });
  },
});

export default commentSlice.reducer;
export const selectLoading = (state: RootState) => state.comment.loading;
export const selectComment = (state: RootState) => state.comment.comments;

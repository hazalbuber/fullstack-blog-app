import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { getDailyPosts, type DailyPoint } from "./dailyPostThunk";

interface DailyPostState {
  loading: boolean;
  month: string; // "YYYY-MM"
  data: DailyPoint[];
}

const getDefaultMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const initialState: DailyPostState = {
  loading: false,
  month: getDefaultMonth(),
  data: [],
};

const dailyPostSlice = createSlice({
  name: "dailyPost",
  initialState,
  reducers: {
    setDailyPostMonth(state, action) {
      state.month = action.payload as string;
    },
    resetDailyPost(state) {
      state.loading = false;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDailyPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDailyPosts.rejected, (state) => {
        state.loading = false;
        // artık mesaj/ toast vs. yok
      });
  },
});

export default dailyPostSlice.reducer;
export const { setDailyPostMonth, resetDailyPost } = dailyPostSlice.actions;

export const selectDailyPost = (s: RootState) => s.dailyPost;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../app/utils";
import { get } from "../app/authApi";

export type DailyPoint = { day: string; count: number };

export const getDailyPosts = createAsyncThunk<
  DailyPoint[], // fulfilled return type
  { month: string } // arg type
>("v1/get-daily-posts", async ({ month }, { rejectWithValue, signal }) => {
  try {
    const token = getToken() || undefined;
    const res = await get(
      `v1/count/dailyPost?month=${encodeURIComponent(month)}`,
      token,
      { signal }
    );
    return (res.data as DailyPoint[]) ?? [];
  } catch (e: any) {
    if (!e.response) throw e; // network hatası → üstte patlat
    return rejectWithValue(e.response.data); // sadece rejectWithValue
  }
});

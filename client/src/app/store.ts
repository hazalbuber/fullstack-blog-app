import userReducer from "../features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import commentReducer from "../features/commentSlice";
import likeReducer from "../features/likeSlice";
import tagReducer from "../features/tagSlice";
import statsReducer from "../features/statsSlice";
import dailyPostReducer from "../features/dailyPostSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    like: likeReducer,
    tag: tagReducer,
    stats: statsReducer,
    dailyPost: dailyPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

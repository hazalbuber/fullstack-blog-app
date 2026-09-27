import { createSlice } from "@reduxjs/toolkit";
import {
  clientLogin,
  clientRegister,
  getUser,
  logOut,
  updateUser,
} from "./authThunk";
import { RootState } from "../app/store";
import { getToken, removeToken, setToken } from "../app/utils";
import { toaster } from "../components/ui/toaster";
import { toast } from "react-toastify";

type User = {
  id: number | string;
  name: string;
  surname: string;
  role: string;
  phoneNumber?: string;
};

interface Authstate {
  token: string | null;
  loading: boolean;
  user: User | null;
}

const initialState: Authstate = {
  token: null,
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccessToken: (state) => {
      state.token = getToken();
    },
  },

  extraReducers: (builder) => {
    builder

      //register
      .addCase(clientRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(clientRegister.fulfilled, (state) => {
        toaster.create({
          type: "success",
          title: "Registration is successful",
          closable: true,
        });
        state.loading = false;
      })
      .addCase(clientRegister.rejected, (state) => {
        state.loading = false;
        toaster.create({
          type: "error",
          title: "Something is wrong... Try again.",
          closable: true,
        });
      })

      //login
      .addCase(clientLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(clientLogin.fulfilled, (state, action) => {
        action.payload.token && setToken(action.payload.token);
        state.token = action.payload.token;
        toaster.create({
          type: "success",
          title: "Login is successful",
          closable: true,
        });
        state.loading = false;
      })

      .addCase(clientLogin.rejected, (state, action) => {
        state.loading = false;
        removeToken();
        state.token = null;
        toaster.create({
          type: "error",
          title: "Something is wrong... Try again..",
          closable: true,
        });
      })

      // Log out
      .addCase(logOut.fulfilled, (state) => {
        state.token = null;
        removeToken();
        toaster.create({
          type: "warning",
          title: "Log out successful",
          closable: true,
        });
        state.loading = false;
      })

      //getUser
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      //updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        toast.success("Post updated successfully");
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        const message = (action.payload as any)?.message || "Update failed.";
        toast.error(message);
      });
  },
});

export default authSlice.reducer;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectCurrentToken = (state: RootState) => state.user.token;

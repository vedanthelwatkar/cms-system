import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "../../appConfig";

// Thunks
export const adminLogin = createAsyncThunk("adminLogin", async (loginData) => {
  const response = await axios.post(
    `${appConfig.BASE_URL}/api/admin/login`,
    loginData
  );
  return response.data.message;
});

export const adminLogout = createAsyncThunk("adminLogout", async () => {
  const response = await axios.post(`${appConfig.BASE_URL}/api/admin/logout`);
  return response.data.message;
});

export const addAdmin = createAsyncThunk("addAdmin", async (adminData) => {
  const response = await axios.post(
    `${appConfig.BASE_URL}/api/admin/register`,
    adminData
  );
  return response.data;
});

// Slice definition
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loginStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(adminLogin.fulfilled, (state) => {
        state.loginStatus = "succeeded";
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.error;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.loginStatus = "idle";
      })
      .addCase(addAdmin.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(addAdmin.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;

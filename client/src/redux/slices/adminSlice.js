import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "../../appConfig";

// Thunks
export const fetchAdmins = createAsyncThunk("fetchAdmins", async () => {
  const response = await axios.get(`${appConfig.BASE_URL}/api/admin`);
  return response.data.data;
});

export const addAdmin = createAsyncThunk("addAdmin", async (adminData) => {
  const response = await axios.post(
    `${appConfig.BASE_URL}/api/admin/register`,
    adminData
  );
  return response.data.data;
});

export const adminLogin = createAsyncThunk("adminLogin", async (loginData) => {
  const response = await axios.post(
    `${appConfig.BASE_URL}/api/admin/login`,
    loginData
  );
  return response.data.token;
});

// Slice
const adminSlice = createSlice({
  name: "admins",
  initialState: {
    admins: [],
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export default adminSlice.reducer;

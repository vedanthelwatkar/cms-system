import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "../../appConfig";

export const fetchUsers = createAsyncThunk("fetchUsers", async (clientId) => {
  const response = await axios.get(
    `${appConfig.BASE_URL}/api/users?clientId=${clientId}`
  );
  return response.data.data;
});

export const addUser = createAsyncThunk("addUser", async (userData) => {
  const response = await axios.post(
    `${appConfig.BASE_URL}/api/users`,
    userData
  );
  return response.data.data;
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, userData }) => {
    const response = await axios.put(
      `${appConfig.BASE_URL}/api/users/${id}`,
      userData
    );
    return response.data.data;
  }
);

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  await axios.delete(`${appConfig.BASE_URL}/api/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;

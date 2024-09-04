import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "../../appConfig";

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${appConfig.BASE_URL}/api/clients`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addClient = createAsyncThunk(
  "clients/addClient",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${appConfig.BASE_URL}/api/clients`,
        clientData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, clientData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${appConfig.BASE_URL}/api/clients/${id}`,
        clientData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${appConfig.BASE_URL}/api/clients/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addClient.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients.push(action.payload);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateClient.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.clients.findIndex(
          (client) => client._id === action.payload._id
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteClient.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;

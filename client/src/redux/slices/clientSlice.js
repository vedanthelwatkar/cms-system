import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "../../appConfig";

// Thunks
export const fetchClients = createAsyncThunk("fetchClients", async () => {
  const response = await axios.get(`${appConfig.BASE_URL}/api/clients`);
  return response.data.data;
});

export const addClient = createAsyncThunk("addClient", async (clientData) => {
  const response = await axios.post(
    `${appConfig.BASE_URL}/api/clients`,
    clientData
  );
  return response.data.data;
});

export const updateClient = createAsyncThunk(
  "updateClient",
  async ({ id, clientData }) => {
    const response = await axios.put(
      `${appConfig.BASE_URL}/api/clients/${id}`,
      clientData
    );
    return response.data.data;
  }
);

export const deleteClient = createAsyncThunk("deleteClient", async (id) => {
  await axios.delete(`${appConfig.BASE_URL}/api/clients/${id}`);
  return id;
});

// Slice
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
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex(
          (client) => client._id === action.payload._id
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload
        );
      });
  },
});

export default clientSlice.reducer;

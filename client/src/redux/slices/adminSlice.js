import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "../../appConfig";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${appConfig.BASE_URL}/api/admin/login`,
        loginData
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminLogout = createAsyncThunk(
  "admin/adminLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${appConfig.BASE_URL}/api/admin/logout`
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addAdmin = createAsyncThunk(
  "admin/addAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${appConfig.BASE_URL}/api/admin/register`,
        adminData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchMetrics = createAsyncThunk(
  "admin/fetchMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${appConfig.BASE_URL}/api/admin/metrics`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchDailyMetrics = createAsyncThunk(
  "admin/fetchDailyMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${appConfig.BASE_URL}/api/metrics/daily`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchWeeklyMetrics = createAsyncThunk(
  "admin/fetchWeeklyMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${appConfig.BASE_URL}/api/metrics/weekly`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchMonthlyMetrics = createAsyncThunk(
  "admin/fetchMonthlyMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${appConfig.BASE_URL}/api/metrics/monthly`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loginStatus: "idle",
    createStatus: "idle",
    metricsStatus: "idle",
    error: null,
    dailyMetrics: null,
    weeklyMetrics: null,
    monthlyMetrics: null,
    metrics: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state) => {
        state.loginStatus = "succeeded";
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })

      .addCase(adminLogout.fulfilled, (state) => {
        state.loginStatus = "idle";
      })

      .addCase(addAdmin.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(addAdmin.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      })

      .addCase(fetchMetrics.pending, (state) => {
        state.metricsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.metricsStatus = "succeeded";
        state.metrics = action.payload;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.metricsStatus = "failed";
        state.error = action.payload;
      })

      .addCase(fetchDailyMetrics.pending, (state) => {
        state.metricsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchDailyMetrics.fulfilled, (state, action) => {
        state.metricsStatus = "succeeded";
        state.dailyMetrics = action.payload;
      })
      .addCase(fetchDailyMetrics.rejected, (state, action) => {
        state.metricsStatus = "failed";
        state.error = action.payload;
      })

      .addCase(fetchWeeklyMetrics.pending, (state) => {
        state.metricsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchWeeklyMetrics.fulfilled, (state, action) => {
        state.metricsStatus = "succeeded";
        state.weeklyMetrics = action.payload;
      })
      .addCase(fetchWeeklyMetrics.rejected, (state, action) => {
        state.metricsStatus = "failed";
        state.error = action.payload;
      })

      .addCase(fetchMonthlyMetrics.pending, (state) => {
        state.metricsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchMonthlyMetrics.fulfilled, (state, action) => {
        state.metricsStatus = "succeeded";
        state.monthlyMetrics = action.payload;
      })
      .addCase(fetchMonthlyMetrics.rejected, (state, action) => {
        state.metricsStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;

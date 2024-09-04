import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "../../appConfig";

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

export const fetchMetrics = createAsyncThunk("fetchMetrics", async () => {
  const response = await axios.get(`${appConfig.BASE_URL}/api/admin/metrics`);
  return response.data.data;
});

export const fetchDailyMetrics = createAsyncThunk(
  "fetchDailyMetrics",
  async () => {
    const response = await axios.get(`${appConfig.BASE_URL}/api/metrics/daily`);
    return response.data;
  }
);

export const fetchWeeklyMetrics = createAsyncThunk(
  "fetchWeeklyMetrics",
  async () => {
    const response = await axios.get(
      `${appConfig.BASE_URL}/api/metrics/weekly`
    );
    return response.data;
  }
);

export const fetchMonthlyMetrics = createAsyncThunk(
  "fetchMonthlyMetrics",
  async () => {
    const response = await axios.get(
      `${appConfig.BASE_URL}/api/metrics/monthly`
    );
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loginStatus: "idle",
    error: null,
    dailyMetrics: null,
    weeklyMetrics: null,
    monthlyMetrics: null,
    metrics: null,
    metricsStatus: "idle",
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
      })

      .addCase(fetchMetrics.pending, (state) => {
        state.metricsStatus = "loading";
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.metricsStatus = "succeeded";
        state.metrics = action.payload;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.metricsStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchDailyMetrics.pending, (state) => {
        state.metricsStatus = "loading";
      })
      .addCase(fetchDailyMetrics.fulfilled, (state, action) => {
        state.metricsStatus = "succeeded";
        state.dailyMetrics = action.payload;
      })
      .addCase(fetchDailyMetrics.rejected, (state, action) => {
        state.metricsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchWeeklyMetrics.pending, (state) => {
        state.metricsStatus = "loading";
      })
      .addCase(fetchWeeklyMetrics.fulfilled, (state, action) => {
        state.metricsStatus = "succeeded";
        state.weeklyMetrics = action.payload;
      })
      .addCase(fetchWeeklyMetrics.rejected, (state, action) => {
        state.metricsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMonthlyMetrics.pending, (state) => {
        state.metricsStatus = "loading";
      })
      .addCase(fetchMonthlyMetrics.fulfilled, (state, action) => {
        state.metricsStatus = "succeeded";
        state.monthlyMetrics = action.payload;
      })
      .addCase(fetchMonthlyMetrics.rejected, (state, action) => {
        state.metricsStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Box, Button, Container, Typography } from "@mui/material";
import {
  fetchDailyMetrics,
  fetchWeeklyMetrics,
  fetchMonthlyMetrics,
  adminLogout,
} from "../../redux/slices/adminSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dailyMetrics, weeklyMetrics, monthlyMetrics, metricsStatus, error } =
    useSelector((state) => state.admin);
  const isAdmin = sessionStorage.getItem("Admin");

  useEffect(() => {
    dispatch(fetchDailyMetrics());
    dispatch(fetchWeeklyMetrics());
    dispatch(fetchMonthlyMetrics());
  }, [dispatch]);

  if (metricsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (metricsStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  const options = {
    scales: {
      y: {
        min: 0,
        max: 20,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const dataDaily = {
    labels: dailyMetrics?.dates || [],
    datasets: [
      {
        label: "Daily Successes",
        data: dailyMetrics?.successCounts || [],
        backgroundColor: "#4caf50",
      },
      {
        label: "Daily Errors",
        data: dailyMetrics?.errorCounts || [],
        backgroundColor: "#f44336",
      },
    ],
  };

  const dataWeekly = {
    labels: weeklyMetrics?.weeks || [],
    datasets: [
      {
        label: "Weekly Successes",
        data: weeklyMetrics?.successCounts || [],
        backgroundColor: "#4caf50",
      },
      {
        label: "Weekly Errors",
        data: weeklyMetrics?.errorCounts || [],
        backgroundColor: "#f44336",
      },
    ],
  };

  const dataMonthly = {
    labels: monthlyMetrics?.months || [],
    datasets: [
      {
        label: "Monthly Successes",
        data: monthlyMetrics?.successCounts || [],
        backgroundColor: "#4caf50",
      },
      {
        label: "Monthly Errors",
        data: monthlyMetrics?.errorCounts || [],
        backgroundColor: "#f44336",
      },
    ],
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("Admin");
    dispatch(adminLogout());
    setTimeout(() => {
      navigate("/admin/login");
    }, 200);
  };

  if (!isAdmin) {
    navigate("/clients");
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" align="center" mb="40px">
          Admin Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Typography variant="h6" align="center">
            Daily Metrics
          </Typography>
          <Bar data={dataDaily} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Typography variant="h6" align="center">
            Weekly Metrics
          </Typography>
          <Bar data={dataWeekly} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Typography variant="h6" align="center">
            Monthly Metrics
          </Typography>
          <Bar data={dataMonthly} options={options} />
        </Box>
      </Box>
      <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
        <Button onClick={() => handleAdminLogout()}>Admin Logout</Button>
        <Button onClick={() => navigate("/clients")}>Clients</Button>
      </Box>
    </Container>
  );
};

export default AdminDashboard;

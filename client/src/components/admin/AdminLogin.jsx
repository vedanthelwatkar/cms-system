import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/slices/adminSlice";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginStatus, error } = useSelector((state) => state?.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }));
  };

  useEffect(() => {
    if (loginStatus === "succeeded") {
      navigate("/admin");
      sessionStorage.setItem("Admin", "true");
    } else if (loginStatus === "failed") {
      console.log("Login failed:", error?.message);
    }
  }, [loginStatus, error, navigate]);

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
        component="form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Typography variant="h5" align="center">
          Admin Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {loginStatus === "failed" && (
          <Typography color="error" align="center" variant="body2">
            {error?.message || "Invalid credentials. Please try again."}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Button
          sx={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={() => navigate("/clients")}
        >
          Clients
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;

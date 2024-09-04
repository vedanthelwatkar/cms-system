import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../../redux/slices/adminSlice";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createStatus, error } = useSelector((state) => state?.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAdmin({ email, password }));
  };

  useEffect(() => {
    if (createStatus === "succeeded") {
      navigate("/admin/login");
    } else if (createStatus === "failed") {
      console.log("Admin creation failed:", error?.message);
    }
  }, [createStatus, error, navigate]);

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
          Create Admin
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
        {createStatus === "failed" && (
          <Typography color="error" align="center" variant="body2">
            {error?.message || "Failed to create admin. Please try again."}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Create Admin
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

export default AdminCreate;

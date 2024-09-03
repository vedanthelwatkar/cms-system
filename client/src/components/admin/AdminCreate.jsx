import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../../redux/slices/adminSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createStatus, error } = useSelector((state) => state?.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    dispatch(addAdmin({ email, password }));
    navigate("/admin/login");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
          {error.message}
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
    </Box>
  );
};

export default AdminCreate;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUser } from "../../redux/slices/userSlice";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("All fields are required");
      return;
    }
    try {
      await dispatch(addUser({ name, email, phone, clientId }));
      navigate(`/users/${clientId}`);
    } catch (err) {
      setError("Failed to add user");
    }
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h5" align="center">
        Add User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          margin="normal"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/clients`)}
          >
            Go Back
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddUser;

// src/components/client/AddClient.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClient } from "../../redux/slices/clientSlice";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addClient({ name, industry, contactInfo })).unwrap();
      navigate("/clients"); // Redirect to client list page after adding
    } catch (error) {
      setError(error.message || "Failed to add client");
    }
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h4">Add Client</Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Industry"
          variant="outlined"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Contact Info"
          variant="outlined"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          margin="normal"
          required
        />
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            Add Client
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

export default AddClient;

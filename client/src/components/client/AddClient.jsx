import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClient } from "../../redux/slices/clientSlice";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

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
      dispatch(addClient({ name, industry, contactInfo }));
      navigate("/clients");
    } catch (error) {
      setError(error.message || "Failed to add client");
    }
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h5" align="center">
        Add Client
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Industry"
          variant="outlined"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Contact Info"
          variant="outlined"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            Submit
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

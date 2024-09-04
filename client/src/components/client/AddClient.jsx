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
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (name.length <= 2)
      newErrors.name = "Name must be more than 2 characters";
    if (industry.length <= 2)
      newErrors.industry = "Industry must be more than 2 characters";
    if (contactInfo.length <= 6)
      newErrors.contactInfo = "Contact Info must be more than 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await dispatch(addClient({ name, industry, contactInfo })).unwrap();
        navigate("/clients");
      } catch (error) {
        setApiError(error.message || "Failed to add client");
      }
    }
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h5" align="center">
        Add Client
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
          required
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          label="Industry"
          variant="outlined"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          margin="normal"
          fullWidth
          required
          error={Boolean(errors.industry)}
          helperText={errors.industry}
        />
        <TextField
          label="Contact Info"
          variant="outlined"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          margin="normal"
          fullWidth
          required
          error={Boolean(errors.contactInfo)}
          helperText={errors.contactInfo}
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
      {apiError && (
        <p style={{ color: "red", marginTop: "16px" }}>{apiError}</p>
      )}
    </Container>
  );
};

export default AddClient;

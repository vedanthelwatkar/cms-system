import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateClient } from "../../redux/slices/clientSlice";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const EditClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [clientData, setClientData] = useState({
    name: "",
    industry: "",
    contactInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (clientData.name.length <= 2)
      newErrors.name = "Name must be more than 2 characters";
    if (clientData.industry.length <= 2)
      newErrors.industry = "Industry must be more than 2 characters";
    if (clientData.contactInfo.length <= 6)
      newErrors.contactInfo = "Contact Info must be more than 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await dispatch(updateClient({ id, clientData })).unwrap();
        navigate("/clients");
      } catch (error) {
        setApiError(error.message || "Failed to edit client");
      }
    }
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h5" align="center">
        Edit Client
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          label="Name"
          name="name"
          value={clientData.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Industry"
          name="industry"
          value={clientData.industry}
          onChange={handleChange}
          error={Boolean(errors.industry)}
          helperText={errors.industry}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Contact Info"
          name="contactInfo"
          value={clientData.contactInfo}
          onChange={handleChange}
          error={Boolean(errors.contactInfo)}
          helperText={errors.contactInfo}
        />
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Update
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

export default EditClient;

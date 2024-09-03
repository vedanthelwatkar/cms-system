import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateClient } from "../../redux/slices/clientSlice";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const EditClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { client } = location.state || {};

  const [clientData, setClientData] = useState({
    name: "",
    industry: "",
    contactInfo: "",
  });

  useEffect(() => {
    if (client) {
      setClientData(client);
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateClient({ id: client._id, clientData }));
    navigate("/clients");
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h4">Edit Client</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="Name"
          name="name"
          value={clientData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Industry"
          name="industry"
          value={clientData.industry}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Contact Info"
          name="contactInfo"
          value={clientData.contactInfo}
          onChange={handleChange}
        />
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
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
    </Container>
  );
};

export default EditClient;

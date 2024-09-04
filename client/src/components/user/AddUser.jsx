import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUser } from "../../redux/slices/userSlice";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientId } = useParams();

  const validate = () => {
    const newErrors = {};
    if (name.length <= 2)
      newErrors.name = "Name must be more than 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email must be valid";
    if (phone.length !== 10 || isNaN(phone))
      newErrors.phone = "Phone number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await dispatch(addUser({ name, email, phone, clientId })).unwrap();
        navigate(`/users/${clientId}`);
      } catch (err) {
        setApiError("Failed to add user");
      }
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
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Phone"
          variant="outlined"
          margin="normal"
          fullWidth
          value={phone}
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
        />
        {apiError && (
          <Typography color="error" sx={{ marginTop: "16px" }}>
            {apiError}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
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

export default AddUser;

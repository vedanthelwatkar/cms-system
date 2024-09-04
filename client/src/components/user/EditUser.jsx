import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUser } from "../../redux/slices/userSlice";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (userData.name.length <= 2)
      newErrors.name = "Name must be more than 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
      newErrors.email = "Email must be valid";
    if (userData.phone.length !== 10 || isNaN(userData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await dispatch(updateUser({ id: user._id, userData })).unwrap();
        navigate("/users");
      } catch (err) {
        setApiError("Failed to update user");
      }
    }
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h5" align="center">
        Edit User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Phone"
          name="phone"
          type="number"
          value={userData.phone}
          onChange={handleChange}
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

export default EditUser;

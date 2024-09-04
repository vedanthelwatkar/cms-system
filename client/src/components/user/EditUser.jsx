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

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user._id, userData }));
    navigate("/users");
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
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Phone"
          name="phone"
          type="number"
          value={userData.phone}
          onChange={handleChange}
        />
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

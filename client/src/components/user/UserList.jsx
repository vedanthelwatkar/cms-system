import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Container,
  Box,
} from "@mui/material";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientId } = useParams();
  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers(clientId));
    }
  }, [dispatch, status, clientId]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    navigate(`/users/${clientId}/edit/${user._id}`, { state: { user } });
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h5" align="center">
        Users for Client {clientId}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/users/${clientId}/add`)}
          style={{ marginBottom: "16px" }}
        >
          Add User
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/clients`)}
          style={{ marginBottom: "16px" }}
        >
          Go Back
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleEdit(user)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;

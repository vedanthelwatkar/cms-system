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
import { adminLogout } from "../../redux/slices/adminSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientId } = useParams();
  const { users } = useSelector((state) => state.users);
  const isAdmin = sessionStorage.getItem("Admin");

  useEffect(() => {
    dispatch(fetchUsers(clientId));
  }, [dispatch, clientId]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    navigate(`/users/${clientId}/edit/${user._id}`, { state: { user } });
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("Admin");
    dispatch(adminLogout());
    setTimeout(() => {
      navigate("/admin/login");
    }, 200);
  };

  const handleAdminLogin = () => {
    sessionStorage.removeItem("Admin");
    navigate("/admin/login");
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
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/users/${clientId}/add`)}
          style={{
            marginBottom: "16px",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >
          Add User
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/clients`)}
          style={{
            marginBottom: "16px",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
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
            {users?.map((user) => (
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
                    disabled={!isAdmin}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(user._id)}
                    disabled={!isAdmin}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isAdmin ? (
        <Button
          sx={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={() => handleAdminLogout()}
        >
          Admin Logout
        </Button>
      ) : (
        <Button
          sx={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={() => handleAdminLogin()}
        >
          Admin Login
        </Button>
      )}
    </Container>
  );
};

export default UserList;

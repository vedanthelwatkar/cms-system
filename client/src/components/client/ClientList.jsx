import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, deleteClient } from "../../redux/slices/clientSlice";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Container,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import { adminLogout } from "../../redux/slices/adminSlice";

const ClientList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clients, status } = useSelector((state) => state.clients);
  const isAdmin = sessionStorage.getItem("Admin");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchClients());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteClient(id));
  };

  const handleViewUsers = (clientId) => {
    navigate(`/users/${clientId}`);
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
        Clients
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/clients/add`)}
          style={{
            marginBottom: "16px",
            marginTop: "30px",
          }}
        >
          Add Client
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((client) => (
              <TableRow key={client._id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.industry}</TableCell>
                <TableCell>{client.contactInfo}</TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      !isAdmin ? "Login as admin to access this action" : ""
                    }
                    arrow
                    disableHoverListener={isAdmin}
                  >
                    <span>
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => navigate(`/clients/edit/${client._id}`)}
                        style={{ marginRight: "8px", cursor: "pointer" }}
                        disabled={!isAdmin}
                      >
                        Edit
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip
                    title={
                      !isAdmin ? "Login as admin to access this action" : ""
                    }
                    arrow
                    disableHoverListener={isAdmin}
                  >
                    <span>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(client._id)}
                        disabled={!isAdmin}
                      >
                        Delete
                      </Button>
                    </span>
                  </Tooltip>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewUsers(client._id, client.name)}
                    style={{ marginLeft: "8px" }}
                  >
                    View Users
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

export default ClientList;

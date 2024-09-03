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
} from "@mui/material";

const ClientList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clients, status } = useSelector((state) => state.clients);

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

  return (
    <Container sx={{ padding: "16px" }}>
      <Typography variant="h4">Clients</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/clients/add`)}
        style={{ marginBottom: "16px" }}
      >
        Add Client
      </Button>
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
            {clients.map((client) => (
              <TableRow key={client._id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.industry}</TableCell>
                <TableCell>{client.contactInfo}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => navigate(`/clients/edit/${client._id}`)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(client._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewUsers(client._id)}
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
    </Container>
  );
};

export default ClientList;

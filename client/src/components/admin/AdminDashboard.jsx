import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "../../redux/slices/adminSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { useEffect } from "react";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { admins, status, error } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin._id}>
              <TableCell>{admin.username}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminDashboard;

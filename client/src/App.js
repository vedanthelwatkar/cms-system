import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientList from "./components/client/ClientList";
import AddClient from "./components/client/AddClient";
import EditClient from "./components/client/EditClient";
import UserList from "./components/user/UserList";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import AdminCreate from "./components/admin/AdminCreate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create-unique-key" element={<AdminCreate />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/add" element={<AddClient />} />
        <Route path="/clients/edit/:id" element={<EditClient />} />
        <Route path="/users/:clientId" element={<UserList />} />
        <Route path="/users/:clientId/add" element={<AddUser />} />
        <Route path="/users/:clientId/edit/:id" element={<EditUser />} />
        <Route path="*" element={<ClientList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

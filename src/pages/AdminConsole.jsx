import React from "react";
import '../admin.css';
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../components/admin-comonents/LayoutAdmin.jsx";
import AdminDashboard from "./AdminDashboard";
import ManageRooms from "./ManageRooms";
import Reviews from "./Reviews";
import GuestList from "./GuestList";

function AdminConsole() {
  //create Route
 console.log("admin console")
  return (
    <Routes>
      <Route path="/" element={<LayoutAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="rooms" element={<ManageRooms />} />
        <Route path="reviews" element={<Reviews />} /> 
        <Route path="guest-list" element={<GuestList />} />
      </Route>
    </Routes>
  );
}

export default AdminConsole;

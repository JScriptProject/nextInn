import React from "react";
import "@assets/css/admin.css";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "@admin/components/LayoutAdmin.jsx";
import AdminDashboard from "@admin/pages/AdminDashboard.jsx";
import ManageRooms from "@admin/pages/ManageRooms";
import Reviews from "@admin/pages/Reviews";
import GuestList from "@admin/pages/GuestList";

function AdminConsole() {
  //create Route
  return (
    <Routes>
      <Route path="/" element={<LayoutAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/rooms" element={<ManageRooms />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/guest-list" element={<GuestList />} />
      </Route>
    </Routes>
  );
}

export default AdminConsole;

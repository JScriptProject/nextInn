import React, { lazy, Suspense } from "react";
import "@assets/css/admin.css";

import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "@admin/components/LayoutAdmin.jsx";
import AdminDashboard from "@admin/pages/AdminDashboard.jsx";
import FullScreenLoader from "@component-support/FullScreenLoader";
const ManageRooms = lazy(() => import("@admin/pages/ManageRooms"));
const ManageReviews = lazy(() => import("@admin/pages/ManageReviews"));
const ManageBookings = lazy(() => import("@admin/pages/ManageBookings"));
import SuperAdminProtected from "@admin/components/admin-auth/SuperAdminProtected";
import ManageAdmins from "@admin/pages/ManageAdmins";
import Logs from "@admin/pages/Logs";

function AdminConsole() {
  //initiate a API call to get all room category
  //create Route
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="rooms" element={<ManageRooms />} />
          <Route path="superadmin" element={<SuperAdminProtected />}>
            <Route path="create-admin" element={<ManageAdmins />} />
            <Route path="logs" element={<Logs />} />
          </Route>
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AdminConsole;

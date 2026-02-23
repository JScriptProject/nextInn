import React,{lazy, Suspense} from "react";
import "@assets/css/admin.css";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "@admin/components/LayoutAdmin.jsx";
import AdminDashboard from "@admin/pages/AdminDashboard.jsx";
import FullScreenLoader from "@component-support/FullScreenLoader";
const ManageRooms = lazy(() => import("@admin/pages/ManageRooms"));
const Reviews = lazy(() => import("@admin/pages/Reviews"));
const GuestList = lazy(() => import("@admin/pages/GuestList"));
const ManageBookings = lazy(()=> import("@admin/pages/ManageBookings"));

function AdminConsole() {
//initiate a API call to get all room category



  //create Route
  return (
    <Suspense fallback={<FullScreenLoader />}>
    <Routes>
      <Route path="/" element={<LayoutAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/rooms" element={<ManageRooms />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/guest-list" element={<GuestList />} />
        <Route path="/bookings" element={<ManageBookings />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default AdminConsole;

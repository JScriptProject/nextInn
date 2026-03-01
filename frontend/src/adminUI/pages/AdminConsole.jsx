import React,{lazy, Suspense} from "react";
import "@assets/css/admin.css";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "@admin/components/LayoutAdmin.jsx";
import AdminDashboard from "@admin/pages/AdminDashboard.jsx";
import FullScreenLoader from "@component-support/FullScreenLoader";
const ManageRooms = lazy(() => import("@admin/pages/ManageRooms"));
const ManageReviews = lazy(() => import("@admin/pages/ManageReviews"));
const ManageBookings = lazy(()=> import("@admin/pages/ManageBookings"));
const SuperAdminProtected =  lazy(()=> import("@admin/components/admin-auth/SuperAdminProtected"));
const CreateAdmin = lazy(()=>import("@admin/pages/CreateAdmin"));
const Logs = lazy(()=>import("@admin/pages/Logs"));

function AdminConsole() {
//initiate a API call to get all room category



  //create Route
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/rooms" element={<ManageRooms />} />

          <Route path="/reviews" element={<ManageReviews />} />
          <Route path="/superadmin" element={<SuperAdminProtected />}>
            <Route path="/superadmin/create-admin" element={<CreateAdmin />} />
            <Route path="/superadmin/logs" element={<Logs />} />
          </Route>
          <Route path="/bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AdminConsole;

import React, { useState } from "react";
import adminImg from "../assets/media/admin-Dashboard.jpg";
import AdminDashboardCards from "../components/AdminDashboardCards";
import CategoryManagement from "../components/CategoryManagement";

function AdminDashboard() {
  const [errors, setErrors] = useState(null);
  return (
    <div className="admin-container">
      <div
        className="admin-header"
        style={{ backgroundImage: `url(${adminImg})` }}
      >
        <h1>We Manage NextInn</h1>
      </div>
      <div className="admin-body-container">
        <AdminDashboardCards />
        <CategoryManagement setErrors={setErrors} />
      </div>
    </div>
  );
}

export default AdminDashboard;

import React from "react";
import adminImg from "@assets/media/admin-Dashboard.jpg";
import AdminDashboardCards from "@admin/components/AdminDashboardCards";
import CategoryManagement from "@admin/components/CategoryManagement";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { useOutletContext } from "react-router-dom";
function AdminDashboard() {
  const context = useOutletContext();
  // Safely destructure context to avoid crashes if LayoutAdmin doesn't provide it
  const { isLoading, setCategories, categories } = context || {};
  if (isLoading) {
    return <FullScreenLoader />;
  }

  console.log("Admin Dashboard");
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
        {categories && (
          <CategoryManagement rooms={categories} setRooms={setCategories} />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

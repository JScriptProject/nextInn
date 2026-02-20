import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FullScreenLoader from "@component-support/FullScreenLoader.jsx";
import DashboardUser from "@user/pages/DashboardUser.jsx";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return isAuthenticated ? (
    <DashboardUser />
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

export default ProtectedRoute;

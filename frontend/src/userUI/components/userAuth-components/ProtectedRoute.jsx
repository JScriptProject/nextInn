import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { verifySession } from "@api/authenticationApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, setLoading } from "@redux/userSlice.js";
import FullScreenLoader from "@user/pages/FullScreenLoader.jsx";
import DashboardUser from "@user/pages/DashboardUser.jsx";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await verifySession();

        if (response.success && response.user) {
          dispatch(setUser(response.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };
    // Only check session if user is not authenticated and not loading
    // This prevents re-checking when we already have the user info.
    if (!isAuthenticated && user === null) {
      checkSession();
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch, isAuthenticated, user]);

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

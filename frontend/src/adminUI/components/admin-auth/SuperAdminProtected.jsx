import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { NotificationsContext } from "@user/context/NotificationsContext";

function SuperAdminProtected() {
  const { showNotification } = useContext(NotificationsContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminAthenticated, admin } = useSelector((state) => state.admin);
  console.log("SuperAdminProtected component is rendering");

  useEffect(() => {
    if (isAdminAthenticated) {
      console.log("User is authenticated, checking role...");
      if (admin?.role === "admin") {
        console.log("User is not a super-admin. Redirecting.");
        showNotification(
          true,
          false,
          "Can't access protected space. Redirecting to dashboard!"
        );
        const redirectTimer = setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 3000);
        return()=>{clearTimeout(redirectTimer)};
      } else {
        console.log("User is a super-admin. Access granted.");
      }
    } else {
      console.log("User is not authenticated. Redirecting to login.");
      showNotification(true, false, "You must be logged in to view this page.");
      navigate("/admin-login", { state: { from: location }, replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminAthenticated, admin, navigate]);

  // Render the nested route if the user is a super-admin
  if (isAdminAthenticated && admin?.role === "superadmin") {
    return <Outlet />;
  }

  // Render nothing (or a loader) while checks are being performed
  return null;
}

export default SuperAdminProtected;

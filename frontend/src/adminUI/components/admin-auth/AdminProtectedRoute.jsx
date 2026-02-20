import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAdmin, setAdmin } from "@redux/adminSlice";
import { Navigate, useLocation } from "react-router-dom";
import { verifyAdminSession } from "@api/adminAthenticationApi.js";
import FullScreenLoader from "@component-support/FullScreenLoader";

function AdminProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAdminAthenticated } = useSelector((state) => state.admin);

  useEffect(() => {
    console.log("inside the useeffect****");
    if (!isAdminAthenticated) {
      setIsLoading(true);
      refreshAdmin();
    }
    async function refreshAdmin() {
      console.log("Inside the refreshAdmin ***");
      try {
        const result = await verifyAdminSession();
        console.log("RESULT USEEFFECT =>", result);
        if (result.success) {
          dispatch(setAdmin(result.data));
        }
        if (!result.success) {
          dispatch(clearAdmin());
        }
      } catch (error) {
        console.error(error);
        dispatch(clearAdmin());
      } finally {
        setIsLoading(false);
      }
    }
  }, [isAdminAthenticated, dispatch]);

  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (isAdminAthenticated) {
    return children ? children : <Outlet />;
  } else {
    <Navigate to="/admin-login" state={{ from: location }} replace />;
  }
}

export default AdminProtectedRoute;

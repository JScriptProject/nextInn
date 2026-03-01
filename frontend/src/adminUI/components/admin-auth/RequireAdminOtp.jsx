import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function RequireAdminOtp() {
    const isOtpVerified = useSelector(
      (state) => state.admin.isOtpVerified
    );
    console.log("VERIFY ADMIN", isOtpVerified);
    if(!isOtpVerified)
    {
        return <Navigate to="/admin-verify" replace />;
    }
    return <Outlet />
}

export default RequireAdminOtp
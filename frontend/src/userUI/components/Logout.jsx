import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { userlogout } from "@api/authenticationApi.js";
import { adminLogout } from "@api/adminAthenticationApi.js";
import { clearUser } from "@redux/userSlice";
import { NotificationsContext } from "@user/context/NotificationsContext";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { clearAdmin } from "@redux/adminSlice";

function Logout({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationsContext);
  const location = useLocation();
  const fromPath = location.pathname || "/";
  console.log("LOCATION =>", location);
  const fromState = location.state;
  console.log("USER in LOGOUT =>", user);
  const onLogoutClick = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      if (user.role) {
        const response = await adminLogout();
        if (response.success) {
          dispatch(clearAdmin());
          navigate(fromPath, { replace: true, state: fromState });
          showNotification(true, true, response.message);
        } else {
          showNotification(true, false, response.message);
        }
      } else {
        const response = await userlogout();
        if (response.success) {
          dispatch(clearUser());
          navigate(fromPath, { replace: true, state: fromState });
          showNotification(true, true, response.message);
        } else {
          showNotification(true, false, response.message);
        }
      }
    } catch (error) {
      showNotification(true, false, error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <button onClick={onLogoutClick} className="logout-btn">
      Logout
    </button>
  );
}

export default Logout;

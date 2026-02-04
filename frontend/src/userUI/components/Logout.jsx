import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@api/authenticationApi.js";
import { clearUser, setLoading } from "@redux/userSlice";
import { NotificationsContext } from "@user/context/NotificationsContext";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationsContext);
  const location = useLocation();
  const fromPath = location.pathname || "/";
  console.log("LOCATION =>", location);
  const fromState = location.state;
  const onLogoutClick = async () => {
    try {
      dispatch(setLoading(true));
      const response = await logout();
      console.log(response);
      if (response.success) {
        dispatch(setLoading(false));
        dispatch(clearUser());
        navigate(fromPath, { replace: true, state:fromState });
        showNotification(true, true, "User logged out!");
      }
    } catch (error) {
      showNotification(true, false, error.message);
      console.log(error);
    }
  };

  return (
    <button onClick={onLogoutClick} className="logout-btn">
      Logout
    </button>
  );
}

export default Logout;

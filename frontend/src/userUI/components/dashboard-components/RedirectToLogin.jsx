import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@api/authenticationApi.js";
import { useDispatch } from "react-redux";
import { clearUser } from "@redux/userSlice";

const RedirectToLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginClick = async () => {
    const response = await logout();
    console.log("Logout Response =>", response);
    if (response.success) {
      console.log("LOGOUT in frontend");
      dispatch(clearUser());
      navigate("/login");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="redirect-container">
        <div className="redirect-wrapper">
          <h2 className="redirect-wrapper-title">
            Password Updated Successfully
          </h2>
          <p className="redirect-wrapper-description">
            To continue, you must log in.
          </p>
          <button onClick={handleLoginClick} className="btn-sm btn-outline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedirectToLogin;

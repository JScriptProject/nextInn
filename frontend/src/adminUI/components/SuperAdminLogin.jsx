
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAdmin, setAdmin, setAdminLoading } from "@redux/adminSlice";
import { superAdminLogin } from "@api/adminAthenticationApi.js";
import { useContext } from "react";
import { NotificationsContext } from "@user/context/NotificationsContext";
import FullScreenLoader from "@component-support/FullScreenLoader";

function SuperAdminLogin() {
  //state decalre

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //destructured variables
  const { email, password } = form;

  //redux store communication
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isAdminLoading, isAdminAthenticated } = useSelector(
    (state) => state.admin
  );

  //context variables
  const { showNotification } = useContext(NotificationsContext);

  //onchange
  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //onsubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setAdminLoading(true));

    try {
      const response = await superAdminLogin(form);
      
      if (response.success) {
        const admin = response.data;
        dispatch(setAdmin(admin));
        navigate("/admin", { replace: true });
        showNotification(true, true, response.message);
      } else {
        dispatch(clearAdmin());
        showNotification(true, false, response.message);
      }
    } catch (error) {
      console.error("Error while login into the admin panel", error);
      showNotification(true, false, error.message);
    } finally {
      dispatch(setAdminLoading(false));
    }
  };

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       if (!isAdminAthenticated) {
  //         const response = await verifyAdminSession();
  //         console.log("response back to component =>", response);
  //         if (response.success) {
  //           navigate("/admin", { replace: true });
  //           showNotification(true, true, response.message);
  //         } else {
  //           navigate("/admin-login", { replace: true });
  //           if(response.status === 520){
  //             showNotification(true, false, response.message);
  //           }
  //         }
  //       }

  //       if (isAdminAthenticated) {
  //         navigate("/admin", { replace: true });
  //         showNotification(true, true, response.message);
  //       }
  //     } catch (error) {
  //       console.error("Error in session validation");
  //       showNotification(true, false, error.message);
  //     } finally {
  //       console.log("inside admin finally");
  //       dispatch(setAdminLoading(false));
  //     }
  //   };
  //   checkSession();
  // }, []);

  if (isAdminLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="login-container">
      <div className="login-container-wrapper">
        <h2>Super Admin Login Panel</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email"
            required
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={onChange}
          />
          <button type="submit" className="btn-login btn-fill">
            Super Admin Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuperAdminLogin;

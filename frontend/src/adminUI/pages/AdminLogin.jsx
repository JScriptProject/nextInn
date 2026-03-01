import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAdmin, setAdmin, setAdminLoading } from "@redux/adminSlice";
import { loginAdmin, verifyAdminSession } from "@api/adminAthenticationApi.js";
import { useContext } from "react";
import { NotificationsContext } from "@user/context/NotificationsContext";
import FullScreenLoader from "@component-support/FullScreenLoader";

function AdminLogin() {
  //state decalre

  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  //destructured variables
  const { email, password, remember } = form;

  //redux store communication
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdminAthenticated } = useSelector(
    (state) => state.admin
  );

  //context variables
  const { showNotification } = useContext(NotificationsContext);

  //onchange
  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };
  //onsubmit
  const onSubmit = async (e) => {
    e.preventDefault();
   

    try {
       setIsLoading(true);
      const response = await loginAdmin(form);
      
      if (response.success) {
        const admin = response.data;
        console.log("RESPONSE =>", response);
        console.log("SET ADMIN HERE=>", admin);
        dispatch(setAdmin(admin));
        navigate("/admin", { replace: true });
        showNotification(true, true, response.message);
      } else {
        dispatch(clearAdmin());
        showNotification(true, false, response?.message);
      }
    } catch (error) {
      console.error("Error while login into the admin panel", error);
      showNotification(true, false, error.message);
    } finally {
       setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Here is the loading login useEffect");
    const checkSession = async () => {
      try {
         setIsLoading(true);
        if (!isAdminAthenticated) {
          const response = await verifyAdminSession();
          console.log("response back to component =>", response);
          if (response.success) {
            navigate("/admin", { replace: true });
            showNotification(true, true, response.message);
          } else {
            navigate("/admin-login", { replace: true });
            if(response.status === 520){
              showNotification(true, false, response.message);
            }
          }
        }

        if (isAdminAthenticated) {
          console.log("ADMIN AUTHENTICATED ---");
          navigate("/admin", { replace: true });
          showNotification(true, true, response.message);
        }
      } catch (error) {
        console.error("Error in session validation");
        showNotification(true, false, error.message);
      } finally {
        console.log("inside admin finally");
         setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="login-container">
      <div className="login-container-wrapper">
        <h2>Admin Login</h2>
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
          <div className="login-addon">
            <div className="remember-addon">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={onChange}
              />
              <label>Remember me</label>
            </div>
            <div className="forget-password">
              <Link to="/admin-forget">Forget password?</Link>
            </div>
          </div>
          <button type="submit" className="btn-login btn-fill">
            Admin Login
          </button>
          <p className="redirection">
            Onboarding new admin?{" "}
            <Link to="/admin-verify" className="highlight">
              Create Admin
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

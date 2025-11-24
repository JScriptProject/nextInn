import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, verifySession } from "../api/authenticationApi.js";
import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext.jsx";

function Login() {
  //state variables
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [message, setMessage] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  //destructured variables
  const { email, password, remember } = form;
  const navigate = useNavigate();

  //context variables
  const { notification, setNotification } = useContext(NotificationContext);

  //onChange event handler
  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };
  console.log(form);

  //submit event handler
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    console.log("FORM", form);
    if (result.success === true) {
      console.log("Result from backend", result);
      navigate("/dashboard-user");
      setNotification({
        visible: true,
        success: true,
        message: result.message,
      });
      setTimeout(() => {
        setNotification({ visible: false, success: false, message: "" });
      }, 3000);
    }
    if (result.success === false) {
      setNotification({
        visible: true,
        success: false,
        message: result.message,
      });
      setTimeout(() => {
        setNotification({ visible: false, success: false, message: "" });
      }, 3000);
    }
  };

  //useEffect to verify if active session

  useEffect(()=>{
     (async()=>{
      const response = await verifySession();
      if(response.success)
      {
        navigate("/dashboard-user");
      }
      else{
        setCheckingSession(false);
      }
     })();
  },[])

  if(checkingSession) return(<p>Checking the session....</p>)

  return (
    <div className="login-container">
      <div className="login-container-wrapper">
        <h2>Login</h2>
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
          {message && <p className="message">{message}</p>}
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
              <Link to="/forget">Forget password?</Link>
            </div>
          </div>
          <button type="submit" className="btn-login btn-fill">
            Login
          </button>
          <p className="redirection">
            Dont have an account?{" "}
            <Link to="/register" className="highlight">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

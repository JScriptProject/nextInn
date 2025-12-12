import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@api/authenticationApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, clearUser } from "@redux/userSlice";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { NotificationsContext } from "@user/context/NotificationsContext";
import { useContext } from "react";

function Login() {
  //state variables
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  //const [error, setError] = useState(""); **** dont want

  //destructured variables
  const { email, password } = form;

  //context variables
  const { showNotification } = useContext(NotificationsContext);

  //redux store communication
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  //onChange event handler
  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //submit event handler
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await login(form);

      // Access the actual API response data nested within the axios response
      if (response.success) {
        const user = response.user;

        dispatch(setUser(user)); // by default isAthenticated is true now
        navigate("/user-dashboard"); // Corrected path
        showNotification(true, true, response.message);
      } else {
        dispatch(clearUser());
        // The error message is also in the nested data object
        showNotification(true, false, response.message);
      }
    } catch (err) {
      dispatch(clearUser());
      showNotification(true, false, err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    console.log("Inside useEffect");
    console.log("isAthenticated =>", isAuthenticated);
    if (isAuthenticated) {
      console.log("Traing to navigate user-dashboard");
      navigate("/user-dashboard", { replace: true }); // Corrected path
    }
  }, [isAuthenticated]);

  if (isLoading || isAuthenticated) {
    return <FullScreenLoader />;
  }
  console.log("I am in login component");
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
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={onChange}
            value={password}
          />
          <div className="login-addon">
            <div className="forget-password">
              <Link to="/forget">Forget password?</Link>
            </div>
          </div>
          <button
            type="submit"
            className="btn-login btn-fill"
            disabled={isLoading}
          >
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../api/authenticationApi";
import { setUser, setLoading } from "../../redux/userSlice";
import FullScreenLoader from "./FullScreenLoader00";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // If user is already authenticated, redirect to the dashboard.
    if (isAuthenticated) {
      navigate("/user-dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(setLoading(true));
    try {
      const response = await login(formData);
      if (response.success) {
        dispatch(setUser(response.user));
        navigate("/user-dashboard");
      } else {
        setError(response.message || "Login failed!");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // While checking auth state or during login process, show loader.
  // Also, if already authenticated, this prevents the form from flashing before redirect.
  if (loading || isAuthenticated) {
    return <FullScreenLoader />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

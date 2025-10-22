import React, { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    city: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [isPasswordEdited, setIsPasswordEdited] = useState(false);
  const handleBlur = () => {
    if (password === confirm_password) {
      console.log("Password matched");
      setMessage("");
    } else {
      console.log("Password not matched");
      setMessage("Password not matched");
    }
  };
  const {
    firstname,
    lastname,
    email,
    mobile,
    city,
    password,
    confirm_password,
  } = form;

  const onChange = (e) => {
    const { name, value } = e.target;
    setTimeout(() => {
          setForm((prev) => ({ ...prev, [name]: value }));

    },400);

    if (name === "confirm_password") {
      if (password === confirm_password) {
        setTimeout(() => {
          console.log(form);
          setMessage("");
        }, 200);
      }
    }

    if (name === "confirm_password" && confirm_password.length === 2) {
      setIsPasswordEdited(true);
    }
  };
  console.log("ISEDITING =>", isPasswordEdited);
  console.log("Message=>", message);
  const handleSubmit = (e) => {
    e.preventDefault();
    // collected data object ready to send to API later
    const signupData = { ...form };
    console.log("Signup data:", signupData);
    // TODO: call API with signupData when ready
  };

  return (
    <div className="signup-container">
      <div className="signup-container-wrapper">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Fisrtname"
              name="firstname"
              onChange={onChange}
              value={firstname}
              required
            />
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              onChange={onChange}
              value={lastname}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              placeholder="Mobile number"
              name="mobile"
              onChange={onChange}
              value={mobile}
              required
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={onChange}
              value={city}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
            value={email}
            required
          />

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
              value={password}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirm_password"
              onBlur={handleBlur}
              onChange={onChange}
              value={confirm_password}
              required
            />
          </div>
          {isPasswordEdited && message && <p className="message">{message}</p>}
          <button type="submit" className="btn-signup btn-fill">
            Signup
          </button>
          <p className="redirection">
            You already have account?{" "}
            <Link to="/login" className="highlight">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

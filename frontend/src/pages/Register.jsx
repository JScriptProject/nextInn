import React, { useState } from "react";
import { Link } from "react-router-dom";
import {signup} from '../api/athenticationApi.js';
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
  

  const {
    firstname,
    lastname,
    email,
    mobile,
    city,
    password,
    confirm_password,
  } = form;

    const handleBlur = () => {

      if(!password || !confirm_password)
      {
        setMessage("");
        return;
      }

    if (password !== confirm_password) {
      console.log("Password matched");
      setMessage("Password not matched");
    } else {
      console.log("Password not matched");
      setMessage("");
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev)=>{
      const updated = {...prev, [name]: value };
      if(!updated.password && !updated.confirm_password)
      {
        setMessage("");
      }
      if(name==="confirm_password" && isPasswordEdited){
        if(updated.password ===updated.confirm_password)
        {
          setMessage("")
        }
      }
      return updated;
    })
      
    if(name === "confirm_password" && !isPasswordEdited)
    {
      setIsPasswordEdited(true);
    }
    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const result = await signup(form);
    console.log("Signup Result",result);
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
              className={message ? "red-border": ""}
              required
            />
          </div>
          {isPasswordEdited && message && <p className="message">{message}</p>}
          <button type="submit" className="btn-signup btn-fill" disabled={message}>
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

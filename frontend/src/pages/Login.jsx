import React,{useState} from "react";
import { Link } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
      email:"",
      password:"",
      remember:false
    });
    const [message, setMessage] = useState("");
    const {email, password, remember} = form;

  const onChange =(e)=>{
     setForm((prev)=> ({...prev, [e.target.name]: e.target.type === "checkbox" ? e.target.checked:e.target.value}));
  }
  console.log(form);
  const onSubmit = (e) => {
    e.preventDefault();
    // passowrd validation  
    if(password.length < 8 )
    {
      console.log("Password shoild be atleat 8 character ");
    }
    console.log("FORM",form);
  };
  return (
    <div className="login-container">
      <div className="login-container-wrapper">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="email" name="email" required  onChange={onChange} />
          <input type="password" placeholder="password" name="password" required onChange={onChange} />
          {message && <p className="message">{message}</p>}
          <div className="login-addon">
            <div className="remember-addon">
              <input type="checkbox" name="remember" checked={remember} onChange={onChange}/>
              <label>Remember me</label>
            </div>
            <div className="forget-password">
              <Link to="/forget">Forget password?</Link>
            </div>
          </div>
          <button type="submit" className="btn-login btn-fill">Login</button>
          <p className="redirection">
            Dont have an account? <Link to="/register" className="highlight">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

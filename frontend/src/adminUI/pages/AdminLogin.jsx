import { set } from 'date-fns';
import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin, verifyAdminSession } from "@api/adminAthenticationApi";
import { useContext } from 'react';
import { NotificationsContext } from '@user/context/NotificationsContext';

function AdminLogin() {

  //state decalre

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
  const { notification, setNotification } = useContext(NotificationsContext);

  //onchange
  const onChange = (e) => {
    setForm((prev)=>({
      ...prev,[e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    }))
  }
  //onsubmit
   const onSubmit = async (e) => {
    e.preventDefault();
    const result = await loginAdmin(form);

    if(result.success === true)
    {
      console.log("Result from backend", result);
      navigate("/dashboard-admin");
      
      setNotification({
        visible: true,
        success: true,
        message: result.message,
      });
      setTimeout(() => {
        setNotification({ visible: false, success: false, message: "" });
      }, 3000);
    }
    if(result.success === false)
    {
         setNotification({
        visible: true,
        success: false,
        message: result.message,
      });
   setTimeout(()=>{
     setNotification({visible:false, success:false, message:""})
   })
    }
  }
  //useEffect

  useEffect(()=>{
    (async()=>{
      const response = await verifyAdminSession();
      if(response.success)
      {
        navigate("/dashboard-admin");
      }
      else
      {
        console.log("Setting the status session checking to false");
        setCheckingSession(false);
      } 
    })();
  },[])

  console.log("Checking Session=>", checkingSession);
   if(checkingSession) return (<p>Checking the admin session....</p> ) 

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
              <Link to="/admin-forget">Forget password?</Link>
            </div>
          </div>
          <button type="submit" className="btn-login btn-fill">
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin
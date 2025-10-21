import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const onSubmit=()=>{

  }
  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
          <input type="text" placeholder='email' name="email" required />
          <input type="password" placeholder='password' name="password" />
          <div className="login-addon">
            <div className="remember-addon">
              <input type="checkbox" name="remeber" />
              <label>Remember me</label>
            </div>
            <div className="forget-password">
              <Link to="/forget">Forget password?</Link>
            </div>
          </div>
           <button type='submit'>Login</button>
          <p>Dont have an account?{" "} <Link to="/register">Register</Link></p>
      </form>  
    </div>
  )
}

export default Login
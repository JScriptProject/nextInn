import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { verifySession } from '../../api/authenticationApi.js'
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../redux/userSlice.js';

function ProtectedRoute({children }) {

    const [authChecked, setAuthChecked] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const onSessionVerification = async () => {
           const response = await verifySession();
           if(response.success)
           {
            console.log("user information=>", response.user);
            const user= response.user;
            setAuthorized(true);
            dispatch(setUser({id:user._id,firstname:user.firstname, lastname:user.lastname, email:user.email, mobile:user.mobile, city:user.city }));
           }
           else
           {
            setAuthorized(false);
           }
           setAuthChecked(true);
        }
        onSessionVerification();
    },[])
    if(!authChecked) return (<p>Checking session......</p>)

  return (
    authorized ? children  : <Navigate to="/login" state={{from:location}} replace />
  )
}

export default ProtectedRoute
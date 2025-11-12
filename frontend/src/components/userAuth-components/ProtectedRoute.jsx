import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { verifySession } from '../../api/authenticationApi.js'

function ProtectedRoute({children }) {

    const [authChecked, setAuthChecked] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const onSessionVerification = async () => {
           const response = await verifySession();
           if(response.success)
           {
            console.log("user information=>", response.user);
            setAuthorized(true);
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
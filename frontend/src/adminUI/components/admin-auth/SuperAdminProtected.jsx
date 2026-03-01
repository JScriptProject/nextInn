import React from "react";
import { useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotificationsContext } from "@user/context/NotificationsContext";
function SuperAdminProtected() {
 
    const { showNotification }  = useContext(NotificationsContext);
    const navigate = useNavigate();
    const { isAdminAthenticated, admin } = useSelector((state) => state.admin);
 if(isAdminAthenticated)
 {
   if(admin.role ==="admin")
   {
    navigate("/admin");
    showNotification(true, false, "You can't access protected space..");
   }
   else{
    
   }
 }
 else
 {
    navigate("admin-login", {replace:true});
 }
  return <div>SuperAdminProtected</div>;
}

export default SuperAdminProtected;

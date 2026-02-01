import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@user/pages/HomePage.jsx";
import RoomDetails from "@user/pages/RoomDetails.jsx";
import BookingPage from "@user/pages/BookingPage.jsx";
import AdminConsole from "@admin/pages/AdminConsole.jsx";
import Layout from "@user/components/Layout.jsx";
import About from "@user/pages/About.jsx";
import Login from "@user/pages/Login.jsx";
import Register from "@user/pages/Register.jsx";
import ForgetPassword from "@user/pages/ForgetPassword.jsx";
import { NotificationsContextProvider } from "@user/context/NotificationsContext.jsx";
import NotificationBar from "@user/components/NotificationBar.jsx";
import DashboardUser from "@user/pages/DashboardUser.jsx";
import ProtectedRoute from "@user/components/userAuth-components/ProtectedRoute.jsx";
import AdminLogin from "@admin/pages/AdminLogin";
import { verifySession } from "@api/authenticationApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, setLoading } from "@redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import AdminVerify from "@admin/pages/AdminVerify"
import RequireAdminOtp from "@admin/components/admin-auth/RequireAdminOtp";
import SuperAdminLogin from "@admin/components/SuperAdminLogin";


function App() {
  //create Route
const {user, isAuthenticated, isLoading} = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  useEffect(()=>{
    const initiateSession = async()=>{
       try {
         dispatch(setLoading(true));
         const response = await verifySession();
         console.log("Response of verifySession", response);
         if(response.success && response.user){
           dispatch(setUser(response.user));
         }
         else{
           dispatch(clearUser());
         }
       } catch (error) {
         dispatch(clearUser());
       }
       finally{
         dispatch(setLoading(false));
       }
 
    }
    
     initiateSession();
    
   },[ dispatch])

   console.log("App IsLoading", isLoading);
   console.log("App Is Athenticated", isAuthenticated);
   console.log("App user", user);
  return (
    <NotificationsContextProvider>
      <NotificationBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        
            <Route path="/admin-verify" element={<AdminVerify />} />
            <Route element={<RequireAdminOtp />}>
                <Route path="/verify-admin/login" element={<SuperAdminLogin />} />
            </Route>
          

          {/* <Route
            path="/admin-create"
            element={
              <ProtectedCreateAdmin>
                <AdminSignup />
              </ProtectedCreateAdmin>
            }
          /> */}

          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <DashboardUser />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/admin/*" element={<AdminConsole />} />
      </Routes>
    </NotificationsContextProvider>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  //create Route
console.log("In the app");
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
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route
            path="/dashboard-user"
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

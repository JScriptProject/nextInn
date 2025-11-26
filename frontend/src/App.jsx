import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./userUI/pages/HomePage.jsx";
import RoomDetails from "./userUI/pages/RoomDetails.jsx";
import BookingPage from "./userUI/pages/BookingPage.jsx";
import AdminConsole from "./adminUI/pages/AdminConsole.jsx";
import Layout from "./userUI/components/Layout.jsx";
import About from "./userUI/pages/About.jsx";
import Login from "./userUI/pages/Login.jsx";
import Register from "./userUI/pages/Register.jsx";
import ForgetPassword from "./userUI/pages/ForgetPassword.jsx";
import { NotificationContextProvider } from "./userUI/context/NotificationContext.jsx";
import NotificationBar from "./userUI/components/NotificationBar.jsx";
import DashboardUser from "./userUI/pages/DashboardUser.jsx";
import ProtectedRoute from "./components/userAuth-components/ProtectedRoute.jsx";

function App() {
  //create Route

  return (
    <NotificationContextProvider>
      <NotificationBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
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
    </NotificationContextProvider>
  );
}

export default App;

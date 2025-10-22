import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import AdminConsole from "./pages/AdminConsole.jsx";
import Layout from "./components/Layout.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";

function App() {
  //create Route

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<ForgetPassword />} />
      </Route>
      <Route path="/admin/*" element={<AdminConsole />} />
    </Routes>
  );
}

export default App;

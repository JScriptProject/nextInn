import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import AdminAddRoom from "./pages/AdminAddRoom.jsx";
import Layout from "./components/Layout.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";

function App() {
  //create Route

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/admin/add-room" element={<AdminAddRoom />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;

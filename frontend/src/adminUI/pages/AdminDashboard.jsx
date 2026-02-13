import React, { useState, useEffect } from "react";
import adminImg from "@assets/media/admin-Dashboard.jpg";
import AdminDashboardCards from "@admin/components/AdminDashboardCards";
import CategoryManagement from "@admin/components/CategoryManagement";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { getAllRoomsCategory } from "@api/roomsCategoryApi.js";

function AdminDashboard() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
   const [rooms, setRooms] = useState([]);

 useEffect(() => {
   (async () => {
     try {
      setIsLoading(true);
       const roomsData = await getAllRoomsCategory();
       console.log("Here is the data", roomsData);
       if(roomsData.success)
       {
        setIsLoading(false);
       }
       setRooms(roomsData.data);

     } catch (error) {
       console.error("failed to fetch rooms:", error);
       setErrors(error.message);
       setLocalErrors(error.message);
     }
   })();
 }, []);

 if(isLoading)
 {
  return(<FullScreenLoader />)
 }

  return (
    <div className="admin-container">
      <div
        className="admin-header"
        style={{ backgroundImage: `url(${adminImg})` }}
      >
        <h1>We Manage NextInn</h1>
      </div>
      <div className="admin-body-container">
        <AdminDashboardCards />
        <CategoryManagement
          setErrors={setErrors}
          rooms={rooms}
          setRooms={setRooms}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;

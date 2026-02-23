import React, { useState, useEffect } from "react";
import adminImg from "@assets/media/admin-Dashboard.jpg";
import AdminDashboardCards from "@admin/components/AdminDashboardCards";
import CategoryManagement from "@admin/components/CategoryManagement";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { useLocation, useOutletContext } from "react-router-dom";
function AdminDashboard() {
  
  const location = useLocation();
  const { isLoading, setCategories, categories } =
    useOutletContext();
  console.log("Admin Data =>", location.state?.admin);
  console.log("Admin state =>", location.state);
//  useEffect(() => {
//    (async () => {
//      try {
//       setIsLoading(true);
//        const roomsData = await getAllRoomsCategory();
//        console.log("Here is the data", roomsData);
//        if(roomsData.success)
//        {
//         setIsLoading(false);
//        }
//        setRooms(roomsData.data);

//      } catch (error) {
//        console.error("failed to fetch rooms:", error);
//        setErrors(error.message);
//        setLocalErrors(error.message);
//      }
//    })();
//  }, []);

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
          rooms={categories}
          setRooms={setCategories}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;

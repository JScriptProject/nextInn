import React, { useEffect, useState } from "react";
import AdminHeader from "@admin/components/AdminHeader";
import { Outlet } from "react-router-dom";
import Footer from "@user/components/Footer";
import { useContext } from "react";
import { NotificationsContext } from "@user/context/NotificationsContext";
import { getAllRoomsCategory } from "@api/roomsCategoryApi.js";

function LayoutAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showNotification } = useContext(NotificationsContext); 
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const roomsData = await getAllRoomsCategory();
        if (roomsData.success) {
          setCategories(roomsData.data);
        } else {
          showNotification(true, false, roomsData.message);
        }
      } catch (error) {
        console.error("failed to fetch rooms:", error);
        showNotification(true, false, error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <AdminHeader />
      <Outlet
        context={{ isLoading, setIsLoading, categories }}
      />
      <Footer />
    </>
  );
}

export default LayoutAdmin;

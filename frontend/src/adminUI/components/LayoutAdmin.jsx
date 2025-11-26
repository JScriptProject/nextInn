import React from "react";
import AdminHeader from "@admin/components/AdminHeader";
import { Outlet } from "react-router-dom";
import Footer from "@user/components/Footer";
function LayoutAdmin() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default LayoutAdmin;

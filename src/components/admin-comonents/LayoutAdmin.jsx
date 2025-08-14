import React from "react";
import AdminHeader from "./AdminHeader";
import {Outlet} from 'react-router-dom';
import Footer from "../Footer";
function LayoutAdmin() {
  return(
    <>
    <AdminHeader />
        <Outlet />
    <Footer />
    </>
  );
}

export default LayoutAdmin;

import React from "react";
import UsersHeader from "@user/components/UsersHeader";
import {Outlet} from 'react-router-dom';
import Footer from "@user/components/Footer";
function Layout() {
  return(
    <>
    <UsersHeader />
     <main>
        <Outlet />
     </main>
    <Footer />
    </>
  );
}

export default Layout;

import React from "react";
import UsersHeader from "./UsersHeader";
import {Outlet} from 'react-router-dom';
import Footer from "./Footer";
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

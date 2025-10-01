import React from "react";
import Header from "../Header";

function AdminHeader() {
  const websiteHeader = {
    webNav: [
      { to: "/admin", label: "Dasboard" },
      { to: "/admin/guest-list", label: "Guest" },
      { to: "/admin/rooms", label: "Rooms" },
      { to: "/admin/reviews", label: "Reviews" },
    ],
    login:null,
  };
  return <>
    <Header websiteHeader = {websiteHeader}  />
  </>;
}

export default AdminHeader;

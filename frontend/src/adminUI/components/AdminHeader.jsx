import React from "react";
import Header from "@user/components/Header";
import { useSelector } from "react-redux";

function AdminHeader() {
  const {admin} = useSelector((state)=>state.admin);
  console.log("ADMIN FROM STORE =>", admin);
  const websiteHeader = {
    webNav: [
      { to: "/admin", label: "Dasboard" },
      { to: "/admin/guest-list", label: "Guest" },
      { to: "/admin/rooms", label: "Rooms" },
      { to: "/admin/reviews", label: "Reviews" },
    ],
    login: null,
    user:admin
  };
  return (
    <>
      <Header websiteHeader={websiteHeader} />
    </>
  );
}

export default AdminHeader;

import React from "react";
import Header from "@user/components/Header";
import { useSelector } from "react-redux";

function AdminHeader() {
  const { admin } = useSelector((state) => state.admin);
  const websiteHeader = {
    webNav: [
      { to: "/admin", label: "Dasboard" },
      { to: "/admin/rooms", label: "Rooms" },
      { to: "/admin/reviews", label: "Reviews" },
      { to: "/admin/bookings", label: "Bookings" },
      {
        to: "/admin/superadmin/create-admin",
        label: "Create-Admin",
        highlight: true,
      },
      { to: "/admin/superadmin/logs", label: "Logs", highlight: true },
    ],
    login: null,
    user: admin,
  };
  return (
    <>
      <Header websiteHeader={websiteHeader} />
    </>
  );
}

export default AdminHeader;

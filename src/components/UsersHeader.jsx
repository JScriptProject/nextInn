import React from "react";
import Header from "./Header";

function UsersHeader() {
  const websiteHeader = {
    webNav: [
      { to: "/", label: "Home" },
      { to: "/admin", label: "Admin - Console" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
    login: [
      { to: "/login", label: "Sign In", btnClass:"btn btn-sm btn-outline" },
      { to: "/book", label: "Book Now", btnClass:"btn btn-sm  btn-fill" },
    ],
  };
  return <>
    <Header websiteHeader = {websiteHeader}  />
  </>;
}

export default UsersHeader;

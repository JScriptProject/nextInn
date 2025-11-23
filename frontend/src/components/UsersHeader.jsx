import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

function UsersHeader() {

  const user = useSelector((state)=> state.user);
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
    user:user,
  };
  return <>
    <Header websiteHeader = {websiteHeader}  />
  </>;
}

export default UsersHeader;

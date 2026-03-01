import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logout from "@user/components/Logout";

function UserLoggedInHeader({ user }) {

  const [isHovered, setIsHovered] = useState(false);
  const { firstname } = user || {};
  const { name } = user || {}
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  
  
  return (
    <div className="relative">
      <div className="absolute text-[0.6rem] text-amber-400 left-1/2 -translate-x-1/2 -top-4">
        {user.role === "superadmin" ? "SuperAdmin" : ""}
      </div>
      <div
        className="user-container flex flex-row md:flex-col gap-3 md:gap-1 items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="img-avatar w-[35px] h-[35px]">
          <img
            src="https://res.cloudinary.com/dbwtdkirs/image/upload/v1763907749/user-avatar_uxhwys.png"
            alt=""
            className="rounded-full"
          />
        </div>
        {firstname ? (
          <h4 className="text-amber-50 text-sm">{firstname}</h4>
        ) : (
          <h4 className="text-amber-50 text-sm relative">{name}</h4>
        )}

        <div className="icon-right"></div>
      </div>
      {isHovered && (
        <div
          className="user-avatar-hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            to={isAdminPath ? "/admin" : "/user-dashboard"}
            className="user-avatar-hover-dashboard"
          >
            Dashboard
          </Link>
          <Logout user={user} />
        </div>
      )}
    </div>
  );
}

export default UserLoggedInHeader;

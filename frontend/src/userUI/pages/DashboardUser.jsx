import React from "react";
import { useSelector } from "react-redux";

function DashboardUser() {
  // Correctly select the nested user object from the Redux state.
  const { user } = useSelector((state) => state.user);

  // If for any reason the user data isn't available yet, show a loading message.
  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="bg-green-400 p-8">
      <h1 className="text-2xl font-bold">
        Hello, you are on the User Dashboard
      </h1>
      <p>ID: {user.id}</p>
      <p>
        Name: {user.firstname} {user.lastname}
      </p>
      <p>Mobile: {user.mobile}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.city}</p>
    </div>
  );
}

export default DashboardUser;

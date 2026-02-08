import React from "react";
import { useSelector } from "react-redux";

function BookingSuccess({ onClosePopUp }) {

  const {user} = useSelector((state)=> state.user)

  console.log("user", user);
  return (
    <div className="booking-success">
      <div className="booking-success-wrapper">
        <h2>Booking Successfull</h2>
        <p>
          Thanks for booking a hotel with us{" "}
          <span className="font-bold">{user.firstname}</span> . We have sent a
          confirmation email to <span className="font-bold"> {user.email}</span>
          .
        </p>
        <button onClick={onClosePopUp}>Okay</button>
      </div>
    </div>
  );
}

export default BookingSuccess;

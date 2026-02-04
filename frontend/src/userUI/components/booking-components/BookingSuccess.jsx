import React from "react";

function BookingSuccess({ onClosePopUp, formState }) {
 
  return (
    <div className="booking-success">
      <div className="booking-success-wrapper">
        <h2>Booking Successfull</h2>
        <p>Thanks for booking a hotel with us Rahul. We have sent a confirmation email to email.</p>
        <button onClick={onClosePopUp}>Okay</button>
      </div>
    </div>
  );
}

export default BookingSuccess;

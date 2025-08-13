import React from "react";

function BookingSuccess({ onClosePopUp, formState }) {
  console.log(formState[formState.length - 1].Name);
  const guestName = formState[formState.length - 1].Name;
  const guestEmail = formState[formState.length - 1].Email;


  return (
    <div className="booking-success">
      <div className="booking-success-wrapper">
        <h2>Booking Successfull</h2>
        <p>Thanks for booking a hotel with us, {guestName}. We have sent a confirmation email to {guestEmail}.</p>
        <button onClick={onClosePopUp}>Okay</button>
      </div>
    </div>
  );
}

export default BookingSuccess;

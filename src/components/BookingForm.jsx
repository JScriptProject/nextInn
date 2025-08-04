import React from "react";
import CheckInOutInput from "./CheckInOutInput";
import ReserveCheckBox from "./ReserveCheckBox";
import CounterInput from "./CounterInput";


function BookingForm() {
  return (
    <form action={"/book"}>
      <div className="form-header">
        <h2>Reserve</h2>
        <h3>
          from <span>$20</span> night
        </h3>
        <div className="input-group">
          <CheckInOutInput text="Check In" />
          <CheckInOutInput text="Check Out" />
        </div>
        <div className="input-group">
          <CounterInput />
          <CounterInput />
        </div>
        <div className="input-group">
          <CounterInput />
          <CounterInput />
        </div>
        <h2>Extra Services</h2>
        <div className="input-group">
          <ReserveCheckBox
            title="Pet-Friendly Amenities"
            price={10}
            qItem="Room"
          />
          <ReserveCheckBox title="Sauna/Steam Room" price={25} qItem="Room" />
          <ReserveCheckBox
            title="Laundry and Cleaning"
            price={30}
            qItem="Guest"
          />
        </div>
        <div className="input-group">
            <h2>Total Cost</h2> 
             <h2>$205</h2>
        </div>
      </div>
      <button>Book Your Stay</button>
    </form>
  );
}

export default BookingForm;

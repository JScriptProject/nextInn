import React, { useEffect, useRef, useState, useContext } from "react";
import CheckInOutInput from "./CheckInOutInput";
import ReserveCheckBox from "./ReserveCheckBox";
import CounterInput from "./CounterInput";
import {BookingContext } from "../assets/context/BookingContext";
function BookingForm({ hotelRate }) {
  const [stickyForm, setStickyForm] = useState("up");
  let lastScrollRef = useRef(window.scrollY);

  useEffect(() => {
    function handleScroll() {
      let currentScroll = window.scrollY;
      const direction = currentScroll > lastScrollRef.current ? "down" : "up";
      setStickyForm(direction);
      lastScrollRef.current = currentScroll;
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollRef.current]);

 
  // Booking form data capture
 const {bookingData,setBookingData} = useContext(BookingContext);

 useEffect(()=>{
 setBookingData(prevData => (
    {...prevData,
    rate: hotelRate, 
  }));
 },[hotelRate]) 
console.log(bookingData);
  function handleBookingFormSubmit(FormData) {
    console.log(FormData.get("Rooms"));
  }
  return (
    <div
      className={
        stickyForm === "down"
          ? "booking-form-container stickyDown"
          : "booking-form-container stickyUp"
      }
    >
      <form className="booking-form" action={handleBookingFormSubmit}>
        <div className="form-header">
          <h2>Reserve</h2>
          <h3
            style={{ fontFamily: "Roboto" }}
            className="flex flex-row items-center gap-[5px]"
          >
            from <span>₹{hotelRate}</span> night
          </h3>
        </div>
        <div className="input-group">
          <CheckInOutInput text="Check In" name="checkIn" />
          <CheckInOutInput text="Check Out" name="checkOut" />
        </div>
        <div className="input-group">
          <CounterInput text="Adults" name="adults" />
          <CounterInput text="Children" name="children" />
        </div>
        <div className="input-group ">
          <CounterInput text="Rooms" name="rooms" />

          <CounterInput text="Extra Bed" name="extraBed" />
        </div>
        <h2>Extra Services</h2>
        <div className="input-group input-group-checkbox">
          <ReserveCheckBox
            title="Pet-Friendly Amenities"
            price={550}
            qItem="Room"
            name="petFriendly"
          />
          <ReserveCheckBox
            title="Sauna/Steam Room"
            price={720}
            qItem="Room"
            name="steamRoom"
          />
          <ReserveCheckBox
            title="Laundry and Cleaning"
            price={250}
            qItem="Guest"
            name="laundry"
          />
        </div>
        <div className="input-group input-group-totalCost">
          <h2>Total Cost</h2>
          <h2 style={{ fontFamily: "Roboto" }}>
            <span>₹</span>205
          </h2>
        </div>

        <button className="booking-form-button">Book Your Stay</button>
      </form>
    </div>
 
  );
}

export default BookingForm;

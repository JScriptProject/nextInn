import React, { useEffect, useRef, useState, useContext } from "react";
import CheckInOutInput from "./CheckInOutInput";
import ReserveCheckBox from "./ReserveCheckBox";
import CounterInput from "./CounterInput";
import { BookingContext } from "../assets/context/BookingContext";
import { rateCalculation } from "../data/rooms.js";
import { createPortal } from "react-dom";

function BookingForm({ hotelRate, roomCapacity, hotelName, roomId }) {
  // Booking form data capture
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [totalPrice, setTotalPrice] = useState(rateCalculation(bookingData));
  const [formModal, setFormModal] = useState({isModalOpen:false, message:"", isError:false});

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

  useEffect(() => {
    setBookingData((prevData) => ({ ...prevData, rate: hotelRate }));
  }, [hotelRate]);

  useEffect(() => {
    rateCalculation(bookingData, roomCapacity);

    // const price = rateCalculation(bookingData);
    // setTotalPrice(price);
  }, [bookingData]);


  function handleBookingFormSubmit(FormData) {
    console.log(FormData.get("Rooms"));
  }
  console.log("Room Capacity", roomCapacity);
  if(!roomCapacity)
  {
    console.log("Room capacity is underfined");
    return null;
  }
  return (
    
    <div
      className={
        stickyForm === "down"
          ? "booking-form-container stickyDown"
          : "booking-form-container stickyUp"
      }
    >
      {formModal.isModalOpen && createPortal(
        <p className={formModal.isError ? "errorModal" : "warningModal"}>{formModal.message}</p>,
        document.getElementById("portal")
      )}


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
          <CheckInOutInput text="Check In" name="checkIn" setFormModal={setFormModal} />
          <CheckInOutInput text="Check Out" name="checkOut" setFormModal={setFormModal}  />
        </div>
        <div className="input-group">
          <CounterInput text="Adults" name="adults"  maxCount={roomCapacity.adults} maxExtraCount={roomCapacity.maxExtraAdults} extraCharge = {roomCapacity.extraAdultCharges} setFormModal={setFormModal} />


          <CounterInput text="Children" name="children" maxCount= {roomCapacity.children} maxExtraCount = {roomCapacity.maxExtraChildren} extraCharge = {roomCapacity.extraChildCharges} setFormModal={setFormModal} />
        </div>
        <div className="input-group ">
          <CounterInput
            text="Rooms"
            name="rooms"
            availableRooms={roomCapacity.available_rooms} 
            extraCharge={hotelRate} setFormModal={setFormModal} 
          />

          <CounterInput text="Extra Bed" name="bed" maxExtraCount= {roomCapacity.maxExtraBed} extraCharge = {roomCapacity.extraBedCharge} 
          maxCount={roomCapacity.bed}
        
          setFormModal={setFormModal} />
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
            <span>₹</span>{totalPrice}
          </h2>
        </div>

        <button className="booking-form-button">Book Your Stay</button>
      </form>
    </div>
  );
}

export default BookingForm;

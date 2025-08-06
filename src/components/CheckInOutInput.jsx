import React, { useState, useContext } from "react";
import { BookingContext } from "../assets/context/BookingContext";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
function CheckInOutInput({ text, name }) {
  
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range ,setRange]  = useState([{ startDate: bookingData.checkIn ? new Date(bookingData.checkIn) : new Date(),
      endDate: bookingData.checkOut ? new Date(bookingData.checkOut) : new Date(),
      key: "selection",},]);
  // function handleDateChange(e) {
  //   const dateType = e.target.name;
  //   const dateDiff =
  //     (new Date(e.target.value) - new Date(bookingData.checkIn)) /
  //     (1000 * 60 * 60 * 24);
  //   if (dateDiff < 0) {
  //     if (dateType === "checkIn") {
  //       console.error("Oppss seleceted future date");
  //     } else {
  //       console.error("Checkout Date should be larger than chekin date");
  //     }
  //   }

  //   if (dateDiff >= 0) {
  //     if (dateType === "checkIn") {
  //       setBookingData({ ...bookingData, [dateType]: e.target.value });
  //     }
  //     if (dateType === "checkOut") {
  //       console.log("Executed");
  //       setBookingData({
  //         ...bookingData,
  //         [dateType]: e.target.value,
  //         days: dateDiff + 1,
  //       });
  //     }
  //   }
  // }

  console.log(bookingData);

    const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setRange([ranges.selection]);
    setBookingData({
      ...bookingData,
      checkIn: format(startDate, "yyyy-MM-dd"),
      checkOut: format(endDate, "yyyy-MM-dd"),
      days:
        Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1,
    });
    setOpenCalendar(false); // hide calendar after selection
  };
  return (
    <div className="input-subgroup">
      <label htmlFor={text}>{text}</label>
      <div className="input-calendar-wrapper" onClick={() => setOpenCalendar(!openCalendar)}>
        <input
          type="text"
          readOnly
          value={
            bookingData.checkIn && bookingData.checkOut
              ? `${bookingData.checkIn} to ${bookingData.checkOut}`
              : ""
          }
          placeholder="Select check-in & check-out"
        />
        <span className="calendar-icon">📅</span>
      </div>
      {openCalendar && (
        <div className="date-range-popup">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
            minDate={new Date()}
          />
        </div>
      )}
    </div>
  );
}

export default CheckInOutInput;

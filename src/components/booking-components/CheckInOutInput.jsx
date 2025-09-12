import React, { useState, useContext, useRef, useEffect } from "react";
import { BookingContext } from "../../assets/context/BookingContext.jsx";
import { formatDateForInput } from "../../data/rooms.js";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";

function CheckInOutInput({ text, name, setFormModal }) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const calenderRef = useRef();

  const handleSelect = (ranges) => {
    const rangeSelected = ranges.selection;
    const daysBooking = Math.abs(
      (new Date(rangeSelected.startDate) - new Date(rangeSelected.endDate)) /
        (1000 * 60 * 60 * 24)
    );
    if (daysBooking >= 30) {
      setFormModal({isModalOpen:true, message:`Opps! you tried booking for ${daysBooking} maximum 30 days booking allowed as of now.`, isError:true});
      setTimeout(()=>{
        setFormModal({isModalOpen:false, message:"", isError:false});
      }, 3000);
      return;
    }
    setRange([ranges.selection]);
    setBookingData((prevData) => ({
      ...prevData,
      checkIn: formatDateForInput(rangeSelected.startDate),
      checkOut: formatDateForInput(rangeSelected.endDate),
      days: Math.abs(
        (new Date(rangeSelected.startDate) - new Date(rangeSelected.endDate)) /
          (1000 * 60 * 60 * 24)
      ),
    }));
    if (
      rangeSelected.startDate &&
      rangeSelected.endDate &&
      rangeSelected.startDate.getTime() !== rangeSelected.endDate.getTime()
    ) {
      setOpenCalendar(false);
    }
  };

  //close the calender pop-up when user clicks outside of the pop-up
  useEffect(() => {
    function handlePopUpClose(event) {
      if (openCalendar && !calenderRef.current.contains(event.target)) {
        setOpenCalendar(false);
      }
    }
    document.addEventListener("mousedown", handlePopUpClose);

    return () => {
      document.removeEventListener("mousedown", handlePopUpClose);
    };
  }, [openCalendar]);

  return (
    <div className="input-subgroup" ref={calenderRef}>
      <label htmlFor={text}>{text}</label>
      <div
        className="input-calendar-wrapper"
        onClick={() => setOpenCalendar(!openCalendar)}
      >
        <input
          type="text"
          readOnly
          value={
            name === "checkIn" ? bookingData.checkIn : bookingData.checkOut
          }
          placeholder={
            name === "checkIn" ? "Select check-in" : "Select check-out"
          }
        />
        <span className="calendar-icon">📅</span>
      </div>
      {openCalendar && (
        <div className="date-range-popup">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="vertical"
            ranges={range}
            showDateDisplay={true}
            showSelectionPreview={true}
            minDate={new Date()}
          />
        </div>
      )}
    </div>
  );
}

export default CheckInOutInput;

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

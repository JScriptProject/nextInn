import React, { createContext, useState } from "react";
import { formatDateForInput } from "/src/data/rooms";
export const BookingContext = createContext();

const todayDate = formatDateForInput(new Date());

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    roomId: "",
    hotelName: "",
    rate: "",
    checkIn: todayDate,
    checkOut: todayDate,
    days: 1,
    rooms: 1,
    adults: 1,
    children: 0,
    bed:0,
    addonServices: { petFriendly: false, steamRoom: false, laundry: false },
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

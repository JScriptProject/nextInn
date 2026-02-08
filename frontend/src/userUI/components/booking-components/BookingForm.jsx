import React, { useEffect, useRef, useState, useContext } from "react";
import CheckInOutInput from "@user/components/booking-components/CheckInOutInput";
import ReserveCheckBox from "@user/components/booking-components/ReserveCheckBox";
import CounterInput from "@user/components/booking-components/CounterInput";
import { BookingContext } from "@user/context/BookingContext";
import { rateCalculation } from "@utils/rateCalculation.js";
import { createPortal } from "react-dom";
import PreviewBooking from "@user/components/booking-components/PreviewBooking";
// Ensure this path is correct relative to your file structure
import { useAvailability } from "../../../hooks/useAvailability";

function BookingForm({
  categoryId,
  hotelRate,
  roomCapacity,
  addonServicesCharges,
}) {
  // states
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [totalPrice, setTotalPrice] = useState(0); // Init with 0 to prevent NaN
  const [prizeBreakDown, setPrizBreakDown] = useState([]);

  const [formModal, setFormModal] = useState({
    isModalOpen: false,
    message: "",
    isError: false,
  });

  const [stickyForm, setStickyForm] = useState("up");
  const [isBookingPreviewOpen, setIsBookingPreviewOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const bookingPreviewRef = useRef();

  // --- HOOK INTEGRATION ---
  const { availability, loading: availabilityLoading } = useAvailability(
    categoryId,
    bookingData.checkIn,
    bookingData.checkOut
  );

  let lastScrollRef = useRef(window.scrollY);

  // Scroll effect
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
  }, []);

  // Update context when rate changes
  useEffect(() => {
    setBookingData((prevData) => ({ ...prevData, rate: hotelRate }));
  }, [hotelRate]);

  // Price Calculation
  useEffect(() => {
    if (roomCapacity) {
      const [totalCost, prizeBreakDown] = rateCalculation(
        bookingData,
        roomCapacity,
        addonServicesCharges
      );
      setTotalPrice(totalCost);
      setPrizBreakDown(prizeBreakDown);
    }
  }, [bookingData, roomCapacity, addonServicesCharges]);

  // Capacity Guard (Auto-correct selected rooms)
  useEffect(() => {
    // FIX: Use Strict Equality and Logical AND (&&)
    if (availability !== null && bookingData.rooms > availability) {
      setBookingData((prev) => ({
        ...prev,
        rooms: Math.max(1, availability),
      }));
      setFormModal({
        isModalOpen: true,
        message: `Only ${availability} rooms available for these dates.`,
        isError: true,
      });
      setTimeout(() => {
        setFormModal({ isModalOpen: false, message: "", isError: false });
      }, 4000);
    }
  }, [availability, bookingData.rooms]);

  // If room details aren't loaded yet, show skeleton
  if (!roomCapacity) {
    return <h3>Form Data loading...</h3>;
  }

  // --- Handlers ---
  function handleCheckBoxInput(name, checkStatus) {
    setBookingData((prevData) => ({
      ...prevData,
      addonServices: {
        ...prevData.addonServices,
        [name]: checkStatus,
      },
    }));

    if (checkStatus) {
      setFormModal({
        isModalOpen: true,
        message: `${name} added to your booking`,
        isError: false,
      });
      setTimeout(() => {
        setFormModal({ isModalOpen: false, message: "", isError: false });
      }, 2000);
    }
  }

  function handleBookingFormSubmitPreview() {
    const breakdownMap = prizeBreakDown.reduce((acc, item) => {
      acc[item.label] = item.amount;
      return acc;
    }, {});

    setPayload({
      category: categoryId,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      totalAmount: totalPrice,
      guestDetails: {
        adults: bookingData.adults,
        children: bookingData.children,
        roomsCount: bookingData.rooms,
        extraBed: bookingData.bed,
      },
      priceBreakdown: {
        baseRoomCharge: bookingData.rate,
        extraGuestCharges: {
          onlyRoom: breakdownMap.days || bookingData.rate,
          adults: breakdownMap.adults || 0,
          children: breakdownMap.children || 0,
          extraBed: breakdownMap.extraBed || 0,
          addonRooms: breakdownMap.rooms || 0,
        },
        addonServicesCharges: {
          petFriendly: breakdownMap.petFriendly || 0,
          steamRoom: breakdownMap.steamRoom || 0,
          laundry: breakdownMap.laundry || 0,
        },
      },
    });
    setIsBookingPreviewOpen(true);
  }

  function onClosePreview() {
    setIsBookingPreviewOpen(false);
  }

  // Determine Real-Time Limit
  const realTimeAvailableRooms =
    availability !== null ? availability : roomCapacity?.availableRooms || 0;
  const isInvalidDateRange = bookingData.checkIn === bookingData.checkOut;
 
 return (
   <div
     className={
       stickyForm === "down"
         ? "booking-form-container stickyDown"
         : "booking-form-container stickyUp"
     }
   >
     {/* Modal Portal */}
     {formModal.isModalOpen &&
       createPortal(
         <p className={formModal.isError ? "errorModal" : "warningModal"}>
           {formModal.message}
         </p>,
         document.getElementById("portal")
       )}

     {/* Preview Modal */}
     {isBookingPreviewOpen && (
       <PreviewBooking
         isBookingPreviewOpen={isBookingPreviewOpen}
         onClose={onClosePreview}
         ref={bookingPreviewRef}
         prizeBreakDown={prizeBreakDown}
         totalPrice={totalPrice}
         payload={payload}
       />
     )}

     {/* Form Content */}
     <form className="booking-form" action={handleBookingFormSubmitPreview}>
       <div className="form-header">
         <h2>Reserve</h2>
         <h3
           style={{ fontFamily: "Roboto" }}
           className="flex flex-row items-center gap-[5px]"
         >
           from <span>₹{hotelRate}</span> night
         </h3>
       </div>
       {/* Display a small availability status message */}
       <div className="!mb-4 block">
         {availabilityLoading ? (
           <p className="text-xs text-orange-500 mt-[-10px] mb-4">
             Checking availability...
           </p>
         ) : (
           availability !== null && (
             <p
               className={`text-md text-center mb-14 ${
                 availability > 0 ? "text-green-600" : "text-red-400"
               }`}
             >
               {availability > 0
                 ? `Hurry! Only ${availability} rooms left.`
                 : "Sold Out for these dates"}
             </p>
           )
         )}
       </div>
       <div className="input-group">
         <CheckInOutInput
           text="Check In"
           name="checkIn"
           setFormModal={setFormModal}
         />
         <CheckInOutInput
           text="Check Out"
           name="checkOut"
           setFormModal={setFormModal}
         />
       </div>

       <div className="input-group">
         <CounterInput
           text="Adults"
           name="adults"
           maxCount={roomCapacity?.adults ?? 0}
           maxExtraCount={roomCapacity?.maxExtraAdults ?? 0}
           extraCharge={roomCapacity?.extraAdultCharges ?? 0}
           setFormModal={setFormModal}
         />
         <CounterInput
           text="Children"
           name="children"
           maxCount={roomCapacity?.children ?? 0}
           maxExtraCount={roomCapacity?.maxExtraChildren ?? 0}
           extraCharge={roomCapacity?.extraChildCharges ?? 0}
           setFormModal={setFormModal}
         />
       </div>

       <div className="input-group ">
         <CounterInput
           text="Rooms"
           name="rooms"
           // Use real-time availability here
           availableRooms={realTimeAvailableRooms}
           extraCharge={hotelRate}
           setFormModal={setFormModal}
         />
         <CounterInput
           text="Extra Bed"
           name="bed"
           maxExtraCount={roomCapacity?.maxExtraBed ?? 0}
           extraCharge={roomCapacity?.extraBedCharge ?? 0}
           maxCount={0}
           setFormModal={setFormModal}
         />
       </div>

       <h2>Extra Services</h2>
       <div className="input-group input-group-checkbox ">
         <ReserveCheckBox
           title="Pet-Friendly Amenities"
           price={addonServicesCharges?.petFriendly}
           qItem="Room"
           name="petFriendly"
           handleCheckBoxInput={handleCheckBoxInput}
         />
         <ReserveCheckBox
           title="Sauna/Steam Room"
           price={addonServicesCharges?.steamRoom}
           qItem="Room"
           name="steamRoom"
           handleCheckBoxInput={handleCheckBoxInput}
         />
         <ReserveCheckBox
           title="Laundry and Cleaning"
           price={addonServicesCharges?.laundry}
           qItem="Guest"
           name="laundry"
           handleCheckBoxInput={handleCheckBoxInput}
         />
       </div>

       <div className="input-group input-group-totalCost">
         <h2>Total Cost</h2>
         <h2 style={{ fontFamily: "Roboto" }}>
           <span>₹</span>
           {totalPrice}
         </h2>
       </div>

       <button
         className="booking-form-button disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
         // Disable button if loading OR availability is explicitly 0
         disabled={
           availabilityLoading ||
           (availability !== null && availability === 0) ||
           isInvalidDateRange
         }
       >
         {availability !== null && availability === 0
           ? "Sold Out"
           : "Book Your Stay"}
       </button>
     </form>
   </div>
 );
}

export default BookingForm;

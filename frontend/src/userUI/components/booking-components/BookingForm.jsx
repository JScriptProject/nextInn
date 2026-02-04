import React, { useEffect, useRef, useState, useContext } from "react";
import CheckInOutInput from "@user/components/booking-components/CheckInOutInput";
import ReserveCheckBox from "@user/components/booking-components/ReserveCheckBox";
import CounterInput from "@user/components/booking-components/CounterInput";
import { BookingContext } from "@user/context/BookingContext";
import { rateCalculation } from "@utils/rateCalculation.js";
import { createPortal } from "react-dom";
import PreviewBooking from "@user/components/booking-components/PreviewBooking";

function BookingForm({ categoryId, hotelRate, roomCapacity, addonServicesCharges }) {
  // states
  const { bookingData, setBookingData } = useContext(BookingContext);

  const [totalPrice, setTotalPrice] = useState(() => {
    const [totalCost] = rateCalculation(bookingData, roomCapacity);
    return totalCost;
  });

  const [prizeBreakDown, setPrizBreakDown] = useState(() => {
    const [priceBreakDown] = rateCalculation(bookingData, roomCapacity);
    return priceBreakDown;
  });
  const [formModal, setFormModal] = useState({
    isModalOpen: false,
    message: "",
    isError: false,
  });

  const [stickyForm, setStickyForm] = useState("up");
  const [isBookingPreviewOpen, setIsBookingPreviewOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const bookingPreviewRef = useRef();

  let lastScrollRef = useRef(window.scrollY);
  console.log("prizeBreakDown=>", prizeBreakDown);
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
    if (roomCapacity) {
      const [totalCost, prizeBreakDown] = rateCalculation(
        bookingData,
        roomCapacity,
        addonServicesCharges
      );
      setTotalPrice(totalCost);
      setPrizBreakDown(prizeBreakDown);
    }
  }, [bookingData, roomCapacity]);

  if (!roomCapacity) {
    return <h3>Form Data loading...</h3>;
  }

  // when visitor decreaase the room count then adjust the other values
  useEffect(() => {
    if (
      bookingData.adults >
      (roomCapacity.adults + roomCapacity.maxExtraAdults) * bookingData.rooms
    ) {
      setBookingData((prevData) => ({
        ...prevData,
        adults: roomCapacity.adults * bookingData.rooms,
      }));
    }
    if (
      bookingData.children >
      (roomCapacity.children + roomCapacity.maxExtraChildren) *
        bookingData.rooms
    ) {
      setBookingData((prevData) => ({
        ...prevData,
        children: roomCapacity.children * bookingData.rooms,
      }));
    }
    if (bookingData.bed > roomCapacity.maxExtraBed * bookingData.rooms) {
      setBookingData((prevData) => ({
        ...prevData,
        bed: roomCapacity.maxExtraBed,
      }));
    }
  }, [bookingData]);
  console.log("Booking form=>", bookingData);
  function handleCheckBoxInput(name, checkStatus) {
    if (checkStatus) {
      setBookingData((prevData) => ({
        ...prevData,
        addonServices: { ...prevData.addonServices, [name]: true },
      }));
      setFormModal({
        isModalOpen: true,
        message: `${name} added to your booking`,
        isError: false,
      });
      setTimeout(() => {
        setFormModal({ isModalOpen: false, message: "", isError: false });
      }, 2000);
      return;
    }
    if (!checkStatus) {
      setBookingData((prevData) => ({
        ...prevData,
        addonServices: { ...prevData.addonServices, [name]: false },
      }));
    }
  }

  //Handle the booking preview Dailog
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
        baseRoomCharge: bookingData.rate, // Matches 'days' label
        extraGuestCharges: {
          onlyRoom: breakdownMap.days || bookingData.rate,
          adults: breakdownMap.adults || 0, // Matches 'adults' label
          children: breakdownMap.children || 0, // Matches 'children' label
          extraBed: breakdownMap.extraBed || 0, // Matches 'extraBed' label

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

  return (
    <div
      className={
        stickyForm === "down"
          ? "booking-form-container stickyDown"
          : "booking-form-container stickyUp"
      }
    >
      {formModal.isModalOpen &&
        createPortal(
          <p className={formModal.isError ? "errorModal" : "warningModal"}>
            {formModal.message}
          </p>,
          document.getElementById("portal")
        )}
      {isBookingPreviewOpen && (
        <PreviewBooking
          isBookingPreviewOpen={isBookingPreviewOpen}
          onClose={onClosePreview}
          ref={bookingPreviewRef}
          prizeBreakDown={prizeBreakDown}
          totalPrice={totalPrice}
          payload = {payload}
        />
      )}
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
            availableRooms={
              roomCapacity?.availableRooms ?? 0 - (bookingData.rooms ?? 0)
            }
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

        <button className="booking-form-button">Book Your Stay</button>
      </form>
    </div>
  );
}

export default BookingForm;

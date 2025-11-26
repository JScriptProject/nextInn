import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import PageBanner from "@user/components/PageBanner";
import RoomFeaturesIcon from "@user/components/RoomFeaturesIcon";
import ParallaxImageBox from "@user/components/ParallaxImageBox";

import RoomAmenities from "@user/components/booking-components/RoomAmenities";
import AvailabilityCalendar from "@user/components/booking-components/AvailabilityCalendar";
import BookingForm from "@user/components/booking-components/BookingForm";

import { BookingProvider } from "@user/context/BookingContext";

function RoomDetails() {
  const location = useLocation();
  const [room, setRoom] = useState(location.state || {});
  console.log("Location=>", location);
  console.log("Room=>", room);
  console.log("Room Capacity from room =>", room.roomCapacity);
  return (
    <BookingProvider>
      <div className="page-container">
        <PageBanner img={room.roomImages[0]} heading={room.name} />
        <div className="page-container-wrapper">
          <div className="room-details-section">
            <div className="room-info">
              <h2 className="page-title">{room.info}</h2>
              <RoomFeaturesIcon features={room.features} />
              <div className="room-description-container">
                <p className="room-desc">{room.description}</p>
              </div>
              <div className="room-details-images">
                <ParallaxImageBox imgSrc={room.roomImages[1]} />

                <div className="fixed-image">
                  <img src={room.bannerImg} alt={room.name} />
                </div>
              </div>
              <h3 className="page-internal-title">Room Amenities</h3>
              <RoomAmenities amenities={room.amenities} />
              <div className="sliding-moving-image">
                <ParallaxImageBox imgSrc={room.roomImages[2]} />
              </div>
            </div>
            <div className="room-features">
              <h3 className="page-internal-title">Room Features</h3>
              <div className="room-features-section">
                <ul>
                  <li>
                    <span></span>Children and extra beds
                  </li>
                  <li>
                    <span></span>Climate Control
                  </li>
                  <li>
                    <span></span>Art and Decor
                  </li>
                  <li>
                    <span></span>Coffee/Tea Maker
                  </li>
                  <li>
                    <span></span>High-End Bedding
                  </li>
                  <li>
                    <span></span>Smart Technology
                  </li>
                </ul>
                <p className="features-info room-desc">
                  Our elegantly appointed rooms and suites are designed to offer
                  the utmost in comfort and style. Each room features modern
                  amenities, plush furnishings, and thoughtful touches to ensure
                  a relaxing stay.
                </p>
              </div>
            </div>
            <div className="availability-calendar-container">
              <h3 className="page-internal-title">Availability Calendar</h3>
              <AvailabilityCalendar />
            </div>
          </div>

          <BookingForm
            addonServicesCharges={room.addonServicesCharges}
            roomId={room._id}
            hotelName={room.name}
            hotelRate={room.price}
            roomCapacity={room.roomCapacity}
          />
        </div>
      </div>
    </BookingProvider>
  );
}

export default RoomDetails;

import React from "react";
import PageBanner from "../components/PageBanner";
import { useLocation } from "react-router-dom";
import RoomAmenities from "../components/RoomAmenities";
import RoomFeaturesIcon from "../components/RoomFeaturesIcon";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import BookingForm from "../components/BookingForm";
import ParallaxImageBox from "../components/ParallaxImageBox";
import { BookingProvider } from "../assets/context/BookingContext";
function RoomDetails() {
  const location = useLocation();
  const room = location.state;
  return (
    <BookingProvider>
      <div className="page-container">
        <PageBanner img={room.images[0]} heading={room.name} />
        <div className="page-container-wrapper">
          <div className="room-details-section">
            <div className="room-info">
              <h2 className="page-title">{room.info}</h2>
              <RoomFeaturesIcon features={room.features} />
              <div className="room-description-container">
                {room.description.map((desc, index) => (
                  <p key={index} className="room-desc">
                    {desc}
                  </p>
                ))}
              </div>
              <div className="room-details-images">
                <ParallaxImageBox imgSrc={room.images[1]} />

                <div className="fixed-image">
                  <img src={room.bannerImg} alt={room.name} />
                </div>
              </div>
              <h3 className="page-internal-title">Room Amenities</h3>
              <RoomAmenities amenities={room.amenities} />
              <div className="sliding-moving-image">
                <ParallaxImageBox imgSrc={room.images[2]} />
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

          <BookingForm addonServicesCharges={room.addonServicesCharges} roomId= {room.id} hotelName ={room.name} hotelRate={room.price} roomCapacity={room.room_capacity} />
        </div>
      </div>
    </BookingProvider>
  );
}

export default RoomDetails;

import React from "react";
import PageBanner from "../components/PageBanner";
import { useLocation } from "react-router-dom";
import RoomAmenities from "../components/RoomAmenities";
import RoomFeaturesIcon from "../components/RoomFeaturesIcon";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import BookingForm from "../components/BookingForm";
import ParallaxImageBox from "../components/ParallaxImageBox";



function RoomDetails() {
  const location = useLocation();
  const room = location.state;
  console.log(room);
  return (
    <div className="page-container">
      <PageBanner img={room.images[0]} heading={room.name} />
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
            <ParallaxImageBox imgSrc = {room.images[1]} />
            
            <div className="fixed-image">
              <img src={room.bannerImg} alt={room.name} />
            </div>
            
          </div>
          <h3 className="page-internal-titles">Room Amenities</h3>
          <RoomAmenities amenities={room.amenities} />
          <div className="sliding-moving-image">
            <img src={room.images[2]} alt={room.name} />
          </div>
        </div>
        <div className="room-features">
          <h3 className="page-internal-titles">Room Features</h3>
          <div className="room-features-section">
            <ul>
              <li>Children and extra beds</li>
              <li>Climate Control</li>
              <li>Art and Decor</li>
              <li>Coffee/Tea Maker</li>
              <li>High-End Bedding</li>
              <li>Smart Technology</li>
            </ul>
            <p className="features-info">
              Our elegantly appointed rooms and suites are designed to offer the
              utmost in comfort and style. Each room features modern amenities,
              plush furnishings, and thoughtful touches to ensure a relaxing
              stay.
            </p>
          </div>
        </div>
        <div className="availability-calendar-container">
           <h3 className="page-internal-titles">Availability Calendar</h3>
          <AvailabilityCalendar />
        </div>
      </div>
      <div className="booking-form-container">
        <BookingForm />
      </div>
    </div>
  );
}

export default RoomDetails;

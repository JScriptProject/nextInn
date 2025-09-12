import React from "react";
import { Link } from "react-router-dom";
import { UserRound, IndianRupee } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle.jsx";
import { rooms } from "../data/rooms.js";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

function RoomsHomePage() {
  const swiperBreaks = {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  };
  return (
    <section>
      <div className="rooms-header-wrapper">
        <div className="section-title-wrap">
          <SectionTitle>
            <h4>Rooms</h4>
            <h2>Our Rooms</h2>
          </SectionTitle>
        </div>
        <div className="section-description">
          <p>
            Step into a space where sophistication meets serenity. Our rooms are
            thoughtfully curated to deliver both style and relaxation, featuring
            cozy bedding, premium linens, and a choice of pillows tailored to
            your perfect night's rest.
          </p>
        </div>
      </div>
      <div className="rooms-slider-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="rooms-swiper-container"
          breakpoints={swiperBreaks}
        >
          {rooms.map((room) => (
            <SwiperSlide
              key={room.id}
              className="room-swiper-slide"
              style={{
                backgroundImage: `url(${room.bannerImg})`,
              }}
            >
              <div className="room-slider-inside">
                <h3>{room.name}</h3>
                <h4>{room.location}</h4>
                <div className="room-guest-info">
                  <p>
                    <span>35</span>Feets Size
                  </p>
                  <p>
                    <UserRound /> 2 Guests
                  </p>
                </div>
                <p className="room-price">
                  <span>₹</span> {room.price}
                </p>
                <button className="room-swiper-book-btn">
                  <Link to = {`/rooms/${room.id}`} state={room}>Book Now</Link>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default RoomsHomePage;

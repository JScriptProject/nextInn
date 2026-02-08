import React from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "@user/components/SectionTitle";
// import { getAllRoomsCategory } // REMOVE THIS IMPORT
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Accept 'rooms' as a prop
function RoomsHomePage({ rooms }) {
  // REMOVE the useState and useEffect fetching logic from here completely.

  const swiperBreaks = {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  };

  return (
    <section id="our-rooms">
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
            thoughtfully curated to deliver both style and relaxation.
          </p>
        </div>
      </div>
      <div className="rooms-slider-container">
        {/* Added a check to prevent Swiper errors if data hasn't loaded */}
        {rooms && rooms.length > 0 ? (
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
            {rooms.map((room) => {
              return (
                <SwiperSlide
                  key={room._id}
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
                      <Link to={`/rooms/${room._id}`} state={room}>
                        Book Now
                      </Link>
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center py-10">Loading Luxury Rooms...</div>
        )}
      </div>
    </section>
  );
}

export default RoomsHomePage;

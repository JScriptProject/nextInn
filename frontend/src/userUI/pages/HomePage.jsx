import React, { useEffect, useState } from "react";
import Button from "@user/components/Button.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import { bannerSlides } from "@data/rooms.js";
import { bannerTimeline } from "@utils/animation.js";
import RoomsHomePage from "@user/components/RoomsHomePage.jsx";
import HomeAvailability from "@user/components/HomeAvailability.jsx"; // Import new component
import { getAllRoomsCategory } from "@api/roomsCategoryApi.js"; // Import API here

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function HomePage() {
  // 1. State for Rooms Data
  const [rooms, setRooms] = useState([]);

  // 2. Fetch Data Once Here
  useEffect(() => {
    (async () => {
      try {
        const roomsData = await getAllRoomsCategory();
        if(!roomsData.success)
        {
          throw new Error("Unable to fetch the data!");
        }
        setRooms(roomsData.data);
      } catch (error) {
        console.error("failed to fetch rooms:", error);
      }
    })();
  }, []);

  const handleSlideChange = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const subTitle = activeSlide.querySelector("h3");
    const title = activeSlide.querySelector("h1");
    const bannerBtn = activeSlide.querySelector(".banner-cta");
    bannerTimeline(subTitle, title, bannerBtn);
  };

  return (
    <div className="banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop={true}
        className="w-screen h-[800px]"
        onSlideChangeTransitionStart={handleSlideChange}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (
              swiper &&
              Array.isArray(swiper.slides) &&
              swiper.slides.length > swiper.activeIndex
            ) {
              const activeSlide = swiper.slides[swiper.activeIndex];
              const subTitle = activeSlide.querySelector("h3");
              const title = activeSlide.querySelector("h1");
              const bannerBtn = activeSlide.querySelector(".banner-cta");
              bannerTimeline(subTitle, title, bannerBtn);
            }
          }, 0);
        }}
      >
        {bannerSlides.map((bannerSlide, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className="banner-slider"
                style={{ backgroundImage: `url(${bannerSlide.image})` }}
              >
                <div className="slider-title">
                  <h3>{bannerSlide.subtitle}</h3>
                  <h1>{bannerSlide.title}</h1>
                </div>
                <div className="banner-cta">
                  <a href="#our-rooms">
                    <Button className="btn btn-lg btn-fill">Book Now</Button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 3. Pass rooms data down to children */}
      <RoomsHomePage rooms={rooms} />

      {/* 4. Add the new Availability Section */}
      <HomeAvailability rooms={rooms} />
    </div>
  );
}

export default HomePage;

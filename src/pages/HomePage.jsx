import React, { use, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import { bannerSlides } from "../data/rooms.js";
import { bannerTimeline } from "../animation.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function HomePage() {
  const handleSlideChange = (swiper) => {
 
      const activeSlide = swiper.slides[swiper.activeIndex];
      const subTitle = activeSlide.querySelector("h3");
      const title = activeSlide.querySelector("h1");
      const bannerBtn = activeSlide.querySelector(".banner-cta");
      bannerTimeline(subTitle, title, bannerBtn);
      console.log("slide changes");
  
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
          // Trigger animation on initial render
          setTimeout(() => {
            const activeSlide = swiper.slides[swiper.activeIndex];
            const subTitle = activeSlide.querySelector("h3");
            const title = activeSlide.querySelector("h1");
            const bannerBtn = activeSlide.querySelector(".banner-cta");
            bannerTimeline(subTitle, title, bannerBtn);
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
                  <h3 >{bannerSlide.subtitle}</h3>
                  <h1 >{bannerSlide.title}</h1>
                </div>
                <div className="banner-cta">
                  <Link to="/book">
                    <Button
                      className="btn btn-lg   btn-fill"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="next h-[500px] bg-amber-200"></div>
    </div>
  );
}

export default HomePage;

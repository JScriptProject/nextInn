// Banner images for homepage slider
import bannerImg1 from "../assets/media/hotel-banner-1.jpg";
import bannerImg2 from "../assets/media/hotel-banner-2.jpg";
import bannerImg3 from "../assets/media/hotel-banner-3.jpg";
import bannerImg4 from "../assets/media/hotel-banner-4.jpg";

// Room banner images
import metSuiteBanner from "../assets/media/rooms-images/Metropolitan Suite.jpg";
import deluxeBanner from "../assets/media/rooms-images/Premium Deluxe Room.jpg";
import twinSuiteBanner from "../assets/media/rooms-images/Twin Room Suite.jpg";
import execSuiteBanner from "../assets/media/rooms-images/Executive Suites.jpg";

// Single room images
import single1 from "../assets/media/rooms-images/single-room-imgs/single-room1.jpg";
import single2 from "../assets/media/rooms-images/single-room-imgs/single-room2.jpg";
import single3 from "../assets/media/rooms-images/single-room-imgs/single-room3.jpg";
import single4 from "../assets/media/rooms-images/single-room-imgs/single-room4.jpg";

// Double bed room images
import double1 from "../assets/media/rooms-images/double-bed-imgs/double-bed-1.jpg";
import double2 from "../assets/media/rooms-images/double-bed-imgs/double-bed-2.jpg";
import double3 from "../assets/media/rooms-images/double-bed-imgs/double-bed-3.jpg";
import double4 from "../assets/media/rooms-images/double-bed-imgs/double-bed-4.jpg";

// Twin room images
import twin1 from "../assets/media/rooms-images/twin-room-imgs/twin-room-1.jpg";
import twin2 from "../assets/media/rooms-images/twin-room-imgs/twin-room-2.jpg";
import twin3 from "../assets/media/rooms-images/twin-room-imgs/twin-room-3.jpg";
import twin4 from "../assets/media/rooms-images/twin-room-imgs/twin-room-4.jpg";

// Executive suite images
import suite1 from "../assets/media/rooms-images/suites-imgs/suites-img-1.jpg";
import suite2 from "../assets/media/rooms-images/suites-imgs/suites-img-2.jpg";
import suite3 from "../assets/media/rooms-images/suites-imgs/suites-img-3.jpg";
import suite4 from "../assets/media/rooms-images/suites-imgs/suites-img-4.jpg";

export const rooms = [
  {
    id: "rm001",
    name: "Metropolitan Suite",
    location: "Panjim, Goa",
    price: 2755,
    bannerImg: metSuiteBanner,
    images: [single1, single2, single3, single4],
  },
  {
    id: "rm002",
    name: "Premium Deluxe Room",
    location: "Mahim East, Mumbai",
    price: 3400,
    bannerImg: deluxeBanner,
    images: [double1, double2, double3, double4],
  },
  {
    id: "rm101",
    name: "Twin Room Suite",
    location: "Tarkarli, Malvan",
    price: 3900,
    bannerImg: twinSuiteBanner,
    images: [twin1, twin2, twin3, twin4],
  },
  {
    id: "rm202",
    name: "Executive Suites",
    location: "Mumbai, India",
    price: 6400,
    bannerImg: execSuiteBanner,
    images: [suite1, suite2, suite3, suite4],
  },
];

export const bannerSlides = [
  {
    subtitle: "Your journey to paradise begins here",
    title: "Discover Coastal Haven’s Warm and Peaceful Charm",
    image: bannerImg1,
  },
  {
    subtitle: "Where luxury meets the sea breeze",
    title: "Relax and Reconnect at Our Seaside Retreat",
    image: bannerImg2,
  },
  {
    subtitle: "Sun-kissed mornings, starlit nights",
    title: "Experience Unmatched Serenity by the Ocean Shore",
    image: bannerImg3,
  },
  {
    subtitle: "More than a stay — it’s an experience",
    title: "Luxury Living Surrounded by Nature’s Coastal Beauty",
    image: bannerImg4,
  },
];

import bannerImg1 from "../assets/media/hotel-banner-1.jpg";
import bannerImg2 from "../assets/media/hotel-banner-2.jpg";
import bannerImg3 from "../assets/media/hotel-banner-3.jpg";
import bannerImg4 from "../assets/media/hotel-banner-4.jpg";


export const rooms = [
  {
    id: "rm001",
    name: "Single Room",
    location: "Panjim, Goa",
    price: 2755,
    images: [
      "/src/assets/media/rooms-images/single-room-imgs/single-room1.jpg",
      "/src/assets/media/rooms-images/single-room-imgs/single-room2.jpg",
      "/src/assets/media/rooms-images/single-room-imgs/single-room3.jpg",
      "/src/assets/media/rooms-images/single-room-imgs/single-room4.jpg"
    ],
  },

  {
    id: "rm002",
    name: "Double Room",
    location: "Mahim East, Mumbai",
    price: 3400,
    images: [
      "/src/assets/media/rooms-images/double-bed-imgs/double-bed-1.jpg",
      "/src/assets/media/rooms-images/double-bed-imgs/double-bed-2.jpg",
      "/src/assets/media/rooms-images/double-bed-imgs/double-bed-3.jpg",
      "/src/assets/media/rooms-images/double-bed-imgs/double-bed-4.jpg"
    ],
  },{
    id: "rm101",
    name: "Twin Room",
    location: "Tarkarli, Malvan",
    price: 3900,
    images: [
      "/src/assets/media/rooms-images/twin-room-imgs/twin-room-1.jpg",
      "/src/assets/media/rooms-images/twin-room-imgs/twin-room-2.jpg",
      "/src/assets/media/rooms-images/twin-room-imgs/twin-room-3.jpg",
      "/src/assets/media/rooms-images/twin-room-imgs/twin-room-4.jpg",
    ],
  },
  {
    id: "rm202",
    name: "Executive Suites",
    location: "Mumbai, India",
    price: 6400,
    images: [
      "/src/assets/media/rooms-images/suites-imgs/suites-img-1.jpg",
      "/src/assets/media/rooms-images/suites-imgs/suites-img-2.jpg",
      "/src/assets/media/rooms-images/suites-imgs/suites-img-3.jpg",
      "/src/assets/media/rooms-images/suites-imgs/suites-img-4.jpg",
    ],
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
  }
];
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
    info: "City View Suite",
    description: [
      "Our Metropolitan Suite combines urban sophistication with coastal charm. Enjoy sweeping city views through large windows, unwind in spacious interiors, and experience true Goan hospitality.",
      "Treat yourself to fine dining at our rooftop restaurant, where modern flavors meet traditional Goan recipes in a chic, elevated setting.",
    ],
    features: [
      { icon: "users", text: "2 Guests" },
      { icon: "ruler", text: "35 Feet Size" },
      { icon: "link", text: "Connecting Rooms" },
      { icon: "bed-double", text: "1 King Bed" },
    ],
    amenities: [
      [
        { text: "Free Wifi", icon: "wifi" },
        { text: "Shower", icon: "shower-head" },
        { text: "Airport Transport", icon: "plane" },
      ],
      [
        { text: "Balcony", icon: "panel-top-open" },
        { text: "Refrigerator", icon: "fridge" },
        { text: "24/7 Support", icon: "headphones" },
      ],
      [
        { text: "Work Desk", icon: "laptop" },
        { text: "Fitness Center", icon: "dumbbell" },
        { text: "Swimming Pool", icon: "swimming" },
      ],
    ],
  },
  {
    id: "rm002",
    name: "Premium Deluxe Room",
    location: "Mahim East, Mumbai",
    price: 3400,
    bannerImg: deluxeBanner,
    images: [double1, double2, double3, double4],
    info: "Ocean View Room",
    description: [
      "Wake up to the sound of waves in our Premium Deluxe Room, perfectly positioned for stunning ocean views. With contemporary interiors and calming coastal tones, the room is designed for rest and relaxation.",
      "Enjoy fresh seafood and sunset cocktails at our beachfront grill.",
    ],

    features: [
      { icon: "users", text: "3 Guests" },
      { icon: "ruler", text: "40 Feet Size" },
      { icon: "link", text: "Connecting Rooms" },
      { icon: "bed-double", text: "2 Twin Beds" },
    ],
    amenities: [
      [
        { text: "Free Wifi", icon: "wifi" },
        { text: "Balcony", icon: "panel-top-open" },
        { text: "Refrigerator", icon: "fridge" },
      ],
      [
        { text: "Work Desk", icon: "laptop" },
        { text: "Shower", icon: "shower-head" },
        { text: "Fitness Center", icon: "dumbbell" },
      ],
      [
        { text: "24/7 Support", icon: "headphones" },
        { text: "Swimming Pool", icon: "swimming" },
        { text: "Airport Transport", icon: "plane" },
      ],
    ],
  },
  {
    id: "rm101",
    name: "Twin Room Suite",
    location: "Tarkarli, Malvan",
    price: 3900,
    bannerImg: twinSuiteBanner,
    images: [twin1, twin2, twin3, twin4],
    info: "Mountain View Room",
    description: [
      "Surround yourself with the peace of the mountains in our Twin Room Suite. Ideal for family or friends, this suite offers dual bedding, panoramic views of the Sahyadris, and a calm, airy design to match the serene outdoors.",
      "The perfect hideaway for nature lovers.",
    ],

    features: [
      { icon: "users", text: "2 Guests" },
      { icon: "ruler", text: "38 Feet Size" },
      { icon: "link", text: "Connecting Rooms" },
      { icon: "bed-double", text: "2 Twin Beds" },
    ],
    amenities: [
      [
        { text: "Free Wifi", icon: "wifi" },
        { text: "Balcony", icon: "panel-top-open" },
        { text: "24/7 Support", icon: "headphones" },
      ],
      [
        { text: "Work Desk", icon: "laptop" },
        { text: "Refrigerator", icon: "fridge" },
        { text: "Shower", icon: "shower-head" },
      ],
      [
        { text: "Fitness Center", icon: "dumbbell" },
        { text: "Swimming Pool", icon: "swimming" },
        { text: "Airport Transport", icon: "plane" },
      ],
    ],
  },
  {
    id: "rm202",
    name: "Executive Suites",
    location: "Mumbai, India",
    price: 6400,
    bannerImg: execSuiteBanner,
    images: [suite1, suite2, suite3, suite4],
    info: "Lake View Room",
    description: [
      "Enjoy refined comfort in our Executive Suites overlooking tranquil lakescapes. With premium amenities, a private workspace, and elegant modern décor, this suite is perfect for both business and leisure travelers.",
      "Dining options include curated chef’s menus with lakeside seating.",
    ],

    features: [
      { icon: "users", text: "2 Guests" },
      { icon: "ruler", text: "42 Feet Size" },
      { icon: "link", text: "Connecting Rooms" },
      { icon: "bed-double", text: "1 King Bed" },
    ],
    amenities: [
      [
        { text: "Free Wifi", icon: "wifi" },
        { text: "Work Desk", icon: "laptop" },
        { text: "Shower", icon: "shower-head" },
      ],
      [
        { text: "Balcony", icon: "panel-top-open" },
        { text: "Fitness Center", icon: "dumbbell" },
        { text: "Swimming Pool", icon: "swimming" },
      ],
      [
        { text: "24/7 Support", icon: "headphones" },
        { text: "Refrigerator", icon: "fridge" },
        { text: "Airport Transport", icon: "plane" },
      ],
    ],
  },
];

export function rateCalculation({
  rate,
  days,
  adults,
  children,
  rooms,
  extraBed,
  extra: { petFriendly, steamRoom, laundry },
}) {
  let totalCost = rate * days;

  if (adults > 1) {
  }

  return totalCost;
}

export function formatDateForInput(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

// export const rooms = [
//   {
//     id: "rm001",
//     name: "Metropolitan Suite",
//     location: "Panjim, Goa",
//     price: 2755,
//     bannerImg: metSuiteBanner,
//     images: [single1, single2, single3, single4],
//     info: "City View Suite",
//     description: [
//       "Our Metropolitan Suite combines urban sophistication with coastal charm. Enjoy sweeping city views through large windows, unwind in spacious interiors, and experience true Goan hospitality.",
//       "Treat yourself to fine dining at our rooftop restaurant, where modern flavors meet traditional Goan recipes in a chic, elevated setting."
//     ],
//     features: [
//       { icon: "users", text: "2 Guests" },
//       { icon: "ruler", text: "35 Feet Size" },
//       { icon: "link", text: "Connecting Rooms Available" },
//       { icon: "bed-double", text: "1 King Bed" }
//     ],
//   },
//   {
//     id: "rm002",
//     name: "Premium Deluxe Room",
//     location: "Mahim East, Mumbai",
//     price: 3400,
//     bannerImg: deluxeBanner,
//     images: [double1, double2, double3, double4],
//     info: "Ocean View Room",
//     description: [
//       "Wake up to the sound of waves in our Premium Deluxe Room, perfectly positioned for stunning ocean views. With contemporary interiors and calming coastal tones, the room is designed for rest and relaxation.",
//       "Enjoy fresh seafood and sunset cocktails at our beachfront grill."
//     ],
//     features: [
//       { icon: "users", text: "3 Guests" },
//       { icon: "ruler", text: "40 Feet Size" },
//       { icon: "link", text: "Connecting Rooms Available" },
//       { icon: "bed-double", text: "2 Twin Beds" }
//     ],
//   },
//   {
//     id: "rm101",
//     name: "Twin Room Suite",
//     location: "Tarkarli, Malvan",
//     price: 3900,
//     bannerImg: twinSuiteBanner,
//     images: [twin1, twin2, twin3, twin4],
//     info: "Mountain View Room",
//     description: [
//       "Surround yourself with the peace of the mountains in our Twin Room Suite. Ideal for family or friends, this suite offers dual bedding, panoramic views of the Sahyadris, and a calm, airy design to match the serene outdoors.",
//       "The perfect hideaway for nature lovers."
//     ],
//     features: [
//       { icon: "users", text: "2 Guests" },
//       { icon: "ruler", text: "38 Feet Size" },
//       { icon: "link", text: "No Connecting Rooms" },
//       { icon: "bed-double", text: "2 Twin Beds" }
//     ],
//   },
//   {
//     id: "rm202",
//     name: "Executive Suites",
//     location: "Mumbai, India",
//     price: 6400,
//     bannerImg: execSuiteBanner,
//     images: [suite1, suite2, suite3, suite4],
//     info: "Lake View Room",
//     description: [
//       "Enjoy refined comfort in our Executive Suites overlooking tranquil lakescapes. With premium amenities, a private workspace, and elegant modern décor, this suite is perfect for both business and leisure travelers.",
//       "Dining options include curated chef’s menus with lakeside seating."
//     ],
//     features: [
//       { icon: "users", text: "2 Guests" },
//       { icon: "ruler", text: "42 Feet Size" },
//       { icon: "link", text: "Connecting Rooms Available" },
//       { icon: "bed-double", text: "1 King Bed" }
//     ],
//   },
// ];

// export const rooms = [
//   {
//     id: "rm001",
//     name: "Metropolitan Suite",
//     location: "Panjim, Goa",
//     price: 2755,
//     bannerImg: metSuiteBanner,
//     images: [single1, single2, single3, single4],
//     info: "City View Suite",
//   },
//   {
//     id: "rm002",
//     name: "Premium Deluxe Room",
//     location: "Mahim East, Mumbai",
//     price: 3400,
//     bannerImg: deluxeBanner,
//     images: [double1, double2, double3, double4],
//     info: "Garden View Room",
//     info: "Ocean View Room",
//   },
//   {
//     id: "rm101",
//     name: "Twin Room Suite",
//     location: "Tarkarli, Malvan",
//     price: 3900,
//     bannerImg: twinSuiteBanner,
//     images: [twin1, twin2, twin3, twin4],
//     info: "Mountain View Room",
//   },
//   {
//     id: "rm202",
//     name: "Executive Suites",
//     location: "Mumbai, India",
//     price: 6400,
//     bannerImg: execSuiteBanner,
//     images: [suite1, suite2, suite3, suite4],
//     info: "Lake View Room",
//   },
// ];

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

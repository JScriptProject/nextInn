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
    room_capacity: {
      adults: 2,
      children: 1,
      available_rooms: 15,
      bed: 1,
      maxExtraAdults: 1,
      maxExtraChildren: 0,
      maxExtraBed: 1,
      extraAdultCharges: 1000,
      extraChildCharges: 500,
      extraBedCharge: 200,
    },
    addonServicesCharges: { petFriendly: 200, steamRoom: 400, laundry: 80 },

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
    
    room_capacity: {
      adults: 3,
      children: 1,
      available_rooms: 10,
      bed: 2,
      maxExtraAdults: 1,
      maxExtraChildren: 1,
      maxExtraBed: 1,
      extraAdultCharges: 1200,
      extraChildCharges: 600,
      extraBedCharge: 200,
    },
    addonServicesCharges: { petFriendly: 250, steamRoom: 400, laundry: 100 },
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
    
    room_capacity: {
      adults: 2,
      children: 2,
      available_rooms: 10,
      bed: 2,
      maxExtraAdults: 1,
      maxExtraChildren: 2,
      maxExtraBed: 2,
      extraAdultCharges: 1000,
      extraChildCharges: 500,
      extraBedCharge: 200,
    },
    addonServicesCharges: { petFriendly: 350, steamRoom: 350, laundry: 120 },
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
    room_capacity: {
      adults: 2,
      children: 1,
      available_rooms: 5,
      bed: 2,
      maxExtraAdults: 1,
      maxExtraChildren: 1,
      maxExtraBed: 2,
      extraAdultCharges: 1500,
      extraChildCharges: 750,
      extraBedCharge: 300,
    },
    addonServicesCharges: { petFriendly: 550, steamRoom: 450, laundry: 145 },

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

// export function rateCalculation({
//   rate,
//   days,
//   adults,
//   children,
//   rooms,
//   addonServices: { petFriendly, steamRoom, laundry },
// },{adults: roomCapacityAdults, children: roomCapacityChildren, bed: roomCapacityBed,maxExtraAdults, maxExtraChildren, maxExtraBed, extraAdultCharges, extraChildCharges, extraBedCharge }) {
//   let totalCost = rate * days;

//   if (adults > 2) {
//     return totalCost;
//   }

//   return totalCost;
// }

export function rateCalculation(bookingData, roomCapacity, addonServicesCharges )
{
  
  let totalCost = (bookingData?.rate) * (bookingData?.days);


  //optional chaininng the fallback
  const adults = bookingData.adults ?? 0;
  const children = bookingData.children ?? 0;
  const rooms = bookingData.rooms ?? 0;
  const extraBed = bookingData.bed ?? 0;
  
  const adultCapacity = roomCapacity.adults ?? 0;
  const childCapacity = roomCapacity.children ?? 0;
  const exatraAdultCapacity = roomCapacity.maxExtraAdults ?? 0;
  const exatraChildCapacity = roomCapacity.maxExtraChildren ?? 0;
  const extraBedCapacity = roomCapacity.maxExtraBed ?? 0;
  const extraAdultCharges = roomCapacity.extraAdultCharges ?? 0;
  const extraChildCharges = roomCapacity.extraChildCharges ?? 0;
  const extraBedCharge = roomCapacity.extraBedCharge ?? 0;
  
  const priceBreakDown =[{label:"days", amount:(bookingData?.days) * (bookingData?.rate)}];

  if(adults > adultCapacity)
  {
    const amountAdult = (adults - adultCapacity) * extraAdultCharges
    totalCost += amountAdult ;
    priceBreakDown.push({label:"adults", amount:amountAdult})

  }
  if(children > childCapacity)
  {
    const amountChildren = (children - childCapacity) * extraChildCharges;
    totalCost += amountChildren;
    priceBreakDown.push({label:"children", amount:amountChildren});
  }
  if(rooms > 1)
  {
    const roomsAmount = (rooms - 1) * ((bookingData?.rate) * (bookingData?.days));
    totalCost += roomsAmount;
    priceBreakDown.push({label:"rooms", amount:roomsAmount});
  }

  if(extraBed > 0)
  {
    const extraBedAmount = extraBed * extraBedCharge;
    totalCost += extraBedAmount;
    priceBreakDown.push({label:"extraBed", amount:extraBedAmount});
  }

  if(bookingData.addonServices.petFriendly)
  {  const petFriendlyAmount =  addonServicesCharges?.petFriendly
     totalCost +=petFriendlyAmount ;
     priceBreakDown.push({label:"petFriendly", amount:petFriendlyAmount});
  }
  if(bookingData.addonServices.steamRoom)
  {
    const steamRoomAmount = addonServicesCharges?.steamRoom;
    totalCost += steamRoomAmount;
    priceBreakDown.push({label:"steamRoom", amount:steamRoomAmount});

  }
  if(bookingData.addonServices.laundry)
  {
    const laundryAmount = (addonServicesCharges?.laundry * (adults + children) * bookingData?.days);

    totalCost += laundryAmount;
    priceBreakDown.push({label:"laundry", amount:laundryAmount});
  }

  return [totalCost,priceBreakDown];
}

export function formatDateForInput(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

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

import { Check, Clock, XCircle } from "lucide-react";
import React,{useEffect, useState} from "react";
import Hero from "@admin/components/Hero";
import BookingControls from "@admin/components/BookingControls";
import heroBookingImg from "@assets/media/heroBookings.jpg";
import { getAllBookingsByDate } from "@api/bookingApi.js"

// Dummy data based on your provided screenshot
const initialBookings = [
  {
    _id: "69820b5967181dd3a26f0b20",
    assignedRooms: [
      { category: "68dd3cc70db9182a1d798da4" }, // Assuming this structure based on image
    ],
    user: "69806ad3260b7680ba4d5bf2", // ID reference
    bookingId: "GHGF45JK",
    userName: "Sanket Kale", // Added for display purposes
    userEmail: "sanket@example.com",
    userPhone: "+91 9876543210",
    checkIn: "2026-02-03T00:00:00.000+00:00",
    checkOut: "2026-02-12T00:00:00.000+00:00",
    bookingStatus: "confirmed",
    paymentStatus: "pending",
    totalAmount: 119200,
    guestDetails: { adults: 4, children: 2, roomsCount: 2, extraBed: 0 },
    priceBreakdown: {
      baseRoomCharge: 6400,
      extraGuestCharges: {
        onlyRoom: 57600,
        adults: 3000,
        children: 0,
        extraBed: 0,
        addonRooms: 57600,
      },
      addonServicesCharges: { petFriendly: 550, steamRoom: 450, laundry: 0 },
    },
    createdAt: "2026-02-03T14:51:05.141+00:00",
  },
  {
    _id: "69820b5967181dd3a26f0b21",
    bookingId: "OKRT69SK",
    checkIn: "2026-02-15T00:00:00.000+00:00",
    checkOut: "2026-02-18T00:00:00.000+00:00",
    userName: "Rahul Sharma",
    bookingStatus: "pending",
    paymentStatus: "pending",
    totalAmount: 25000,
    guestDetails: { adults: 2, children: 0, roomsCount: 1, extraBed: 0 },
    createdAt: "2026-02-05T10:30:00.000+00:00",
  },
  {
    _id: "69820b5967181dd3a26f0b22",
    bookingId: "DSHJ66KS",
    checkIn: "2026-02-10T00:00:00.000+00:00",
    checkOut: "2026-02-12T00:00:00.000+00:00",
    userName: "Anita Desai",
    bookingStatus: "cancelled",
    paymentStatus: "refunded",
    totalAmount: 12000,
    guestDetails: { adults: 1, children: 0, roomsCount: 1, extraBed: 0 },
    createdAt: "2026-02-01T09:15:00.000+00:00",
  },
];

//convert the date to Local
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


const getStatusBadge = (status, type="booking")=>{
  const statusClass = type==="booking" ? `badge-booking-${status}` : `badge-payment-${status}`;

  let icon=null;
  if(status === "confirmed" || status === "paid" || status === "refunded")
  {
    icon = <Check size={12} />
  }

  if(status === "pending")
  {
    icon= <Clock size={12} />
  }
  if(status ==="failed" || status === "cancelled")
  {
    icon = <XCircle size={12} />
  }
  return(<span className={`admin-status-badge ${statusClass}`}>
    {icon}{status}
    </span>)
}


function ManageBookings() {
  
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStaus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      key: "selection",
    },
  ]);

  const heroContent = {
    websiteTitle: "Manage Bookings",
    websiteSubtitle: "NextInn admin's control over the bookings..",
  };
  console.log("Bookings =>", bookings);

  //filtering logic 

  const filteredBookings = bookings?.filter((booking) =>{
    const filteredWithIdName = booking.bookingId === searchTerm;
  })
  console.log("Date Range=>", dateRange);
  useEffect(()=>{
   async function getBookingData(){
    setIsLoading(true);
      const result = await getAllBookingsByDate(dateRange[0].startDate, dateRange[0].endDate);
      console.log("Result", result);
      setBookings(result.data);
      setIsLoading(false);
    }
    getBookingData();
  },[])
  
  return (
    <div className="admin-container">
      <Hero
        title={heroContent.websiteTitle}
        subtitle={heroContent.websiteSubtitle}
        image={heroBookingImg}
      />
      <div className="admin-body-container !mt-10">
        <BookingControls
          filterStaus={filterStaus}
          setFilterStatus={setFilterStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
    </div>
  );
}

export default ManageBookings;

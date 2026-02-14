import { getBookingsByUser } from '@api/bookingApi';
import FullScreenLoader from '../../../components-support/FullScreenLoader';
import React, { useEffect, useState } from 'react'
import BookingList from '@user/components/dashboard-components/BookingList';

function MyBookings() {
  const [activeTab, setActiveTab] = useState("active");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandId, setExpandId] = useState("");

  useEffect(()=>{
    try {
       const getBookingData = async()=>{
        setLoading(true);
        const result = await getBookingsByUser();
        if(!result.success)
        {
          throw new Error("An Error occured while fetching the data");
        }
        setBookings(result.data);
        setLoading(false);
       }
       getBookingData();
    } catch (error) {
       console.error(error);
    }
    finally{
      setLoading(false);
    }
    
  },[])
  // logics for activeBookings, archivedBookings, currentList, toggleExpand

  const activeBookings = bookings.filter((booking)=>(["confirmed", "checked-in"].includes(booking.bookingStatus)));

  const archiveBookings = bookings.filter((booking)=> ["cancelled", "checked-out"].includes(booking.bookingStatus));

  const currentList = (activeTab ==="active") ? activeBookings : archiveBookings ;

  const toggleExpand = (id)=>{
   setExpandId(expandId === id ? null : id);
  }

  console.log("Hostiry booking =>", archiveBookings);
  console.log("Active Bookings => ", activeBookings);
  if(loading)
  {
    return(<FullScreenLoader />)
  }

  console.log("Booking Data =>", bookings);
  return (
    <div className="bookings-container">
      <div className="bookings-container-button">
        <button
          className={`bookings-container-button-btn ${activeTab === "active" ? "bookings-container-button-btn-active" : "bookings-container-button-btn-no_active"}`}
          onClick={() => setActiveTab("active")}
        >
          Active stays
        </button>
        <button
          className={`bookings-container-button-btn-arch ${activeTab === "archive" ? "bookings-conthainer-button-btn-arc-active" : "bookings-container-button-btn-no_active"}`}
          onClick={() => setActiveTab("archive")}
        >
          Booking History
        </button>
      </div>

      {/* Booking list */}
      <BookingList
        currentList={currentList}
        activeTab={activeTab}
        expandId={expandId}
        toggleExpand={toggleExpand}
      />
    </div>
  );
}

export default MyBookings
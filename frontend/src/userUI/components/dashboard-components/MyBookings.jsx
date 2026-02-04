import React, { useEffect, useState } from "react";
import { Calendar, Users, Home, IndianRupee, Tag } from "lucide-react";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { getBookingByUser } from "@api/bookingApi.js";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
          setIsLoading(true);
        // This assumes you have a controller that finds bookings by req.user.userId
        const response = await getBookingByUser();
        console.log("RRRRRRRRRRRR=>", response);
        if (response.success) {
          console.log("response.data=>>>", response.data);
          setBookings(response.data);
          console.log("STATE UPDATED SUCCESSFULLY WITH:", response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
          setIsLoading(false);
      }
    };

    fetchUserBookings();
  }, []);
  console.log("BOOKING =>>>", bookings);
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="bookings-container">
      <h2 className="section-internal-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't booked any luxury stays yet.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              {/* Header: Status and Total */}
              <div className="booking-card-header">
                <span className={`status-badge ${booking.bookingStatus}`}>
                  {booking.bookingStatus}
                </span>
                <div className="price-tag">
                  <IndianRupee size={16} />
                  <span>{booking.totalAmount}</span>
                </div>
              </div>

              {/* Body: Room and Dates */}
              <div className="booking-card-body">
                <div className="booking-info-main">
                  <h3>{booking.category?.name || "Luxury Suite"}</h3>
                  <div className="date-range">
                    <Calendar size={14} />
                    <span>
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </span>
                    <span className="separator">-</span>
                    <span>
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="booking-details-grid">
                  <div className="detail-pill">
                    <Users size={14} />
                    <span>{booking.guestDetails.adults} Adults</span>
                  </div>
                  <div className="detail-pill">
                    <Home size={14} />
                    <span>{booking.guestDetails.roomsCount} Rooms</span>
                  </div>
                </div>
              </div>

              {/* Footer: Add-ons Summary */}
              <div className="booking-card-footer">
                <Tag size={14} className="text-orange-500" />
                <p>
                  Payment Status:{" "}
                  <span className="capitalize font-semibold">
                    {booking.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;

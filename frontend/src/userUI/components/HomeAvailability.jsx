import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAvailability } from "../../hooks/useAvailability";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function HomeAvailability({ rooms }) {
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (rooms.length > 0 && !selectedCategory) {
      setSelectedCategory(rooms[0]._id);
    }
  }, [rooms, selectedCategory]);

  const { availability, loading } = useAvailability(
    selectedCategory,
    dateRange[0].startDate.toISOString(),
    dateRange[0].endDate.toISOString()
  );

  const handleProceed = () => {
    if (!selectedCategory) return;
    const roomData = rooms.find((r) => r._id === selectedCategory);
    navigate(`/rooms/${selectedCategory}`, {
      state: {
        ...roomData,
        preSelectedDates: {
          checkIn: dateRange[0].startDate,
          checkOut: dateRange[0].endDate,
        },
      },
    });
  };

  return (
    <section className="rooms-availability-section">
      <div className="availability-container">
        {/* HEADER */}
        <div className="availability-header">
          <h4 className="availability-subheading">Plan Your Getaway</h4>
          <h2 className="availability-heading">Check Availability</h2>
        </div>

        {/* MAIN CARD */}
        <div className="availability-card">
          {/* 1. ROOM CATEGORY TABS */}
          <div className="category-selection-wrapper">
            <h3 className="category-selection-title">Select Room Category</h3>
            <div className="category-buttons-group">
              {rooms.map((room) => (
                <button
                  key={room._id}
                  onClick={() => setSelectedCategory(room._id)}
                  className={`category-selection-btn ${
                    selectedCategory === room._id ? "active" : ""
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>

          <div className="availability-layout-grid">
            {/* 2. LEFT: CALENDAR */}
            <div className="calendar-section-wrapper">
              <h3 className="section-column-title">Select Dates</h3>
              <div className="calendar-ui-box">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  minDate={new Date()}
                  rangeColors={["#f97316"]}
                  color="#f97316"
                  className="w-full"
                />
              </div>
            </div>

            {/* 3. RIGHT: STATUS & ACTION */}
            <div className="status-section-wrapper">
              <div>
                <h3 className="section-column-title">Status Overview</h3>

                {/* Status Box */}
                <div className="status-display-card">
                  {loading ? (
                    <div className="loading-state-container">
                      <div className="loading-spinner"></div>
                      <span className="loading-text">
                        Checking availability...
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="status-label-text">Available Rooms</p>
                      <div className="status-number-container">
                        <span
                          className={`status-number-text ${
                            availability > 0
                              ? "status-text-available"
                              : "status-text-unavailable"
                          }`}
                        >
                          {availability ?? "-"}
                        </span>
                        <span className="status-total-text">/ 5</span>
                      </div>
                      {availability === 0 && (
                        <div className="sold-out-badge">
                          Sold Out for these dates
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceed}
                disabled={loading || !availability}
                className={`proceed-booking-btn ${
                  !availability || loading
                    ? "btn-state-disabled"
                    : "btn-state-active"
                }`}
              >
                {availability > 0 ? "Book This Stay" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeAvailability;

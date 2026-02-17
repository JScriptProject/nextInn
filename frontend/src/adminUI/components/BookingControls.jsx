import { Calendar, Search } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function BookingControls({ filterStaus, setFilterStatus, searchTerm, setSearchTerm, dateRange, setDateRange }) {
 

  const [openDate, setOpenDate] = useState(false);
  
  const handleFetchBookings = () => {
    setOpenDate(false);
    console.log("date range =>>>", dateRange);
    console.log(
      `fetching the booking from the API with date range ${dateRange[0].startDate} and ${dateRange[0].endDate}`
    );
  };
  console.log("Search Tearms =>", searchTerm);
  return (
    <div className="admin-controls-wrapper flex-wrap">
      <div className="search-box-container">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search by Booking Id or Name ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-input"
        />
      </div>

      <div className="flex items-center gap-4  flex-wrap">
        <div className="filter-box-container relative">
          <label>Duration:</label>
          <div
            className="admin-select-input flex items-center justify-between gap-3 cursor-pointer min-w-[220px]"
            onClick={() => {
              setOpenDate(!openDate);
            }}
          >
            <span className="text-[0.9rem]">
              {format(dateRange[0].startDate, "MMM dd, yyyy")} -{" "}
              {format(dateRange[0].endDate, "MMM dd, yyyy")}
            </span>
            <Calendar
              size={16}
              className="text-[var(--accent-cta-sunset-orange)]"
            />
          </div>
          {/* Calender Popover */}
          {openDate && (
            <div className="admin-calendar-popover">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={["#f97316"]}
              />
              <div className="p-3 border-t border-[var(--border-lightUI-softGray)] bg-gray-50">
                <button
                  onClick={handleFetchBookings}
                  className="btn-modal-save w-full !py-2 text-sm"
                >
                  Apply & Fetch
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="filter-box-container">
          <label>Status:</label>
          <select
            className="admin-select-input"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStaus}
          >
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked-In</option>
            <option value="checked-out">Checked-Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default BookingControls;

import React, { useState, useEffect } from "react";
import FullScreenLoader from "@component-support/FullScreenLoader";
import { Search, ActivitySquare, ShieldAlert } from "lucide-react";
import Hero from "@admin/components/Hero";
// You can use the same hero image or a new one
import heroBookingImg from "@assets/media/heroBookings.jpg";
import { getAdminLogs } from "@api/manageAdmin.js"

// import { getAdminLogs } from "@api/adminLogsApi.js"; // You will create this later

const MODULES = [
  "All",
  "Auth",
  "Admins",
  "Rooms",
  "Categories",
  "Bookings",
  "Reviews",
];

function Logs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  const heroContent = {
    websiteTitle: "Activity Logs",
    websiteSubtitle:
      "Track and monitor all administrative actions across the NextInn platform.",
  };

  useEffect(() => {
    fetchLogs();
  }, [currentPage, filterModule]);

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      fetchLogs();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminLogs(
        currentPage,
        limit,
        filterModule,
        searchTerm
      );
      console.log(response);
      setLogs(response.data.logs);
      setTotalPages(response.data.pagination.totalPages);
      // TODO: Replace with actual API Call
      // const response = await getAdminLogs(currentPage, limit, filterModule, searchTerm);

      // --- MOCK DATA FOR UI PREVIEW ---
      // setLogs([
      //   {
      //     _id: "1",
      //     admin: { name: "Jacob Smith", email: "jacob@nextinn.com" },
      //     actionType: "UPDATE",
      //     module: "Bookings",
      //     description: "Changed booking status to Confirmed for Guest ID: 8932",
      //     createdAt: new Date().toISOString(),
      //   },
      //   {
      //     _id: "2",
      //     admin: { name: "Ravi Kamble", email: "ravi@blogspage.com" },
      //     actionType: "DELETE",
      //     module: "Reviews",
      //     description: "Deleted inappropriate review from user ID: 1234",
      //     createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      //   },
      //   {
      //     _id: "3",
      //     admin: { name: "Ravi Kamble", email: "ravi@blogspage.com" },
      //     actionType: "CREATE",
      //     module: "Rooms",
      //     description: "Added new room: Presidential Suite 401",
      //     createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      //   },
      //   {
      //     _id: "4",
      //     admin: { name: "Jane Doe", email: "jane@nextinn.com" },
      //     actionType: "AUTH",
      //     module: "Auth",
      //     description: "Admin successfully logged in",
      //     createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      //   },
      // ]);
      // setTotalPages(1);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format date and time nicely
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
  };

  // Helper to get the right CSS class for the action badge
  const getBadgeClass = (actionType) => {
    switch (actionType.toUpperCase()) {
      case "CREATE":
        return "log-badge-create";
      case "UPDATE":
        return "log-badge-update";
      case "DELETE":
        return "log-badge-delete";
      case "AUTH":
        return "log-badge-auth";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="admin-container">
      {isLoading && <FullScreenLoader />}

      <Hero
        title={heroContent.websiteTitle}
        subtitle={heroContent.websiteSubtitle}
        image={heroBookingImg}
      />

      <div className="admin-body-container">
        {/* Controls Row */}
        <div className="admin-controls-wrapper flex-wrap">
          <div className="log-directory-title">
            <ActivitySquare size={24} />
            <h2>System Audit Logs</h2>
          </div>

          <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="search-box-container w-full md:w-[300px]">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by Admin Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input w-full"
              />
            </div>

            <div className="filter-box-container">
              <select
                className="admin-select-input"
                onChange={(e) => setFilterModule(e.target.value)}
                value={filterModule}
              >
                {MODULES.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod} Module
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Administrator</th>
                <th>Module</th>
                <th>Action</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => {
                  const { day, time } = formatDateTime(log.createdAt);
                  return (
                    <tr key={log._id} className="admin-table-row">
                      <td>
                        <span className="font-semibold text-sm text-[var(--text-primary-dark-Charcoal)]">
                          {day}
                        </span>
                        <span className="log-time-text">{time}</span>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-[var(--text-primary-dark-Charcoal)]">
                            {log.admin?.name}
                          </span>
                          <span className="text-xs text-[var(--text-secondary-gray)]">
                            {log.admin?.email}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="log-module-text">{log.module}</span>
                      </td>
                      <td>
                        <span
                          className={`log-badge ${getBadgeClass(log.actionType)}`}
                        >
                          {log.actionType}
                        </span>
                      </td>
                      <td>
                        <span className="log-desc-text">
                          "{log.description}"
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    <div className="flex flex-col items-center justify-center text-[var(--text-secondary-gray)]">
                      <ShieldAlert size={40} className="mb-2 opacity-50" />
                      <p>No activity logs found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="pagination-rooms">
              <span className="pagination-rooms-page">
                Page {currentPage} of {totalPages}
              </span>
              <div className="pagination-btn-group">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="pagination-btn-pre"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="pagination-btn-next"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Logs;

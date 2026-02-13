import React, { useState, useEffect } from "react";
// Assuming you are using lucide-react or similar for icons based on your other code.
import {
  Search,
  Eye,
  Edit,
  Trash2,
  X,
  Check,
  Clock,
  XCircle,
  Calendar,
  User,
  CreditCard,
} from "lucide-react";

// Dummy data based on your provided screenshot
const initialBookings = [
  {
    _id: "69820b5967181dd3a26f0b20",
    assignedRooms: [
      { category: "68dd3cc70db9182a1d798da4" }, // Assuming this structure based on image
    ],
    user: "69806ad3260b7680ba4d5bf2", // ID reference
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

const ManageBooking = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'view', 'edit', 'delete'
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Formatting dates for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status Badge Helper
  const getStatusBadge = (status, type = "booking") => {
    const statusClass =
      type === "booking"
        ? `badge-booking-${status}`
        : `badge-payment-${status}`;
    let icon = null;

    if (status === "confirmed" || status === "paid" || status === "refunded")
      icon = <Check size={14} />;
    if (status === "pending") icon = <Clock size={14} />;
    if (status === "cancelled" || status === "failed")
      icon = <XCircle size={14} />;

    return (
      <span className={`admin-status-badge ${statusClass}`}>
        {icon} {status}
      </span>
    );
  };

  // Filtering Logic
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.userName &&
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log("matchesSearch", matchesSearch);
    const matchesStatus =
      filterStatus === "all" || booking.bookingStatus === filterStatus;
      console.log("matchesStatus=>", matchesStatus);
    return matchesSearch && matchesStatus;
  });
 

  // Modal Handlers
  const openModal = (booking, type) => {
    setSelectedBooking({ ...booking }); // Clone to avoid direct mutation during edit
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // CRUD Operations
  const handleUpdateStatus = (e) => {
    e.preventDefault();
    // In a real app, this is where you call your API: await updateBooking(selectedBooking._id, updatedData)
    const updatedBookings = bookings.map((b) =>
      b._id === selectedBooking._id ? selectedBooking : b
    );
    setBookings(updatedBookings);
    closeModal();
    // Show success toast here
  };

  const handleDeleteBooking = () => {
    // API Call: await deleteBooking(selectedBooking._id)
    const updatedBookings = bookings.filter(
      (b) => b._id !== selectedBooking._id
    );
    setBookings(updatedBookings);
    closeModal();
    // Show success toast here
  };

  return (
    <div className="admin-container">
      {/* Header aligned with your admin design */}
      <div
        className="admin-header"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <h1>Manage Bookings</h1>
      </div>

      <div className="admin-body-container pt-10">
        {/* Controls Section (Search & Filter) */}
        <div className="admin-controls-wrapper">
          <div className="search-box-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by Booking ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="filter-box-container">
            <label>Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-select-input"
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings Table/List */}
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="admin-table-row">
                    <td className="font-mono text-sm">
                      {booking._id.slice(-8).toUpperCase()}
                    </td>
                    <td>
                      <div className="font-semibold">
                        {booking.userName || "Guest User"}
                      </div>
                      <div className="text-xs text-[var(--text-secondary-gray)]">
                        {booking.guestDetails?.adults} Adults,{" "}
                        {booking.guestDetails?.children} Children
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        {formatDate(booking.checkIn)}
                      </div>
                      <div className="text-xs text-[var(--text-secondary-gray)]">
                        to {formatDate(booking.checkOut)}
                      </div>
                    </td>
                    <td className="font-bold text-[var(--primary-deep-teal)]">
                      ₹{booking.totalAmount?.toLocaleString()}
                    </td>
                    <td>
                      <div className="flex flex-col gap-1 items-start">
                        {getStatusBadge(booking.bookingStatus, "booking")}
                        {getStatusBadge(booking.paymentStatus, "payment")}
                      </div>
                    </td>
                    <td>
                      <div className="admin-action-buttons">
                        <button
                          onClick={() => openModal(booking, "view")}
                          className="action-btn view-btn"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openModal(booking, "edit")}
                          className="action-btn edit-btn"
                          title="Edit Status"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => openModal(booking, "delete")}
                          className="action-btn delete-btn"
                          title="Cancel Booking"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-[var(--text-secondary-gray)]"
                  >
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}
      {isModalOpen && selectedBooking && (
        <div className="admin-modal-overlay">
          <div
            className={`admin-modal-content ${modalType === "view" ? "modal-lg" : "modal-md"}`}
          >
            {/* Modal Header */}
            <div className="admin-modal-header">
              <h2>
                {modalType === "view" &&
                  `Booking Details: #${selectedBooking._id.slice(-8).toUpperCase()}`}
                {modalType === "edit" &&
                  `Update Status: #${selectedBooking._id.slice(-8).toUpperCase()}`}
                {modalType === "delete" && `Cancel Booking`}
              </h2>
              <button onClick={closeModal} className="modal-close-btn">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body - VIEW */}
            {modalType === "view" && (
              <div className="admin-modal-body">
                <div className="booking-details-grid">
                  {/* General Info */}
                  <div className="details-card">
                    <h3>
                      <User size={18} className="inline mr-2" /> Guest
                      Information
                    </h3>
                    <p>
                      <strong>Name:</strong> {selectedBooking.userName || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedBooking.userEmail || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {selectedBooking.userPhone || "N/A"}
                    </p>
                    <p>
                      <strong>User ID:</strong>{" "}
                      <span className="text-xs font-mono">
                        {selectedBooking.user}
                      </span>
                    </p>
                  </div>

                  {/* Stay Details */}
                  <div className="details-card">
                    <h3>
                      <Calendar size={18} className="inline mr-2" /> Stay
                      Details
                    </h3>
                    <p>
                      <strong>Check In:</strong>{" "}
                      {formatDate(selectedBooking.checkIn)}
                    </p>
                    <p>
                      <strong>Check Out:</strong>{" "}
                      {formatDate(selectedBooking.checkOut)}
                    </p>
                    <p>
                      <strong>Rooms:</strong>{" "}
                      {selectedBooking.guestDetails?.roomsCount}
                    </p>
                    <p>
                      <strong>Guests:</strong>{" "}
                      {selectedBooking.guestDetails?.adults} Adults,{" "}
                      {selectedBooking.guestDetails?.children} Children
                    </p>
                  </div>

                  {/* Payment Breakdown (if exists) */}
                  {selectedBooking.priceBreakdown && (
                    <div className="details-card full-width">
                      <h3>
                        <CreditCard size={18} className="inline mr-2" /> Payment
                        Breakdown
                      </h3>
                      <div className="breakdown-list">
                        <div className="breakdown-item">
                          <span>Base Room Charge:</span>
                          <span>
                            ₹{selectedBooking.priceBreakdown.baseRoomCharge}
                          </span>
                        </div>
                        <div className="breakdown-item">
                          <span>Extra Rooms/Guests:</span>
                          <span>
                            ₹
                            {selectedBooking.priceBreakdown.extraGuestCharges
                              ?.onlyRoom || 0}
                          </span>
                        </div>
                        <div className="breakdown-item">
                          <span>Add-on Services:</span>
                          <span>
                            ₹
                            {(selectedBooking.priceBreakdown
                              .addonServicesCharges?.petFriendly || 0) +
                              (selectedBooking.priceBreakdown
                                .addonServicesCharges?.steamRoom || 0)}
                          </span>
                        </div>
                        <div className="breakdown-item total">
                          <span>Total Amount:</span>
                          <span>₹{selectedBooking.totalAmount}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <p>
                          <strong>Booking:</strong>{" "}
                          {getStatusBadge(
                            selectedBooking.bookingStatus,
                            "booking"
                          )}
                        </p>
                        <p>
                          <strong>Payment:</strong>{" "}
                          {getStatusBadge(
                            selectedBooking.paymentStatus,
                            "payment"
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Body - EDIT */}
            {modalType === "edit" && (
              <div className="admin-modal-body">
                <form onSubmit={handleUpdateStatus} className="admin-form">
                  <div className="form-group">
                    <label>Booking Status</label>
                    <select
                      value={selectedBooking.bookingStatus}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          bookingStatus: e.target.value,
                        })
                      }
                      className="admin-form-input"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      value={selectedBooking.paymentStatus}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          paymentStatus: e.target.value,
                        })
                      }
                      className="admin-form-input"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  <div className="admin-modal-footer">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn-modal-cancel"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-modal-save">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Modal Body - DELETE */}
            {modalType === "delete" && (
              <div className="admin-modal-body text-center py-6">
                <div className="delete-warning-icon">
                  <Trash2 size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Are you absolutely sure?
                </h3>
                <p className="text-[var(--text-secondary-gray)] mb-6">
                  You are about to cancel booking{" "}
                  <strong>
                    #{selectedBooking._id.slice(-8).toUpperCase()}
                  </strong>
                  . This action cannot be undone.
                </p>
                <div className="admin-modal-footer justify-center">
                  <button onClick={closeModal} className="btn-modal-cancel">
                    Keep Booking
                  </button>
                  <button
                    onClick={handleDeleteBooking}
                    className="btn-modal-danger"
                  >
                    Yes, Cancel Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;

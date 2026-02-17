import React from "react";
import { Check, Clock, Edit, Eye, Trash2, XCircle } from "lucide-react";
function BookingTable({ filteredBookings, openModal, formatDate, getStatusBadge }) {
  
 
  return (
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
                  {booking.bookingId.toUpperCase()}
                </td>
                <td>
                  <div className="font-semibold">
                    {booking.user.firstname} {booking.user.lastname}
                  </div>
                  <div className="text-xs text-[var(--text-secondary-gray)]">
                    {booking.guestDetails?.adults} Adults,{" "}
                    {booking.guestDetails?.children} Children
                  </div>
                </td>
               
                <td>
                  <div className="text-sm">{formatDate(booking.checkIn)}</div>
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
                      className="action-btn view-btn"
                      onClick={() => openModal(booking, "view")}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => openModal(booking, "edit")}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => openModal(booking, "delete")}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center py-10 text-[var(--text-secondary-gray)]">
                No matching booking found in yuor criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;

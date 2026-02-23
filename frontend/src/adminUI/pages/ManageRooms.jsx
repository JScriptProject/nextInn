import React, { useEffect, useState } from "react";
import {
  Check,
  Clock,
  Edit,
  Eye,
  Trash2,
  XCircle,
  X,
  Search,
  Plus,
} from "lucide-react";
// Add this import to the top of ManageRooms.jsx
import { getAllRoomsCategory } from "@api/roomsCategoryApi.js"; 
import Hero from "@admin/components/Hero";
// You can use a different image, reusing heroBookings for now
import heroBookingImg from "@assets/media/heroBookings.jpg";
import FullScreenLoader from "../../components-support/FullScreenLoader";
import { getAllRooms, addRoom, updateRoom, deleteRoom } from "@api/roomApi.js"; // Import your APIs
// import { getAllCategories } from "@api/categoryApi.js"; // You will need this to populate the category dropdown

// ==========================================
// CONSTANTS FOR DROPDOWNS
// ==========================================
const ROOM_STATUSES = ["Available", "Occupied", "Maintenance"];
const CLEANING_STATUSES = ["Clean", "Dirty", "In Progress"];

function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]); // To populate the Category dropdown
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add', 'view', 'edit', 'delete'
  const [selectedRoom, setSelectedRoom] = useState(null);

  const heroContent = {
    websiteTitle: "Manage Rooms",
    websiteSubtitle: "Add, update, and monitor hotel rooms.",
  };

  // 1. Fetch Data on Load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Mocking fetch - Replace with your actual API calls
      
      // if (roomsRes.success) setRooms(roomsRes.data);
      // if (catRes.success) setCategories(catRes.data);
    
      const roomsRes = await getAllRooms();
      console.log("All rooms data=>", roomsRes);
      if (roomsRes.success) {
        setRooms(roomsRes.data);
      }

      // 2. Fetch the real categories for the dropdown
      const catRes = await getAllRoomsCategory();
      if (catRes.success) {
        // This populates the categories array with your 4 real categories
        setCategories(catRes.data);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Filtering Logic
  const filteredRooms = rooms?.filter((room) => {
    const matchesSearch = room.roomNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      room.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // 3. Modal Controls
  const openModal = (room = null, type) => {
    if (type === "add") {
      // Empty state for new room
      setSelectedRoom({
        roomNumber: "",
        floor: "",
        category: "",
        status: "Available",
        cleaning_status: "Clean",
      });
    } else {
      // Clone existing room for edit/view/delete
      // We extract category._id if it's populated so the <select> default value works
      setSelectedRoom({
        ...room,
        category: room.category?._id || room.category,
      });
    }
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  // 4. Form Handlers
  const handleInputChange = (e) => {
    setSelectedRoom({ ...selectedRoom, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      if (modalType === "add") {
        response = await addRoom(selectedRoom);
      } else if (modalType === "edit") {
        response = await updateRoom(selectedRoom._id, selectedRoom);
      }

      // Refresh list after success
      // if (response.success) fetchData();
      console.log("Submitted Data:", selectedRoom);
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteRoom(id);
      // fetchData(); // Refresh list
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. UI Helpers
  const getStatusBadge = (status) => {
    if (status === "Available" || status === "Clean")
      return (
        <span className="admin-status-badge badge-booking-confirmed">
          <Check size={12} /> {status}
        </span>
      );
    if (status === "Occupied" || status === "Dirty")
      return (
        <span className="admin-status-badge badge-booking-cancelled">
          <XCircle size={12} /> {status}
        </span>
      );
    if (status === "Maintenance" || status === "In Progress")
      return (
        <span className="admin-status-badge badge-booking-pending">
          <Clock size={12} /> {status}
        </span>
      );
    return (
      <span className="admin-status-badge badge-payment-refunded">
        {status}
      </span>
    );
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <div className="admin-container">
      <Hero
        title={heroContent.websiteTitle}
        subtitle={heroContent.websiteSubtitle}
        image={heroBookingImg}
      />

      <div className="admin-body-container">
        {/* --- CONTROLS SECTION --- */}
        <div className="admin-controls-wrapper flex-wrap">
          <div className="search-box-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by Room Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="filter-box-container">
              <label>Status:</label>
              <select
                className="admin-select-input"
                onChange={(e) => setFilterStatus(e.target.value)}
                value={filterStatus}
              >
                <option value="all">All Rooms</option>
                {ROOM_STATUSES.map((s) => (
                  <option key={s} value={s.toLowerCase()}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* ADD ROOM BUTTON */}
            <button
              onClick={() => openModal(null, "add")}
              className="btn-modal-save flex items-center gap-2"
            >
              <Plus size={18} /> Add New Room
            </button>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Room No.</th>
                <th>Category</th>
                <th>Floor</th>
                <th>Room Status</th>
                <th>Cleaning Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms?.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room._id} className="admin-table-row">
                    <td className="font-bold text-lg">{room.roomNumber}</td>
                    <td className="font-semibold text-[var(--primary-deep-teal)]">
                      {room.category?.name || "N/A"}
                    </td>
                    <td>{room.floor}</td>
                    <td>{getStatusBadge(room.status)}</td>
                    <td>{getStatusBadge(room.cleaning_status)}</td>
                    <td>
                      <div className="admin-action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => openModal(room, "view")}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => openModal(room, "edit")}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => openModal(room, "delete")}
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
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}
      {isModalOpen && selectedRoom && (
        <div className="admin-modal-overlay">
          <div
            className={`admin-modal-content ${modalType === "view" ? "modal-lg" : "modal-md"}`}
          >
            <div className="admin-modal-header">
              <h2>
                {modalType === "add" && "Add New Room"}
                {modalType === "edit" &&
                  `Edit Room: ${selectedRoom.roomNumber}`}
                {modalType === "view" &&
                  `Room Details: ${selectedRoom.roomNumber}`}
                {modalType === "delete" && "Delete Room"}
              </h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            {/* VIEW MODAL */}
            {modalType === "view" && (
              <div className="admin-modal-body">
                <div className="booking-details-grid">
                  <div className="details-card">
                    <h3>Room Information</h3>
                    <p>
                      <strong>Room Number:</strong> {selectedRoom.roomNumber}
                    </p>
                    <p>
                      <strong>Floor:</strong> {selectedRoom.floor}
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedRoom.category?.name || "Unknown"}
                    </p>
                  </div>
                  <div className="details-card">
                    <h3>Current Status</h3>
                    <div className="flex flex-col gap-3 mt-2">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Room Status:</span>{" "}
                        {getStatusBadge(selectedRoom.status)}
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Cleaning Status:</span>{" "}
                        {getStatusBadge(selectedRoom.cleaning_status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ADD / EDIT MODAL FORM */}
            {(modalType === "add" || modalType === "edit") && (
              <div className="admin-modal-body">
                <form onSubmit={handleSubmit} className="admin-form">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label>Room Number *</label>
                      <input
                        type="text"
                        name="roomNumber"
                        required
                        value={selectedRoom.roomNumber}
                        onChange={handleInputChange}
                        className="admin-form-input"
                        placeholder="e.g., 101"
                      />
                    </div>

                    <div className="form-group">
                      <label>Floor *</label>
                      <input
                        type="text"
                        name="floor"
                        required
                        value={selectedRoom.floor}
                        onChange={handleInputChange}
                        className="admin-form-input"
                        placeholder="e.g., 1st Floor"
                      />
                    </div>

                    <div className="form-group col-span-2">
                      <label>Room Category *</label>
                      <select
                        name="category"
                        required
                        value={selectedRoom.category}
                        onChange={handleInputChange}
                        className="admin-form-input"
                      >
                        <option value="" disabled>
                          Select a Category
                        </option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Room Status *</label>
                      <select
                        name="status"
                        required
                        value={selectedRoom.status}
                        onChange={handleInputChange}
                        className="admin-form-input"
                      >
                        {ROOM_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Cleaning Status *</label>
                      <select
                        name="cleaning_status"
                        required
                        value={selectedRoom.cleaning_status}
                        onChange={handleInputChange}
                        className="admin-form-input"
                      >
                        {CLEANING_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
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
                      {modalType === "add" ? "Create Room" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* DELETE MODAL */}
            {modalType === "delete" && (
              <div className="admin-modal-body text-center py-6">
                <div className="delete-warning-icon">
                  <Trash2 size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Are you absolutely sure?
                </h3>
                <p className="mb-6">
                  This will permanently delete Room {selectedRoom.roomNumber}.
                </p>
                <div className="admin-modal-footer justify-center">
                  <button onClick={closeModal} className="btn-modal-cancel">
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(selectedRoom._id)}
                    className="btn-modal-danger"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageRooms;

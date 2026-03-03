import React, { useState, useEffect, useContext } from "react";
import {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} from "@api/manageAdmin.js";
import FullScreenLoader from "@component-support/FullScreenLoader";
import {
  Edit,
  Trash2,
  X,
  PlusCircle,
  UserCog,
  Eye,
  EyeOff,
} from "lucide-react";
import { useForm } from "react-hook-form";
import Hero from "@admin/components/Hero";
import heroBookingImg from "@assets/media/heroBookings.jpg";

// Import your Notification Context
import { NotificationsContext } from "@user/context/NotificationsContext";

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal & UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add', 'edit', or 'delete'
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Initialize Global Notifications
  const { showNotification } = useContext(NotificationsContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const heroContent = {
    websiteTitle: "Manage Admins",
    websiteSubtitle:
      "Create, update, and revoke administrative access for the NextInn portal.",
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    const response = await getAllAdmins();
    if (response.success) {
      setAdmins(response.data);
    } else {
      // Show global error if fetching fails
      showNotification(
        true,
        false,
        response.message || "Failed to load admins."
      );
    }
    setIsLoading(false);
  };

  const openModal = (type, admin = null) => {
    setModalType(type);
    setSelectedAdmin(admin);
    setIsModalOpen(true);
    setShowPassword(false);

    if (type === "edit" && admin) {
      reset({ name: admin.name, email: admin.email });
    } else if (type === "add") {
      reset({ name: "", email: "", password: "" });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
    setShowPassword(false);
    reset();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    let response;

    if (modalType === "add") {
      response = await addAdmin(data);
    } else if (modalType === "edit") {
      response = await updateAdmin(selectedAdmin._id, data);
    }

    if (response.success) {
      // Success Notification & Close Modal
      showNotification(
        true,
        true,
        `Admin successfully ${modalType === "add" ? "created" : "updated"}!`
      );
      fetchAdmins();
      closeModal();
    } else {
      // Error Notification (Modal stays open so they don't lose their typed data!)
      showNotification(true, false, response.message || "An error occurred.");
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;
    setIsLoading(true);

    const response = await deleteAdmin(selectedAdmin._id);

    if (response.success) {
      showNotification(true, true, "Admin access revoked successfully.");
      fetchAdmins();
      closeModal();
    } else {
      showNotification(
        true,
        false,
        response.message || "Failed to remove admin."
      );
    }
    setIsLoading(false);
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
        <div className="admin-controls-wrapper">
          <div className="admin-directory-title">
            <UserCog size={24} />
            <h2>Admin Directory</h2>
          </div>

          <button onClick={() => openModal("add")} className="btn-add-admin">
            <PlusCircle size={18} />
            Add New Admin
          </button>
        </div>

        {/* Note: The old inline error banner has been completely removed! */}

        {/* Table Section */}
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin._id} className="admin-table-row">
                    <td className="admin-table-name">{admin.name}</td>
                    <td className="admin-table-email">{admin.email}</td>
                    <td>
                      <div className="admin-action-buttons">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => openModal("edit", admin)}
                          title="Edit Admin"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => openModal("delete", admin)}
                          title="Delete Admin"
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
                    colSpan="3"
                    className="text-center py-10 text-[var(--text-secondary-gray)]"
                  >
                    No administrators found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content modal-md">
            <div className="admin-modal-header">
              <h2>
                {modalType === "add" && "Add New Admin"}
                {modalType === "edit" && "Edit Admin Profile"}
                {modalType === "delete" && "Remove Admin"}
              </h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            {/* ADD / EDIT FORM MODAL */}
            {(modalType === "add" || modalType === "edit") && (
              <div className="admin-modal-body">
                <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      className="admin-form-input"
                      placeholder="e.g. Jane Doe"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="admin-form-error-msg">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      className="admin-form-input"
                      type="email"
                      placeholder="admin@nextinn.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="admin-form-error-msg">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {modalType === "add" && (
                    <div className="form-group">
                      <label>Temporary Password</label>
                      <div className="admin-password-wrapper">
                        <input
                          className="admin-password-input"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          })}
                        />
                        <button
                          type="button"
                          className="admin-password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          title={
                            showPassword ? "Hide Password" : "Show Password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="admin-form-error-msg">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="admin-modal-footer">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn-modal-cancel"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-modal-save">
                      {modalType === "add" ? "Create Admin" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {modalType === "delete" && selectedAdmin && (
              <div className="admin-modal-body text-center py-6">
                <div className="delete-warning-icon">
                  <Trash2 size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Revoke Access?</h3>
                <p className="mb-6 text-gray-600">
                  Are you absolutely sure you want to delete{" "}
                  <strong>{selectedAdmin.name}</strong>'s admin account? They
                  will instantly lose access to the portal. This action cannot
                  be undone.
                </p>
                <div className="admin-modal-footer justify-center">
                  <button onClick={closeModal} className="btn-modal-cancel">
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="btn-modal-danger">
                    Yes, Revoke Access
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

export default ManageAdmins;

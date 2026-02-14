import React, { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { Mail, Phone, MapPin, Lock } from "lucide-react";

function UserProfile({ user={} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="profile-wrapper">
      <h2 className="section-internal-title">Personal Information</h2>

      <div className="profile-grid">
        <div className="info-card">
          <div className="info-item">
            <span className="info-label">Full Name</span>
            <p className="info-value">
              {user.firstname} {user.lastname}
            </p>
          </div>

          <div className="info-item">
            <div className="icon-label">
              <Mail size={16} /> <span>Email Address</span>
            </div>
            <p className="info-value">{user.email}</p>
          </div>

          <div className="info-item">
            <div className="icon-label">
              <Phone size={16} /> <span>Mobile Number</span>
            </div>
            <p className="info-value">{user.mobile}</p>
          </div>

          <div className="info-item">
            <div className="icon-label">
              <MapPin size={16} /> <span>City</span>
            </div>
            <p className="info-value">{user.city}</p>
          </div>
        </div>

        <div className="security-card">
          <h3>Security</h3>
          <p>Keep your account secure by updating your password regularly.</p>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setIsModalOpen(true)}
          >
            <Lock size={20} style={{ marginRight: "8px" }} className="inline" /> Change Password
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ChangePasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default UserProfile;

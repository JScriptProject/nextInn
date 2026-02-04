import React, { useState } from "react";
import { X } from "lucide-react";

function ChangePasswordModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>
        <h2>Update Password</h2>
        <form className="modal-form">
          <div className="input-group-vertical">
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />
          </div>
          <div className="input-group-vertical">
            <label>New Password</label>
            <input type="password" placeholder="Min 8 characters" />
          </div>
          <div className="input-group-vertical">
            <label>Confirm New Password</label>
            <input type="password" placeholder="Repeat new password" />
          </div>
          <button type="submit" className="btn btn-fill w-full mt-4 !py-2.5">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;

import React from 'react'
import adminImg from '../assets/media/admin-Dashboard.jpg';
function AdminDashboard() {
  return (
    <div className="admin-container">
      <div className="admin-header" style={{backgroundImage:`url(${adminImg})`}}>
        <h1>We Manage NextInn</h1>
      </div>
    </div>
  )
}

export default AdminDashboard
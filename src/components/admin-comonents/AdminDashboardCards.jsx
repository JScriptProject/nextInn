import React, { useState } from 'react'
import { BedDouble, DoorOpen, Users, Star } from "lucide-react";
function AdminDashboardCards() {

 

    const adminCardData = [
    { icon: BedDouble, label: "Booked Rooms", label_count: 12 },
    {
      icon: DoorOpen,
      label: "Available Rooms",
      label_count: 10,
    },
    {
      icon: Users,
      label: "Total Guest",
      label_count: 10,
    },
    {
      icon: Star,
      label: "Reviews",
      label_count: 100,
    },
  ];

  return (
    <div className="dashbord-cards">
          <div className="admin-dashboard-wrapper">
            {adminCardData.map((item) => {
              const Icon = item.icon;
              return (
                <div className="card" key={item.label}>
                  <div className="card-icon">
                    <Icon size={30} strokeWidth={2} className="card-icon-item" />
                  </div>
                  <div className="card-service">
                    <p className="card-service-count">{item.label_count}</p>
                    <p className="card-service-name">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  )
}

export default AdminDashboardCards
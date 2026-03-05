import React, { useState } from "react";
import RoomsDashboard from "@admin/components/RoomsDashboard";
import Hero from "@admin/components/Hero";
import heroBookingImg from "@assets/media/heroBookings.jpg";
import CategoryManagement from "@admin/components/CategoryManagement";
import { useOutletContext } from "react-router-dom";
function ManageRooms() {
  const [activeTab, setActiveTab] = useState("inventory");
  const context = useOutletContext();
  const { isLoading, setCategories, categories } = context || {};

  const heroContent = {
    websiteTitle: "Manage Rooms",
    websiteSubtitle: "Add, update, and monitor hotel rooms.",
  };

  return (
    <div className="admin-container">
      <Hero
        title={heroContent.websiteTitle}
        subtitle={heroContent.websiteSubtitle}
        image={heroBookingImg}
      />
      <div className="admin-body-container">
        <div className="flex border-b gap-3 border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`py-3 px-6 font-semibold transition-colors ${
              activeTab === "inventory"
                ? "border-b-2 border-[var(--primary-deep-teal)] text-[var(--primary-deep-teal)]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Room Inventory
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-3 px-6 font-semibold transition-colors ${
              activeTab === "categories"
                ? "border-b-2 border-[var(--primary-deep-teal)] text-[var(--primary-deep-teal)]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Room categories
          </button>
        </div>
        {activeTab === "inventory" ? (
          <RoomsDashboard />
        ) : (
          <CategoryManagement rooms={categories} setRooms={setCategories} />
        )}
      </div>
    </div>
  );
}

export default ManageRooms;

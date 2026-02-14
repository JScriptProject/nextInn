import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserProfile from "@user/components/dashboard-components/UserProfile";
import MyBookings from "@user/components/dashboard-components/MyBookings";
import { User, Briefcase, ChevronRight } from "lucide-react";
import nextInUserDashboard from "@assets/media/userDashboard.png";
import FullScreenLoader from "../../components-support/FullScreenLoader";

function DashboardUser() {
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    return <FullScreenLoader />;
  }
  console.log("Active Tab =>", activeTab);
  return (
    <div className="dashboard-page">
      {/* Banner Section */}
      <div className="user-dashboard-banner">
        <div className="banner-img">
          <img src={nextInUserDashboard} alt="User Dashboard" />
          <div className="banner-overlay">
            <h1>Welcome back, {user.firstname}</h1>
            <p>Manage your profile and track your luxury stays.</p>
          </div>
        </div>
      </div>

    
    <section className="dashboard-content-section">
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <nav>
            <button className={`nav-item ${activeTab === "profile" ? "active" : ""}`} onClick={()=>setActiveTab("profile")}>
              <User size={20} />
              <span>Profile</span>
              <ChevronRight size={16} />
            </button>
            <button className={`nav-item ${activeTab=== "booking" ? "active" : ""}`} onClick={()=>setActiveTab("booking")}>
              <Briefcase size={20}/>
              <span>My Booking</span>
              <ChevronRight size={16} />
            </button>
          </nav>
        </aside>
        <main className="dashboard-main-content">
          {activeTab === "profile" ? <UserProfile user={user} /> : <MyBookings />}
        </main>
      </div>
    </section>
    </div>
  );
}

export default DashboardUser;

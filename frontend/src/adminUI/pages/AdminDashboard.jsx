import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux"; // To check if the user is a superadmin
import Hero from "@admin/components/Hero";
import heroBookingImg from "@assets/media/heroBookings.jpg";
import {
  BedDouble,
  Users,
  Star,
  CalendarCheck,
  ArrowRight,
  ActivitySquare,
  ShieldCheck,
  Clock,
  CheckCircle,
} from "lucide-react";
import { getDashboardData } from "../../api/dashboardApi";
import FullScreenLoader from "../../components-support/FullScreenLoader";

function AdminDashboard() {
  const { isLoading: isCategoriesLoading, categories } = useOutletContext();
  const currentAdmin = useSelector((state) => state.admin?.admin);
  const isSuperAdmin = currentAdmin?.role === "superadmin";

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      const response = await getDashboardData();
      console.log("RESPONSE =>",response);
      if (response.success) {
        setDashboardData(response.data);
      } else {
        // Handle error case, maybe show a toast notification
        console.error(response.message);
      }
      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  const heroContent = {
    websiteTitle: "We Manage NextInn",
    websiteSubtitle:
      "Your command center for hotel operations, reservations, and guest experiences.",
  };

  if (isLoading || isCategoriesLoading) {
    return <FullScreenLoader />;
  }

  if (!dashboardData) {
    return (
      <div className="admin-container">
        <Hero
          title="Error"
          subtitle="Could not load dashboard data. Please try again later."
          image={heroBookingImg}
        />
      </div>
    );
  }

  return (
    <div className="admin-container">
      <Hero
        title={heroContent.websiteTitle}
        subtitle={heroContent.websiteSubtitle}
        image={heroBookingImg}
      />

      <div className="admin-body-container -mt-10 relative z-10">
        {/* --- KPI QUICK STATS (TOP ROW) --- */}
        <div className="saas-kpi-grid">
          <div className="saas-kpi-card">
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary-gray)] uppercase tracking-wide">
                Booked Rooms
              </p>
              <h3 className="text-3xl font-bold text-[var(--text-primary-dark-Charcoal)] mt-1">
                {dashboardData.kpis.bookedRooms}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-[var(--accent-cta-sunset-orange)]">
              <BedDouble size={24} />
            </div>
          </div>

          <div className="saas-kpi-card">
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary-gray)] uppercase tracking-wide">
                Available Rooms
              </p>
              <h3 className="text-3xl font-bold text-[var(--text-primary-dark-Charcoal)] mt-1">
                {dashboardData.kpis.availableRooms}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-[var(--primary-deep-teal)]">
              <CheckCircle size={24} />
            </div>
          </div>

          <div className="saas-kpi-card">
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary-gray)] uppercase tracking-wide">
                Today's Check-ins
              </p>
              <h3 className="text-3xl font-bold text-[var(--text-primary-dark-Charcoal)] mt-1">
                {dashboardData.kpis.todayCheckins}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
          </div>

          <div className="saas-kpi-card border-red-200">
            <div>
              <p className="text-sm font-semibold text-red-500 uppercase tracking-wide">
                Pending Reviews
              </p>
              <h3 className="text-3xl font-bold text-red-600 mt-1">
                {dashboardData.kpis.pendingReviews}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <Star size={24} />
            </div>
          </div>
        </div>

        {/* --- MAIN MODULES GRID --- */}
        <div className="saas-module-grid">
          {/* BOOKINGS MODULE */}
          <div className="saas-module-card">
            <div className="saas-module-header">
              <h3 className="font-bold text-[var(--primary-deep-teal)] flex items-center gap-2">
                <CalendarCheck size={20} /> Reservation Desk
              </h3>
            </div>
            <div className="saas-module-body">
              <p className="text-sm text-gray-500 mb-2">
                Recent Booking Activity:
              </p>
              {dashboardData.recentBookings.map((bkg, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center !p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary-dark-Charcoal)]">
                      {bkg.name}
                    </p>
                    <p className="text-xs text-gray-500">{bkg.room}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded-md ${bkg.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {bkg.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="saas-module-footer">
              <Link to="/admin/bookings" className="saas-footer-link">
                Manage All Bookings <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* ROOMS & INVENTORY MODULE */}
          <div className="saas-module-card h-fit">
            <div className="saas-module-header">
              <h3 className="font-bold text-[var(--primary-deep-teal)] flex items-center gap-2">
                <BedDouble size={20} /> Room Inventory Status
              </h3>
            </div>
            <div className="saas-module-body justify-center">
              <div className="flex justify-around text-center">
                <div>
                  <h4 className="text-2xl font-bold text-green-600">
                    {dashboardData.roomStatus.clean}
                  </h4>
                  <p className="text-sm text-gray-500 uppercase">Clean</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-orange-500">
                    {dashboardData.roomStatus.dirty}
                  </h4>
                  <p className="text-sm text-gray-500 uppercase">Dirty</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-red-500">
                    {dashboardData.roomStatus.maintenance}
                  </h4>
                  <p className="text-sm text-gray-500 uppercase">Maintenance</p>
                </div>
              </div>
            </div>
            <div className="saas-module-footer">
              <Link to="/admin/rooms" className="saas-footer-link">
                View Room Operations <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* --- SUPER ADMIN CONDITIONAL SECTION --- */}
        {isSuperAdmin && (
          <>
            <h2 className="text-xl font-bold text-[var(--text-primary-dark-Charcoal)] !mb-4 border-b !pb-2">
              Super Admin Overview
            </h2>
            <div className="saas-module-grid">
              {/* ADMIN DIRECTORY */}
              <div className="saas-module-card border-[var(--primary-deep-teal)] border-t-4">
                <div className="saas-module-header">
                  <h3 className="font-bold text-[var(--primary-deep-teal)] flex items-center gap-2">
                    <ShieldCheck size={20} /> Access Management
                  </h3>
                </div>
                <div className="saas-module-body items-center justify-center text-center">
                  <Users size={40} className="text-gray-300 mb-2" />

                  {/* --- NEW: Admin Count Display --- */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[var(--primary-deep-teal)]">
                      {dashboardData?.totalAdminsCount || 0}
                    </span>
                    <span className="block text-sm font-semibold text-[var(--text-secondary-gray)] uppercase tracking-wide mt-1">
                      Active Admins
                    </span>
                  </div>
                  {/* -------------------------------- */}

                  <p className="text-gray-600">
                    You have full authority to create, update, or revoke
                    administrator access across the NextInn platform.
                  </p>
                </div>
                <div className="saas-module-footer">
                  <Link
                    to="/admin/superadmin/create-admin"
                    className="saas-footer-link"
                  >
                    Manage Admins <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* ACTIVITY LOGS */}
              <div className="saas-module-card border-[var(--primary-deep-teal)] border-t-4">
                <div className="saas-module-header">
                  <h3 className="font-bold text-[var(--primary-deep-teal)] flex items-center gap-2">
                    <ActivitySquare size={20} /> Recent System Activity
                  </h3>
                </div>
                <div className="saas-module-body">
                  {dashboardData.superAdminLogs.map((log, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0"
                    >
                      <Clock
                        size={16}
                        className="text-gray-400 mt-1 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary-dark-Charcoal)]">
                          {log.desc}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="saas-module-footer">
                  <Link
                    to="/admin/superadmin/logs"
                    className="saas-footer-link"
                  >
                    View Full Audit Log <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

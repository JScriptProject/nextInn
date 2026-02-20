import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// --- 1. CRITICAL IMPORTS (Load Instantly) ---
// We keep Layout and HomePage standard so the site paints FCP (First Contentful Paint) fast.
import Layout from "@user/components/Layout.jsx";
import HomePage from "@user/pages/HomePage.jsx";
import { NotificationsContextProvider } from "@user/context/NotificationsContext.jsx";
import NotificationBar from "@user/components/NotificationBar.jsx";
import FullScreenLoader from "@component-support/FullScreenLoader";
import ProtectedRoute from "@user/components/userAuth-components/ProtectedRoute.jsx";
import { verifySession } from "@api/authenticationApi.js";
import { setUser, clearUser, setLoading } from "@redux/userSlice.js";

// --- 2. LAZY IMPORTS (Load on Click) ---

// User Pages (Optimized)
const RoomDetails = lazy(() => import("@user/pages/RoomDetails.jsx"));
const BookingPage = lazy(() => import("@user/pages/BookingPage.jsx"));
const About = lazy(() => import("@user/pages/About.jsx"));
const Login = lazy(() => import("@user/pages/Login.jsx"));
const Register = lazy(() => import("@user/pages/Register.jsx"));
const ForgetPassword = lazy(() => import("@user/pages/ForgetPassword.jsx"));
const DashboardUser = lazy(() => import("@user/pages/DashboardUser.jsx"));

// Admin Pages (Optimized)
const AdminProtectedRoute = lazy(()=>import("@admin/components/admin-auth/AdminProtectedRoute"));
const AdminConsole = lazy(() => import("@admin/pages/AdminConsole.jsx"));
const AdminLogin = lazy(() => import("@admin/pages/AdminLogin"));
const AdminVerify = lazy(() => import("@admin/pages/AdminVerify"));
const RequireAdminOtp = lazy(
  () => import("@admin/components/admin-auth/RequireAdminOtp")
);
const SuperAdminLogin = lazy(() => import("@admin/components/SuperAdminLogin"));

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // ... (Your existing session logic is perfect, keep it) ...
    const initiateSession = async () => {
      try {
        dispatch(setLoading(true));
        const response = await verifySession();
        if (response.success && response.user) {
          dispatch(setUser(response.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (
      location.pathname !== "/admin" &&
      location.pathname !== "/verify-admin" &&
      location.pathname !== "/admin-login" &&
      location.pathname !== "/admin-verify" &&
      location.pathname !== "/verify-admin/login"
    ) {
      initiateSession();
    }
  }, [dispatch]);

  return (
    <NotificationsContextProvider>
      <NotificationBar />

      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          {/* layout and home page normal import so will not load lazy */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            {/* These will now trigger the Loader when clicked */}
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget" element={<ForgetPassword />} />

            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute>
                  <DashboardUser />
                </ProtectedRoute>
              }
            />

            {/* Admin Auth Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-verify" element={<AdminVerify />} />

            <Route element={<RequireAdminOtp />}>
              <Route path="/verify-admin/login" element={<SuperAdminLogin />} />
            </Route>
          </Route>

          {/* Admin Dashboard */}
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminConsole />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </NotificationsContextProvider>
  );
}

export default App;

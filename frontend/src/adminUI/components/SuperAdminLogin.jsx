// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearSuperAdmin,
//   setSuperAdmin,
//   setSuperAdminLoading,
// } from "@redux/superAdminSlice";
// import { loginAdmin, verifyAdminSession } from "@api/adminAthenticationApi";
// import { useContext } from "react";
// import { NotificationsContext } from "@user/context/NotificationsContext";
// import FullScreenLoader from "@component-support/FullScreenLoader";

// function SuperAdminLogin() {
//   //state decalre

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   });

//   //destructured variables
//   const { email, password, remember } = form;

//   //redux store communication
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     setSuperAdmin,
//     isSuperAdminLoading,
//     isSuperAdminAthenticated,
//     clearSuperAdmin,
//   } = useSelector((state) => state.superAdmin);

//   //context variables
//   const { showNotification } = useContext(NotificationsContext);

//   //onchange
//   const onChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]:
//         e.target.type === "checkbox" ? e.target.checked : e.target.value,
//     }));
//   };
//   //onsubmit
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     dispatch(setSuperAdminLoading(true));

//     try {
//       const response = await loginAdmin(form);
//       if (response.success) {
//         const superAdmin = response.superAdmin;
//         useDispatch(setSuperAdmin(superAdmin));
//         navigate("/super-admin", { replace: true });
//         showNotification(true, true, response.message);
//       } else {
//         dispatch(clearSuperAdmin());
//         showNotification(true, false, response.message);
//       }
//     } catch (error) {
//       console.error("Error while login into the admin panel", error);
//       showNotification(true, false, error.message);
//     } finally {
//       dispatch(setSuperAdminLoading(false));
//     }
//   };

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         if (!isSuperAdminAthenticated) {
//           const response = await verifyAdminSession();
//           if (response.success) {
//             navigate("/super-admin", { replace: true });
//             showNotification(true, true, response.message);
//           } else {
//             navigate("/verify-admin/login", { replace: true });
//           }
//         }

//         if (isSuperAdminAthenticated) {
//           navigate("/super-admin", { replace: true });
//           showNotification(true, true, response.message);
//         }
//       } catch (error) {
//         console.error("Error in session validation");
//         showNotification(true, false, error.message);
//       } finally {
//         console.log("inside admin finally");
//         dispatch(setSuperAdminLoading(false));
//       }
//     };
//     checkSession();
//   }, []);

//   if (isSuperAdminLoading) {
//     return <FullScreenLoader />;
//   }

//   return (
//     <div className="login-container">
//       <div className="login-container-wrapper">
//         <h2>Admin Login</h2>
//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             placeholder="email"
//             name="email"
//             required
//             onChange={onChange}
//           />
//           <input
//             type="password"
//             placeholder="password"
//             name="password"
//             required
//             onChange={onChange}
//           />
//           <button type="submit" className="btn-login btn-fill">
//             Admin Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SuperAdminLogin;

import React from 'react'

function SuperAdminLogin() {
  return (
    <div>SuperAdminLogin</div>
  )
}

export default SuperAdminLogin
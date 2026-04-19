import React, { useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import AdminSummary from "../components/dashboard/AdminSummary.jsx";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex">
      <h6>AdminDashBoard {user && user.name} </h6>
      <AdminSidebar />
      <div className="flex-1 ml-15 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import "./App.css";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBasedRoutes from "./utils/RoleBasedRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import Employee from "./components/dashboard/Employee.jsx";
import Leave from "./components/dashboard/Leave.jsx";
import Salary from "./components/dashboard/Salary.jsx";
import Settings from "./components/dashboard/Settings.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import DepartmentList from "./components/department/DepartmentList.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>

          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          >
          </Route>

          <Route
            path="/admin-dashboard/employees"
            element={<Employee />}
          ></Route>
          
          <Route path="/admin-dashboard/leaves" element={<Leave />}></Route>
          <Route path="/admin-dashboard/salary" element={<Salary />}></Route>
          <Route
            path="/admin-dashboard/settings"
            element={<Settings />}
          ></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

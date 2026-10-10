import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PrivateLayout, PublicLayout } from "../layouts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Expenses from "../pages/Expenses";
import NewExpense from "../pages/NewExpense";
import Trips from "../pages/Trips";
import NewTrip from "../pages/NewTrip";
import Approval from "../pages/Approval";

const Router = () => {
  const { user } = useAuth();
 const token =  localStorage.getItem("userToken");

  if (!token) {
    return (
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home replace />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/newexpense" element={<NewExpense />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/newtrips" element={<NewTrip />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="*" element={<Home replace />} />
      </Route>
    </Routes>
  );
};

export default Router;

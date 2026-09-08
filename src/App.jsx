import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServiceRequest from "./pages/ServiceRequest";
import AdminDashboard from "./pages/AdminDashboard";
import SkeletonLoader from "./components/SkeletonLoader";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceName/request" element={<ServiceRequest />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/loading-demo" element={<SkeletonLoader />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
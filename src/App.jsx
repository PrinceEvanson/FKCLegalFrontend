import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Help from "./pages/Help";
import PartnerForm from "./pages/PartnerForm";
import CommunityProjectForm from "./pages/CommunityProjectForm";
import ServicesIndex from "./pages/services/ServicesIndex";
import ServiceTemplate from "./pages/services/ServiceTemplate";
import ServiceRequest from "./pages/ServiceRequest";
import AdminDashboard from "./pages/AdminDashboard";
import SkeletonLoader from "./components/SkeletonLoader";
import ScrollToTop from "./components/ScrollToTop";
import KnowledgeLab from "./pages/KnowledgeLab";
import Academy from "./pages/Academy";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-help" element={<Help />} />
          <Route path="/partner-form" element={<PartnerForm />} />
          <Route path="/community-project-form" element={<CommunityProjectForm />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServiceTemplate />} />
          <Route path="/services/:serviceName/request" element={<ServiceRequest />} />
          <Route path="/knowledge-lab" element={<KnowledgeLab />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/loading-demo" element={<SkeletonLoader />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
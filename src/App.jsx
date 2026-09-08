import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ServiceRequest from './pages/ServiceRequest';
import AdminDashboard from './pages/AdminDashboard';
import SkeletonLoader from './components/SkeletonLoader';

function Home() {
  return (
    <div className="bg-fkcBlack text-white min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold text-fkcGold mb-4">Just Start, Legally.</h1>
      <p className="text-gray-400 max-w-xl text-sm">Welcome to the redesigned interactive platform for FKC Legal, engineered with modern UI/UX, responsive layouts, lazy loading, and direct user engagement portals.</p>
    </div>
  );
}

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
      </Router>
    </AuthProvider>
  );
}
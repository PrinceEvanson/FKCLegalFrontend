import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    setInteractions([
      { id: 1, name: "Evans Kiprop", email: "evans@example.com", service: "Corporate & Commercial Law", date: "2026-09-08" },
      { id: 2, name: "Global Investor Ltd", email: "contact@investor.com", service: "Real Estate & Property Law", date: "2026-09-08" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-fkcBlack text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-fkcGold mb-6">Admin Oversight: User Interactions & Leads</h1>
        <div className="bg-fkcBlue/10 border border-fkcGold/30 rounded-lg overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-fkcBlue/30 text-fkcGold text-xs uppercase tracking-wider">
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Requested Service</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {interactions.map((item) => (
                <tr key={item.id} className="border-t border-gray-800 text-xs">
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-gray-400">{item.email}</td>
                  <td className="p-4 text-fkcGold font-semibold">{item.service}</td>
                  <td className="p-4 text-gray-500">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
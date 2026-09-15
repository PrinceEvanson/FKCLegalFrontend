import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, PhoneCall, Sun, Moon } from "lucide-react";
import fkcLogo from "../assets/FKCLegalLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("fkc_theme") !== "light";
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("fkc_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("fkc_theme", "light");
    }
  }, [darkMode]);

  const servicesList = [
    { name: "Commercial Property", path: "/services/commercial-property" },
    { name: "Corporate Services", path: "/services/corporate-services" },
    { name: "Dispute Resolution", path: "/services/dispute-resolution" },
    { name: "International Arbitration And Mediation", path: "/services/international-arbitration-and-mediation" },
    { name: "Employment And Benefits", path: "/services/employment-and-benefits" },
    { name: "Intellectual Property", path: "/services/intellectual-property" },
    { name: "Finance", path: "/services/finance" },
    { name: "Financial Services Regulation", path: "/services/financial-services-regulation" },
    { name: "Tax", path: "/services/tax" },
    { name: "Immigration", path: "/services/immigration" },
    { name: "Shipping And Logistics", path: "/services/shipping-and-logistics" },
  ];

  return (
    <>
      <nav className="bg-white dark:bg-fkcBlack text-gray-900 dark:text-white border-b border-gray-200 dark:border-fkcGold/30 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={fkcLogo} alt="FKC Legal Logo" className="h-18 w-auto object-contain" />
            </Link>

            <div className="hidden md:flex items-center space-x-6 text-xs font-medium">
              <Link to="/who-we-help" className="hover:text-fkcGold transition">WHO WE HELP</Link>

              <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <button
                  onDoubleClick={() => navigate("/services")}
                  className="flex items-center gap-1 hover:text-fkcGold transition py-2 cursor-pointer"
                >
                  SERVICES <ChevronDown size={14} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white dark:bg-fkcBlack border border-gray-200 dark:border-fkcGold/40 shadow-2xl py-2 rounded-md max-h-[440px] overflow-y-auto">
                    {servicesList.map((service, idx) => (
                      <div key={idx} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-fkcBlue/30 flex justify-between items-center group transition">
                        <Link to={service.path} className="text-gray-700 dark:text-gray-300 group-hover:text-fkcGold text-xs pr-2">
                          {service.name}
                        </Link>
                        <Link to={service.path} className="text-[10px] bg-fkcGold text-fkcBlack px-2 py-1 rounded font-bold hover:bg-white transition shadow whitespace-nowrap">
                          Acquire Assistance
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/knowledge-lab" className="hover:text-fkcGold transition">KNOWLEDGE LAB</Link>
              <Link to="/diplomat" className="hover:text-fkcGold transition">DIPLOMAT & EX-DIPLOMAT</Link>
              <Link to="/about-us" className="hover:text-fkcGold transition">ABOUT</Link>
              <Link to="/career" className="hover:text-fkcGold transition">CAREER</Link>
              <Link to="/contact" className="hover:text-fkcGold transition">CONTACT US</Link>
            </div>

            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 dark:border-fkcGold/40 text-gray-800 dark:text-fkcGold hover:bg-fkcGold/10 transition text-xs font-medium cursor-pointer"
              >
                {darkMode ? <Moon size={14} /> : <Sun size={14} />}
                <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
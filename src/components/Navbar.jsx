import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, PhoneCall, Sun, Moon } from "lucide-react";
import fkcLogo from "../assets/FKCLegalLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
      <nav className="bg-fkcBlack text-white border-b border-fkcGold/30 sticky top-0 z-50 transition-colors duration-300">
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
                  <div className="absolute top-full left-0 w-80 bg-fkcBlack border border-fkcGold/40 shadow-2xl py-2 rounded-md max-h-[440px] overflow-y-auto scrollbar-thin scrollbar-thumb-fkcGold/40">
                    {servicesList.map((service, idx) => (
                      <div key={idx} className="px-4 py-3 hover:bg-fkcBlue/30 flex justify-between items-center group transition">
                        <Link to={service.path} className="text-gray-300 group-hover:text-fkcGold text-xs pr-2">
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
              <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-fkcGold/40 text-fkcGold hover:bg-fkcGold/10 transition text-xs font-medium">
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-fkcGold/40 text-fkcGold text-[10px]">
                {darkMode ? <Sun size={12} /> : <Moon size={12} />}
                <span>{darkMode ? "Light" : "Dark"}</span>
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-fkcBlack border-b border-fkcGold/30 px-4 py-4 space-y-3 max-h-[75vh] overflow-y-auto">
          <Link to="/who-we-help" onClick={() => setIsOpen(false)} className="block text-xs font-medium text-gray-300 hover:text-fkcGold">WHO WE HELP</Link>
          <div className="space-y-2 pt-2 border-t border-fkcGold/20">
            <span
              onDoubleClick={() => {
                setIsOpen(false);
                navigate("/services");
              }}
              className="text-[10px] uppercase tracking-wider text-fkcGold font-bold cursor-pointer inline-block"
            >
              Services
            </span>
            {servicesList.map((service, idx) => (
              <div key={idx} className="flex justify-between items-center py-1.5 pl-2">
                <Link to={service.path} onClick={() => setIsOpen(false)} className="text-xs text-gray-300 hover:text-fkcGold pr-2">
                  {service.name}
                </Link>
                <Link to={service.path} onClick={() => setIsOpen(false)} className="text-[10px] bg-fkcGold text-fkcBlack px-2 py-0.5 rounded font-bold whitespace-nowrap">
                  Acquire Assistance
                </Link>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-2 border-t border-fkcGold/20 text-xs font-medium">
            <Link to="/knowledge-lab" onClick={() => setIsOpen(false)} className="block py-1 text-gray-300 hover:text-fkcGold">KNOWLEDGE LAB</Link>
            <Link to="/diplomat" onClick={() => setIsOpen(false)} className="block py-1 text-gray-300 hover:text-fkcGold">DIPLOMAT & EX-DIPLOMAT</Link>
            <Link to="/about-us" onClick={() => setIsOpen(false)} className="block py-1 text-gray-300 hover:text-fkcGold">ABOUT</Link>
            <Link to="/career" onClick={() => setIsOpen(false)} className="block py-1 text-gray-300 hover:text-fkcGold">CAREER</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-1 text-gray-300 hover:text-fkcGold">CONTACT US</Link>
          </div>
        </div>
      )}

      <a href="tel:+254700000000" className="fixed bottom-6 right-6 z-50 bg-fkcGold text-fkcBlack px-4 py-3 rounded-full shadow-2xl hover:bg-white transition flex items-center gap-2 border-2 border-fkcBlack animate-bounce font-bold text-xs">
        <PhoneCall size={18} />
        <span>Contact Us</span>
      </a>
    </>
  );
}
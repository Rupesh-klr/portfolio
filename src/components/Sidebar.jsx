import React, { useState, useEffect, useRef } from "react";
import { 
  FaHome, 
  FaUser, 
  FaCode, 
  FaBriefcase, 
  FaEnvelope, 
  FaFileAlt,
  FaChevronRight 
} from "react-icons/fa";

const Sidebar = () => {
  // --- 1. State Management ---
  const [activeSection, setActiveSection] = useState(null); // Initially null as requested
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- 2. Refs for Timers ---
  const tooltipTimeoutRef = useRef(null);
  const mobileAutoCloseTimerRef = useRef(null);

  const navItems = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "about", label: "About", icon: <FaUser /> },
    { id: "skills", label: "Skills", icon: <FaCode /> },
    { id: "work", label: "Work", icon: <FaBriefcase /> },
    { id: "resume", label: "Resume", icon: <FaFileAlt /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  // --- 3. Scroll & Click Handler ---
  const handleNavClick = (id) => {
    setActiveSection(id); // Set active state on click
    
    // Scroll Logic
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });

    // On Mobile: Close sidebar immediately after selection
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  // --- 4. Tooltip Hover Logic (Desktop) ---
  const handleMouseEnter = (id) => {
    if (window.innerWidth < 768) return; // Disable hover tooltips on mobile
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setHoveredId(id);
    tooltipTimeoutRef.current = setTimeout(() => setHoveredId(null), 1000);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setHoveredId(null);
  };

  // --- 5. Mobile Auto-Close Logic ---
  useEffect(() => {
    // Only run this logic if the menu is OPEN and we are on a small screen
    if (isMobileMenuOpen) {
      // Clear existing timer to reset the 3-second countdown if user interacts
      if (mobileAutoCloseTimerRef.current) clearTimeout(mobileAutoCloseTimerRef.current);

      // Set new timer to close after 3 seconds
      mobileAutoCloseTimerRef.current = setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 3000);
    }

    return () => {
      if (mobileAutoCloseTimerRef.current) clearTimeout(mobileAutoCloseTimerRef.current);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ========================================
        MOBILE TOGGLE BUTTON (Glass Arrow) 
        Visible only on small screens (< md) 
        and when menu is CLOSED 
        ========================================
      */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 md:hidden 
                     flex items-center justify-center w-8 h-12 
                     bg-white/10 backdrop-blur-md border-y border-r border-white/20 
                     rounded-r-xl shadow-lg text-white hover:bg-white/20 transition-all"
        >
          <FaChevronRight size={14} />
        </button>
      )}

      {/* ========================================
        SIDEBAR CONTAINER 
        - Mobile: Hidden by default (-translate-x-full), slides in when open
        - Desktop (md+): Always visible, reset transform
        ========================================
      */}
      <div 
        className={`fixed left-5 top-1/2 z-50 flex flex-col gap-6 
                    transition-transform duration-500 ease-in-out
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-[200%]"} 
                    md:translate-x-0 md:transform -translate-y-1/2`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            className={`group relative flex items-center justify-center w-12 h-12 rounded-full 
                        border backdrop-blur-md transition-all duration-300 shadow-lg
                        ${
                          // Active State Styling (Background Active)
                          activeSection === item.id 
                            ? "bg-tertiary border-purple-500 shadow-purple-500/40 scale-110" 
                            : "bg-black-100/80 border-white/10 hover:bg-tertiary"
                        }
            `}
          >
            {/* Icon */}
            <span className={`text-xl transition-colors duration-300 ${
              activeSection === item.id ? "text-white" : "text-secondary group-hover:text-white"
            }`}>
              {item.icon}
            </span>

            {/* Tooltip Label 
               - Only shows on Hover (Desktop)
               - Hidden on Mobile to reduce clutter
            */}
            <span 
              className={`absolute left-14 py-1 px-3 rounded-lg bg-tertiary text-white text-sm font-medium border border-white/10 whitespace-nowrap shadow-xl transition-all duration-300 hidden md:block ${
                hoveredId === item.id 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-4 pointer-events-none"
              }`}
            >
              {item.label}
              {/* Tooltip Arrow */}
              <span className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-tertiary rotate-45 border-r border-t border-white/10"></span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;

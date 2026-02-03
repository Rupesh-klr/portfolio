import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyDetailsComponent from "./MyDetailsComponent"; // Ensure path is correct

import { styles } from "../styles";
import { navLinks, aboutData } from "../constants";
import ThemeToggle from "./ThemeToggle";
import { logo, menu, close } from "../assets";

const Navbar = ({ onOpenModal }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleNavClick = (nav) => {
    if (nav.navModelItem && nav.modelType === "my-details-compunetent") {
      setActiveModal(nav.modelType);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
          scrolled ? "bg-primary" : "bg-transparent"
        }`}
      >
        <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
          {/* LOGO */}
          <Link
            to='/'
            className='flex items-center gap-2'
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
            <p className='text-white text-[18px] font-bold cursor-pointer flex '>
              Rupesh &nbsp;
              <span className='sm:block hidden'> | Full Stack DevOps Engineer</span>
            </p>
          </Link>

          <ThemeToggle />

          {/* DESKTOP NAV (Hidden on Mobile) */}
          <ul className='list-none hidden sm:flex flex-row gap-10'>
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer relative group`}
                onClick={() => setActive(nav.title)}
              >
                {nav.navModelItem ? (
                  <span
                    className="hover:text-yellow text-[16px] font-medium block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(nav);
                    }}
                  >
                    {nav.title}
                  </span>
                ) : (
                  <a href={`#${nav.id}`}>{nav.title}</a>
                )}

                {/* Desktop Dropdown */}
                {nav.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#1d1836] rounded-xl shadow-card p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top z-50">
                    <div className="flex flex-col gap-4">
                      {nav.children.map((child) => (
                        <a
                          key={child.id}
                          href={child.path}
                          target={child.external ? "_blank" : "_self"}
                          className="text-secondary hover:text-white text-[16px] font-medium block"
                          onClick={(e) => {
                            if (child.modelItem) {
                              e.preventDefault();
                              onOpenModal(child.modelType, child.modelKey, child.modelData);
                            } else if (!child.external) {
                              setActive(nav.title);
                            }
                          }}
                        >
                          {child.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* MOBILE MENU TOGGLE */}
          <div className='sm:hidden flex flex-1 justify-end items-center'>
            <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 pb-14 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl max-h-[80vh] overflow-y-auto custom-scrollbar shadow-card`}
            >
              {/* --- CRITICAL FIX HERE: Changed 'justify-end' to 'justify-start' --- */}
              <ul className='list-none flex justify-start items-start flex-1 flex-col gap-4'>
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] w-full`}
                  >
                    {nav.children ? (
                      <div className="flex flex-col gap-2">
                        <span className="text-white/50 text-[12px] uppercase tracking-wider font-bold">
                          {nav.title}
                        </span>
                        <ul className="flex flex-col gap-3 pl-3 border-l-2 border-white/10">
                          {nav.children.map((child) => (
                            <li key={child.id}>
                              <a
                                href={child.path}
                                target={child.external ? "_blank" : "_self"}
                                className="text-secondary hover:text-white block"
                                onClick={() => {
                                  setToggle(!toggle);
                                  if (child.modelItem) {
                                    onOpenModal(child.modelType, child.modelKey, child.modelData);
                                  } else if (!child.external) {
                                    setActive(nav.title);
                                  }
                                }}
                              >
                                {child.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <>
                        {nav?.navModelItem ? (
                          <span
                            className="hover:text-yellow text-[16px] font-medium block"
                            onClick={(e) => {
                              e.preventDefault();
                              setToggle(!toggle);
                              handleNavClick(nav);
                            }}
                          >
                            {nav.title}
                          </span>
                        ) : (
                          <a
                            href={`#${nav.id}`}
                            className={`${
                              active === nav.title ? "text-white" : "text-secondary"
                            }`}
                            onClick={() => {
                              setToggle(!toggle);
                              setActive(nav.title);
                            }}
                          >
                            {nav.title}
                          </a>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* --- GLOBAL MODAL (Updated with Responsive Fix) --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
           <div 
             className="fixed bg-[#1d1836] p-8 rounded-2xl border border-white/10 shadow-card flex flex-col inset-4 md:top-[15%] md:bottom-[18%] md:left-[15%] md:right-[10%]"
           >
            {/* Header / Close */}
            <div className="relative mb-4">
               <h1 className="text-2xl font-bold text-white">Details</h1>
               <button
                  onClick={() => setActiveModal(null)}
                  className="absolute -top-2 right-0 text-white text-lg font-bold bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all"
                >
                  ✕ Close
                </button>
            </div>
            
            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeModal === "my-details-compunetent" && (
                <MyDetailsComponent data={aboutData} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

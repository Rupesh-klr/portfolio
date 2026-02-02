import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, AnimatePresence } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

// --- CONFIGURATION VARIABLES ---
const isActivelyLooking = true; // Set to false to hide the "Open to Work" badge

// Define which screens should show the animation
const screenConfig = {
  xs: true,  // < 450px
  sm: true,  // < 768px
  md: true,  // < 1024px
  lg: true, // > 1024px
  xl: true,
};

// --- COMPONENT: EXPERIENCE CARD (Unchanged logic, just cleanup) ---
const ExperienceCard = ({ experience }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTruncatedText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const pointsToShow = isExpanded ? experience.points : experience.points.slice(0, 2);
  const shouldShowButton = experience.points.length > 2 || experience.points.some(point => point.split(" ").length > 10);

  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[20px] font-bold'>{experience.title}</h3>
        <p className='text-secondary text-[14px] font-semibold' style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {pointsToShow.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[12px] pl-1 tracking-wider'
          >
            {isExpanded ? point : getTruncatedText(point, 15)}
          </li>
        ))}
      </ul>

      {shouldShowButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='mt-3 mx-5 p-3 text-[#915EFF] text-[12px] font-bold hover:underline bg-transparent border-none cursor-pointer'
        >
          {isExpanded ? "Show Less" : "... See More"}
        </button>
      )}
    </VerticalTimelineElement>
  );
};

// --- COMPONENT: COMPANY LOGO MOMENTUM (The Animation) ---
const CompanyTicker = () => {
  // Extract unique icons from experiences
  const uniqueIcons = [...new Set(experiences.map((exp) => exp.icon))];
  
  // Duplicate the array to create a seamless loop
  const tickerIcons = [...uniqueIcons, ...uniqueIcons, ...uniqueIcons,...uniqueIcons, ...uniqueIcons, ...uniqueIcons];

  return (
    <div className="w-full overflow-hidden bg-black-100/50 py-3 mb-10 border-y border-white/10 relative">
      <div className="absolute left-0 top-0 h-full w-[50px] z-10 bg-gradient-to-r from-primary to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[50px] z-10 bg-gradient-to-l from-primary to-transparent" />
      
      <motion.div
        className="flex gap-10 w-fit"
        animate={{
          x: ["0%", "-50%"], // Move halfway (since we duplicated lists)
        }}
        transition={{
          duration: 10, // Adjust speed: Higher = Slower
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {tickerIcons.map((icon, index) => (
          <div key={index} className="flex-shrink-0 flex items-center justify-center w-[50px] h-[50px] bg-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity">
            <img src={icon} alt="company" className="w-full h-full object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- COMPONENT: JOB STATUS BADGE ---
const JobStatusBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-4 flex justify-center"
  >
    <div className="relative group">
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0px rgba(145, 94, 255, 0.7)",
            "0 0 0 10px rgba(145, 94, 255, 0)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="bg-[#915EFF] text-white px-4 py-1 rounded-full text-[12px] font-bold flex items-center gap-2 cursor-pointer"
      >
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        Actively Looking for New Roles
      </motion.div>
    </div>
  </motion.div>
);

// --- MAIN COMPONENT ---
const Experience = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  // Determine if animation should show based on screen size and config
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      let currentSize = 'xl';
      if (width < 450) currentSize = 'xs';
      else if (width < 768) currentSize = 'sm';
      else if (width < 1024) currentSize = 'md';
      else if (width < 1280) currentSize = 'lg';

      // Check the config
      if (screenConfig[currentSize]) {
        setShowAnimation(true);
      } else {
        setShowAnimation(false);
      }
    };

    // Run on mount and resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
        
        {/* --- 1. JOB SEEKER STATUS --- */}
        {isActivelyLooking && <JobStatusBadge />}

      </motion.div>

      <div className='mt-20 flex flex-col'>
        
        {/* --- 2. MOBILE MOMENTUM ANIMATION --- */}
        {/* Only renders if the local variable config allows for this screen size */}
        {showAnimation && <CompanyTicker />}

        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
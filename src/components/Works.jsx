import React, { useState, useEffect, useMemo } from "react";
import { Tilt } from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets"; 
import { SectionWrapper } from "../hoc";
import { projects } from "../constants"; 
import { fadeIn, textVariant } from "../utils/motion";

// ==========================================
// 1. CONFIGURATION & HELPERS (LOGIC LAYER)
// ==========================================

const LAYOUT_CONFIG = {
  // Define columns per screen size
  columns: {
    xs: 1, // Mobile
    sm: 1, // Large Mobile
    md: 2, // Tablet
    lg: 2, // Desktop
  },
  // Default number of rows to show
  defaultRows: 1, 
  fallback: 2, 
};

// Helper: Sanitize numbers
const sanitizeValue = (val, fallback) => {
  const parsed = parseFloat(val);
  if (isNaN(parsed)) return fallback;
  return Math.round(parsed);
};

// Helper: Sorting Logic (Ranked > Pinned > Rest)
const getSortedProjects = (allProjects) => {
  // 1. Ranked: Has a valid number in 'displayProjectCount'
  const ranked = allProjects
    .filter(p => typeof p.displayProjectCount === 'number' && !isNaN(p.displayProjectCount))
    .sort((a, b) => a.displayProjectCount - b.displayProjectCount);
  
  const rankedNames = new Set(ranked.map(p => p.name));

  // 2. Pinned: 'isPinned' is true (and not in ranked)
  const pinned = allProjects.filter(p => 
    p.isPinned === true && !rankedNames.has(p.name)
  );
  const pinnedNames = new Set(pinned.map(p => p.name));

  // 3. Rest: Everything else
  const rest = allProjects.filter(p => 
    !rankedNames.has(p.name) && !pinnedNames.has(p.name)
  );

  return [...ranked, ...pinned, ...rest];
};

// ==========================================
// 2. ICONS & UI ASSETS (UI LAYER)
// ==========================================

const ExternalLinkIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

const CodeIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117.3 256l90.3-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.5-5.1 13.1 0 17.6l144.1 135.1c4.9 4.6 12.5 4.4 17-.4zm256.3-296.9l-43.5 46.4c-4.6 4.9-4.3 12.7.8 17.2L484.7 256l-90.3 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.8 12.1 5.1 17 .5l144.1-135.1c5.1-4.5 5.1-13.1 0-17.6L454.1 112c-4.9-4.6-12.5-4.4-17 .4z"></path></svg>
);

// ==========================================
// 3. PROJECT DETAILS MODAL (UI FROM TEMPLATE 1)
// ==========================================
const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        className="bg-[#151030] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_0_50px_rgba(145,94,255,0.3)] relative custom-scrollbar flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT SIDE: Image */}
        <div className="w-full md:w-2/5 relative h-[300px] md:h-auto">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#151030] via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
             <h2 className="text-3xl font-bold text-white drop-shadow-md leading-tight mb-2">{project.name}</h2>
             <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag.name} className={`text-xs px-2 py-1 rounded bg-black/50 border border-white/10 ${tag.color}`}>
                    #{tag.name}
                  </span>
                ))}
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="w-full md:w-3/5 p-8 flex flex-col gap-6 bg-[#151030]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-500 p-2 rounded-full transition-all border border-white/5 hover:border-red-500/50"
          >
            &#10005;
          </button>

          <div>
            <h3 className="text-white text-lg font-bold mb-2">About Project</h3>
            <p className="text-secondary text-[15px] leading-[26px] text-justify">
              {project.description}
            </p>
          </div>
          
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            {project?.bullets?.map((b, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {b}
              </motion.li>
            ))}
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="bg-tertiary/40 p-4 rounded-xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-1">My Role</h4>
                <p className="text-purple-400 text-sm">{project.my_role || "Full Stack Developer"}</p>
             </div>
             <div className="bg-tertiary/40 p-4 rounded-xl border border-white/5">
                 <h4 className="text-white font-bold text-sm mb-1">Contribution</h4>
                 <p className="text-secondary text-xs line-clamp-2">{project.contribution || "Core architecture & Implementation"}</p>
             </div>
          </div>

          {project.team && (
            <div>
              <h3 className="text-white text-md font-bold mb-3">Team</h3>
              <div className="flex flex-wrap gap-3">
                {project.team.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-black/30 pr-3 rounded-full border border-white/5 hover:border-white/20 transition-all cursor-pointer" onClick={() => window.open(member.social, "_blank")}>
                    <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col">
                      <span className="text-white text-xs font-bold">{member.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-white/10 flex flex-wrap gap-3">
             <button onClick={() => window.open(project.source_code_link, "_blank")} className="flex-1 flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 border border-white/10 text-white px-4 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]">
                <CodeIcon /> Source Code <span className="text-xs opacity-50">↗</span>
             </button>
             {project.live_url && (
               <button onClick={() => window.open(project.live_url, "_blank")} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg shadow-purple-900/20">
                  Live Demo <ExternalLinkIcon />
               </button>
             )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 4. PROJECT CARD (MERGED UI + MOBILE LOGIC)
// ==========================================
const ProjectCard = ({ index, project, onOpenModal, isMobile }) => {
  
  // This contains the UI from your FIRST template
  const CardContent = () => (
    <div className="relative bg-tertiary p-5 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-white/30 transition-all duration-300">
      
      {/* Image Section */}
      <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 m-3 card-img_hover">
          <div
            onClick={(e) => { e.stopPropagation(); window.open(project.source_code_link, "_blank"); }}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-white/10 hover:scale-110 transition-transform"
          >
            <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-5 flex-1">
        <h3 className="text-white font-bold text-[22px] group-hover:text-purple-400 transition-colors">{project.name}</h3>
        <p className="mt-2 text-secondary text-[14px] line-clamp-3 leading-relaxed">
          {project.short_desc || project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2 mb-6">
        {project.tags.slice(0, 3).map((tag) => (
          <p key={tag.name} className={`text-[12px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>

      {/* Action Buttons (Details, Code, Live) */}
      <div className="flex gap-2 mt-auto pt-4 border-t border-white/5 z-20 relative">
        <button 
          onClick={(e) => { e.stopPropagation(); onOpenModal(project); }}
          className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[13px] font-medium py-2 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-1"
        >
          Details
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); window.open(project.source_code_link, "_blank"); }}
          className="bg-black/20 hover:bg-black/40 text-secondary hover:text-white p-2 rounded-lg border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105"
          title="View Code"
        >
          <CodeIcon />
        </button>

        {project.live_url && (
          <button 
            onClick={(e) => { e.stopPropagation(); window.open(project.live_url, "_blank"); }}
            className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 hover:from-purple-600 hover:to-blue-600 text-white p-2 rounded-lg border border-white/10 transition-all duration-300 hover:scale-105 shadow-lg"
            title="Live Demo"
          >
            <ExternalLinkIcon />
          </button>
        )}
      </div>
    </div>
  );

  // LOGIC: Disable Tilt on Mobile for better scrolling
  if (isMobile) {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full"
      >
        <CardContent />
      </motion.div>
    );
  }

  // LOGIC: Use Tilt on Desktop
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Tilt
        options={{ max: 25, scale: 1, speed: 450 }}
        className="group relative rounded-2xl w-full h-full"
      >
         <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500" />
         <CardContent />
      </Tilt>
    </motion.div>
  );
};

// ==========================================
// 5. MAIN COMPONENT (THE ORCHESTRATOR)
// ==========================================
const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState("lg");
  const [isMobile, setIsMobile] = useState(false);

  // 1. SCREEN RESIZE LOGIC
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile if < 768px

      if (width < 640) setScreenSize("xs");
      else if (width < 768) setScreenSize("sm");
      else if (width < 1024) setScreenSize("md");
      else setScreenSize("lg");
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. SORTING LOGIC (Ranked -> Pinned -> Rest)
  const sortedProjects = useMemo(() => getSortedProjects(projects), []);

  // 3. ROW/COLUMN CALCULATION
  const columns = sanitizeValue(LAYOUT_CONFIG.columns[screenSize], LAYOUT_CONFIG.fallback);
  const defaultRows = sanitizeValue(LAYOUT_CONFIG.defaultRows, 2);
  const initialCount = columns * defaultRows;
  
  // 4. SLICING
  const visibleProjects = isExpanded ? sortedProjects : sortedProjects.slice(0, initialCount);

  // 5. MODAL HANDLERS
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through real-world examples. 
          Use the buttons on the cards to explore details, code, and live demos.
        </motion.p>
      </div>

      {/* GRID LAYOUT (Responsive Columns based on Config) */}
      <motion.div 
        layout
        className="mt-20 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {visibleProjects.map((project, index) => (
            <ProjectCard 
              key={project.name} // Ensure unique key
              index={index} 
              project={project}
              onOpenModal={handleOpenModal}
              isMobile={isMobile}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* SHOW MORE BUTTON */}
      {sortedProjects.length > initialCount && (
        <div className="w-full flex justify-center mt-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#915EFF] hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all active:scale-95 outline-none border border-white/10"
          >
            {isExpanded ? "Show Less" : "View All Projects"}
          </button>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal 
            project={selectedProject} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(Works, "work");
// import React, { useState, useEffect, useMemo } from "react";
// import { Tilt } from "react-tilt";
// import { motion, AnimatePresence } from "framer-motion";

// import { styles } from "../styles";
// import { github } from "../assets"; 
// import { SectionWrapper } from "../hoc";
// import { projects } from "../constants"; 
// import { fadeIn, textVariant } from "../utils/motion";

// // --- 1. CONFIGURATION: CONTROL YOUR LAYOUT HERE ---
// const LAYOUT_CONFIG = {
//   // Columns per screen size
//   columns: {
//     xs: 1, // Mobile
//     sm: 2, // Large Mobile
//     md: 2, // Tablet (2 columns)
//     lg: 2, // Desktop (3 columns)
//   },
//   // How many rows to show by default before clicking "View All"
//   defaultRows: 1, 
//   // Fallback value if config is invalid
//   fallback: 2, 
// };

// // --- 2. HELPERS ---

// // Helper: Sanitize inputs (String -> Number, Round decimals, Default fallback)
// const sanitizeValue = (val, fallback) => {
//   const parsed = parseFloat(val);
//   if (isNaN(parsed)) return fallback;
//   return Math.round(parsed);
// };

// // Helper: Sorting Logic (Ranked > Pinned > Standard)
// const getSortedProjects = (allProjects) => {
//   // 1. Ranked: Has a valid number in 'displayProjectCount'
//   const ranked = allProjects
//     .filter(p => typeof p.displayProjectCount === 'number' && !isNaN(p.displayProjectCount))
//     .sort((a, b) => a.displayProjectCount - b.displayProjectCount);
  
//   // Track IDs to prevent duplicates
//   const rankedNames = new Set(ranked.map(p => p.name));

//   // 2. Pinned: 'isPinned' is true, and NOT in ranked list
//   const pinned = allProjects.filter(p => 
//     p.isPinned === true && !rankedNames.has(p.name)
//   );
  
//   const pinnedNames = new Set(pinned.map(p => p.name));

//   // 3. Rest: Everything else
//   const rest = allProjects.filter(p => 
//     !rankedNames.has(p.name) && !pinnedNames.has(p.name)
//   );

//   return [...ranked, ...pinned, ...rest];
// };

// // --- 3. ICONS ---
// const ExternalLinkIcon = () => (
//   <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
// );

// const CodeIcon = () => (
//   <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117.3 256l90.3-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.5-5.1 13.1 0 17.6l144.1 135.1c4.9 4.6 12.5 4.4 17-.4zm256.3-296.9l-43.5 46.4c-4.6 4.9-4.3 12.7.8 17.2L484.7 256l-90.3 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.8 12.1 5.1 17 .5l144.1-135.1c5.1-4.5 5.1-13.1 0-17.6L454.1 112c-4.9-4.6-12.5-4.4-17 .4z"></path></svg>
// );

// // --- 4. MODAL COMPONENT ---
// const ProjectDetailsModal = ({ project, onClose }) => {
//   if (!project) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ y: 50, opacity: 0, scale: 0.95 }}
//         animate={{ y: 0, opacity: 1, scale: 1 }}
//         exit={{ y: 50, opacity: 0, scale: 0.95 }}
//         className="bg-[#151030] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl relative custom-scrollbar flex flex-col md:flex-row overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Modal content omitted for brevity - same as your previous code */}
//         {/* Placeholder: */}
//         <div className="p-8 w-full">
//             <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500">Close ✕</button>
//             <h2 className="text-2xl font-bold text-white">{project.name}</h2>
//             <p className="mt-4 text-secondary">{project.description}</p>
//             {/* ... Rest of your modal logic ... */}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // --- 5. PROJECT CARD COMPONENT (Mobile Optimized) ---
// const ProjectCard = ({ index, project, onOpenModal, isMobile }) => {
  
//   // This is the inner content of the card (Shared between Mobile and Desktop)
//   const CardContent = () => (
//     <div className="relative bg-tertiary p-5 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-white/30 transition-all duration-300">
//       <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">
//         <img
//           src={project.image}
//           alt={project.name}
//           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//         />
//         <div className="absolute top-0 right-0 m-3 card-img_hover">
//           <div
//             onClick={(e) => { e.stopPropagation(); window.open(project.source_code_link, "_blank"); }}
//             className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-white/10"
//           >
//             <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
//           </div>
//         </div>
//       </div>

//       <div className="mt-5 flex-1">
//         <h3 className="text-white font-bold text-[22px] group-hover:text-purple-400">{project.name}</h3>
//         <p className="mt-2 text-secondary text-[14px] line-clamp-3 leading-relaxed">
//           {project.short_desc || project.description}
//         </p>
//       </div>

//       <div className="mt-4 flex flex-wrap gap-2 mb-6">
//         {project.tags.slice(0, 3).map((tag) => (
//           <p key={tag.name} className={`text-[12px] ${tag.color}`}>#{tag.name}</p>
//         ))}
//       </div>

//       <div className="flex gap-2 mt-auto pt-4 border-t border-white/5 z-20 relative">
//         <button 
//           onClick={(e) => { e.stopPropagation(); onOpenModal(project); }}
//           className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[13px] font-medium py-2 rounded-lg border border-white/10"
//         >
//           Details
//         </button>
//         {/* View Code & Live Demo buttons here... */}
//       </div>
//     </div>
//   );

//   // MOBILE FIX: Use a simple Motion Div (No Tilt) to fix scrolling issues
//   if (isMobile) {
//     return (
//       <motion.div 
//         layout // Enables smooth rearrangement animation
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.1 }}
//         className="w-full"
//       >
//         <CardContent />
//       </motion.div>
//     );
//   }

//   // DESKTOP: Use Tilt
//   return (
//     <motion.div 
//       layout // Enables smooth rearrangement animation
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//     >
//       <Tilt
//         options={{ max: 25, scale: 1, speed: 450 }}
//         className="group relative rounded-2xl w-full h-full"
//       >
//         <CardContent />
//       </Tilt>
//     </motion.div>
//   );
// };

// // --- 6. MAIN WORKS COMPONENT ---
// const Works = () => {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   // Screen size tracking
//   const [screenSize, setScreenSize] = useState("lg");
//   const [isMobile, setIsMobile] = useState(false);

//   // 1. Resize Logic: Determine screen size (sm/md/lg) and mobile status
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
      
//       // Determine if it's a "Touch Device" size
//       setIsMobile(width < 768);

//       // Map width to config keys
//       if (width < 640) setScreenSize("xs");
//       else if (width < 768) setScreenSize("sm");
//       else if (width < 1024) setScreenSize("md");
//       else setScreenSize("lg");
//     };

//     handleResize(); // Run on mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 2. Sorting Logic (Memoized so it doesn't run on every render)
//   const sortedProjects = useMemo(() => getSortedProjects(projects), []);

//   // 3. Grid Calculation
//   // Get columns from config, ensuring it's a number
//   const columns = sanitizeValue(LAYOUT_CONFIG.columns[screenSize], LAYOUT_CONFIG.fallback);
//   // Get default rows, ensuring it's a number
//   const defaultRows = sanitizeValue(LAYOUT_CONFIG.defaultRows, 2);
  
//   // Calculate how many items to show
//   const initialCount = columns * defaultRows;
//   const visibleProjects = isExpanded ? sortedProjects : sortedProjects.slice(0, initialCount);

//   // Handlers
//   const handleOpenModal = (project) => {
//     setSelectedProject(project);
//     document.body.style.overflow = "hidden";
//   };

//   const handleCloseModal = () => {
//     setSelectedProject(null);
//     document.body.style.overflow = "auto";
//   };

//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={`${styles.sectionSubText}`}>My work</p>
//         <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
//       </motion.div>

//       <div className="w-full flex">
//         <motion.p
//           variants={fadeIn("", "", 0.1, 1)}
//           className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
//         >
//           Following projects showcase my skills and experience through real-world examples. 
//           Use the buttons on the cards to explore details, code, and live demos.
//         </motion.p>
//       </div>

//       {/* GRID LAYOUT 
//          Using CSS Grid is much better for this row/column logic than Flexbox
//       */}
//       <motion.div 
//         layout // Animates the container when height changes
//         className="mt-20 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//       >
//         <AnimatePresence>
//           {visibleProjects.map((project, index) => (
//             <ProjectCard 
//               key={project.name} // Unique key is important for animation
//               index={index} 
//               project={project}
//               onOpenModal={handleOpenModal}
//               isMobile={isMobile} // Pass mobile state to disable Tilt
//             />
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* SHOW MORE / SHOW LESS BUTTON */}
//       {/* Only show if total projects > initial display count */}
//       {sortedProjects.length > initialCount && (
//         <div className="w-full flex justify-center mt-12">
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="bg-[#915EFF] hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all active:scale-95 outline-none border border-white/10"
//           >
//             {isExpanded ? "Show Less" : "View All Projects"}
//           </button>
//         </div>
//       )}

//       {/* MODAL WRAPPER */}
//       <AnimatePresence>
//         {selectedProject && (
//           <ProjectDetailsModal 
//             project={selectedProject} 
//             onClose={handleCloseModal} 
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default SectionWrapper(Works, "work");
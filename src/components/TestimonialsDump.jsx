
// import GlowCard from "./GlowCard";
// import.meta.env.BASE_URL;
// import GlassRating from "./GlassRating";

const testimonials = [
  {
    id: 1,
    name: "Jason",
    designation: "Team Lead / Manager",
    company: "SASI & MESH Team",
    rating: 5.0,
    relationship: "Direct Manager",
    date: "2025-09-28",
    color: "#ff0080" ,// Pink/Red
    // imgPath: import.meta.env.BASE_URL + "images/jason_avatar.png",
    imgPath: import.meta.env.BASE_URL + "images/client1.png",
    review:
      "Rupesh is that rare engineer who combines technical skill with absolute dependability. He handled critical tasks that usually require extensive oversight with total autonomy. His reliability gave leadership great comfort, knowing jobs would be done right and fast. Losing him to the MESH team was a bittersweet moment—I genuinely wished I could clone him for both teams.",
    fullReview:
      "You have been wonderful to work with since I joined the team. While you did not get many of the Blue Planet stories, the work you did perform was extremely important. Those tasks were largely tasks that would need extra teaching for most other team members to pick up. Your dependability gave both Krishna and I great comfort to know the job would be done right and quickly. I found myself wanting you in both places (SASI and MESH). I would love for you to be here forever.",
  },
  {
    id: 2,
    name: "Krishna",
    designation: "Senior Technical Colleague",
    company: "SASI Team",
    rating: 5.0,
    color: "#915eff",
    relationship: "Senior Peer",
    date: "2025-09-28",
    // imgPath: import.meta.env.BASE_URL + "images/krishna_avatar.png",
    imgPath: import.meta.env.BASE_URL + "images/client2.png",
    
    review:
      "Having Rupesh on the team was a game-changer. He was instrumental during our complex Rancher migration and critical ASRI production fixes. He consistently tackled the toughest jobs with confidence, delivering robust solutions at impressive speeds. His technical eagerness and dedication make him the kind of developer no team ever wants to let go of.",
    fullReview:
      "It’s truly wonderful to have you in our team. I really appreciate all the support you’ve given, especially in handling the rancher migration, resolving ASRI issues, and providing production support. You’ve taken on tough jobs, picked up challenges with confidence, and delivered solutions quickly. Your hard work and dedication make a big difference, and honestly, I don’t think anyone who has you in their team would ever want to let you go.",
  },
  {
    id: 3,
    name: "Sunitha Rani Sriramulu",
    designation: "Technical Lead / Award Committee",
    company: "Omnivue & SASI",
    rating: 3.9,

    color: "#00ffcc",
    relationship: "Cross-Functional Lead",
    date: "2024-01-01",
    // imgPath: import.meta.env.BASE_URL + "images/badge_icon.png",
    imgPath: import.meta.env.BASE_URL + "images/client3.png",
    review:
      "Rupesh demonstrated remarkable adaptability from Day 1. He played a crucial role in the successful Rancher migration for both Omnivue and SASI applications. Beyond his core duties, his ability to swiftly master new tech stacks allowed him to resolve critical DSP production issues. A well-deserved recognition for a true team player who elevates everyone around him.",
    fullReview:
      "As a fresh joinee, Rupesh demonstrated remarkable adaptability and strong eagerness to learn, quickly gaining proficiency in multiple applications. He played a crucial role in the successful Rancher migration of both Omnivue and SASI. Additionally, Rupesh provided invaluable support to Sweety in resolving DSP production issues with Inflight orders post-migration. Well Done Rupesh!",
  },
  {
    id: 4,
    name: "Roy",
    designation: "Project Delivery Lead",
    company: "Production Delivery Team",
    rating: 5.0,
    color: "#ff0080", // Pink/Red
    relationship: "Project Lead",
    date: "2025-08-15",
    // imgPath: import.meta.env.BASE_URL + "images/roy_avatar.png",
    imgPath: import.meta.env.BASE_URL + "images/client4.png",
    review:
      "Rupesh deserves special recognition for being the driving force behind our recent production delivery. He went far above and beyond expectations, putting in the extra effort required to ensure a seamless launch. His willingness to step up and assist other team members was the glue that held the project together during the final crunch. Exceptional dedication.",
    fullReview:
      "Rupesh deserves special recognition for his exceptional efforts in driving our recent project to production. He went above and beyond, putting in significantly more effort than expected to ensure a seamless delivery. Beyond his own tasks, his willingness to step up and assist other team members was crucial to our success. His dedication really held the team together during the final crunch.",
  },
  {
    id: 5,
    name: "Lada Pradhan",
    designation: "Senior Technical Lead",
    company: "Omnivue & SASI Support",
    rating: 4.0,
    relationship: "Technical Mentor",
    date: "2025-05-20",
    color: "#915eff",
    // imgPath: import.meta.env.BASE_URL + "images/lada_avatar.png",
    imgPath: import.meta.env.BASE_URL + "images/client5.png",
    review:
      "I must highlight Rupesh's critical contributions to the internal migrations of Omnivue and SASI. He flawlessly balanced complex migration tasks while simultaneously resolving high-priority production support issues. Regardless of the pressure or complexity, Rupesh met every single deadline with precision. His ability to maintain stability while driving change is impressive.",
    fullReview:
      "I want to highlight Rupesh's critical contributions to the Omnivue and SASI internal migrations. He stepped in to support the DSP application and resolved SASI production support issues with remarkable speed. Regardless of the pressure, Rupesh consistently met every single deadline. His ability to juggle complex migration tasks while maintaining stability in production was impressive.",
  },
  {
    id: 6,
    name: "Dinesh & Saran",
    designation: "Team Lead & Manager",
    company: "Datazoic",
    
    rating: 4.7,
    relationship: "Previous Management",
    date: "2023-12-10",
    color: "#00ffcc",
    // imgPath: import.meta.env.BASE_URL + "images/datazoic_team.png",
    imgPath: import.meta.env.BASE_URL + "images/client6.png",
    review:
      "Starting as an intern, Rupesh quickly evolved into a core contributor capable of handling high-volume workloads with precision. He has a natural knack for Root Cause Analysis (RCA) and modernized our stack by enriching it with Node.js and React. He juggles multiple moving parts without ever dropping the ball. An outstanding full-stack talent.",
    fullReview:
      "Starting as an intern, Rupesh quickly proved his capability to handle high volumes of open items with precision. He has a knack for finding root causes across all dimensions and taking quick, effective action. His work enriching our stack with Node.js and React has been invaluable. He manages to juggle many moving parts without dropping the ball. Keep doing the same good job, Rupesh!",
  },
];
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "./GlowCard";
import GlassRating from "./GlassRating";
// import { testimonials } from "../constants"; // Assuming your data is here

// ==========================================
// 1. CONFIGURATION (CONTROL CENTER)
// ==========================================

const LAYOUT_CONFIG = {
  // Columns per screen size
  columns: {
    xs: 1, // Mobile
    sm: 1, // Large Mobile
    md: 2, // Tablet
    lg: 3, // Desktop
  },
  // How many rows to show initially
  defaultRows: 2, 
  // Fallback value if calculation fails
  fallback: 3, 
};

const TRUNCATE_CONFIG = {
  // Number of words to show before cutting off
  wordLimit: 15, 
};

// ==========================================
// 2. HELPERS (LOGIC ENGINE)
// ==========================================

// Helper: Sanitize numbers
const sanitizeValue = (val, fallback) => {
  const parsed = parseFloat(val);
  if (isNaN(parsed)) return fallback;
  return Math.round(parsed);
};

// Helper: Sorting Logic (Ranked -> Pinned -> Rest)
const getSortedTestimonials = (data) => {
  // 1. Ranked: Has a valid 'rank' or 'id' number you want to prioritize
  // (Assuming you might add a 'rank' property to your data later, otherwise skips)
  const ranked = data
    .filter(t => typeof t.rank === 'number')
    .sort((a, b) => a.rank - b.rank);
  
  const rankedIds = new Set(ranked.map(t => t.name));

  // 2. Pinned: 'isPinned' is true
  const pinned = data.filter(t => 
    t.isPinned === true && !rankedIds.has(t.name)
  );
  const pinnedIds = new Set(pinned.map(t => t.name));

  // 3. Rest: Everything else
  const rest = data.filter(t => 
    !rankedIds.has(t.name) && !pinnedIds.has(t.name)
  );

  return [...ranked, ...pinned, ...rest];
};

// ==========================================
// 3. SINGLE TESTIMONIAL CARD (HANDLES TRUNCATION)
// ==========================================
const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic: Split text into words
  const words = testimonial.review.split(" ");
  const isLongText = words.length > TRUNCATE_CONFIG.wordLimit;

  // Calculate what text to show
  const displayedText = isExpanded || !isLongText
    ? testimonial.review
    : words.slice(0, TRUNCATE_CONFIG.wordLimit).join(" ") + "...";

  return (
    <GlowCard 
      glowColor={testimonial.color || "#804dee"} 
      className="p-8 h-full flex flex-col justify-between"
    >
      <div>
        {/* Rating Component */}
        <div className="mb-4">
           <GlassRating rating={testimonial.rating || 5} />
        </div>

        {/* Review Text with Animation */}
        <motion.div layout className="mb-5">
          <p className="text-gray-300 text-lg leading-relaxed">
            "{displayedText}"
          </p>
          
          {/* Read More / Show Less Button */}
          {isLongText && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm font-bold text-[#915EFF] hover:text-white transition-colors outline-none"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </motion.div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
        <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden border border-white/20">
           <img 
             src={testimonial.imgPath} 
             alt={testimonial.name} 
             className="w-full h-full object-cover" 
           />
        </div>
        <div>
          <p className="font-bold text-white text-[16px]">{testimonial.name}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">
            {testimonial.designation} • {testimonial.company}
          </p>
        </div>
      </div>
    </GlowCard>
  );
};

// ==========================================
// 4. MAIN COMPONENT (HANDLES GRID & LAYOUT)
// ==========================================
const Testimonials = () => {
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState("lg");

  // 1. Screen Resize Listener
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("xs");
      else if (width < 768) setScreenSize("sm");
      else if (width < 1024) setScreenSize("md");
      else setScreenSize("lg");
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Sorting Data
  const sortedTestimonials = useMemo(() => getSortedTestimonials(testimonials), []);

  // 3. Grid Calculation
  const columns = sanitizeValue(LAYOUT_CONFIG.columns[screenSize], LAYOUT_CONFIG.fallback);
  const defaultRows = sanitizeValue(LAYOUT_CONFIG.defaultRows, 2);
  const initialCount = columns * defaultRows;

  // 4. Slice Data for View
  const visibleTestimonials = isAllExpanded 
    ? sortedTestimonials 
    : sortedTestimonials.slice(0, initialCount);

  return (
    <section id="testimonials" className="flex-center sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0">
      <div className="h-full md:px-10 px-5 w-full">

        {/* Header */}
        <div className="flex flex-col items-center gap-5 mb-16">
          <div className="hero-badge">
            <p className="text-sm font-medium">⭐️ Endorsements</p>
          </div>
          <h1 className="font-semibold md:text-5xl text-3xl text-center text-white">
            What People Say
          </h1>
        </div>

        {/* GRID LAYOUT 
            Using CSS Grid instead of Masonry (columns-3) because it handles 
            "Rows" logic much better visually.
        */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                layout
                key={testimonial.name || index} // Use unique ID if available
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {sortedTestimonials.length > initialCount && (
          <div className="w-full flex justify-center mt-12">
            <button
              onClick={() => setIsAllExpanded(!isAllExpanded)}
              className="bg-[#915EFF] hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all active:scale-95 outline-none border border-white/10"
            >
              {isAllExpanded ? "Show Less" : "View All Reviews"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;
// // export { testimonialsKll };
// const TestimonialsDump = () => {
//   return (
//     <section id="testimonials" className="flex-center sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0 ">
//       <div className=" h-full md:px-10 px-5">

//         <div className="flex flex-col items-center gap-5">
//           <div className="hero-badge">
//             <p>"⭐️ Endorsements from Leadership"</p>
//           </div>
//           <div>
//             <h1 className="font-semibold md:text-5xl text-3xl text-center">
//               "What People Say About Me?"
//             </h1>
//           </div>
//         </div>

//         <div className="lg:columns-3 md:columns-2 columns-1 mt-16 gap-5 space-y-5">
//       {testimonials.map((testimonial, index) => (
//         <GlowCard 
//           key={index} 
//           glowColor={testimonial.color || "#804dee"} // Pass custom color here
//           className="p-10 mb-5 break-inside-avoid-column"
//         >
//           {/* <div className="flex items-center gap-1 mb-5">
//             {Array.from({ length: 5 }, (_, i) => (
//               <img key={i} src={import.meta.env.BASE_URL + "images/star.png"} alt="star" className="w-5 h-5 opacity-80" />
//             ))}
//           </div> */}
//           {/* ✅ REPLACED THE OLD STAR LOOP WITH THIS */}
//           <GlassRating rating={testimonial.rating} />
//           <div className="mb-5">
//             <p className="text-gray-300 text-lg leading-relaxed">{testimonial.review}</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
//                {/* Placeholder for user image */}
//                <img key={testimonial.id} src={testimonial.imgPath} alt="client" className="w-full h-full object-cover" />
//             </div>
//             <div>
//               <p className="font-bold text-white">{testimonial.name}</p>
//               <p className="text-gray-500 text-sm">Verified User</p>
//             </div>
//           </div>
//         </GlowCard>
//       ))}
//     </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsDump;

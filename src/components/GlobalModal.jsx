import React from "react";
import { motion } from "framer-motion";
import BubbleLoader from "./BubbleLoader"; 

const GlobalModal = ({ isOpen, onClose, type, data }) => {
  if (!isOpen) return null;

  const getModalTitle = () => {
    if (type === "legal") return data?.title || "Legal";
    if (type === "resume-sample-template") return "Resume Collection";
    return "Details";
  };

  return (
    // Backdrop - Flexbox centering handles the positioning for the smaller sizes
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center">
      
      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        
        // --- RESPONSIVE POSITIONING & SIZING ---
        // 1. Mobile (Default): 
        //    - w-[85%] h-[60%] -> Matches your request for specific sizing
        //    - p-[20px] -> Minimum padding
        // 2. Desktop (md+):
        //    - Reverts to your specific fixed positioning if desired, OR
        //    - We can keep the centered look but make it larger.
        //    - Below I kept your original 'md:' overrides to switch to fixed positioning on larger screens.
        className="bg-[#1d1836] rounded-2xl border border-white/10 shadow-card flex flex-col
                   w-[85%] h-[60%] p-[20px]
                   md:fixed md:w-auto md:h-auto md:inset-auto
                   md:top-[15%] md:bottom-[18%] md:left-[15%] md:right-[10%] md:p-8"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-white text-xl z-10"
        >
          ✕
        </button>

        {/* --- HEADER --- */}
        <div className="mt-2 mb-4 shrink-0">
          <h2 className="text-white text-3xl font-bold">
            {getModalTitle()}
          </h2>
        </div>

        {/* --- BODY CONTENT (Scrollable) --- */}
        {/* 'flex-1' makes this fill the remaining height. 'overflow-y-auto' handles scrolling. */}
        <div className="flex-1 text-secondary text-[16px] leading-[30px] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* CASE 1: LEGAL */}
          {type === "legal" && data && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400 border-b border-white/10 pb-2">
                Last Updated: {data.lastUpdated}
              </p>
              <div className="space-y-6">
                {data.content?.map((point, index) => (
                  <div key={index}>
                    <h4 className="text-white font-bold text-lg mb-1">
                      {point.heading}
                    </h4>
                    <p className="text-secondary text-sm leading-relaxed text-justify">
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CASE 2: RESUME COLLECTION */}
          {type === "resume-sample-template" && (
            <div>
              <p>Viewing Data for: <span className="text-white">{data?.name}</span></p>
              <p>Role: <span className="text-white">{data?.roles}</span></p>

              <div className="mt-5 p-5 bg-black-100 rounded-xl border border-white/5 min-h-[200px] flex items-center justify-center">
                 <span className="text-gray-500">
                    [Template Content for key: {data?.modelKey}]
                 </span>
              </div>
            </div>
          )}
          
          {/* CASE 3: COMING SOON */}
          {data?.isComingSoon && (
             <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/20">
                  Coming Soon
                </div>
                <div className="h-32 w-full relative">
                   <BubbleLoader />
                </div>
                <p>We are working hard to bring this feature to you!</p>
             </div>
          )}

        </div>

        {/* --- FOOTER --- */}
        <div className="mt-6 flex justify-end gap-4 shrink-0 pt-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="py-2 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl bg-tertiary hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default GlobalModal;
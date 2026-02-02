import React from "react";

// --- 1. DATA ---
const logoIconsList = [
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-1.png", name: "Logo 1" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-2.png", name: "Logo 2" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-3.png", name: "Logo 3" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-4.png", name: "Logo 4" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-5.png", name: "Logo 5" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-6.png", name: "Logo 6" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-7.png", name: "Logo 7" },
  { imgPath: import.meta.env.BASE_URL + "images/logos/company-logo-8.png", name: "Logo 8" },
];


// --- 2. LAYOUT CONFIGURATION (CONTROL SIZE HERE) ---
const LAYOUT_CONFIG = {
  // Vertical Padding around the whole component (White space)
  wrapperPadding: "py-1 sm:py-2 md:py-2", 
  
  // Height of the Glass Strip (The "Slim Tap")
  // h-12 (48px) for mobile, up to h-24 (96px) for massive screens
  stripHeight: "h-6 sm:h-8 md:h-10 lg:h-12", 
  
  // Width/Height of individual Logo boxes inside the strip
  // Kept proportional to the strip height
  logoBoxSize: "w-16 h-8 sm:w-24 sm:h-12 md:w-32 md:h-14 lg:w-40 lg:h-16",
  
  // Gap between logos
  gap: "gap-8 sm:gap-12 md:gap-20",
  
  // Width of the fade effect on left/right edges
  fadeWidth: "w-8 sm:w-16 md:w-32"
};

// --- 3. VISUAL CONFIGURATION (LIGHTING & SPEED) ---
const VISUAL_CONFIG = {
  // SPEED CONTROL (Duration in seconds)
  // Lower number = Faster movement. Higher number = Slower.
  baseSpeed: 15, 

  // BACKDROP LIGHTING
  // Colors for the big background glow
  glowGradient: "from-purple-600 via-cyan-500 to-pink-500",
  // Brightness of the background (opacity-10 to opacity-100)
  glowIntensity: "opacity-30", 
  // How spread out the light is (blur-sm to blur-3xl)
  blurStrength: "blur-md",

  // LOGO HOVER LIGHTING
  // Color behind the logo when you hover (e.g., bg-white/20, bg-purple-500/30)
  hoverGlowColor: "bg-white/20", 
  // How much the logo itself shines (0 = invisible, 100 = full color)
  logoBaseOpacity: "opacity-60",
};

const LogoShowcase = ({ direction = "left", speed }) => {
  // Use the prop speed if provided, otherwise use the local config default
  const animationSpeed = speed || VISUAL_CONFIG.baseSpeed;

  // Triple list for smooth looping
  const seamlessList = [...logoIconsList, ...logoIconsList, ...logoIconsList];

  return (
    <div className={`relative w-full overflow-hidden ${LAYOUT_CONFIG.wrapperPadding}`}>
      
      {/* --- RAINBOW GLOW BACKDROP (Controlled by VISUAL_CONFIG) --- */}
      <div className={`absolute inset-0 bg-gradient-to-r animate-pulse ${VISUAL_CONFIG.glowGradient} ${VISUAL_CONFIG.glowIntensity} ${VISUAL_CONFIG.blurStrength}`}></div>

      {/* GLASS STRIP CONTAINER */}
      <div className={`relative z-10 w-full flex items-center bg-white/5 backdrop-blur-xl border-y border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)] ${LAYOUT_CONFIG.stripHeight}`}>
        
        {/* Matrix/Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>

        {/* Gradient Fade Edges */}
        <div className={`absolute top-0 left-0 z-20 h-full bg-gradient-to-r from-[#050816] to-transparent pointer-events-none ${LAYOUT_CONFIG.fadeWidth}`} />
        <div className={`absolute top-0 right-0 z-20 h-full bg-gradient-to-l from-[#050816] to-transparent pointer-events-none ${LAYOUT_CONFIG.fadeWidth}`} />

        {/* MARQUEE TRACK */}
        <div
          className={`flex shrink-0 select-none will-change-transform ${LAYOUT_CONFIG.gap}`}
          style={{
            animation: `marquee-${direction} ${animationSpeed}s linear infinite`,
            width: "max-content",
          }}
        >
          {seamlessList.map((icon, index) => (
            <div 
              key={index} 
              className={`group relative flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer ${LAYOUT_CONFIG.logoBoxSize}`}
            >
              {/* Logo Glow on Hover (Controlled by VISUAL_CONFIG) */}
              <div className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${VISUAL_CONFIG.hoverGlowColor}`}></div>
              
              <img
                src={icon.imgPath}
                alt={icon.name}
                className={`relative z-10 w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] ${VISUAL_CONFIG.logoBaseOpacity}`}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default LogoShowcase;
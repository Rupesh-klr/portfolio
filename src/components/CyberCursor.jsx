import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CyberCursor = () => {
  // --- STATE MANAGEMENT ---
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controls visibility (fades out on mobile)
  const [trail, setTrail] = useState([]); 

  // High Performance Mouse/Touch Tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [randomScale, setRandomScale] = useState(1);
  
  // --- REFS ---
  const lastPosition = useRef({ x: 0, y: 0 });
  const trailRef = useRef([]);
  const fadeOutTimeout = useRef(null); // Timer to hide cursor on mobile

  // --- CORE LOGIC (Works for both Mouse & Touch) ---
  const handleMove = (clientX, clientY) => {
    // 1. Show cursor immediately
    setIsVisible(true);
    
    // 2. Clear existing fade timer (reset the clock)
    if (fadeOutTimeout.current) clearTimeout(fadeOutTimeout.current);

    // 3. Set new fade timer (Auto-hide after 0.5s of inactivity)
    // This fixes the "stuck bubble" issue on mobile
    fadeOutTimeout.current = setTimeout(() => {
      setIsVisible(false);
    }, 500); 

    // 4. Update Position
    mouseX.set(clientX - 16); 
    mouseY.set(clientY - 16);

    // 5. SPRAY LOGIC
    const distance = Math.hypot(
      clientX - lastPosition.current.x,
      clientY - lastPosition.current.y
    );

    // Only create bubble if moved enough
    if (distance > 20) { 
      const randomSize = Math.random() * 40 + 20; 
      const randomOffsetX = (Math.random() - 0.5) * 30; 
      const randomOffsetY = (Math.random() - 0.5) * 30;

      const newPoint = { 
        x: clientX + randomOffsetX, 
        y: clientY + randomOffsetY, 
        id: Date.now(),
        size: randomSize 
      };

      // Keep trail shorter on mobile for performance? (Optional, kept same here)
      const newTrail = [newPoint, ...trailRef.current].slice(0, 15);
      
      trailRef.current = newTrail;
      setTrail(newTrail);
      
      lastPosition.current = { x: clientX, y: clientY };
    }
  };

  // --- EVENT LISTENERS ---
  useEffect(() => {
    // DESKTOP: Mouse Move
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    
    // MOBILE: Touch Move (Dragging finger)
    const onTouchMove = (e) => {
       // e.touches[0] gets the first finger's position
       handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    // CLICK HANDLERS
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    
    // HOVER HANDLERS (Desktop only usually)
    const onMouseOver = (e) => {
      if (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove); // <--- ADDED THIS
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchstart", onMouseDown); // <--- ADDED THIS
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);     // <--- ADDED THIS
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchstart", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  // --- BREATHING EFFECT ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isClicking && !isHovering) {
        setRandomScale(0.9 + Math.random() * 0.3);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isClicking, isHovering]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      
      {/* 1. THE BUBBLES (Always render, they handle their own fade out) */}
      {trail.map((point) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0, scale: 0.5, borderWidth: "2px" }}
          animate={{ 
            opacity: [0.7, 0.7, 0], 
            scale: [0.8, 1, 1.8],   
            borderWidth: ["2px", "2px", "0px"] 
          }}
          transition={{ duration: 0.6, ease: "easeOut", times: [0, 0.4, 1] }}
          className="absolute rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: `${point.size}px`,
            height: `${point.size}px`,
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(145, 94, 255, 0.05)", 
            borderColor: "rgba(145, 94, 255, 0.6)", 
            borderStyle: "solid",
            boxShadow: "inset 0 0 15px rgba(145, 94, 255, 0.2), 0 0 5px rgba(255,255,255,0.1)"
          }}
        />
      ))}

      {/* 2. THE MAIN CURSOR (Controlled by isVisible) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full backdrop-blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          width: "32px",
          height: "32px",
          borderWidth: "2px",
          borderStyle: "solid",
          boxShadow: isClicking 
            ? "0 0 20px 5px rgba(145, 94, 255, 0.8)" 
            : "0 0 10px rgba(255, 255, 255, 0.2)",
        }}
        animate={{
          // ADDED: Opacity is 0 if not visible (inactive)
          opacity: isVisible ? 1 : 0, 
          scale: isClicking ? 0.5 : isHovering ? 2.5 : randomScale,
          borderColor: isClicking ? "#915eff" : isHovering ? "#ffffff" : "rgba(255, 255, 255, 0.3)",
        }}
        transition={{
          opacity: { duration: 0.3 }, // Smooth fade in/out
          scale: { type: "spring", stiffness: 400, damping: 25 },
          borderColor: { duration: 0.2 }
        }}
      >
        <div className={`absolute inset-0 rounded-full opacity-60 ${isClicking ? "bg-white" : "bg-transparent"}`}>
           {!isHovering && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
           )}
        </div>
      </motion.div>
    </div>
  );
};

export default CyberCursor;

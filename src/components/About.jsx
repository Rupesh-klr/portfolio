import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { CloudArrowDownIcon } from '@heroicons/react/24/solid';
import { TypeAnimation } from 'react-type-animation';
import { styles } from "../styles";
import { services, aboutLoadLink } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// --- CONFIGURATION FOR THE TEXT EFFECT ---
const highlightConfig = {
  activeColor: "#915eff", // Purple
  inactiveColor: "#6b7280", // Gray
  // REMOVED SCALE: We use padding to move text instead
};

// --- HELPER COMPONENT: HIGHLIGHTED PHRASE ---
const HighlightPhrase = ({ children, delay }) => (
  <motion.span
    // 'layout' tells Framer Motion to animate the physical layout changes smoothly
    layout 
    initial={{ 
      color: highlightConfig.inactiveColor, 
      paddingLeft: "2px",   // Start with minimal padding
      paddingRight: "2px",
      backgroundColor: "rgba(255,255,255,0)",
      textShadow: "none" 
    }}
    whileInView={{ 
      color: highlightConfig.activeColor, 
      paddingLeft: "30px",  // Expand to 30px (Pushes text away)
      paddingRight: "30px", // Expand to 30px (Pushes text away)
      backgroundColor: "rgba(255,255,255,0.05)", // Subtle bg to show the expansion
      textShadow: "0px 0px 8px rgba(145, 94, 255, 0.5)",
      transition: { 
        duration: 0.6, 
        delay: delay,
        type: "spring", // Spring makes the text "push" feel physical and smooth
        stiffness: 200,
        damping: 20
      } 
    }}
    viewport={{ once: false, margin: "-50px" }}
    className="inline-block mx-1 font-semibold rounded-lg border border-transparent hover:border-purple-500/50 transition-colors cursor-default align-middle whitespace-nowrap"
  >
    {children}
  </motion.span>
);
const ServiceCard = ({ index, title, icon }) => (
  <Tilt 
    // 1. WIDTH ADJUSTMENTS:
    // w-full on mobile
    // sm:w-[130px] (Small screens)
    // md:w-[180px] (Medium screens)
    // lg:w-[250px] (Large screens - restoring original size)
    className='w-full max-w-[230px] sm:max-w-[130px] md:w-[180px] lg:w-[250px]'
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{ max: 45, scale: 1, speed: 450 }}
        // 2. INTERNAL SPACING ADJUSTMENTS:
        // sm:min-h-[200px] -> Shorter height for small cards
        // sm:px-4 -> Less padding (so text fits in 130px)
        // Standard (min-h-[280px] px-12) applies to large screens
        className='bg-tertiary rounded-[20px] py-5 sm:py-4 px-12 sm:px-4 md:px-8 min-h-[280px] sm:min-h-[200px] md:min-h-[240px] flex justify-evenly items-center flex-col'
      >
        <img 
          src={icon} 
          alt={title} 
          // 3. ICON SIZE ADJUSTMENTS:
          // Smaller icon for small screens
          className='w-16 h-16 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain' 
        />

        <h3 
          // 4. TEXT SIZE ADJUSTMENTS:
          // Smaller text for small screens
          className='text-white text-[20px] sm:text-[14px] md:text-[18px] font-bold text-center'
        >
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* --- TYPEWRITER ANIMATION --- */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='flex justify-center mt-4'
      >
        <TypeAnimation
          className='text-[20px] sm:text-[24px] font-bold text-purple-400 text-center leading-[1.5]'
          sequence={[
            `I'm a skilled software developer.`, 1000,
            `I turn complex problems into simple solutions.`, 1000,
            `Let's build something amazing together!`, 2000,
          ]}
          wrapper='span'
          speed={50}
          repeat={Infinity}
        />
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-10 max-w-5xl mx-auto text-center text-secondary text-[18px] sm:text-[22px] leading-[40px] sm:leading-[50px]'
      >
        {/* PARAGRAPH 1 */}
        <p className="mb-8">
          I am a 
          <HighlightPhrase delay={0.2}>skilled software developer</HighlightPhrase> 
          with robust experience in TypeScript and JavaScript. I possess deep expertise in modern frameworks like 
          <HighlightPhrase delay={0.6}>React, Node.js, and Three.js</HighlightPhrase>.
          I pride myself on being a 
          <HighlightPhrase delay={1.0}>quick learner</HighlightPhrase>, 
          working closely with clients to create 
          <HighlightPhrase delay={1.4}>scalable solutions</HighlightPhrase> 
          that solve real-world problems.
        </p>

        {/* PARAGRAPH 2 */}
        <p>
          With over 
          <HighlightPhrase delay={1.8}>2.4 years of experience</HighlightPhrase>, 
          I bridge the gap between complex software engineering and efficient operations. My expertise lies in 
          <HighlightPhrase delay={2.2}>architecting solutions</HighlightPhrase> 
          using Java Spring Boot and optimizing deployments with 
          <HighlightPhrase delay={2.6}>Jenkins and Docker</HighlightPhrase>. 
          Beyond coding, I am deeply focused on 
          <HighlightPhrase delay={3.0}>cybersecurity</HighlightPhrase>, 
          ensuring every application I build is robust. I thrive on 
          <HighlightPhrase delay={3.4}>driving innovation</HighlightPhrase> 
          in Full Stack and DevOps roles.
        </p>
      </motion.div>

      {/* --- SOCIAL LINKS --- */}
      <motion.div 
        variants={fadeIn("up", "", 0.5, 1)}
        className='flex justify-center items-center mt-12 gap-6 flex-wrap'
      >
        <span className='hash-span' id="resume">
          &nbsp;
        </span>
        <a href={aboutLoadLink.resume} target='_blank' aria-label='resume' className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform text-white px-8 py-4 rounded-full shadow-lg shadow-purple-500/30 flex items-center gap-2 font-bold text-lg">
          Resume <CloudArrowDownIcon className='size-6' />
        </a>

        <div className="flex gap-4">
           {/* LinkedIn */}
           <a href={aboutLoadLink.linkedin} target='_blank' className="hover:scale-110 transition-transform">
             <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" className="w-12 h-12"/>
           </a>
           {/* GitHub */}
           <a href={aboutLoadLink.github} target='_blank' className="hover:scale-110 transition-transform bg-white rounded-full p-1">
             <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="w-10 h-10"/>
           </a>
           {/* LeetCode */}
           <a href={aboutLoadLink.leetcode} target='_blank' className="hover:scale-110 transition-transform">
              <img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png" alt="LeetCode" className="w-12 h-12"/>
           </a>
        </div>
      </motion.div>

      {/* --- SERVICES GRID --- */}
      <div className='mt-20 flex flex-wrap justify-center gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
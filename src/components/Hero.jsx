import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { TypeAnimation } from 'react-type-animation';
import BubbleLoader from "./BubbleLoader"; 

import { ComputersCanvas } from "./canvas";
// --- LAZY LOAD THE 3D COMPONENT ---
// const ComputersCanvas = lazy(() => 
//   import("./canvas").then((module) => ({ default: module.ComputersCanvas }))
// );

const Hero = ({ timerKey }) => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      
      {/* Spacer for Navbar offset */}
      <div className="w-full h-[20px]" />
      <span className='hash-span' id="home">
        &nbsp;
      </span>

      {/* --- 1. TEXT CONTENT SECTION --- */}
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className="pointer-events-auto">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>
              <TypeAnimation
                key={timerKey}
                sequence={[
                  `Rupesh.`, 2000,
                  'Fullstack Developer', 1000,
                  `Devops Engineer.`, 1000,
                ]}
                wrapper='span'
                speed={40}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Full Stack Developer and DevOps <br className='sm:block hidden' />
            enthusiast with 2.4+ years of experience <br className='sm:block hidden' />
            building secure, scalable applications <br className='sm:block hidden' />
            using Java and React.
          </p>
        </div>
      </div>

      {/* --- 2A. MOBILE/TABLET BANNER (Visible ONLY on xs, sm, md) --- */}
      {/* 'lg:hidden' ensures this disappears on large screens when the 3D model takes over */}
      <div className="absolute bottom-32 w-full flex justify-center items-center lg:hidden z-10 px-6">
        <div className="bg-tertiary/90 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-card w-full max-w-sm text-center">
          <h3 className="text-white text-[20px] font-bold mb-2">
            Thanks for Visiting! 🚀
          </h3>
          <p className="text-secondary text-[14px] leading-[24px] mb-6">
            To view the full 3D Experience, please visit on a Desktop.
            <br/>
            I'd love to connect with you!
          </p>
          <a 
            href="#contact"
            className="bg-[#915EFF] text-white py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary hover:bg-[#7e4bd6] transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* --- 2B. 3D CANVAS SECTION (Visible ONLY on lg and larger) --- */}
      {/* 'hidden lg:block' hides this entire div on mobile/tablet */}
      <div className="hidden lg:block absolute inset-0 w-full h-full z-0">
        {/* <Suspense 
          fallback={
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-primary/80 backdrop-blur-sm">
              <BubbleLoader />
            </div>
          }
        > */}
          <ComputersCanvas key={timerKey} />
        {/* </Suspense> */}
      </div>

      {/* --- 3. SCROLL INDICATOR --- */}
      {/* 'hidden' hides it on xs, sm, md. 'lg:flex' shows it only on large screens. */}
      <div className='hidden lg:flex absolute bottom-32 w-full justify-center items-center mt-5 z-20'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
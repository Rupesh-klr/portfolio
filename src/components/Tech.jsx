import React, { useState, useEffect } from "react";

import BallCanvas from "./canvas/BallCanvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import LogoShowcase from "./LogoShowcase";
// import React from 'react';
// import { skills } from '../data/skills';
import { motion } from 'framer-motion';
const skills = [
  {
    title: '   set - 1 :    Programming Languages & Developer Tools',
    items: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    ],
  },
  {
    title: '  set-2 :     DevOps & Infrastructure Tools',
    items: [{
      name: 'Kubernetes',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg'
    },
    {
      name: 'Docker',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
    },
    {
      name: 'Rancher',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rancher/rancher-original.svg'
    },
    {
      name: 'Jenkins',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg'
    },
    // { 
    //   name: 'Splunk', 
    //   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/splunk/splunk-original-wordmark.svg' 
    // },
    {
      name: 'Jira',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg'
    }, {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    }
      ,
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    // { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'IntelliJ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
    ],
  },
];


const Skills = () => {
  const skillCategories = skills.map((c) => ({ title: c.title, skills: c.items }));

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-400 h-40 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className='hash-span' id="skills">
          &nbsp;
        </span>
          <h2 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid gap-12 w-full md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="relative w-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              {/* Floating accent */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-primary to-purple-500 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <h3 className="text-lg font-semibold mb-6 relative pb-3">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {category.title}
                </span>
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: (index * 0.1) + (skillIndex * 0.05)
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0, 0.3, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      <div className="relative h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-card to-muted/50 border border-border/50 group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg">
                        <motion.img
                          src={skill.icon}
                          alt={skill.name}
                          className="max-h-8 max-w-8 transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>

                    <motion.span
                      className="block text-center text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300 mt-2"
                      whileHover={{ y: -2 }}
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const BALLS_VISIBILITY_CONFIG = {
  xs: false, // Mobile (< 450px) - Hidden (Recommended for performance)
  sm: false, // Small (< 768px) - Hidden
  md: true,  // Medium (< 1024px) - Visible
  lg: true,  // Large (< 1280px) - Visible
  xl: true,  // Extra Large (> 1280px) - Visible
};
const Tech = () => {
  const [showBalls, setShowBalls] = useState(false);

  // --- 2. SCREEN SIZE LISTENER ---
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Determine current breakpoint
      let currentBreakpoint = 'xl';
      if (width < 450) currentBreakpoint = 'xs';
      else if (width < 768) currentBreakpoint = 'sm';
      else if (width < 1024) currentBreakpoint = 'md';
      else if (width < 1280) currentBreakpoint = 'lg';

      // Update state based on config
      setShowBalls(BALLS_VISIBILITY_CONFIG[currentBreakpoint]);
    };

    // Run immediately on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {/* These components remain visible regardless of the ball config */}
      <LogoShowcase speed={15} />
      <LogoShowcase direction="right" speed={10} />
      <LogoShowcase direction="left" speed={20} />
      
      <Skills />

      {/* --- 3. CONDITIONAL RENDERING OF 3D BALLS --- */}
      {/* Only renders if showBalls is TRUE */}
      {showBalls && technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
      
      {/* Optional: Message if balls are hidden (Debugging purposes) */}
      {!showBalls && (
         <div className="w-full text-center text-secondary text-sm hidden">
            3D Tech Stack hidden on this device for performance.
         </div>
      )}
    </div>
  );
};

export default SectionWrapper(Tech, "");

// const Tech = () => {
//   return (
//     <div className='flex flex-row flex-wrap justify-center gap-10'>
//       <LogoShowcase speed={15} />
//       <LogoShowcase direction="right" speed={10} />
//       <LogoShowcase direction="left" speed={20} />
//       <Skills />
//       {technologies.map((technology) => (
//         <div className='w-28 h-28' key={technology.name}>
//           <BallCanvas icon={technology.icon} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SectionWrapper(Tech, "");

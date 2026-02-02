import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  bankCorepr,
  multiTentive,
  telecomPro,
  datazoic,
  lumen,
  freelancer,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
    type: "dropdown",
    children: [
      { id: "resume-ats", title: "Download Resume[ATS]", path: "https://drive.google.com/file/d/10w5siTkXdl5RKIY5IynnwJpQmpP46tSq/view?usp=drive_link", external: true },
      { id: "education", title: "Education", path: "#education" },
      { id: "resume-ui", title: "Download Resume[UI]", path: "https://drive.google.com/file/d/10w5siTkXdl5RKIY5IynnwJpQmpP46tSq/view?usp=drive_link", external: true },
      { id: "cover-page", title: "Download Cover Page", path: "https://drive.google.com/file/d/10w5siTkXdl5RKIY5IynnwJpQmpP46tSq/view?usp=drive_link", external: true },
      { id: "achievements", title: "Personal Achievements", path: "#achievements" },
      { id: "tech", title: "My Tech Stack", path: "#tech" },
      { id: "resume-all", title: "My Resume Collection", path: "#", modelItem: true, modelData: { "name": "Rupesh", "roles": "software engineer", isComingSoon: true }, modelType: "resume-sample-template", modelKey: "resume-sample-template" },
    ],
  },
  {
    id: "work",
    title: "Work",
    type: "dropdown",
    children: [
      { id: "work-mywork", title: "Experiences", path: "#work" },
      { id: "projects", title: "Projects", path: "#projects" },
      { id: "testimonials", title: "Endorsements from Leadership", path: "#testimonials" },
    ],
  },
  {
    id: "contact",
    title: "Reach Out",
    type: "dropdown",
    children: [
      { id: "email", title: "Send Email", path: "mailto:krishnaleena@gmail.com" },
      {
        id: "call",
        title: "Call Me (+91)",
        // 'tel:' triggers the phone dialer on mobile
        path: "tel:+9170756068796"
      },
      {
        id: "github",
        title: "GitHub Profile",
        path: "https://github.com/Rupesh-klr/",
        external: true
      },
      {
        id: "linkedin",
        title: "LinkedIn",
        path: "https://www.linkedin.com/in/rupeshb6/",
        external: true
      },
      {
        id: "portfolio",
        title: "Live Portfolio",
        path: "https://rupesh-klr.github.io/",
        external: true
      },
      { id: "socials", title: "Social Media", path: "#socials" },
      { id: "connect-hub", title: "Connection Hub", path: "#socials" },
      { id: "my-details-all", title: "Connect+", path: "#", modelItem: true, modelData: { "name": "Rupesh", "roles": "software engineer", isComingSoon: true }, modelType: "my-details-compunetent", modelKey: "my-details-compunetent" },
    ],
  },
  // ✅ YOUR NEW MODAL BUTTON
  { 
    id: "my-details-all-2", 
    title: "Connect+", 
    path: "#", 
    navModelItem: true, 
    modelType: "my-details-compunetent", // Matches logic below
    modelKey: "my-details-compunetent" 
  },
];
export const aboutLoadLink = {
  resume: "https://drive.google.com/file/d/10w5siTkXdl5RKIY5IynnwJpQmpP46tSq/view?usp=drive_link",
  linkedin: "https://www.linkedin.com/in/rupeshb6/",
  github: "https://github.com/Rupesh-klr",
  leetcode: "https://leetcode.com/u/krishnaleena222/"
}

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Devops Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Developer & DevOps Engineer",
    company_name: "Lumen Technologies",
    icon: lumen, 
    iconBg: "#E6DEDD",
    date: "Nov 2023 - Present",
    points: [
      "Spearheaded the critical migration of legacy Virtual Machines (VMs) to Rancher-managed Kubernetes clusters, achieving 100% deliverable success rate ahead of strict deadlines. ",
      "Engineered high-performance CI/CD pipelines using Jenkins and Docker, integrating JMeter for automated load testing to ensure system stability under peak loads.",
      "Led the modernization of the tech stack by migrating legacy Angular.js frontends to React and refactoring monolithic backends into Node.js and Spring Boot microservices.",
      "Implemented automated monitoring and logging using Splunk and Prometheus, reducing incident response time by 40%.",
      "Managed the end-to-end deployment lifecycle, ensuring zero-downtime releases and maintaining strict 99.9% SLA compliance."
    ],
  },
  {
    title: "Software Engineer (Promoted)",
    company_name: "Datazoic",
    icon: datazoic || lumen, 
    iconBg: "#383E56",
    date: "June 2023 - Nov 2023",
    points: [
      "Continued as a core developer following a successful internship, taking ownership of the 'DataFlow' analytics module built with React and Redux.",
      "Optimized database queries and API response times for the 'ClientConnect' portal, handling 10,000+ daily requests with improved latency.",
      "Collaborated with the product team to implement role-based access control (RBAC), securing sensitive financial data across the application.",
      "Mentored incoming interns on React best practices and codebase architecture, fostering a collaborative team environment."
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "Datazoic",
    icon: datazoic || lumen, 
    iconBg: "#E6DEDD",
    date: "Feb 15, 2023 - June 2023",
    points: [
      "Developed and deployed 'AssetTrack', a React-based inventory management application, reducing manual tracking errors by 25%.",
      "Assisted in the deployment of the 'SmartHR' employee dashboard, configuring Nginx servers and setting up SSL certificates for secure access.",
      "Fixed critical UI bugs in the 'AlphaStream' reporting tool, ensuring cross-browser compatibility across Chrome and Safari.",
      "Gained hands-on experience with Agile methodologies, participating in daily stand-ups and sprint planning to deliver features on time.",
    ],
  },
  {
    title: "Freelance & Academic Developer",
    company_name: "Self-Initiated",
    icon: freelancer, 
    iconBg: "#383E56",
    date: "2019 - 2022",
    points: [
      "Developed 'Movie Mahal', a comprehensive movie discovery platform using React and TMDB API with dynamic search capabilities.",
      "Built a secure Biometric Voting System prototype using Java and MySQL, focusing on data encryption and user authentication.",
      "Created an AI Music Recommendation Engine using Python and collaborative filtering algorithms to suggest personalized tracks.",
      "Managed full-stack projects from concept to deployment, utilizing Vercel for frontend hosting and Heroku for backend services."
    ],
  },
];
const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const dummyUser = "https://randomuser.me/api/portraits/men/1.jpg";

const projects = [
  {
    name: "Distributed Banking Core",
    short_desc: "High-performance microservices system mimicking core banking operations.",
    period: 'April 2025 - May 2025',
    bullets: [
      'Constructed an AI chatbot using MERN stack and Gemini API for dynamic conversation flow. ',
      'Responsive UI in React with real-time Socket.io communication.',
      'Backend with Node.js, Express, and MongoDB for scalable session tracking.',
      'Gemini API for natural interactions with contextual memory.',
    ],
    description:
      "A high-performance microservices system mimicking core banking operations. Engineered a fault-tolerant architecture using Spring Boot and Kafka to process high-volume financial transactions with 99.9% uptime and eventual consistency. Implemented banking-grade security with OAuth2 and JWT.",
    tags: [
      { name: "spring-boot", color: "blue-text-gradient" },
      { name: "kafka", color: "orange-text-gradient" },
      { name: "microservices", color: "green-text-gradient" },
    ],
    image: bankCorepr,
    source_code_link: "https://github.com/Rupesh-klr/",
    live_url: "",
    // --- NEW DETAILED DATA ---
    my_role: "Lead Backend Architect",
    contribution: "Designed the Kafka event streaming pipeline and implemented the OAuth2 security gateway.",
    guide: { name: "Prof. S. Kumar", designation: "HOD Computer Science" },
    publication: { title: "Scalable Microservices in FinTech", link: "#" },
    period: 'April 2025 - May 2025',
    bullets: [
      'Constructed an AI chatbot using MERN stack and Gemini API for dynamic conversation flow. ',
      'Responsive UI in React with real-time Socket.io communication.',
      'Backend with Node.js, Express, and MongoDB for scalable session tracking.',
      'Gemini API for natural interactions with contextual memory.',
    ],
    team: [
      { name: "Rupesh", role: "Backend", image: dummyUser, social: "https://linkedin.com" },
      { name: "Alex", role: "DevOps", image: dummyUser, social: "https://linkedin.com" },
    ]
  },
  {
    name: "Telecom Network Optimizer",
    short_desc: "Algorithmic tool optimizing signal latency by 40% using Graph Theory.",
    description:
      "An advanced algorithmic tool for dynamic network routing. Developed a high-efficiency routing algorithm to calculate the shortest path between dynamic network nodes, optimizing signal latency by 40% using Graph Theory. Built a visualization tool to simulate real-time signal geometry.",
    tags: [
      { name: "java", color: "blue-text-gradient" },
      { name: "graph-theory", color: "pink-text-gradient" },
      { name: "react", color: "blue-text-gradient" },
    ],
    image: telecomPro,
    source_code_link: "https://github.com/Rupesh-klr/",
    live_url: "",
    my_role: "Algorithm Specialist",
    contribution: "Implemented Dijkstra's modified algorithm for dynamic node weighting.",
    guide: { name: "Dr. A. Patel", designation: "Senior Lecturer" },
    team: [
      { name: "Rupesh", role: "Algo", image: dummyUser, social: "#" },
    ]
  },
  {
    name: "Solar & EdTech SaaS",
    short_desc: "Unified multi-tenant platform handling dual business domains.",
    description:
      "A unified multi-tenant platform handling dual business domains. Architected a comprehensive SaaS platform featuring Role-Based Access Control (RBAC) and Google OAuth to securely manage distinct user personas. Designed a dual-domain database schema.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "mongodb", color: "orange-text-gradient" },
    ],
    image: multiTentive,
    source_code_link: "https://github.com/Rupesh-klr/",
    live_url: "",
    my_role: "Full Stack Developer",
    contribution: "Built the RBAC system and integrated Google OAuth.",
    team: [
      { name: "Rupesh", role: "Full Stack", image: dummyUser, social: "#" },
      { name: "Sarah", role: "Frontend", image: dummyUser, social: "#" },
      { name: "Mike", role: "Database", image: dummyUser, social: "#" },
    ]
  },
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];
export const aboutData = {
  name: "B. Rupesh",
  email: "krishnaleena222@gmail.com",
  phone: "+91-7075608796", // Fixed typo from &07 to 707
  homepage: "https://rupesh-klr.github.io/", // ✅ Your Homepage
  socialLinks: {
    github: {
      url: "https://github.com/Rupesh-klr/",
      title: "GitHub",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/rupeshb6/",
      title: "LinkedIn",
    },
    upwork: {
      url: "https://www.upwork.com/freelancers/~01ddf5e4e0e5cbcec1",
      title: "Upwork",
    },
    portfolio: {
      url: "https://rupesh-klr.github.io/",
      title: "Portfolio",
    }
  },
};
export const portfolioMetadata = {
  title: "Rupesh | Full Stack Developer & DevOps Engineer",
  description:
    "Explore the portfolio of Rupesh, a Full Stack Developer and DevOps specialist. Expert in building secure, scalable microservices and web applications using the MERN stack, Java Spring Boot, Kubernetes, and Docker.",
  keywords: [
    "Rupesh Portfolio",
    "Full Stack Developer",
    "DevOps Engineer",
    "MERN Stack Developer",
    "Java Spring Boot",
    "React Developer",
    "Software Engineer India",
    "Cloud Architecture",
    "Kubernetes Specialist",
    "Web Development",
  ],
  alternates: {
    // Replace with your actual deployed domain (e.g., https://rupesh.dev)
    canonical: "https://rupesh-klr.github.io//", 
  },
  icons: {
    icon: "/logo.svg",           // Standard favicon
    shortcut: "/logo.png",       // Fallback for older browsers
    apple: "/logo.png",          // For Apple devices
  },
  openGraph: {
    title: "Rupesh | Architecting Scalable Web Solutions",
    description:
      "Rupesh is a Full Stack Developer with expertise in modern web technologies and DevOps pipelines. Discover projects involving Microservices, AI integration, and Enterprise scale systems.",
    url: "https://rupesh-klr.github.io//",
    siteName: "Rupesh Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://rupesh-klr.github.io//logo.png", // Ideally, use a 1200x630px banner here
        width: 1200,
        height: 630,
        alt: "Rupesh - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rupesh | Full Stack & DevOps Innovator",
    description:
      "Check out Rupesh's developer portfolio featuring high-performance web apps, cloud-native deployments, and advanced software engineering projects.",
    // Twitter works best with PNG/JPG. SVG is not supported for cards.
    images: ["https://rupesh-klr.github.io//logo.png"], 
    creator: "@Rupesh_klr", // Replace with your actual Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
const isoDate = new Date().toISOString(); 
const publishedDate = "2026-01-08T08:00:00+00:00"; // Fixed start date (approx launch)
export const dangerouslySetInnerHTMLForPageIndexPage = [
  // --- 1. PERSONAL ENTITY (Who you are) ---
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://rupesh-klr.github.io/#person",
    name: "Rupesh",
    url: "https://rupesh-klr.github.io/",
    jobTitle: "Full Stack Developer & DevOps Engineer",
    image: "https://rupesh-klr.github.io/logo.png",
    sameAs: [
      "https://github.com/Rupesh-klr",
      "https://linkedin.com/in/your-linkedin-id", // Replace with actual ID
      "https://twitter.com/your-handle"           // Replace with actual handle
    ],
    worksFor: {
      "@type": "Organization",
      name: "Lumen Technologies"
    },
    knowsAbout: [
      "Full Stack Development",
      "DevOps",
      "React.js",
      "Java Spring Boot",
      "Kubernetes",
      "Docker"
    ]
  },

  // --- 2. WEBPAGE METADATA (The Page itself) ---
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://rupesh-klr.github.io/#webpage",
    url: "https://rupesh-klr.github.io/",
    name: "Rupesh | Full Stack Developer & DevOps Portfolio",
    description: "Professional portfolio of Rupesh, showcasing expertise in scalable web applications, microservices architecture, and DevOps automation.",
    inLanguage: "en",
    
    // DATES (Dynamic & Fixed)
    datePublished: publishedDate, 
    dateModified: isoDate, // Updates every time the build runs
    
    // RELATIONS
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://rupesh-klr.github.io/"
    },
    // You are both the author and publisher of your own portfolio
    author: {
      "@id": "https://rupesh-klr.github.io/#person"
    },
    publisher: {
      "@id": "https://rupesh-klr.github.io/#person"
    },
    mainEntity: {
      "@id": "https://rupesh-klr.github.io/#person"
    }
  },

  // --- 3. OFFERS / SERVICES (What you provide) ---
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://rupesh-klr.github.io/#services",
    name: "Rupesh Technical Services",
    url: "https://rupesh-klr.github.io/",
    image: "https://rupesh-klr.github.io/logo.png",
    priceRange: "$$",
    description: "Freelance development and consulting services for web architecture and cloud deployment.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN", // India based on your profile
      addressLocality: "Hyderabad" // Based on your location info
    },
    areaServed: "Worldwide",
    
    // YOUR SERVICE OFFERS
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Application Development (MERN/Java)"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DevOps Pipeline Setup & Cloud Migration"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legacy System Modernization (Migration to React/Microservices)"
          }
        }
      ]
    }
  }
];
export { services, technologies, experiences, testimonials, projects };

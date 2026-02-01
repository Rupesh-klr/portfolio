import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas, BubbleLoader, Acomplishments, TestimonialsDump, GlobalModal } from "./components";

const App = () => {
  const [timerKey, setTimerKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    modelType: "",
    modelKey: "",
    modelData: null,
  });
  // 3. The Handler to Close Modal
  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };
  // 2. The Handler Function to Open Modal
  const handleOpenModal = (type, key, data) => {
    setModalState({
      isOpen: true,
      modelType: type,
      modelKey: key,
      modelData: data,
    });
  };

  useEffect(() => {
    // Run this logic every 6 minutes
    const interval = setInterval(() => {
      
      // 1. Show the Loader immediately
      setIsLoading(true);

      // 2. Wait 3 seconds, then refresh the component and hide loader
      setTimeout(() => {
        setTimerKey((prev) => prev + 1); // Increment key to force re-render
        setIsLoading(false);             // Hide loader
      }, 1000); 

    }, 5 * 60 * 1000); // 6 Minutes

    return () => clearInterval(interval);
  }, []);
  return (
    <BrowserRouter>
    {/* 4. Render the Global Modal at the Root Level */}
      <GlobalModal 
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type={modalState.modelType}
        data={modalState.modelData}
      />
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar onOpenModal={handleOpenModal} />
          <Hero key={timerKey}/>
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Acomplishments />
        <TestimonialsDump />
        {/* 4. Add the 'key' here. When 'timerKey' changes, this div and children are reborn. */}
        {/* --- REFRESH SECTION --- */}
        <div className='relative z-0 min-h-[800px]'> 
          {/* If isLoading is true, show the Bubbles.
              If false, show the Contact form.
          */}
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center absolute inset-0 z-10 bg-primary">
               <BubbleLoader />
            </div>
          ) : (
            <div key={timerKey}>
               <Contact />
               <StarsCanvas />
            </div>
          )}
        </div>
        {/* ----------------------- */}
      </div>
    </BrowserRouter>
  );
}
/*

  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    // 2. Set up the interval (6 minutes = 360,000 milliseconds)
    const interval = setInterval(() => {
      setTimerKey((prevKey) => prevKey + 1); // Change the key to force re-render
      console.log("Re-rendering Contact & Stars section...");
    }, 6 * 60 * 1000); 
<div key={timerKey} className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>


        ---..

         --- REFRESH SECTION --- 
         useEffect(() => {
    // Run this logic every 6 minutes
    const interval = setInterval(() => {
      
      // 1. Show the Loader immediately
      setIsLoading(true);

      // 2. Wait 3 seconds, then refresh the component and hide loader
      setTimeout(() => {
        setTimerKey((prev) => prev + 1); // Increment key to force re-render
        setIsLoading(false);             // Hide loader
      }, 3000); 

    }, 6 * 60 * 1000); // 6 Minutes

    return () => clearInterval(interval);
  }, []);

        <div className='relative z-0 min-h-[800px]'> 
           If isLoading is true, show the Bubbles.
              If false, show the Contact form.
          {isLoading ? (
            <BubbleLoader />
          ) : (
            <div key={timerKey}>
               <Contact />
               <StarsCanvas />
            </div>
          )}
        </div>
*/
export default App;

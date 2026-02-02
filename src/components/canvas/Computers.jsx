import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// 1. The 3D Model Component
const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// 2. NEW COMPONENT: Controls logic extracted here
// This runs INSIDE the canvas, so useFrame works.
const CameraControls = () => {
  const controlsRef = useRef();

  useFrame((state) => {
    if (controlsRef.current) {
      // 1. Horizontal rotation is handled by autoRotate prop below
      
      // 2. Add custom vertical oscillation
      const time = state.clock.getElapsedTime();
      
      // Calculate new polar angle
      const targetAngle = (Math.PI / 2) + Math.sin(time * 0.5) * 0.5;
      
      // Apply the angle
      controlsRef.current.setPolarAngle(targetAngle);
      
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      autoRotate
      autoRotateSpeed={3.25}
      // IMPORTANT: We must relax these limits so the script above can actually move the camera up and down.
      // If we lock them to Math.PI/2, the setPolarAngle code above won't work.
      maxPolarAngle={Math.PI} 
      minPolarAngle={0}
    />
  );
};

// 3. Main Parent Component
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Render the extracted controls component here */}
        <CameraControls />
        
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
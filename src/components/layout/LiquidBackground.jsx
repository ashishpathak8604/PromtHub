import React, { useEffect, useRef } from 'react';

export default function LiquidBackground() {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const containerRef = useRef(null);

  // Use refs to store target (mouse) and current positions for lerping without triggering re-renders
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos1 = useRef({ x: 0, y: 0 });
  const currentPos2 = useRef({ x: 0, y: 0 });
  const currentPos3 = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Start at center
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentPos1.current = { ...targetPos.current };
    currentPos2.current = { ...targetPos.current };
    currentPos3.current = { ...targetPos.current };

    const handleMouseMove = (e) => {
      // By using clientX/Y directly for a fixed/absolute full container, we get the exact screen pos.
      // If the container is absolute inside a relative header, we account for its bounding rect.
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        targetPos.current = { 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        };
      } else {
        targetPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    
    // Linear interpolation function for smooth easing
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      // Blob 1 follows fastest
      currentPos1.current.x = lerp(currentPos1.current.x, targetPos.current.x, 0.05);
      currentPos1.current.y = lerp(currentPos1.current.y, targetPos.current.y, 0.05);

      // Blob 2 follows slower (parallax)
      currentPos2.current.x = lerp(currentPos2.current.x, targetPos.current.x, 0.03);
      currentPos2.current.y = lerp(currentPos2.current.y, targetPos.current.y, 0.03);

      // Blob 3 follows slowest
      currentPos3.current.x = lerp(currentPos3.current.x, targetPos.current.x, 0.015);
      currentPos3.current.y = lerp(currentPos3.current.y, targetPos.current.y, 0.015);

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${currentPos1.current.x}px, ${currentPos1.current.y}px) translate(-50%, -50%)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${currentPos2.current.x}px, ${currentPos2.current.y}px) translate(-50%, -50%)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate(${currentPos3.current.x}px, ${currentPos3.current.y}px) translate(-50%, -50%) scale(0.9)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        ref={blob1Ref}
        className="absolute top-0 left-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-purple-600/30 rounded-full blur-3xl mix-blend-screen will-change-transform"
      />
      <div 
        ref={blob2Ref}
        className="absolute top-0 left-0 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] bg-pink-600/20 rounded-full blur-[100px] mix-blend-screen will-change-transform"
      />
      <div 
        ref={blob3Ref}
        className="absolute top-0 left-0 w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] bg-indigo-600/15 rounded-full blur-[120px] mix-blend-screen will-change-transform"
      />
    </div>
  );
}

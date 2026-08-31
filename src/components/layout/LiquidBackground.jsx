import React, { useEffect, useRef } from 'react';

export default function LiquidBackground() {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const containerRef = useRef(null);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos1 = useRef({ x: 0, y: 0 });
  const currentPos2 = useRef({ x: 0, y: 0 });
  const currentPos3 = useRef({ x: 0, y: 0 });

  useEffect(() => {
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentPos1.current = { ...targetPos.current };
    currentPos2.current = { ...targetPos.current };
    currentPos3.current = { ...targetPos.current };

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        targetPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      } else {
        targetPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentPos1.current.x = lerp(currentPos1.current.x, targetPos.current.x, 0.05);
      currentPos1.current.y = lerp(currentPos1.current.y, targetPos.current.y, 0.05);
      currentPos2.current.x = lerp(currentPos2.current.x, targetPos.current.x, 0.03);
      currentPos2.current.y = lerp(currentPos2.current.y, targetPos.current.y, 0.03);
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
      {/* Warm amber blob — follows cursor fastest */}
      <div
        ref={blob1Ref}
        className="absolute top-0 left-0 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full blur-3xl will-change-transform"
        style={{ background: 'rgba(210, 180, 140, 0.22)', mixBlendMode: 'multiply' }}
      />
      {/* Soft rose blob */}
      <div
        ref={blob2Ref}
        className="absolute top-0 left-0 w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] rounded-full will-change-transform"
        style={{ background: 'rgba(220, 190, 170, 0.15)', filter: 'blur(100px)', mixBlendMode: 'multiply' }}
      />
      {/* Cool stone blob — slowest */}
      <div
        ref={blob3Ref}
        className="absolute top-0 left-0 w-[600px] h-[600px] sm:w-[720px] sm:h-[720px] rounded-full will-change-transform"
        style={{ background: 'rgba(180, 175, 165, 0.12)', filter: 'blur(120px)', mixBlendMode: 'multiply' }}
      />
    </div>
  );
}


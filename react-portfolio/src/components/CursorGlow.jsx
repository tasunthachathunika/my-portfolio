import { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(250);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Calculate hue based on X and Y position to dynamically change color!
      // This will make the glow cycle through colors as the user moves their mouse.
      const xRatio = e.clientX / window.innerWidth;
      const yRatio = e.clientY / window.innerHeight;
      const dynamicHue = Math.floor((xRatio * 180 + yRatio * 180 + 200) % 360);
      
      setHue(dynamicHue);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 mix-blend-screen"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsla(${hue}, 100%, 60%, 0.12), transparent 80%)`
      }}
    />
  );
};

export default CursorGlow;

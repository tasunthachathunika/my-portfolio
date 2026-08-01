import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollProgress = () => {
  const progressRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const progressBar = progressRef.current;
    const glowBar = glowRef.current;
    if (!progressBar || !glowBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      gsap.set(progressBar, { width: `${scrollPercent}%` });
      gsap.set(glowBar, { width: `${scrollPercent}%` });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[9998] h-[3px]" style={{ background: 'transparent' }}>
      {/* Glow effect underneath */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[6px] blur-[4px] opacity-60"
        style={{
          background: 'linear-gradient(90deg, var(--theme-accent-3), var(--theme-accent-5), var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-4), var(--theme-accent-6))',
          width: '0%',
        }}
      />
      {/* Main progress bar */}
      <div
        ref={progressRef}
        className="h-full relative"
        style={{
          background: 'linear-gradient(90deg, var(--theme-accent-3), var(--theme-accent-5), var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-4), var(--theme-accent-6))',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 3s ease infinite',
          width: '0%',
          borderRadius: '0 2px 2px 0',
        }}
      >
        {/* Tip glow */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: 'var(--theme-accent-5)',
            boxShadow: '0 0 8px var(--theme-accent-5), 0 0 16px var(--theme-accent-1)',
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;

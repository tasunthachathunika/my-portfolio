import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Simulate progress counting
    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      const increment = Math.random() * 15 + 5;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        clearInterval(intervalRef.current);
        setTimeout(() => setIsLoading(false), 300);
      }
    }, 150);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const brandName = 'Tasu';

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg overflow-hidden"
        >
          {/* Background animated gradient */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, var(--theme-accent-1), transparent 60%), radial-gradient(ellipse at 70% 50%, var(--theme-accent-3), transparent 60%)',
            }}
          />

          {/* Spinner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 rounded-full border-[3px] border-border border-t-accent-1 border-r-accent-2 animate-spin" />
            <div
              className="absolute inset-2 rounded-full border-[2px] border-transparent border-b-accent-3 animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
            />
          </motion.div>

          {/* Character-by-character brand name */}
          <div className="flex items-center gap-0.5 mb-6">
            {brandName.split('').map((char, i) => (
              <motion.span
                key={i}
                className="text-3xl md:text-4xl font-black font-display tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-3))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
                initial={{ opacity: 0, y: 30, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="text-3xl md:text-4xl font-black text-accent-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + brandName.length * 0.08, duration: 0.4, type: 'spring' }}
            >
              .
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-[2px] rounded-full bg-border overflow-hidden relative">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--theme-accent-3), var(--theme-accent-1), var(--theme-accent-2))',
                width: `${progress}%`,
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>

          {/* Progress number */}
          <motion.p
            className="mt-3 text-xs font-mono text-muted tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.p>

          {/* Bottom slide up elements for premium feel */}
          <motion.div 
             initial={{ height: '0%' }}
             exit={{ height: '100%' }}
             transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
             className="absolute bottom-0 left-0 w-full bg-accent-1 z-[-1]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityBadge = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scaleTitle = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacitySubtitle = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const yDesc = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacityDesc = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const yButtons = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityButtons = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const yBlob = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityGrid = useTransform(scrollYProgress, [0, 1], [0.2, 0.05]);

  // Stagger animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] },
    },
  };

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-20">
      {/* Animated Gradient Blobs */}
      <motion.div className="hero-blob absolute top-20 left-10 w-80 h-80 bg-accent-1/20 rounded-full blur-[120px] animate-blob" style={{ y: yBlob }}></motion.div>
      <motion.div className="hero-blob absolute top-40 right-20 w-96 h-96 bg-accent-2/15 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s', y: yBlob }}></motion.div>
      <motion.div className="hero-blob absolute bottom-20 left-1/3 w-72 h-72 bg-accent-3/15 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s', y: yBlob }}></motion.div>

      {/* Grid Pattern Overlay */}
      <motion.div className="hero-grid absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at center, var(--theme-text) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        y: yGrid,
        opacity: opacityGrid
      }}></motion.div>

      <div className="section-container relative z-10 w-full pt-24">
        <motion.div
          className="hero-content max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div
            className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card neon-border mb-10"
            variants={itemVariants}
            style={{ y: yBadge, opacity: opacityBadge }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-muted">
              <Sparkles size={14} className="inline mr-1 text-yellow-500" />
              Available for Work
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black font-display leading-[1.1] mb-8 tracking-tight"
            variants={itemVariants}
            style={{ y: yTitle, scale: scaleTitle, opacity: opacityTitle }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">Tasuntha Chathunika</span>
            <span className="text-accent-2">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div 
            className="hero-subtitle mb-8" 
            variants={itemVariants}
            style={{ y: ySubtitle, opacity: opacitySubtitle }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-muted font-bold inline-block">
              Software Engineer & Graphic Designer.
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-description text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
            style={{ y: yDesc, opacity: opacityDesc }}
          >
            Passionate about software engineering, cloud, DevOps, and green technology.
            Currently pursuing my BICT (Hons) and freelancing as a graphic designer.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="hero-buttons flex flex-wrap gap-4 justify-center"
            variants={itemVariants}
            style={{ y: yButtons, opacity: opacityButtons }}
          >
            <motion.a
              href="#projects"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white
                bg-gradient-to-r from-accent-3 to-accent-1
                hover:shadow-lg hover:shadow-accent-3/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-text
                glass-card neon-border hover:border-accent-2/50 hover:shadow-lg hover:shadow-accent-2/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
              <Mail size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[10px] text-muted font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-muted/30 flex items-start justify-center p-1"
          animate={{ borderColor: ['rgba(136,136,170,0.3)', 'rgba(168,85,247,0.5)', 'rgba(136,136,170,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-accent-1"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;

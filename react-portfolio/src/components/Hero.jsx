import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Download, Eye } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import AntigravityHeroBackground from './AntigravityHeroBackground';

// Typing animation roles
const roles = [
  'Full-Stack Developer',
  'React.js Developer',
  'Node.js Developer',
  'Software Engineer',
  'DevOps Enthusiast',
];

const Hero = () => {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotate roles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-32 sm:pt-40 overflow-hidden">
      {/* Animated Gradient Blobs — Multi-color */}
      <motion.div className="hero-blob absolute top-20 left-10 w-80 h-80 bg-accent-1/25 rounded-full blur-[120px] animate-blob" style={{ y: yBlob }}></motion.div>
      <motion.div className="hero-blob absolute top-40 right-20 w-96 h-96 bg-accent-2/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s', y: yBlob }}></motion.div>
      <motion.div className="hero-blob absolute bottom-20 left-1/3 w-72 h-72 bg-accent-3/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s', y: yBlob }}></motion.div>
      <motion.div className="hero-blob absolute top-1/3 right-1/4 w-60 h-60 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '1s', y: yBlob, backgroundColor: 'rgba(0, 255, 136, 0.12)' }}></motion.div>
      <motion.div className="hero-blob absolute bottom-1/3 left-10 w-64 h-64 rounded-full blur-[110px] animate-blob" style={{ animationDelay: '3s', y: yBlob, backgroundColor: 'rgba(255, 204, 0, 0.1)' }}></motion.div>
      <motion.div className="hero-blob absolute top-1/4 left-1/2 w-48 h-48 rounded-full blur-[90px] animate-blob" style={{ animationDelay: '5s', y: yBlob, backgroundColor: 'rgba(255, 107, 53, 0.1)' }}></motion.div>

      {/* Antigravity Interactive Grid Overlay */}
      <AntigravityHeroBackground />

      <div className="section-container relative z-10 w-full lg:scale-[1.1] origin-center transition-transform duration-300">
        <motion.div
          className="hero-content max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div
            className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card neon-border mb-8"
            variants={itemVariants}
            style={{ y: yBadge, opacity: opacityBadge }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-green-400">
              Open to Software Engineering Internship
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display leading-[1.1] mb-3 tracking-tight"
            variants={itemVariants}
            style={{ y: yTitle, scale: scaleTitle, opacity: opacityTitle }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">Tasuntha</span>
          </motion.h1>

          {/* Subtitle — ICT Undergraduate */}
          <motion.div
            className="hero-subtitle mb-2"
            variants={itemVariants}
            style={{ y: ySubtitle, opacity: opacitySubtitle }}
          >
            <span className="text-sm sm:text-base md:text-xl text-muted font-bold inline-block">
              ICT Undergraduate
            </span>
            <br />
            <span className="text-xs sm:text-sm md:text-base text-muted/70 font-medium inline-block mt-0.5">
              Full-Stack Developer | Software Engineer
            </span>
          </motion.div>

          {/* Typing Animation — Role Rotator */}
          <motion.div
            className="mb-4 h-6 sm:h-8 flex items-center justify-center"
            variants={itemVariants}
            style={{ y: ySubtitle, opacity: opacitySubtitle }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="text-sm sm:text-base md:text-xl font-semibold gradient-text inline-block"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.17, 0.55, 0.55, 1] }}
              >
                {roles[roleIndex]}
                <span className="inline-block w-0.5 h-5 ml-1 bg-accent-1 animate-pulse align-middle rounded-full"></span>
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-description text-xs md:text-sm text-muted max-w-4xl mx-auto mb-6 leading-relaxed px-4 sm:px-0"
            variants={itemVariants}
            style={{ y: yDesc, opacity: opacityDesc }}
          >
            3rd-year ICT undergraduate building full-stack web apps and SaaS platforms with
            React, Node.js, PostgreSQL & MongoDB. Exploring Docker, AWS & CI/CD — seeking a Software Engineering Internship.
          </motion.p>

          {/* Buttons — 3 CTA */}
          <motion.div
            className="hero-buttons flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center"
            variants={itemVariants}
            style={{ y: yButtons, opacity: opacityButtons }}
          >
            <motion.a
              href="#projects"
              className="group flex items-center justify-center gap-2 sm:gap-2.5 w-[240px] sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-white text-xs sm:text-sm
                bg-gradient-to-r from-accent-3 via-accent-5 to-accent-1
                hover:shadow-lg hover:shadow-accent-3/50 transition-all duration-300 animated-gradient-bg"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
              <Eye size={18} className="group-hover:scale-110 transition-transform" />
            </motion.a>
            <motion.a
              href="/Tasuntha_Chathunika.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 sm:gap-2.5 w-[240px] sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-white text-xs sm:text-sm
                bg-gradient-to-r from-accent-1/20 to-accent-3/20 border border-accent-1/30 hover:border-accent-1/60 hover:from-accent-1/30 hover:to-accent-3/30 
                hover:shadow-[0_0_25px_rgba(180,92,255,0.35)] backdrop-blur-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="group flex items-center justify-center gap-2 sm:gap-2.5 w-[240px] sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-white text-xs sm:text-sm
                bg-gradient-to-r from-accent-2/20 to-accent-4/20 border border-accent-2/30 hover:border-accent-2/60 hover:from-accent-2/30 hover:to-accent-4/30 
                hover:shadow-[0_0_25px_rgba(255,58,140,0.35)] backdrop-blur-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
              <Mail size={18} className="group-hover:scale-110 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="hero-socials flex gap-4 sm:gap-6 justify-center mt-4 sm:mt-5"
            variants={itemVariants}
            style={{ y: yButtons, opacity: opacityButtons }}
          >
            <a href="https://www.linkedin.com/in/tasuntha-chathunika/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#0077b5]/20 to-transparent border border-[#0077b5]/30 text-[#0077b5] 
                 hover:from-[#0077b5]/40 hover:border-[#0077b5]/60 hover:shadow-[0_0_20px_rgba(0,119,181,0.4)] hover:text-white 
                 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1" aria-label="LinkedIn">
              <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="https://github.com/TasunthaChathunika" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-accent-1/20 to-transparent border border-accent-1/30 text-accent-1 
                 hover:from-accent-1/40 hover:border-accent-1/60 hover:shadow-[0_0_20px_rgba(180,92,255,0.4)] hover:text-white 
                 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1" aria-label="GitHub">
              <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <a href="mailto:tasunthachathunika@gmail.com"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-accent-2/20 to-transparent border border-accent-2/30 text-accent-2 
                 hover:from-accent-2/40 hover:border-accent-2/60 hover:shadow-[0_0_20px_rgba(255,58,140,0.4)] hover:text-white 
                 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1" aria-label="Email">
              <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>


      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#070818] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;

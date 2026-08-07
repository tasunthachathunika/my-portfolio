import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Download, Eye } from 'lucide-react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
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
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center pt-16 pb-16 sm:pt-20 sm:pb-20 overflow-hidden">
      {/* Animated Gradient Blobs — Multi-color */}
      <motion.div className="hero-blob absolute top-20 left-10 w-80 h-80 bg-accent-1/25 rounded-full blur-[120px] animate-blob" style={{ y: yBlob }}></motion.div>
      <motion.div className="hero-blob absolute top-40 right-20 w-96 h-96 bg-accent-2/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s', y: yBlob }}></motion.div>
      <motion.div className="hero-blob absolute bottom-20 left-1/3 w-72 h-72 bg-accent-3/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s', y: yBlob }}></motion.div>
      <motion.div className="hero-blob absolute top-1/3 right-1/4 w-60 h-60 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '1s', y: yBlob, backgroundColor: 'rgba(0, 255, 136, 0.12)' }}></motion.div>
      <motion.div className="hero-blob absolute bottom-1/3 left-10 w-64 h-64 rounded-full blur-[110px] animate-blob" style={{ animationDelay: '3s', y: yBlob, backgroundColor: 'rgba(255, 204, 0, 0.1)' }}></motion.div>
      <motion.div className="hero-blob absolute top-1/4 left-1/2 w-48 h-48 rounded-full blur-[90px] animate-blob" style={{ animationDelay: '5s', y: yBlob, backgroundColor: 'rgba(255, 107, 53, 0.1)' }}></motion.div>

      {/* Antigravity Interactive Grid Overlay */}
      <AntigravityHeroBackground />

      <div className="section-container relative z-10 w-full pt-16 sm:pt-24">
        <motion.div
          className="hero-content max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div
            className="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card neon-border mb-10"
            variants={itemVariants}
            style={{ y: yBadge, opacity: opacityBadge }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-muted">
              Open to Software Engineering Internship
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black font-display leading-[1.1] mb-4 sm:mb-6 tracking-tight"
            variants={itemVariants}
            style={{ y: yTitle, scale: scaleTitle, opacity: opacityTitle }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">Tasuntha</span>
          </motion.h1>

          {/* Subtitle — ICT Undergraduate */}
          <motion.div
            className="hero-subtitle mb-4"
            variants={itemVariants}
            style={{ y: ySubtitle, opacity: opacitySubtitle }}
          >
            <span className="text-xl sm:text-2xl md:text-4xl text-muted font-bold inline-block">
              ICT Undergraduate
            </span>
            <br />
            <span className="text-base sm:text-lg md:text-2xl text-muted/70 font-medium inline-block mt-1 sm:mt-2">
              Full-Stack Developer | Software Engineer
            </span>
          </motion.div>

          {/* Typing Animation — Role Rotator */}
          <motion.div
            className="mb-6 sm:mb-8 h-10 sm:h-12 flex items-center justify-center"
            variants={itemVariants}
            style={{ y: ySubtitle, opacity: opacitySubtitle }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="text-lg sm:text-xl md:text-3xl font-semibold gradient-text inline-block"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.17, 0.55, 0.55, 1] }}
              >
                {roles[roleIndex]}
                <span className="inline-block w-[3px] h-7 ml-1 bg-accent-1 animate-pulse align-middle rounded-full"></span>
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-description text-sm sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0"
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
              className="group flex items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-base
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
              className="group flex items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-text text-sm sm:text-base
                glass-card neon-border hover:border-accent-1/50 hover:shadow-lg hover:shadow-accent-1/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="group flex items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-base
                bg-gradient-to-r from-accent-2 via-accent-6 to-accent-4
                hover:shadow-lg hover:shadow-accent-2/40 transition-all duration-300 animated-gradient-bg"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
              <Mail size={18} className="group-hover:scale-110 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="hero-socials flex gap-4 sm:gap-6 justify-center mt-8 sm:mt-12"
            variants={itemVariants}
            style={{ y: yButtons, opacity: opacityButtons }}
          >
            <a href="https://www.linkedin.com/in/tasuntha-chathunika/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full glass-card neon-border text-text/70 
                 hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:shadow-lg hover:shadow-[#0077b5]/30 
                 transition-all duration-300 hover:-translate-y-1" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://github.com/Tasuntha-Chathunika" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full glass-card neon-border text-text/70 
                 hover:text-white hover:border-white/50 hover:shadow-lg hover:shadow-white/20 
                 transition-all duration-300 hover:-translate-y-1" aria-label="GitHub">
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>

            <a href="mailto:tasunthachathunika@gmail.com"
              className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full glass-card neon-border text-text/70 
                 hover:text-accent-2 hover:border-accent-2/50 hover:shadow-lg hover:shadow-accent-2/30 
                 transition-all duration-300 hover:-translate-y-1" aria-label="Email">
              <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>


      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;

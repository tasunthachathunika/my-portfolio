import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, X, Code2, Database, Layout, ArrowRight, CheckCircle2, Zap, Table } from 'lucide-react';
import { FaGithub, FaFigma } from 'react-icons/fa';
import Reveal from './Reveal';
import pricepulseImg from '../assets/prisepluse.png';
import attendanceImg from '../assets/atms.png';

const projectsData = [
  {
    title: 'BizAnalytics',
    description: 'A SaaS-grade Business Intelligence & Executive Analytics Platform that transforms CSV/XLSX business data into interactive dashboards and executive reports.',
    fullDescription: 'BizAnalytics is a SaaS-grade Business Intelligence platform that transforms CSV/XLSX business data into interactive dashboards and executive reports. It features automated data ingestion, real-time KPI tracking, and professional PDF report generation.',
    architecture: 'Full-stack application with React.js frontend and Node.js/Express.js backend. Uses PostgreSQL (Supabase) as the primary cloud database with SQLite for local data processing.',
    architectureBullets: [
      'React.js SPA with Tailwind CSS Glassmorphism UI',
      'Node.js + Express.js RESTful API backend',
      'PostgreSQL (Supabase) cloud database with SQLite for local sync',
      'Recharts & Chart.js for interactive data visualizations',
      'jsPDF for automated executive PDF report generation',
    ],
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'SQLite', 'Recharts', 'Chart.js', 'jsPDF'],
    challenges: 'Building an automated data ingestion pipeline with validation, preprocessing, and synchronization across PostgreSQL (Supabase) and SQLite while maintaining data integrity and resilient database connectivity.',
    challengesBullets: [
      'Built automated data ingestion pipeline with validation & preprocessing',
      'Synchronized data between PostgreSQL (Supabase) and SQLite databases',
      'Designed real-time KPI dashboards with Revenue Trends & Sales Analytics',
      'Implemented resilient database connectivity with error handling',
    ],
    keyFeatures: [
      'CSV/XLSX data upload with automated validation & preprocessing',
      'Real-time KPI dashboards: Revenue Trends, Sales Analytics, Product Insights',
      'Executive PDF reporting with jsPDF',
      'Responsive Glassmorphism UI with Tailwind CSS',
      'Secure RESTful APIs with resilient database connectivity',
    ],
    icon: <Database size={36} />,
    tags: [
      { name: 'React.js', color: '#61dafb' },
      { name: 'Node.js', color: '#68a063' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'Supabase', color: '#3ECF8E' },
    ],
    links: { github: 'https://github.com/TasunthaChathunika/biz-analytics-webapp', demo: '#' },
    gradient: 'from-accent-2 to-accent-1',
    accentColor: 'var(--theme-accent-2)',
    featured: true,
  },
  {
    title: 'PricePulse',
    description: 'A full-stack e-commerce price tracking platform with a Chrome Extension for real-time product monitoring, automated web scraping, and price-drop email alerts.',
    fullDescription: 'PricePulse is a full-stack e-commerce price tracking platform with a Chrome Extension for real-time product monitoring. It features an automated web scraping engine using Puppeteer, Cheerio, and Node Cron to collect and manage pricing data from online stores.',
    architecture: 'Frontend built with React.js (Vite) and Tailwind CSS. Backend powered by Node.js and Express.js with MongoDB. Includes a Chrome Extension and automated web scraping engine.',
    architectureBullets: [
      'React.js (Vite) SPA with responsive Tailwind CSS design',
      'Node.js + Express.js RESTful API backend',
      'MongoDB for flexible pricing data storage',
      'Automated web scraping with Puppeteer & Cheerio',
      'Chrome Extension for real-time product monitoring',
      'JWT + Bcrypt.js secure authentication system',
    ],
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Puppeteer', 'Cheerio', 'Chart.js', 'JWT', 'Bcrypt.js'],
    challenges: 'Engineering an automated web scraping engine that reliably extracts pricing data from dynamic websites, integrating real-time price history charts, and building automated email notifications for price-drop alerts.',
    challengesBullets: [
      'Engineered automated scraping with Puppeteer, Cheerio & Node Cron',
      'Built interactive price history charts with Chart.js',
      'Implemented automated email notifications for price-drop alerts',
      'Designed secure auth using JWT + Bcrypt.js with RESTful architecture',
    ],
    keyFeatures: [
      'Chrome Extension for real-time product monitoring',
      'Automated web scraping engine with Puppeteer & Cheerio',
      'Interactive price history charts with Chart.js',
      'Automated email notifications for price-drop alerts',
      'Secure JWT + Bcrypt.js authentication',
    ],
    image: pricepulseImg,
    tags: [
      { name: 'React.js', color: '#61dafb' },
      { name: 'Node.js', color: '#68a063' },
      { name: 'MongoDB', color: '#47a248' },
    ],
    links: { github: 'https://github.com/TasunthaChathunika/PricePulse-Project', demo: '#' },
    gradient: 'from-accent-3 to-accent-1',
    accentColor: 'var(--theme-accent-3)',
    featured: true,
  },
  {
    title: 'ATMS',
    description: 'A full-stack Attendance & Timetable Management System with Role-Based Access Control (RBAC) for Administrators, Lecturers, and Students.',
    fullDescription: 'ATMS is a full-stack academic management system for attendance tracking and timetable scheduling. It features Role-Based Access Control (RBAC) for Administrators, Lecturers, and Students, with real-time attendance management and conflict-free timetable scheduling.',
    architecture: 'Frontend built with React.js (Vite) and Tailwind CSS. Backend powered by Core PHP with RESTful APIs and MySQL for relational data management.',
    architectureBullets: [
      'React.js (Vite) SPA with modular component architecture',
      'Core PHP server-side logic with REST APIs',
      'MySQL relational database with normalized schema',
      'Role-Based Access Control (RBAC) for 3 user types',
      'Responsive, modular UI with Tailwind CSS',
    ],
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Core PHP', 'REST APIs', 'MySQL'],
    challenges: 'Implementing strict Role-Based Access Control for three distinct user types while maintaining conflict-free timetable scheduling and real-time attendance tracking with analytical dashboards.',
    challengesBullets: [
      'Designed RBAC for Administrators, Lecturers, and Students',
      'Built real-time attendance management with analytics',
      'Implemented conflict-free timetable scheduling logic',
      'Created responsive, modular UI with React.js and Tailwind CSS',
    ],
    keyFeatures: [
      'Role-Based Access Control (RBAC) — Admin, Lecturer, Student',
      'Real-time attendance management and tracking',
      'Conflict-free timetable scheduling',
      'Analytical dashboards for attendance insights',
      'Responsive, modular React.js interface',
    ],
    databaseSchema: [
      'Users (id, name, email, role, password_hash)',
      'Courses (id, code, name, credits, lecturer_id FK)',
      'Enrollments (student_id FK, course_id FK, semester)',
      'Attendance (id, student_id FK, course_id FK, date, status)',
      'Timetable (id, course_id FK, day, start_time, end_time, room)',
    ],
    image: attendanceImg,
    tags: [
      { name: 'React.js', color: '#61dafb' },
      { name: 'PHP', color: '#8993be' },
      { name: 'MySQL', color: '#f29111' },
    ],
    links: { github: 'https://github.com/TasunthaChathunika/Attendance-timetable-system', demo: '#' },
    gradient: 'from-accent-1 to-accent-2',
    accentColor: 'var(--theme-accent-1)',
    featured: false,
  },
];

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={() => onClick(project)}
      className="group rounded-2xl overflow-hidden flex flex-col relative cursor-pointer
                 glass-card hover:border-accent-1/20"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        willChange: 'transform',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 30px 60px ${project.accentColor}20, 0 0 0 1px ${project.accentColor}20`;
      }}
    >
      {/* Animated Gradient Top Bar */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${project.gradient} animated-gradient-bg`}
        style={{ backgroundSize: '200% 200%' }}
      ></div>

      {/* Featured Badge */}
      {project.featured && (
        <motion.div
          className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, var(--theme-accent-2), var(--theme-accent-1))',
            boxShadow: '0 0 12px var(--theme-accent-2)',
          }}
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4, type: 'spring', stiffness: 300 }}
        >
          <Star size={12} fill="white" />
          Featured
        </motion.div>
      )}

      {/* Image / Icon Area */}
      <div className="h-52 w-full overflow-hidden relative bg-black/40">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-90"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-20 transition-opacity duration-500`}></div>
            <motion.div
              className="z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              style={{ color: project.accentColor }}
              whileHover={{ scale: 1.3, rotate: 10 }}
            >
              {project.icon}
            </motion.div>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"></div>
        
        {/* Click to view text on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
           <motion.span
             className="px-6 py-2 rounded-full glass-card border border-white/20 text-white font-semibold text-sm flex items-center gap-2"
             initial={{ y: 15, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.3 }}
           >
             View Case Study <ArrowRight size={16} />
           </motion.span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative z-10 bg-bg/40">
        <h3
          className="text-2xl font-bold mb-3 transition-colors duration-300 text-text"
          style={{ color: 'inherit' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = project.accentColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
        >
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

        {/* Colored tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag.name}
              className="px-3 py-1 rounded-full text-[11px] font-bold border transition-all duration-300"
              style={{
                color: tag.color,
                borderColor: tag.color + '40',
                backgroundColor: tag.color + '10',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.3 + i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              {tag.name}
            </motion.span>
          ))}
        </div>

        {/* Links (Stop propagation so clicking links doesn't open modal) */}
        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                glass-card text-sm font-semibold text-text hover:bg-border transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaGithub size={15} /> Code
            </motion.a>
          )}
          {project.links.demo && (
            <motion.a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                text-sm font-bold text-white bg-gradient-to-r ${project.gradient}
                hover:shadow-[0_0_20px_rgba(var(--tw-shadow-color),0.4)] transition-all duration-300`}
              style={{ '--tw-shadow-color': project.accentColor }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={15} /> Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6 md:p-12 py-8 sm:py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-card rounded-2xl sm:rounded-3xl border border-border overflow-hidden shadow-2xl"
          style={{ boxShadow: `0 20px 80px -20px ${project.accentColor}50` }}
        >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>

        {/* Modal Header Image */}
        <div className="relative h-44 sm:h-64 md:h-80 w-full bg-bg flex items-center justify-center overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 z-10 mix-blend-color`}></div>
          {project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-70"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-bg">
              <div style={{ color: project.accentColor, opacity: 0.5 }} className="transform scale-150">
                {project.icon}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent z-10"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 md:p-10 z-20">
             <motion.h2
               className="text-xl sm:text-3xl md:text-5xl font-black mb-2 sm:mb-4 drop-shadow-2xl"
               style={{ color: '#ffffff', textShadow: `0 4px 20px ${project.accentColor}80` }}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.5 }}
             >
               {project.title}
             </motion.h2>
             <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag.name}
                    className="px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md"
                    style={{
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      border: `1px solid ${tag.color}40`,
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    {tag.name}
                  </motion.span>
                ))}
             </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
           
           <div className="md:col-span-2 space-y-8">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-bg border border-border" style={{ color: project.accentColor, boxShadow: `0 0 15px ${project.accentColor}30` }}>
                    <Layout size={20} />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-text to-muted">Overview</span>
                </h4>
                <p className="text-muted leading-relaxed text-base md:text-lg">
                  {project.fullDescription}
                </p>
              </motion.div>

              {/* Key Features */}
              {project.keyFeatures && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-3 mt-6">
                    <div className="p-2 rounded-lg bg-bg border border-border" style={{ color: project.accentColor, boxShadow: `0 0 15px ${project.accentColor}30` }}>
                      <Zap size={20} />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-text to-muted">Key Features</span>
                  </h4>
                  <ul className="space-y-2">
                    {project.keyFeatures.map((feat, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2.5 text-muted text-sm md:text-base"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + i * 0.05 }}
                      >
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: project.accentColor }} />
                        {feat}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Architecture */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h4 className="text-xl font-bold mb-3 flex items-center gap-3 mt-6">
                  <div className="p-2 rounded-lg bg-bg border border-border" style={{ color: project.accentColor, boxShadow: `0 0 15px ${project.accentColor}30` }}>
                    <Database size={20} />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-text to-muted">Architecture</span>
                </h4>
                <p className="text-muted leading-relaxed text-base md:text-lg mb-3">
                  {project.architecture}
                </p>
                {project.architectureBullets && (
                  <ul className="space-y-2">
                    {project.architectureBullets.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2.5 text-muted text-sm md:text-base"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + i * 0.05 }}
                      >
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: project.accentColor }} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>

              {/* Database Schema */}
              {project.databaseSchema && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-3 mt-6">
                    <div className="p-2 rounded-lg bg-bg border border-border" style={{ color: project.accentColor, boxShadow: `0 0 15px ${project.accentColor}30` }}>
                      <Table size={20} />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-text to-muted">Database Schema</span>
                  </h4>
                  <div className="glass-card rounded-xl p-4 space-y-1.5">
                    {project.databaseSchema.map((table, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2 text-sm font-mono text-muted"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.65 + i * 0.05 }}
                      >
                        <span className="text-accent-1 font-bold">→</span>
                        {table}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Challenges Solved */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h4 className="text-xl font-bold mb-3 flex items-center gap-3 mt-6">
                  <div className="p-2 rounded-lg bg-bg border border-border" style={{ color: project.accentColor, boxShadow: `0 0 15px ${project.accentColor}30` }}>
                    <Code2 size={20} />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-text to-muted">Challenges Solved</span>
                </h4>
                <p className="text-muted leading-relaxed text-base md:text-lg mb-3">
                  {project.challenges}
                </p>
                {project.challengesBullets && (
                  <ul className="space-y-2">
                    {project.challengesBullets.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2.5 text-muted text-sm md:text-base"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.75 + i * 0.05 }}
                      >
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: project.accentColor }} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
           </div>

           {/* Sidebar Links & Tech */}
           <motion.div
             className="space-y-8"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5, duration: 0.5 }}
           >
              <div className="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border bg-surface/20">
                <h4 className="text-lg font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-text to-muted">Technologies Stack</h4>
                <ul className="flex flex-wrap gap-2.5">
                  {project.technologies.map((tech, i) => (
                    <motion.li
                      key={tech}
                      className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg cursor-default"
                      style={{ 
                        background: `linear-gradient(135deg, ${project.accentColor}90, ${project.accentColor}40)`,
                        border: `1px solid ${project.accentColor}60`,
                        boxShadow: `0 4px 15px -3px ${project.accentColor}40` 
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {project.links.github && (
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-card text-text font-bold hover:bg-border transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaGithub size={18} /> View Source Code
                  </motion.a>
                )}
                {project.links.demo && (
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold bg-gradient-to-r ${project.gradient} hover:shadow-lg transition-all`}
                    style={{ '--tw-shadow-color': project.accentColor }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ExternalLink size={18} /> Live Demonstration
                  </motion.a>
                )}
              </div>
           </motion.div>

        </div>
      </motion.div>
    </div>
  </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-28 md:py-36 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-2/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-accent-1/8 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="section-container relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-accent-3 to-accent-1 mx-auto"></div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted max-w-lg mx-auto text-sm md:text-base">
              A selection of things I've built with passion. Click on a project to view detailed case studies.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

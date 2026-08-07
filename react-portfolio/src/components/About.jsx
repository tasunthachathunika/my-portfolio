import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Code2, Layers, BookOpen } from 'lucide-react';
import profileImage from '../assets/IMG_20240613_205017.jpg';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Reveal from './Reveal';

const stats = [
  { icon: <Code2 size={20} />, value: '1000+', numValue: 1000, label: 'Hours Coding', color: 'var(--theme-accent-3)', suffix: '+' },
  { icon: <Layers size={20} />, value: '3+', numValue: 3, label: 'Projects Built', color: 'var(--theme-accent-1)', suffix: '+' },
  { icon: <BookOpen size={20} />, value: 'BICT (Hons)', numValue: null, label: 'GPA: 3.00', color: 'var(--theme-accent-2)', suffix: '' },
];

// Counter animation hook
const useCountUp = (target, isVisible, duration = 1.5) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible || target === null) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return count;
};

const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(stat.numValue, isInView);

  return (
    <motion.div
      ref={ref}
      className="glass-card p-3 flex flex-col items-center text-center gap-1.5 hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden group/stat"
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      style={{ '--stat-color': stat.color }}
    >
      <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-20 transition-opacity duration-300" style={{ backgroundColor: stat.color }}></div>
      <motion.span
        style={{ color: stat.color }}
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {stat.icon}
      </motion.span>
      <span className="font-extrabold font-display text-lg leading-none" style={{ color: stat.color }}>
        {stat.numValue !== null ? `${count}${stat.suffix}` : stat.value}
      </span>
      <span className="text-[10px] text-muted font-medium leading-tight">{stat.label}</span>
    </motion.div>
  );
};

const About = () => {
  const aboutRef = useRef(null);

  useGSAP(() => {
    // Enhanced image parallax with slight rotation
    gsap.to('.about-image-container', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Text content parallax (opposite direction, slower)
    gsap.to('.about-text-content', {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, { scope: aboutRef });

  // Stagger variants for paragraphs
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        delay: 0.3 + i * 0.1,
        ease: [0.17, 0.55, 0.55, 1],
      },
    }),
  };

  return (
    <section ref={aboutRef} id="about" className="py-20 sm:py-28 md:py-36 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent-1/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-3/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <Reveal>
          <div className="mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-accent-1 to-accent-2"></div>
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-12 lg:gap-20">
          {/* Image + Stats */}
          <motion.div
            className="about-image-container w-full max-w-[280px] sm:max-w-xs lg:max-w-sm mx-auto lg:mx-0 relative group flex-shrink-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Outer animated gradient ring (Glow) */}
            <div className="absolute -inset-1 rounded-[1.3rem] opacity-40 blur-xl"
              style={{
                background: 'linear-gradient(135deg, var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-3), var(--theme-accent-1))',
                backgroundSize: '300% 300%',
                animation: 'border-rotate 4s ease infinite',
              }}
            ></div>
            
            {/* Animated Gradient Stroke (Border) */}
            <div className="absolute -inset-[2px] rounded-[1.3rem] opacity-100"
              style={{
                background: 'linear-gradient(135deg, var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-3), var(--theme-accent-1))',
                backgroundSize: '300% 300%',
                animation: 'border-rotate 4s ease infinite',
              }}
            ></div>

            {/* Inner Content containing the image */}
            <div className="relative bg-bg p-2 rounded-2xl overflow-hidden z-10 h-full">
              <div className="relative h-full w-full rounded-xl overflow-hidden">
                <img
                  src={profileImage}
                  alt="Tasuntha Chathunika Dayasiri"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Image overlay shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-1/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>

            {/* Stats Row below image with counter animation */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="about-text-content flex-1 min-w-0 w-full"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Reveal direction="right" delay={0.1}>
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-4 sm:mb-6 leading-snug">
                Developing robust solutions with a focus on{' '}
                <span className="gradient-text">user experience</span>.
              </h3>
            </Reveal>

            <div className="space-y-4 sm:space-y-5 text-muted text-sm sm:text-base md:text-lg leading-relaxed">
              {[
                <>Hello! I'm{' '}<strong className="text-text font-semibold">Tasuntha Chathunika Dayasiri</strong>, a 3rd-year ICT undergraduate at the University of Vavuniya. I specialize in <strong className="text-text font-semibold">Software Engineering, Full-Stack Development, and DevOps</strong>.</>,
                <>I build robust web applications and SaaS platforms using <strong className="text-text font-semibold">React, Node.js, PostgreSQL, and MongoDB</strong>. Currently, I'm diving deeper into <strong className="text-text font-semibold">Docker, AWS, and CI/CD</strong>, while sharing my learnings on <strong className="text-text font-semibold">Medium</strong>.</>,
                <>I am actively seeking a <strong className="text-text font-semibold">Software Engineering Internship</strong> to apply my skills in real-world projects and grow as an engineer.</>,
              ].map((content, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={paragraphVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {content}
                </motion.p>
              ))}
            </div>

            {/* Highlight chips */}
            <motion.div
              className="flex flex-wrap gap-2 mt-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {['Full-Stack Development', 'React.js & Node.js', 'Cloud & DevOps', 'RESTful APIs', 'Database Design', 'Technical Writing'].map((chip, i) => (
                <motion.span
                  key={chip}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full glass-card border border-border text-muted hover:text-accent-3 hover:border-accent-3/30 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.a
                href="/Tasuntha_Chathunika.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 sm:gap-2.5 px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base overflow-hidden
                  bg-gradient-to-r from-accent-1 to-accent-2
                  hover:shadow-xl hover:shadow-accent-1/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Animated shine sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                Download Resume <Download size={18} />
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 sm:gap-2.5 px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-text text-sm sm:text-base
                  glass-card neon-border hover:border-accent-3/50 hover:shadow-accent-3/10 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Talk
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

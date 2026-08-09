import { ArrowUp, Heart, Code2 } from 'lucide-react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';

const socialLinks = [
  { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/tasuntha-chathunika/', label: 'LinkedIn', color: '#0077b5' },
  { icon: <FaGithub size={18} />, href: 'https://github.com/TasunthaChathunika', label: 'GitHub', color: 'var(--theme-text)' },
  { icon: <FaEnvelope size={18} />, href: 'mailto:tasunthachathunika@gmail.com', label: 'Email', color: 'var(--theme-accent-2)' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certifications' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScroll(window.pageYOffset > 400);
    };
    window.addEventListener('scroll', checkScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg/50">
      {/* Animated gradient top border */}
      <div
        className="w-full h-px animated-gradient-bg"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--theme-accent-3), var(--theme-accent-5), var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-4), var(--theme-accent-6), transparent)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 4s ease infinite',
        }}
      ></div>

      {/* Subtle glow above the border */}
      <div className="absolute top-0 left-1/4 right-1/4 h-12 bg-gradient-to-b from-accent-1/5 to-transparent pointer-events-none"></div>

      <div className="section-container py-10">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Brand */}
            <div className="text-center md:text-left">
              <motion.a
                href="#hero"
                className="group inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-display font-extrabold text-2xl tracking-tight">
                  Tasuntha<span className="text-accent-2">.</span>
                </span>
              </motion.a>
              <p className="text-xs text-muted mt-1 flex items-center justify-center md:justify-start gap-1.5">
                <Code2 size={11} className="text-accent-3" />
                Building the future, one project at a time.
              </p>
            </div>

            {/* Quick Nav */}
            <nav className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-semibold text-muted hover:text-accent-3 transition-colors duration-300 uppercase tracking-wider"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  title={social.label}
                  className="social-link-enhanced relative p-2.5 rounded-xl glass-card text-muted overflow-hidden"
                  style={{ '--social-color': social.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{
                    y: -3,
                    scale: 1.1,
                    boxShadow: `0 8px 20px ${social.color}25`,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-xl"
                    style={{ backgroundColor: social.color }}
                  />
                  <span className="relative z-10 transition-colors duration-300" style={{ color: social.color }}>
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Divider */}
        <Reveal delay={0.2}>
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()}{' '}
              <span className="gradient-text font-semibold">Tasuntha Chathunika Dayasiri</span>.
              All rights reserved.
            </p>
            <p className="text-xs text-muted flex items-center gap-1.5">
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
              >
                <Heart size={11} className="text-accent-2 fill-accent-2" />
              </motion.span>
              {' '}in Sri Lanka
            </p>
          </div>
        </Reveal>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center z-50
              bg-gradient-to-r from-accent-1 to-accent-2 text-white
              shadow-lg shadow-accent-1/30"
            onClick={scrollTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ y: -4, scale: 1.1, boxShadow: '0 12px 30px rgba(168, 85, 247, 0.4)' }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

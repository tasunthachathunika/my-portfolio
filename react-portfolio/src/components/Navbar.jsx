import { useState, useEffect, useRef } from 'react';
import { Menu, X, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#hero', color: 'var(--theme-accent-3)' },
  { name: 'About', href: '#about', color: 'var(--theme-accent-5)' },
  { name: 'Education', href: '#education', color: 'var(--theme-accent-1)' },
  { name: 'Skills', href: '#skills', color: 'var(--theme-accent-4)' },
  { name: 'Projects', href: '#projects', color: 'var(--theme-accent-2)' },
  { name: 'Certificates', href: '#certifications', color: 'var(--theme-accent-6)' },
  { name: 'Blog', href: '#blog', color: 'var(--theme-accent-3)' },
  { name: 'Contact', href: '#contact', color: 'var(--theme-accent-2)' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Scrolled state for background
          setScrolled(currentScrollY > 20);

          // Smart hide/show — hide on scroll down, show on scroll up
          if (currentScrollY < 100) {
            setNavVisible(true); // Always show at top
          } else if (currentScrollY > lastScrollY.current + 5) {
            setNavVisible(false); // Scrolling down
          } else if (currentScrollY < lastScrollY.current - 5) {
            setNavVisible(true); // Scrolling up
          }

          lastScrollY.current = currentScrollY;

          // Active section detection
          const sections = navLinks.map(link => document.querySelector(link.href));
          const scrollPosition = currentScrollY + 100;
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(section.id);
              break;
            }
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get the active link's color
  const activeLink = navLinks.find(l => l.href.substring(1) === activeSection);
  const activeColor = activeLink?.color || 'var(--theme-accent-1)';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${scrolled
          ? 'py-3 bg-bg/50 backdrop-blur-2xl shadow-lg'
          : 'py-5 bg-transparent'
        }
        ${navVisible ? 'navbar-visible' : 'navbar-hidden'}`}
    >
      {/* Animated rainbow bottom border on scroll */}
      {scrolled && (
        <div
          className="absolute bottom-0 left-0 w-full h-[1px]"
          style={{
            background: 'linear-gradient(90deg, var(--theme-accent-3), var(--theme-accent-5), var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-4), var(--theme-accent-6), var(--theme-accent-3))',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 4s ease infinite',
            opacity: 0.5,
          }}
        />
      )}

      <div className="section-container flex items-center justify-between">
        {/* Logo — Gradient */}
        <motion.a
          href="#hero"
          className="font-display font-extrabold text-2xl tracking-tight relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">Tasuntha</span>
          <span
            className="text-accent-2 group-hover:text-accent-4 transition-colors duration-300"
            style={{ textShadow: '0 0 12px var(--theme-accent-2)' }}
          >.</span>
          {/* Subtle glow behind logo on hover */}
          <span className="absolute -inset-2 bg-accent-1/0 group-hover:bg-accent-1/10 rounded-xl blur-lg transition-all duration-500 pointer-events-none"></span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul
            className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-border/60 relative overflow-hidden"
            style={{
              background: scrolled
                ? 'rgba(13, 13, 37, 0.6)'
                : 'rgba(20, 20, 48, 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Subtle shimmer across the pill */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--theme-accent-3) 20%, var(--theme-accent-1) 40%, var(--theme-accent-2) 60%, var(--theme-accent-5) 80%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 6s linear infinite',
              }}
            />
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm font-medium transition-all duration-300 relative px-4 py-2 rounded-full flex items-center justify-center
                      ${isActive
                        ? 'text-white'
                        : 'text-muted hover:text-text'}`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full z-0"
                        style={{
                          background: `linear-gradient(135deg, ${link.color}, var(--theme-accent-1))`,
                          boxShadow: `0 2px 12px ${link.color}40, 0 0 20px ${link.color}15`,
                          opacity: 0.9,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    {/* Hover glow dot */}
                    {!isActive && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300"
                        style={{ backgroundColor: link.color }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {/* Download Resume — Gradient Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-3))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 25px rgba(180, 92, 255, 0.35), 0 0 15px rgba(255, 58, 140, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></span>
              <Download size={14} className="relative z-10" />
              <span className="relative z-10">Resume</span>
            </motion.a>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg transition-colors text-text border border-border/40"
            style={{
              background: 'rgba(13, 13, 37, 0.4)',
            }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden backdrop-blur-2xl overflow-hidden relative"
            style={{ background: 'rgba(5, 5, 16, 0.95)' }}
          >
            {/* Rainbow line at top of mobile menu */}
            <div
              className="w-full h-[1px]"
              style={{
                background: 'linear-gradient(90deg, var(--theme-accent-3), var(--theme-accent-5), var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-4), var(--theme-accent-6))',
              }}
            />
            <ul className="flex flex-col py-5 px-6 gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-base font-medium py-2.5 px-4 rounded-xl transition-all duration-300 relative overflow-hidden"
                      style={{
                        color: isActive ? '#fff' : 'var(--theme-muted)',
                        background: isActive ? `linear-gradient(135deg, ${link.color}20, ${link.color}08)` : 'transparent',
                        borderLeft: isActive ? `3px solid ${link.color}` : '3px solid transparent',
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isActive && (
                          <Sparkles size={14} style={{ color: link.color }} />
                        )}
                        {link.name}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
              {/* Mobile Resume Button */}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="mt-3"
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--theme-accent-1), var(--theme-accent-2), var(--theme-accent-3))',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 3s ease infinite',
                  }}
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

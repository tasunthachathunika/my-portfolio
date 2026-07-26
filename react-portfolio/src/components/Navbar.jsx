import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certifications' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${scrolled
          ? 'py-4 bg-bg/60 backdrop-blur-xl border-b border-border shadow-sm'
          : 'py-6 bg-transparent border-b border-transparent'
        }
        ${navVisible ? 'navbar-visible' : 'navbar-hidden'}`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="font-display font-extrabold text-2xl tracking-tight"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tasuntha<span className="text-accent-2">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-2 bg-surface/30 backdrop-blur-md px-2 py-1.5 rounded-full border border-border">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 relative px-4 py-2 rounded-full flex items-center justify-center
                    ${activeSection === link.href.substring(1)
                      ? 'text-text'
                      : 'text-muted hover:text-text'}`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {activeSection === link.href.substring(1) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-text/10 shadow-sm z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-surface/50 border border-border hover:border-accent-1/30 transition-all text-text"
              aria-label="Toggle Theme"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300
                bg-text text-bg hover:scale-105 hover:shadow-lg shadow-black/10"
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-surface/50 transition-colors text-text border border-transparent hover:border-border">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-surface/50 transition-colors text-text"
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
            className="md:hidden bg-bg/90 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-base font-medium transition-colors
                      ${activeSection === link.href.substring(1) ? 'text-accent-3' : 'text-muted'}`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

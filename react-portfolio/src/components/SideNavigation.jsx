import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

const SideNavigation = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show side navigation only when scrolling past the top hero section
      setIsVisible(window.scrollY > window.innerHeight * 0.3);

      // Use middle of the screen as the trigger point
      const triggerPoint = window.scrollY + window.innerHeight / 2;
      
      let currentSection = sections[0].id;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element) {
          const { top } = element.getBoundingClientRect();
          const offsetTop = top + window.scrollY;
          
          // If the scroll position has passed the top of this section (minus some offset)
          if (triggerPoint >= offsetTop - 100) {
            currentSection = section.id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-[100] hidden sm:flex flex-col gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none translate-x-8'}`}>
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        
        return (
          <div 
            key={section.id} 
            className="group relative flex items-center justify-end h-5 cursor-pointer"
            onClick={() => scrollToSection(section.id)}
            title={section.label}
          >
            {/* Label (shows on hover or when active) */}
            <span 
              className={`absolute right-10 px-2 py-1 text-[15px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300 pointer-events-none
                ${isActive ? 'text-accent-2 opacity-100 translate-x-0' : 'text-muted opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0'}`}
              style={isActive ? { textShadow: '0 0 12px var(--theme-accent-2)' } : {}}
            >
              {section.label}
            </span>

            {/* Dot container */}
            <div className="relative flex items-center justify-center w-6 h-6">
              {/* Glow for active dot */}
              {isActive && (
                <motion.div 
                  layoutId="activeDotGlow"
                  className="absolute inset-0 rounded-full blur-[6px] pointer-events-none"
                  style={{ backgroundColor: 'var(--theme-accent-2)' }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Actual dot */}
              <div 
                className={`rounded-full transition-all duration-300 relative z-10
                  ${isActive 
                    ? 'w-3 h-3 shadow-[0_0_10px_var(--theme-accent-2)]' 
                    : 'w-2 h-2 group-hover:scale-[1.3]'}`}
                style={{ 
                  backgroundColor: isActive ? 'var(--theme-accent-2)' : 'var(--theme-accent-2)',
                  opacity: isActive ? 1 : 0.3
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideNavigation;

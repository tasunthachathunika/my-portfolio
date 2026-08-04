import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import Lenis from 'lenis';
import './index.css';

const SectionDivider = ({ flip = false }) => (
  <div className="section-divider" style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
        className="section-divider-wave"
        style={{ fill: 'var(--theme-card)', opacity: 0.3 }}
      />
      <path
        d="M0,50 C240,10 480,70 720,40 C960,10 1200,60 1440,30 L1440,80 L0,80 Z"
        className="section-divider-wave"
        style={{ fill: 'var(--theme-card)', opacity: 0.15 }}
      />
    </svg>
    <div className="section-divider-glow"></div>
  </div>
);

function App() {

  useEffect(() => {
    // Initialize Lenis for smooth scroll transitions
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Always dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Preloader />
      <ScrollProgress />
      <Background3D />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TechMarquee />
        <SectionDivider />
        <About />
        <SectionDivider flip />
        <Education />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider flip />
        <Certifications />
        <SectionDivider />
        <Blog />
        <SectionDivider flip />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

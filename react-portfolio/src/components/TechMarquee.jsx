import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs,
  FaJava, FaPython, FaAws, FaDocker
} from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiPostgresql, SiExpress } from 'react-icons/si';

const techStack = [
  { name: 'JavaScript', icon: <FaJsSquare color="#f7df1e" /> },
  { name: 'React.js', icon: <FaReact color="#61dafb" /> },
  { name: 'Node.js', icon: <FaNodeJs color="#68a063" /> },
  { name: 'Express', icon: <SiExpress color="var(--theme-text)" /> },
  { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql color="#336791" /> },
  { name: 'Python', icon: <FaPython color="#3776AB" /> },
  { name: 'Java', icon: <FaJava color="#ec2025" /> },
  { name: 'AWS', icon: <FaAws color="#FF9900" /> },
  { name: 'Docker', icon: <FaDocker color="#2496ed" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06b6d4" /> },
];

const TechMarquee = () => {
  return (
    <div className="w-full overflow-hidden bg-surface/30 border-y border-border/30 py-6 relative z-10 backdrop-blur-sm">
      {/* Left fading edge */}
      <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
      
      {/* Right fading edge */}
      <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>
      
      {/* Scrolling Container */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Double the array for seamless infinite scroll */}
        {[...techStack, ...techStack].map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 px-6 py-3 mx-3 glass-card rounded-full cursor-default transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            <div className="text-2xl">{tech.icon}</div>
            <span className="font-semibold text-sm text-text/80 tracking-wide whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;

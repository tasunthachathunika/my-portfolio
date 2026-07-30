import { motion } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs,
  FaJava, FaPython, FaPhp, FaFigma,
  FaGitAlt, FaGithub, FaDocker, FaLinux, FaAws, FaMicrosoft
} from 'react-icons/fa';
import { SiTailwindcss, SiCplusplus, SiMysql, SiMongodb, SiExpress, SiPostman, SiVite, SiPostgresql, SiSqlite, SiSupabase, SiJsonwebtokens } from 'react-icons/si';
import { TbBrandCSharp, TbLetterC } from "react-icons/tb";
import { Code2, Brush, Cloud, Database, Server, Wrench } from 'lucide-react';
import Reveal from './Reveal';

// ─── Programming Languages ────────────────────────
const programmingSkills = [
  { name: 'Java', icon: <FaJava />, color: '#ec2025', mastery: 3 },
  { name: 'Python', icon: <FaPython />, color: '#3776AB', mastery: 3 },
  { name: 'C', icon: <TbLetterC />, color: '#A8B9CC', mastery: 3 },
  { name: 'C++', icon: <SiCplusplus />, color: '#00599c', mastery: 3 },
  { name: 'C#', icon: <TbBrandCSharp />, color: '#68217a', mastery: 3 },
  { name: 'JavaScript', icon: <FaJsSquare />, color: '#f7df1e', mastery: 4 },
  { name: 'PHP', icon: <FaPhp />, color: '#777BB4', mastery: 3 },
];

// ─── Frontend Development ─────────────────────────
const frontendSkills = [
  { name: 'React.js', icon: <FaReact />, color: '#61dafb', mastery: 4 },
  { name: 'Vite', icon: <SiVite />, color: '#646CFF', mastery: 4 },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06b6d4', mastery: 5 },
  { name: 'HTML5', icon: <FaHtml5 />, color: '#e34f26', mastery: 5 },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#2965f1', mastery: 5 },
];

// ─── Backend & APIs ───────────────────────────────
const backendSkills = [
  { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063', mastery: 3 },
  { name: 'Express.js', icon: <SiExpress />, color: 'var(--theme-text)', mastery: 3 },
  { name: 'RESTful APIs', icon: <Server size={22} />, color: '#4caf50', mastery: 4 },
  { name: 'Core PHP', icon: <FaPhp />, color: '#777BB4', mastery: 3 },
  { name: 'JWT Auth', icon: <SiJsonwebtokens />, color: '#d63aff', mastery: 3 },
];

// ─── Cloud & Databases ───────────────────────────
const databaseSkills = [
  { name: 'AWS', icon: <FaAws />, color: '#FF9900', mastery: 2 },
  { name: 'Azure', icon: <FaMicrosoft />, color: '#0089D6', mastery: 2 },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791', mastery: 3 },
  { name: 'MySQL', icon: <SiMysql />, color: '#4479a1', mastery: 4 },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248', mastery: 3 },
  { name: 'SQLite', icon: <SiSqlite />, color: '#003B57', mastery: 3 },
  { name: 'Supabase', icon: <SiSupabase />, color: '#3ECF8E', mastery: 3 },
];

// ─── DevOps & Developer Tools ─────────────────────
const devopsSkills = [
  { name: 'Git', icon: <FaGitAlt />, color: '#f05032', mastery: 4 },
  { name: 'GitHub', icon: <FaGithub />, color: 'var(--theme-text)', mastery: 4 },
  { name: 'Docker', icon: <FaDocker />, color: '#2496ed', mastery: 2 },
  { name: 'Linux', icon: <FaLinux />, color: '#fcc624', mastery: 3 },
  { name: 'GitHub Actions', icon: <span className="font-extrabold text-sm font-display">CI</span>, color: '#2088FF', mastery: 2 },
  { name: 'Postman', icon: <SiPostman />, color: '#ff6c37', mastery: 4 },
];

// ─── Tools ────────────────────────────────────────
const toolsSkills = [
  { name: 'VS Code', icon: <Code2 size={22} />, color: '#007acc', mastery: 5 },
  { name: 'Figma', icon: <FaFigma />, color: '#f24e1e', mastery: 4 },
];

const MasteryDots = ({ mastery, color }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((dot) => (
      <motion.div
        key={dot}
        className="w-1.5 h-1.5 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: dot * 0.05, duration: 0.3, type: 'spring' }}
        style={{
          backgroundColor: dot <= mastery ? color : 'var(--theme-border)',
          boxShadow: dot <= mastery ? `0 0 6px ${color}80` : 'none',
        }}
      />
    ))}
  </div>
);

const SkillCard = ({ skill, index }) => (
  <div className="skill-card-wrapper">
    <motion.div
      className="group relative glass-card p-5 flex flex-col items-center justify-center gap-3 cursor-default overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{ '--icon-color': skill.color }}
    >
      {/* Hover glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-400 rounded-2xl"
        style={{ backgroundColor: skill.color }}
      ></div>

      {/* Radial spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${skill.color}15 0%, transparent 70%)`,
        }}
      ></div>

      {/* Icon */}
      <motion.div
        className="text-3xl md:text-4xl relative z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: skill.color }}
        whileHover={{ scale: 1.2, rotate: 8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {skill.icon}
      </motion.div>

      {/* Name */}
      <span className="font-semibold text-xs text-muted group-hover:text-text transition-colors relative z-10">
        {skill.name}
      </span>

      {/* Mastery Dots */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
        <MasteryDots mastery={skill.mastery} color={skill.color} />
      </div>
    </motion.div>
  </div>
);

const SectionLabel = ({ icon, label, color, gradientClass }) => (
  <Reveal direction="left" delay={0.1}>
    <div className="flex items-center gap-3 mb-6">
      <motion.div
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r ${gradientClass}`}
        style={{ boxShadow: `0 0 16px ${color}40` }}
        whileHover={{ scale: 1.05 }}
      >
        {icon}
        {label}
      </motion.div>
      <div className="flex-1 h-px bg-gradient-to-r from-accent-1/20 to-transparent"></div>
    </div>
  </Reveal>
);

const Skills = () => {
  return (
    <section id="skills" className="py-28 md:py-36 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-1/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-3/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="section-container relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display">
              Technical <span className="gradient-text">Skills</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-accent-2 to-accent-1 mx-auto"></div>
          </Reveal>

        </div>

        <div className="flex flex-col gap-14">

          {/* Programming Languages */}
          <div>
            <SectionLabel
              icon={<Code2 size={15} />}
              label="Programming Languages"
              color="#ec2025"
              gradientClass="from-[#ec2025] to-[#68217a]"
            />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {programmingSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Frontend Development */}
          <div>
            <SectionLabel
              icon={<Code2 size={15} />}
              label="Frontend Development"
              color="var(--theme-accent-3)"
              gradientClass="from-accent-3 to-accent-1"
            />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {frontendSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Backend & APIs */}
          <div>
            <SectionLabel
              icon={<Server size={15} />}
              label="Backend & APIs"
              color="#68a063"
              gradientClass="from-[#68a063] to-[#333]"
            />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {backendSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Cloud & Databases */}
          <div>
            <SectionLabel
              icon={<Database size={15} />}
              label="Cloud & Databases"
              color="#336791"
              gradientClass="from-[#FF9900] to-[#336791]"
            />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {databaseSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* DevOps & Developer Tools */}
          <div>
            <SectionLabel
              icon={<Cloud size={15} />}
              label="DevOps & Developer Tools"
              color="#2496ed"
              gradientClass="from-[#2496ed] to-[#f05032]"
            />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {devopsSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <SectionLabel
              icon={<Wrench size={15} />}
              label="Tools"
              color="#007acc"
              gradientClass="from-[#007acc] to-[#f24e1e]"
            />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {toolsSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;

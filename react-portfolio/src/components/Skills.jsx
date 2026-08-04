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

// ─── Proficient Languages ────────────────────────
const proficientLanguages = [
  { name: 'JavaScript', icon: <FaJsSquare />, color: '#f7df1e', mastery: 4 },
  { name: 'Python', icon: <FaPython />, color: '#3776AB', mastery: 3 },
  { name: 'Java', icon: <FaJava />, color: '#ec2025', mastery: 3 },
];

// ─── Familiar Languages ──────────────────────────
const familiarLanguages = [
  { name: 'C++', icon: <SiCplusplus />, color: '#00599c', mastery: 2 },
  { name: 'C#', icon: <TbBrandCSharp />, color: '#68217a', mastery: 2 },
  { name: 'PHP', icon: <FaPhp />, color: '#777BB4', mastery: 2 },
  { name: 'C', icon: <TbLetterC />, color: '#A8B9CC', mastery: 2 },
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

const SkillCard = ({ skill, index }) => (
  <motion.div
    className="group relative bg-surface/40 border border-border/40 hover:border-border/80 px-4 py-2.5 rounded-xl flex flex-row items-center gap-3 cursor-default overflow-hidden transition-all duration-300"
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.04 }}
    whileHover={{ y: -3, scale: 1.02 }}
    style={{ '--icon-color': skill.color }}
  >
    {/* Hover subtle glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none"
      style={{ backgroundColor: skill.color }}
    ></div>

    {/* Border glow on hover */}
    <div
      className="absolute inset-0 border border-transparent rounded-xl transition-colors duration-300 pointer-events-none"
      style={{ boxShadow: `inset 0 0 0 1px transparent` }}
    ></div>

    {/* Icon */}
    <div className="text-xl md:text-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300 relative z-10" style={{ color: skill.color }}>
      {skill.icon}
    </div>

    {/* Name */}
    <span className="font-semibold text-[13px] md:text-sm text-muted group-hover:text-text transition-colors relative z-10 whitespace-nowrap">
      {skill.name}
    </span>
  </motion.div>
);

const SectionLabel = ({ icon, label, color }) => (
  <Reveal direction="left" delay={0.1}>
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2 rounded-lg bg-bg/50 border border-border/50 text-text" style={{ color: color, boxShadow: `0 0 10px ${color}20` }}>
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold font-display text-text/90 tracking-wide">{label}</h3>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* Proficient Languages */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/30 bg-surface/20 flex flex-col h-full hover:border-border/60 transition-colors">
            <SectionLabel icon={<Code2 size={18} />} label="Proficient Languages" color="#f7df1e" />
            <div className="flex flex-wrap gap-3">
              {proficientLanguages.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Frontend Development */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/30 bg-surface/20 flex flex-col h-full hover:border-border/60 transition-colors">
            <SectionLabel icon={<Code2 size={18} />} label="Frontend Development" color="var(--theme-accent-3)" />
            <div className="flex flex-wrap gap-3">
              {frontendSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Backend & APIs */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/30 bg-surface/20 flex flex-col h-full hover:border-border/60 transition-colors">
            <SectionLabel icon={<Server size={18} />} label="Backend & APIs" color="#68a063" />
            <div className="flex flex-wrap gap-3">
              {backendSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Cloud & Databases */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/30 bg-surface/20 flex flex-col h-full hover:border-border/60 transition-colors">
            <SectionLabel icon={<Database size={18} />} label="Cloud & Databases" color="#336791" />
            <div className="flex flex-wrap gap-3">
              {databaseSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* DevOps & Developer Tools */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/30 bg-surface/20 flex flex-col h-full hover:border-border/60 transition-colors">
            <SectionLabel icon={<Cloud size={18} />} label="DevOps & Developer Tools" color="#2496ed" />
            <div className="flex flex-wrap gap-3">
              {devopsSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Familiar With & Tools */}
          <div className="flex flex-col gap-6 lg:gap-8 h-full">
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/30 bg-surface/20 flex-1 hover:border-border/60 transition-colors flex flex-col justify-center">
              <SectionLabel icon={<Code2 size={18} />} label="Familiar With" color="#A8B9CC" />
              <div className="flex flex-wrap gap-3">
                {familiarLanguages.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/30 bg-surface/20 flex-1 hover:border-border/60 transition-colors flex flex-col justify-center">
              <SectionLabel icon={<Wrench size={18} />} label="Tools" color="#007acc" />
              <div className="flex flex-wrap gap-3">
                {toolsSkills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;

import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Plus } from 'lucide-react';
import Reveal from './Reveal';

/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  HOW TO ADD YOUR CERTIFICATIONS:
 *  Replace the placeholder entries below
 *  with your real certifications. Each entry
 *  should have: title, issuer, date, link,
 *  color, and icon (emoji or component).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const certifications = [
  {
    title: 'AI Chatbot Development (OpenAI API Integration Focus)',
    issuer: 'Simplilearn',
    date: '2026',
    link: '#',
    color: '#10a37f',
    icon: '🤖',
    upcoming: false,
  },
  {
    title: 'Python for Beginners',
    issuer: 'Simplilearn',
    date: '2025',
    link: '#',
    color: '#3776AB',
    icon: '🐍',
    upcoming: false,
  },
  {
    title: 'IT Essentials',
    issuer: 'Cisco Networking Academy',
    date: '2025',
    link: '#',
    color: '#1BA0D7',
    icon: '🌐',
    upcoming: false,
  },
];

const CertCard = ({ cert, index }) => (
  <motion.div
    className={`group relative glass-card p-5 flex flex-col gap-3 overflow-hidden cursor-default transition-all duration-300 ${cert.upcoming ? 'opacity-60' : ''}`}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    whileInView={{ opacity: cert.upcoming ? 0.6 : 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.23, 1, 0.32, 1],
    }}
    whileHover={{ y: -4, opacity: 1, transition: { duration: 0.3 } }}
    style={{ '--cert-color': cert.color }}
  >
    {/* Hover glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
      style={{ backgroundColor: cert.color }}
    ></div>

    {/* Top row: Icon + Badge */}
    <div className="flex items-center justify-between">
      <span className="text-2xl">{cert.icon}</span>
      {cert.upcoming ? (
        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-border text-muted bg-surface/50">
          <Plus size={10} /> Coming Soon
        </span>
      ) : (
        cert.link && cert.link !== '#' && (
          <a
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg hover:bg-surface/80 transition-colors text-muted hover:text-text"
            title="View credential"
          >
            <ExternalLink size={14} />
          </a>
        )
      )}
    </div>

    {/* Title */}
    <h4 className="font-bold text-sm text-text leading-snug group-hover:text-accent-1 transition-colors">
      {cert.title}
    </h4>

    {/* Issuer + Date */}
    <div className="mt-auto flex items-center justify-between text-[11px] text-muted">
      <span className="font-semibold" style={{ color: cert.color }}>{cert.issuer}</span>
      <span className="flex items-center gap-1">
        <Calendar size={10} />
        {cert.date}
      </span>
    </div>

    {/* Bottom accent bar */}
    <div
      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ backgroundColor: cert.color }}
    ></div>
  </motion.div>
);

const Certifications = () => {
  return (
    <section id="certifications" className="pt-24 pb-12 sm:pb-16 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent-2/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-1/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <div className="mb-8 sm:mb-12 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display">
              Certifications & <span className="gradient-text">Achievements</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-3 w-20 h-1 rounded-full bg-gradient-to-r from-accent-2 to-accent-3 mx-auto"></div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-3 text-muted max-w-lg mx-auto text-[13px] md:text-sm">
              Professional certifications that validate my expertise. ✦
            </p>
          </Reveal>
        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <CertCard key={cert.title + cert.issuer} cert={cert} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;

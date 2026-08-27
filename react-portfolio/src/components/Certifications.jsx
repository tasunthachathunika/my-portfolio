import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, Plus, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import Reveal from './Reveal';
import redisCertImg from '../assets/redis-cert.png';
import pythonCertImg from '../assets/python-cert.png';
import itEssentialsCertImg from '../assets/it-essentials-cert.png';

/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  HOW TO ADD YOUR CERTIFICATIONS:
 *  Replace the placeholder entries below
 *  with your real certifications. Each entry
 *  should have: title, issuer, date, link,
 *  color, icon (emoji or component),
 *  and optionally: image (imported asset).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const certifications = [
  {
    title: 'Redis Associate Cloud Operator',
    issuer: 'Redis',
    date: 'Aug 2026',
    link: 'https://credentials.redis.io/3c267020-c5a6-417d-aee4-29cc55e79324#acc.1e0mE8BL',
    color: '#FF4438',
    icon: '🔴',
    image: redisCertImg,
    upcoming: false,
  },
  {
    title: 'Python for Beginners',
    issuer: 'Simplilearn',
    date: '2025',
    link: '#',
    color: '#3776AB',
    icon: '🐍',
    image: pythonCertImg,
    upcoming: false,
  },
  {
    title: 'IT Essentials',
    issuer: 'Cisco Networking Academy',
    date: '2025',
    link: '#',
    color: '#1BA0D7',
    icon: '🌐',
    image: itEssentialsCertImg,
    upcoming: false,
  },
];

/* ── Lightbox ── */
const Lightbox = ({ src, onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.img
      src={src}
      alt="Certificate"
      className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      onClick={(e) => e.stopPropagation()}
    />
  </motion.div>
);

/* ── Featured card (with image) ── */
const FeaturedCertCard = ({ cert, index }) => {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.div
        className={`group relative overflow-hidden flex flex-col cursor-default rounded-2xl transition-all duration-300 ${cert.upcoming ? 'opacity-60' : ''}`}
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        whileInView={{ opacity: cert.upcoming ? 0.6 : 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
        style={{
          background: `linear-gradient(160deg, ${cert.color}22 0%, ${cert.color}08 50%, rgba(255,255,255,0.02) 100%)`,
          border: `1.5px solid ${cert.color}40`,
          boxShadow: `0 4px 24px ${cert.color}15, inset 0 1px 0 ${cert.color}20`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 8px 40px ${cert.color}40, 0 0 0 1.5px ${cert.color}70, inset 0 1px 0 ${cert.color}30`;
          e.currentTarget.style.borderColor = `${cert.color}80`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = `0 4px 24px ${cert.color}15, inset 0 1px 0 ${cert.color}20`;
          e.currentTarget.style.borderColor = `${cert.color}40`;
        }}
      >
        {/* Thick colored top bar */}
        <div
          className="w-full h-[5px] shrink-0"
          style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}99, ${cert.color}44)` }}
        />

        {/* Decorative corner glow */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20"
          style={{ background: `radial-gradient(circle, ${cert.color} 0%, transparent 70%)`, transform: 'translate(40%, -40%)' }}
        />

        {/* Certificate image */}
        <div className="relative overflow-hidden" style={{ paddingBottom: '58%' }}>
          <img
            src={cert.image}
            alt={cert.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Strong colored overlay at bottom */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${cert.color}88 0%, ${cert.color}22 40%, transparent 70%)` }}
          />
          {/* Vignette top */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%)' }} />

          {/* Zoom button */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-2.5 right-2.5 p-2 rounded-xl text-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-20 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}cc)` }}
            title="View certificate"
          >
            <ZoomIn size={13} />
          </button>

          {/* Issuer badge — vivid */}
          <div
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`,
              boxShadow: `0 4px 16px ${cert.color}66`,
            }}
          >
            <span>{cert.icon}</span>
            {cert.issuer}
          </div>
        </div>

        {/* Card body */}
        <div
          className="p-4 flex flex-col gap-3 flex-1 relative"
          style={{ background: `linear-gradient(180deg, ${cert.color}12 0%, transparent 80%)` }}
        >
          {/* Decorative bottom-left blob */}
          <div
            className="absolute bottom-0 left-0 w-24 h-16 pointer-events-none opacity-15 rounded-tr-full"
            style={{ background: `radial-gradient(ellipse, ${cert.color} 0%, transparent 70%)` }}
          />

          {/* Title + link */}
          <div className="flex items-start justify-between gap-2">
            <h4
              className="font-extrabold text-sm leading-snug flex-1"
              style={{ color: cert.color }}
            >
              {cert.title}
            </h4>
            {cert.link && cert.link !== '#' && (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 p-2 rounded-xl transition-all duration-200 text-white shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}33, ${cert.color}11)`,
                  border: `1px solid ${cert.color}40`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${cert.color}, ${cert.color}cc)`;
                  e.currentTarget.style.boxShadow = `0 4px 12px ${cert.color}55`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${cert.color}33, ${cert.color}11)`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
                title="View credential"
              >
                <ExternalLink size={13} style={{ color: cert.color }} />
              </a>
            )}
          </div>

          {/* Date pill */}
          <div className="mt-auto">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold"
              style={{
                background: `linear-gradient(135deg, ${cert.color}25, ${cert.color}10)`,
                color: cert.color,
                border: `1px solid ${cert.color}30`,
              }}
            >
              <Calendar size={9} />
              {cert.date}
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && <Lightbox src={cert.image} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  );
};

/* ── Standard card (no image) ── */
const CertCard = ({ cert, index }) => (
  <motion.div
    className={`group relative glass-card p-5 flex flex-col gap-3 overflow-hidden cursor-default transition-all duration-300 ${cert.upcoming ? 'opacity-60' : ''}`}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    whileInView={{ opacity: cert.upcoming ? 0.6 : 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -4, opacity: 1, transition: { duration: 0.3 } }}
    style={{ '--cert-color': cert.color }}
  >
    {/* Hover glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
      style={{ backgroundColor: cert.color }}
    />

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
    />
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


        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) =>
            cert.image ? (
              <FeaturedCertCard key={cert.title + cert.issuer} cert={cert} index={index} />
            ) : (
              <CertCard key={cert.title + cert.issuer} cert={cert} index={index} />
            )
          )}
        </div>

      </div>
    </section>
  );
};

export default Certifications;

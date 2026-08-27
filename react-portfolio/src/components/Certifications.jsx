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
        className={`group relative overflow-hidden flex flex-col cursor-default rounded-2xl border transition-all duration-300 ${cert.upcoming ? 'opacity-60' : ''}`}
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        whileInView={{ opacity: cert.upcoming ? 0.6 : 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        style={{
          background: `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
          borderColor: `${cert.color}30`,
          boxShadow: `0 0 0 1px ${cert.color}20`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 0 0 1.5px ${cert.color}60, 0 8px 32px ${cert.color}25`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = `0 0 0 1px ${cert.color}20`;
        }}
      >
        {/* Colored top accent bar */}
        <div
          className="w-full h-1 shrink-0"
          style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)` }}
        />

        {/* Certificate image */}
        <div className="relative overflow-hidden" style={{ paddingBottom: '60%' }}>
          <img
            src={cert.image}
            alt={cert.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
          />
          {/* Bottom gradient for readability */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${cert.color}55 0%, transparent 55%)` }}
          />

          {/* Zoom button */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-xl text-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
            style={{ backgroundColor: `${cert.color}cc`, backdropFilter: 'blur(4px)' }}
            title="View certificate"
          >
            <ZoomIn size={13} />
          </button>

          {/* Issuer badge */}
          <div
            className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}cc)` }}
          >
            <span>{cert.icon}</span>
            {cert.issuer}
          </div>
        </div>

        {/* Card body */}
        <div
          className="p-4 flex flex-col gap-3 flex-1"
          style={{ background: `linear-gradient(180deg, ${cert.color}08 0%, transparent 100%)` }}
        >
          {/* Title + link */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-sm leading-snug flex-1 transition-colors duration-200"
              style={{ color: 'var(--color-text)' }}
              onMouseEnter={e => e.currentTarget.style.color = cert.color}
              onMouseLeave={e => e.currentTarget.style.color = ''}
            >
              {cert.title}
            </h4>
            {cert.link && cert.link !== '#' && (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 p-1.5 rounded-lg transition-all duration-200 text-white"
                style={{ backgroundColor: `${cert.color}22` }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = `${cert.color}55`}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = `${cert.color}22`}
                title="View credential"
              >
                <ExternalLink size={13} style={{ color: cert.color }} />
              </a>
            )}
          </div>

          {/* Date pill */}
          <div className="mt-auto">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: `${cert.color}18`, color: cert.color }}
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
          <Reveal delay={0.2}>
            <p className="mt-3 text-muted max-w-lg mx-auto text-[13px] md:text-sm">
              Professional certifications that validate my expertise. ✦
            </p>
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

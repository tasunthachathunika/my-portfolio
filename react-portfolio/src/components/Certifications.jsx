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
        className={`group relative glass-card overflow-hidden flex flex-col cursor-default transition-all duration-300 ${cert.upcoming ? 'opacity-60' : ''}`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: cert.upcoming ? 0.6 : 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -4, opacity: 1, transition: { duration: 0.3 } }}
        style={{ '--cert-color': cert.color }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl pointer-events-none z-10"
          style={{ backgroundColor: cert.color }}
        />

        {/* Certificate image thumbnail */}
        <div className="relative overflow-hidden" style={{ paddingBottom: '62%' }}>
          <img
            src={cert.image}
            alt={cert.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Zoom button */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
            title="View certificate"
          >
            <ZoomIn size={14} />
          </button>

          {/* Issuer badge on image */}
          <div
            className="absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: cert.color, color: '#fff' }}
          >
            {cert.issuer}
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-sm text-text leading-snug group-hover:text-accent-1 transition-colors flex-1">
              {cert.title}
            </h4>
            {cert.link && cert.link !== '#' && (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-surface/80 transition-colors text-muted hover:text-text shrink-0"
                title="View credential"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <div className="mt-auto flex items-center gap-1 text-[11px] text-muted">
            <Calendar size={10} />
            {cert.date}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: cert.color }}
        />
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

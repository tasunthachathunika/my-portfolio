import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import Reveal from './Reveal';

const educationData = [
  {
    degree: "Bachelor of Information and Communication Technology (Hons)",
    institution: "University of Vavuniya, Faculty of Technological Studies",
    location: "Vavuniya, Sri Lanka",
    period: "06/2023 – Present",
    description: "GPA: 3.00 / 4.00 — Relevant Coursework: Data Structures & Algorithms, Software Engineering, Database Systems, Computer Networks, Cloud Computing. Building full-stack web applications and exploring DevOps practices.",
    color: 'from-accent-3 to-accent-1',
    accentColor: 'var(--theme-accent-3)',
    badge: 'Undergraduate',
  },
];

const Education = () => {
  const timelineRef = useRef(null);

  // Timeline draw animation driven by scroll
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.6]);

  return (
    <section id="education" className="py-28 md:py-36 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent-1/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-1/8 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="section-container relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display">
              My <span className="gradient-text">Education</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-accent-3 to-accent-1 mx-auto"></div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              Building a strong foundation in technology and computer science.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-3xl mx-auto relative">
          {/* Animated vertical line that draws on scroll */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border/20 pointer-events-none">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-3/60 via-accent-1/40 to-accent-2/60"
              style={{
                height: lineHeight,
                opacity: lineOpacity,
              }}
            />
          </div>

          <div className="flex flex-col gap-10">
            {educationData.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex gap-6 md:gap-8"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {/* Timeline dot with icon */}
                <div className="flex-shrink-0 relative z-10">
                  <motion.div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                    style={{ boxShadow: `0 0 24px ${item.accentColor}40` }}
                    whileInView={{ scale: [0.5, 1.15, 1], rotate: [0, -5, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <GraduationCap size={22} className="text-white" />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  className="flex-1 group glass-card p-6 md:p-8 overflow-hidden relative hover:-translate-y-2 transition-all duration-300"
                  style={{ '--accent': item.accentColor }}
                  whileHover={{
                    boxShadow: `0 20px 40px ${item.accentColor}20`,
                  }}
                >
                  {/* Hover effect container */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-accent/60 transition-colors duration-300 rounded-2xl pointer-events-none z-20" style={{ borderColor: 'var(--accent)' }}></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" style={{ boxShadow: `0 20px 40px ${item.accentColor}30, inset 0 0 0 1px ${item.accentColor}30` }}></div>

                  {/* Colorful top border */}
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${item.color}`}></div>

                  {/* Subtle bg glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at top left, ${item.accentColor}, transparent 60%)` }}
                  ></div>

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 relative z-30">
                    <h3 className="text-lg md:text-xl font-bold text-text leading-snug pr-2">{item.degree}</h3>
                    {/* Shimmer badge */}
                    <span
                      className={`self-start sm:self-auto flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full text-white bg-gradient-to-r ${item.color}`}
                      style={{
                        backgroundSize: '200% auto',
                        animation: 'badge-shine 3s linear infinite',
                        boxShadow: `0 0 10px ${item.accentColor}40`,
                      }}
                    >
                      <Calendar size={11} />
                      {item.period}
                    </span>
                  </div>

                  {/* Institution + location */}
                  <div className="flex items-center gap-2 mb-4 relative z-30">
                    <MapPin size={13} style={{ color: item.accentColor }} />
                    <span className="text-sm font-semibold" style={{ color: item.accentColor }}>{item.institution}</span>
                    <span className="text-muted text-sm">— {item.location}</span>
                  </div>

                  <p className="text-muted leading-relaxed text-sm md:text-base relative z-30">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

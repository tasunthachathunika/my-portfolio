import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Reveal from './Reveal';

const socialLinks = [
  { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/tasuntha-chathunika/', color: '#0077b5', label: 'LinkedIn' },
  { icon: <FaGithub size={20} />, href: 'https://github.com/Tasuntha-Chathunika', color: 'var(--theme-text)', label: 'GitHub' },
  { icon: <Mail size={20} />, href: 'mailto:tasunthachathunika@gmail.com', color: 'var(--theme-accent-2)', label: 'Email' },
];

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'tasunthachathunika@gmail.com',
    href: 'mailto:tasunthachathunika@gmail.com',
    color: 'var(--theme-accent-2)',
  },
];

const Toast = ({ type, message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl glass-card border
      ${type === 'success' ? 'border-green-500/30' : 'border-red-500/30'}`}
  >
    {type === 'success'
      ? <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
      : <XCircle size={20} className="text-red-500 flex-shrink-0" />
    }
    <span className="text-sm font-medium text-text">{message}</span>
    <button onClick={onClose} className="ml-2 text-muted hover:text-text text-lg leading-none">&times;</button>
  </motion.div>
);

const formFieldVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay: 0.2 + i * 0.1,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formState.email)) {
      showToast('error', 'Please enter a valid email address.');
      return;
    }

    // Validation removed to make it easier to test

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'f8c4443b-7e9b-4ca4-a9a1-e9881e3389c2',
          subject: `New Message from Portfolio: ${formState.name}`,
          from_name: 'Tasuntha Portfolio',
          replyto: formState.email,
          ...formState
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        showToast('success', 'Message sent! I\'ll get back to you soon. 🎉');
        setTimeout(() => setStatus('idle'), 3000); // Reset button after 3s
      } else {
        console.error("Web3Forms API Error:", data);
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setStatus('error');
      showToast('error', error.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-3/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-2/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      <div className="section-container relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display">
              Get In <span className="gradient-text">Touch</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-accent-2 to-accent-3 mx-auto"></div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted max-w-lg mx-auto text-sm md:text-base">
              Have a project or just want to say hi? My inbox is always open.
            </p>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left - Info */}
              <motion.div
                className="flex-1 p-8 md:p-12 bg-card/30 border-b md:border-b-0 md:border-r border-border relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent-1/10 rounded-full blur-[80px] pointer-events-none"></div>

                <h3 className="text-2xl md:text-3xl font-bold mb-3 relative z-10 text-text">
                  Let's build something <span className="gradient-text">together.</span>
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed mb-8 relative z-10">
                  Have a project, an idea, or just want to chat? Fill out the form or connect through my channels.
                </p>

                {/* Direct contact info cards */}
                <div className="flex flex-col gap-3 mb-8 relative z-10">
                  {contactInfo.map((info, i) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      className="group flex items-center gap-3 p-3.5 rounded-xl glass-card transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: -4, boxShadow: `0 4px 20px ${info.color}15` }}
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden"
                        style={{ color: info.color }}
                      >
                         <span className="absolute inset-0 opacity-20" style={{ backgroundColor: info.color }}></span>
                        {info.icon}
                      </span>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted">{info.label}</div>
                        <div className="text-sm font-medium text-text group-hover:text-accent-3 transition-colors">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social links with hover labels */}
                <div className="relative z-10">
                  <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-3">Connect</p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="social-link-enhanced group relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl glass-card text-muted
                          text-sm font-medium overflow-hidden hover:border-border"
                        style={{ '--social-color': social.color }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.06 }}
                        whileHover={{ y: -3 }}
                      >
                         <span className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: social.color }}></span>
                         <span className="relative z-10" style={{ color: social.color }}>{social.icon}</span>
                        <span className="text-xs group-hover:text-text transition-colors relative z-10">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right - Form */}
              <div className="flex-[1.3] p-8 md:p-12 relative">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {/* Name Field */}
                  <motion.div
                    className="group flex flex-col gap-1.5"
                    custom={0}
                    variants={formFieldVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-accent-2 transition-colors">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text" id="name" name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-bg/40 backdrop-blur-md border border-border rounded-xl px-4 py-3.5 text-text
                          focus:outline-none focus:border-accent-2 focus:ring-4 focus:ring-accent-1/20 transition-all duration-300 placeholder-muted/40"
                        placeholder="John Doe"
                        required
                      />
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-accent-2 to-accent-1 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="group flex flex-col gap-1.5"
                    custom={1}
                    variants={formFieldVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-accent-2 transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email" id="email" name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-bg/40 backdrop-blur-md border border-border rounded-xl px-4 py-3.5 text-text
                          focus:outline-none focus:border-accent-2 focus:ring-4 focus:ring-accent-1/20 transition-all duration-300 placeholder-muted/40"
                        placeholder="you@example.com"
                        required
                      />
                      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-accent-2 to-accent-1 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    className="group flex flex-col gap-1.5"
                    custom={2}
                    variants={formFieldVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-accent-2 transition-colors">
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message" name="message" rows="4"
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full bg-bg/40 backdrop-blur-md border border-border rounded-xl px-4 py-3.5 text-text
                          focus:outline-none focus:border-accent-2 focus:ring-4 focus:ring-accent-1/20 transition-all duration-300 resize-none placeholder-muted/40"
                        placeholder="Tell me about your project..."
                        required
                      ></textarea>
                      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-accent-2 to-accent-1 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="mt-2 group relative w-full h-14 flex items-center justify-center rounded-xl
                      font-bold text-lg text-white overflow-hidden
                      bg-gradient-to-r from-accent-1 to-accent-2
                      hover:shadow-lg hover:shadow-accent-2/30 transition-all duration-300 animated-gradient-bg
                      disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    custom={3}
                    variants={formFieldVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Shine sweep on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></span>

                    <AnimatePresence mode="wait">
                      {status === 'sending' ? (
                        <motion.div
                          key="sending"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="flex items-center gap-2 absolute"
                        >
                          <Loader2 size={20} className="animate-spin" /> Sending...
                        </motion.div>
                      ) : status === 'success' ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2 absolute"
                        >
                          <CheckCircle size={22} className="text-white drop-shadow-md" /> Sent Successfully!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="flex items-center gap-2 absolute"
                        >
                          <Send size={20} /> Send Message
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

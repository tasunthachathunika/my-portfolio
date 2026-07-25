import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink, Clock, Calendar, ArrowRight, RefreshCw } from 'lucide-react';
import { FaMedium } from 'react-icons/fa';
import Reveal from './Reveal';

const MEDIUM_USERNAME = 'tasunthachathunika';
const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

// Extract first image from HTML content
const extractImage = (html) => {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
};

// Strip HTML tags for preview text
const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

// Estimate read time
const getReadTime = (html) => {
  const text = stripHtml(html);
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Skeleton loader
const SkeletonCard = ({ index }) => (
  <motion.div
    className="glass-card overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <div className="h-48 bg-surface animate-pulse"></div>
    <div className="p-6 space-y-3">
      <div className="h-4 bg-surface rounded-full w-1/3 animate-pulse"></div>
      <div className="h-6 bg-surface rounded-full w-full animate-pulse"></div>
      <div className="h-6 bg-surface rounded-full w-3/4 animate-pulse"></div>
      <div className="h-4 bg-surface rounded-full w-full animate-pulse"></div>
      <div className="h-4 bg-surface rounded-full w-2/3 animate-pulse"></div>
    </div>
  </motion.div>
);

const BlogCard = ({ post, index }) => {
  const thumbnail = post.thumbnail || extractImage(post.description || post.content);
  const preview = stripHtml(post.description || post.content).slice(0, 140) + '...';
  const readTime = getReadTime(post.content || post.description);
  const categories = (post.categories || []).slice(0, 3);

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      className="group block glass-card overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.17, 0.55, 0.55, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-surface">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-1/20 to-accent-3/20">
            <BookOpen size={40} className="text-muted opacity-40" />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-3">
            Read Article <ExternalLink size={14} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col gap-3">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(post.pubDate)}
          </span>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold font-display text-lg leading-snug text-text group-hover:text-accent-1 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Preview */}
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {preview}
        </p>

        {/* Categories / Tags */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border border-border text-muted bg-surface/50"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(RSS_URL);
      const data = await response.json();
      if (data.status === 'ok' && data.items) {
        setPosts(data.items.slice(0, 6)); // Show up to 6 posts
      } else {
        setError('Could not load blog posts.');
      }
    } catch {
      setError('Failed to fetch blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="pt-20 pb-12 md:pt-28 md:pb-16 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-1/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-3/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display">
              Latest <span className="gradient-text">Blog Posts</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-accent-1 to-accent-3 mx-auto"></div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted max-w-lg mx-auto text-sm md:text-base">
              Thoughts, tutorials, and insights on software engineering, cloud, and green tech. ✦
            </p>
          </Reveal>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <SkeletonCard key={i} index={i} />
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className="flex flex-col items-center gap-4 py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-muted text-center">{error}</p>
              <motion.button
                onClick={fetchPosts}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm glass-card neon-border text-text hover:text-accent-1 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw size={14} /> Retry
              </motion.button>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center gap-4 py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <BookOpen size={40} className="text-muted opacity-40" />
              <p className="text-muted text-center">No blog posts yet. Stay tuned!</p>
            </motion.div>
          ) : (
            <motion.div
              key="posts"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {posts.map((post, i) => (
                <BlogCard key={post.guid || post.link} post={post} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All on Medium CTA */}
        {!loading && !error && posts.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mt-12 flex justify-center">
              <motion.a
                href={`https://medium.com/@${MEDIUM_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-text
                  glass-card neon-border hover:border-accent-1/50 hover:shadow-lg hover:shadow-accent-1/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaMedium size={18} />
                View All on Medium
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Blog;

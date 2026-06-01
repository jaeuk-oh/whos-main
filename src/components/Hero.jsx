import { useState, useEffect, useRef } from 'react';
import { profile, contact } from '../data/portfolio';
import './Hero.css';

function isSafeUrl(url) {
  if (!url) return false;
  try {
    const { protocol } = new URL(url);
    return protocol === 'https:' || protocol === 'http:' || protocol === 'mailto:';
  } catch {
    return false;
  }
}

const STATS = [
  { value: '6',      label: 'Agents Shipped' },
  { value: '3',      label: 'Domains' },
  { value: 'Claude', label: 'Primary LLM' },
];

function Hero() {
  const [typed, setTyped] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let acc = '';
    const type = () => {
      if (cancelled) return;
      if (i >= profile.tagline.length) { setTypingDone(true); return; }
      acc += profile.tagline.charAt(i);
      setTyped(acc);
      i++;
      setTimeout(type, 80);
    };
    type();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__cursor-glow" aria-hidden="true" />

      <div className="hero__inner">

        {/* Available badge */}
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          Available for opportunities
        </div>

        {/* Value prop headline — leads with what you GET */}
        <div className="hero__headline">
          <h1 className="hero__h1">
            <span className="hero__h1-line">From Idea</span>
            <span className="hero__h1-line hero__h1-line--accent">to Deployed Agent.</span>
          </h1>
        </div>

        {/* Identity — secondary */}
        <div className="hero__identity">
          <span className="hero__name">{profile.name}</span>
          <span className="hero__sep" aria-hidden="true">·</span>
          <div className="hero__chip">
            <span className="hero__chip-text">{profile.title}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="hero__bio">{profile.bio}</p>

        {/* Typing tagline */}
        <p className="hero__tagline" aria-live="polite">
          {typed}
          {!typingDone && <span className="hero__cursor" aria-hidden="true">|</span>}
        </p>

        {/* Stats */}
        <div className="hero__stats" aria-label="Quick stats">
          {STATS.map(({ value, label }) => (
            <div key={label} className="hero__stat">
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero__ctas">
          <button className="hero__cta hero__cta--primary" onClick={scrollToProjects}>
            View Projects ↓
          </button>
          <a href={contact.kakao} className="hero__cta hero__cta--secondary"
             target="_blank" rel="noopener noreferrer">
            Let&apos;s Talk →
          </a>
          {isSafeUrl(contact.github) && (
            <a href={contact.github} className="hero__link"
               target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
          )}
        </div>

      </div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default Hero;

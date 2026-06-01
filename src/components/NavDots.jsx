import { useEffect, useRef, useState } from 'react';
import './NavDots.css';

const SECTIONS = [
  { id: 'hero',     label: 'Hero' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills' },
  { id: 'contact',  label: 'Contact' },
];

function NavDots() {
  const [active, setActive] = useState(0);
  const observersRef = useRef([]);

  useEffect(() => {
    const observers = [];

    SECTIONS.forEach(({ id }, idx) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(idx);
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    observersRef.current = observers;

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {SECTIONS.map(({ id, label }, idx) => (
        <button
          key={id}
          className="nav-dots__dot"
          aria-label={`Jump to ${label}`}
          aria-pressed={active === idx}
          onClick={() => scrollTo(id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollTo(id);
            }
          }}
        />
      ))}
    </nav>
  );
}

export default NavDots;

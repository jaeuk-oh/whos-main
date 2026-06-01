import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, isInView] — true once element enters the viewport.
 * Calls observer.disconnect() on cleanup to prevent leaks.
 * Options are captured once on mount (stable reference expected).
 *
 * @param {IntersectionObserverInit} [options]
 * @returns {[React.RefObject, boolean]}
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  // Capture options on mount — callers should pass a stable object or literal
  const optionsRef = useRef(options);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // fire once, then clean up
      }
    }, {
      threshold: 0.1,
      ...optionsRef.current,
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []); // intentionally run once on mount

  return [ref, isInView];
}

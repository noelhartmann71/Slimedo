import { useEffect, useRef, type RefObject } from 'react';

/**
 * Adds 'played' class to the element when it enters the viewport.
 * Used together with .slimedo-anim / .slimedo-anim.played CSS classes.
 */
export function useInView(threshold = 0.07) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible on mount?
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('played');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('played');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Observes multiple child elements by data-anim attribute.
 * Call once on a container; children with class 'slimedo-anim' are observed individually.
 */
export function useChildInView(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll<HTMLElement>('.slimedo-anim');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('played');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -20px 0px' }
    );

    children.forEach((child) => {
      const rect = child.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        child.classList.add('played');
      } else {
        observer.observe(child);
      }
    });

    return () => observer.disconnect();
  });
}

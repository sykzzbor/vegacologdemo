import { useEffect, useRef } from "react";

// Agrega la clase "is-visible" cuando el elemento entra al viewport.
// Uso: const ref = useReveal(); <section ref={ref} className="reveal">…
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

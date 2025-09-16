import { useState, useEffect, useCallback } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useInView = <T extends Element>(options?: IntersectionObserverOptions): [React.RefCallback<T>, boolean] => {
  const [isIntersecting, setIntersecting] = useState(false);
  const [node, setNode] = useState<T | null>(null);

  const ref = useCallback((n: T | null) => {
    setNode(n);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(node);
        }
      },
      {
        rootMargin: "200px",
        ...options,
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [node, options]);

  return [ref, isIntersecting];
};

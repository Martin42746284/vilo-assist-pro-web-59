
import { useEffect, useState } from 'react';

export const useScrollAnimation = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    return observer;
  }, [threshold]);

  return { isVisible, setIsVisible };
};

export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const triggerStaggered = () => {
    for (let i = 0; i < itemCount; i++) {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * delay);
    }
  };

  return { visibleItems, triggerStaggered };
};

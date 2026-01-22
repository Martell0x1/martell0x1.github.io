import { ReactNode, forwardRef, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "slide-up" | "slide-down";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  parallax?: boolean;
  parallaxSpeed?: number;
}

const animationStyles: Record<AnimationType, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    hidden: "opacity-0 -translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 -translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    hidden: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
  "zoom-out": {
    hidden: "opacity-0 scale-110",
    visible: "opacity-100 scale-100",
  },
  "slide-up": {
    hidden: "opacity-0 translate-y-20",
    visible: "opacity-100 translate-y-0",
  },
  "slide-down": {
    hidden: "opacity-0 -translate-y-20",
    visible: "opacity-100 translate-y-0",
  },
};

const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, animation = "fade-up", delay = 0, duration = 700, className, threshold = 0.1, parallax = false, parallaxSpeed = 0.5 }, _ref) => {
    const { ref, isVisible } = useScrollAnimation({ threshold });
    const [parallaxOffset, setParallaxOffset] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!parallax) return;

      const handleScroll = () => {
        if (!elementRef.current) return;
        const rect = elementRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (scrollProgress - 0.5) * 100 * parallaxSpeed;
        setParallaxOffset(offset);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }, [parallax, parallaxSpeed]);

    const styles = animationStyles[animation];

    return (
      <div
        ref={(node) => {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          (elementRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "transition-all will-change-transform",
          isVisible ? styles.visible : styles.hidden,
          className
        )}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          ...(parallax && isVisible ? { transform: `translateY(${parallaxOffset}px)` } : {}),
        }}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;

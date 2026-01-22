import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animationStyles: Record<AnimationType, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    hidden: "opacity-0 -translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  "zoom-out": {
    hidden: "opacity-0 scale-105",
    visible: "opacity-100 scale-100",
  },
};

const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, animation = "fade-up", delay = 0, duration = 600, className, threshold = 0.1 }, _ref) => {
    const { ref, isVisible } = useScrollAnimation({ threshold });

    const styles = animationStyles[animation];

    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          "transition-all",
          isVisible ? styles.visible : styles.hidden,
          className
        )}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;

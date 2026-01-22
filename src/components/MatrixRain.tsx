import { useEffect, useRef } from "react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters - mix of katakana, numbers, and symbols
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]()=+-*&^%$#@!";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(10, 14, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Red/pink color for NestJS theme
      ctx.fillStyle = "hsl(346, 82%, 55%)";
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Vary the opacity for depth effect
        const opacity = Math.random() * 0.5 + 0.3;
        ctx.fillStyle = `hsla(346, 82%, 55%, ${opacity})`;
        ctx.fillText(char, x, y);

        // Brighter leading character
        if (Math.random() > 0.95) {
          ctx.fillStyle = "hsl(346, 82%, 75%)";
          ctx.fillText(char, x, y);
        }

        // Reset drop to top randomly after reaching bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

export default MatrixRain;

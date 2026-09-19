'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
  color: string;
}

export const HeadParticles: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // Palette with brand colors: Gold (#f8c51c), Teal (#39918d), Soft Slate (#3f6d67), Soft White (#ffffff)
    const colors = [
      'rgba(248, 197, 28, ',  // gold
      'rgba(57, 145, 141, ',  // teal
      'rgba(63, 109, 103, ',  // slate teal
      'rgba(255, 255, 255, ', // soft white
    ];

    const initParticles = () => {
      particles = [];
      // Keep density balanced: small particles with low opacity
      const count = Math.min(Math.floor((width * height) / 9000), 55);

      for (let i = 0; i < count; i++) {
        // Bias some particles towards the center where the "FOR YOU" badge and head are
        const isCentral = Math.random() < 0.6;
        const x = isCentral
          ? width * 0.5 + (Math.random() - 0.5) * (width * 0.6)
          : Math.random() * width;
        const y = isCentral
          ? height * 0.4 + (Math.random() - 0.5) * (height * 0.7)
          : Math.random() * height;

        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        // Low opacity: between 0.12 and 0.32 max
        const baseAlpha = 0.1 + Math.random() * 0.22;

        particles.push({
          x,
          y,
          radius: 0.8 + Math.random() * 1.6, // Small particles (0.8px - 2.4px)
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.015 + Math.random() * 0.03,
          twinkleOffset: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.35, // Slow horizontal drift
          vy: -0.15 - Math.random() * 0.3, // Gentle upward float
          color: colorBase,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(canvas);
    handleResize();

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle floating movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries smoothly
        if (p.y < -10) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Twinkle / gentle pulsation of opacity
        const oscillation = Math.sin(time * p.twinkleSpeed + p.twinkleOffset);
        p.alpha = Math.max(0.05, p.baseAlpha + oscillation * 0.1);

        // Draw particle dot with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Extra soft glow for a few slightly larger particles
        if (p.radius > 1.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.25})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

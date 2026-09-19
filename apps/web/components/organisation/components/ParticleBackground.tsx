'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  rgb: [number, number, number];
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // Mouse coordinates relative to hero container
    const mouse = {
      x: -9999,
      y: -9999,
      radius: 140,
    };

    // Brand color palette: Teal, Gold, Soft Aqua, and Luminous White
    const colors: Array<{ hex: string; rgb: [number, number, number] }> = [
      { hex: '#39918d', rgb: [57, 145, 141] },   // Teal
      { hex: '#f8c51c', rgb: [248, 197, 28] },   // Gold
      { hex: '#4ecdc4', rgb: [78, 205, 196] },   // Soft Aqua
      { hex: '#ffffff', rgb: [255, 255, 255] },  // Star White
      { hex: '#c57b4b', rgb: [197, 123, 75] },   // Warm accent
    ];

    const initParticles = (w: number, h: number) => {
      // Scale count gracefully with area (between 35 and 80)
      const count = Math.min(80, Math.max(35, Math.floor((w * h) / 18000)));
      particles = [];

      for (let i = 0; i < count; i++) {
        const colorObj = colors[Math.floor(Math.random() * colors.length)];
        const radius = Math.random() * 0.9 + 0.7; // 0.7px to 1.6px delicate particles
        const speedMultiplier = 0.35;

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speedMultiplier,
          vy: (Math.random() - 0.5) * speedMultiplier,
          radius,
          color: colorObj.hex,
          rgb: colorObj.rgb,
          baseAlpha: Math.random() * 0.22 + 0.16, // Softer baseline opacity (0.16 - 0.38)
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w === 0 || h === 0) continue;

        width = w;
        height = h;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        initParticles(w, h);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Initial sizing fallback
    const rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles(width, height);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      mouse.x = e.clientX - containerRect.left;
      mouse.y = e.clientY - containerRect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;
    const connectionDistance = 125;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const lineAlpha = (1 - dist / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(57, 145, 141, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connection to mouse cursor if within interactive range
        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDist < mouse.radius) {
            const mouseLineAlpha = (1 - mouseDist / mouse.radius) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(248, 197, 28, ${mouseLineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Update and draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Subtle gentle bounce at edges
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Pulsing luminance with reduced peak alpha
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        const currentAlpha = Math.max(0.08, Math.min(0.45, p.baseAlpha + pulse * 0.12));

        // Refined delicate halo glow
        const glowRadius = p.radius * 1.8;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        gradient.addColorStop(0, `rgba(${p.rgb[0]}, ${p.rgb[1]}, ${p.rgb[2]}, ${currentAlpha * 0.7})`);
        gradient.addColorStop(0.5, `rgba(${p.rgb[0]}, ${p.rgb[1]}, ${p.rgb[2]}, ${currentAlpha * 0.2})`);
        gradient.addColorStop(1, `rgba(${p.rgb[0]}, ${p.rgb[1]}, ${p.rgb[2]}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Particle core center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb[0]}, ${p.rgb[1]}, ${p.rgb[2]}, ${Math.min(0.65, currentAlpha + 0.1)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 opacity-80"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};

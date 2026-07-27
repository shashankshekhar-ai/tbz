"use client";

import { useEffect, useRef } from "react";

export function AiWaveCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = parent.clientWidth || window.innerWidth);
    let height = (canvas.height = parent.clientHeight || window.innerHeight);

    const numLines = 50;

    interface NodeDot {
      yRatio: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }

    interface VerticalLine {
      xRatio: number;
      dots: NodeDot[];
    }

    const verticalLines: VerticalLine[] = Array.from({ length: numLines }, (_, i) => {
      const xRatio = (i + 0.5) / numLines + (Math.random() * 0.01 - 0.005);
      const dots: NodeDot[] = Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () => ({
        yRatio: Math.random(),
        speed: (Math.random() * 0.001 + 0.0003) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.35 ? "#f8c51c" : "#39918d",
        alpha: Math.random() * 0.6 + 0.2,
      }));
      return { xRatio, dots };
    });

    const updateSize = () => {
      if (!canvas || !parent) return;
      width = canvas.width = parent.clientWidth || window.innerWidth;
      height = canvas.height = parent.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", updateSize);
    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(parent);

    let step = 0;

    const render = () => {
      step += 0.005;
      ctx.clearRect(0, 0, width, height);

      verticalLines.forEach((line) => {
        const x = line.xRatio * width;

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        line.dots.forEach((dot) => {
          dot.yRatio += dot.speed;
          if (dot.yRatio < 0) dot.yRatio = 1;
          if (dot.yRatio > 1) dot.yRatio = 0;

          const y = dot.yRatio * height;
          const currentAlpha = Math.min(0.85, Math.max(0.15, dot.alpha + Math.sin(step * 2 + y * 0.01) * 0.2));

          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = dot.color;
          ctx.shadowColor = dot.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(x, y, dot.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      });

      ctx.beginPath();
      ctx.strokeStyle = "rgba(57, 145, 141, 0.15)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= width; x += 12) {
        const y = height * 0.6 + Math.sin(x * 0.004 + step) * 28;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(248, 197, 28, 0.1)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += 12) {
        const y = height * 0.65 + Math.cos(x * 0.005 + step * 0.85) * 32;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateSize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`w-full h-full pointer-events-none block ${className}`} />;
}

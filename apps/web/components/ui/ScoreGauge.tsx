"use client";

import { arc as d3Arc } from "d3";
import { useEffect, useRef, useState } from "react";

const MATURITY_COLOR: Record<string, string> = {
  exploring: "#c57b4b",
  building: "#f8c51c",
  scaling: "#39918d",
  leading: "#0c2940",
};

export function ScoreGauge({
  score,
  maturityLevel,
  size = 220,
}: {
  score: number;
  maturityLevel: string;
  size?: number;
}) {
  const [animated, setAnimated] = useState(0);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated(score * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [score]);

  const radius = size / 2;
  const thickness = size * 0.11;
  const startAngle = -Math.PI * 0.75;
  const endAngle = Math.PI * 0.75;
  const fullSweep = endAngle - startAngle;

  const trackGen = d3Arc()({
    innerRadius: radius - thickness,
    outerRadius: radius,
    startAngle,
    endAngle,
  } as never) as string;

  const valueAngle = startAngle + (animated / 100) * fullSweep;
  const valueGen = d3Arc()({
    innerRadius: radius - thickness,
    outerRadius: radius,
    startAngle,
    endAngle: valueAngle,
  } as never) as string;

  const color = MATURITY_COLOR[maturityLevel] ?? "var(--color-brand-gold)";

  return (
    <div className="inline-flex flex-col items-center">
      <svg width={size} height={size * 0.86} viewBox={`${-radius} ${-radius} ${size} ${size * 0.86}`}>
        <path d={trackGen} fill="#eef0f3" />
        <path d={valueGen} fill={color} style={{ transition: "fill 0.3s" }} />
        <text
          x={0}
          y={-radius * 0.15}
          textAnchor="middle"
          fontSize={size * 0.22}
          fontWeight={700}
          fill="var(--color-brand-navy)"
          fontFamily="var(--font-heading)"
        >
          {Math.round(animated)}
        </text>
        <text x={0} y={radius * 0.12} textAnchor="middle" fontSize={size * 0.06} fill="#6b7280">
          / 100
        </text>
      </svg>
      <span
        className="mt-1 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
        style={{ backgroundColor: `${color}22`, color }}
      >
        {maturityLevel}
      </span>
    </div>
  );
}

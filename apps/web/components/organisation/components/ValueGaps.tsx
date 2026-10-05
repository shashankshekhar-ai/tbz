'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

export const ValueGaps: React.FC = () => {
  const gaps = [
    {
      step: '01',
      title: 'Opportunity → Capability',
      desc: 'The tools are available. The skills aren’t.',
    },
    {
      step: '02',
      title: 'Capability → Application',
      desc: 'They passed the training. Nothing changed on the job.',
    },
    {
      step: '03',
      title: 'Application → Performance',
      desc: 'Daily AI use, no clarity on whether work improved.',
    },
    {
      step: '04',
      title: 'Performance → Value',
      desc: 'Tasks are faster. The organization captured nothing.',
    },
  ];

  return (
    <section
      id="measurement"
      className="scroll-mt-24 bg-gradient-to-b from-[#f0f7f6] via-[#ffffff] to-[#f0f7f6] py-16 sm:py-24 relative overflow-hidden border-b border-[#39918d]/15 text-[#0c2940]"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-[0.25em] text-[#39918d]">
            MEASUREMENT: WHERE VALUE GETS LOST
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-tight text-[#0c2940] sm:text-3xl">
            Most AI training measures adoption. We measure where value gets lost.
          </h2>
          <p className="mt-4 max-w-3xl font-[family-name:var(--font-montserrat)] font-medium text-base text-[#0c2940]">
            Your team completed the training. They’re using the tools. So where did the value go?
          </p>
          <p className="mt-2 max-w-3xl font-[family-name:var(--font-opensans)] text-base leading-relaxed text-[#0c2940]/85">
            AI creates opportunity, but opportunity doesn’t automatically become value. Between what AI
            makes possible and what your organization captures, there are gaps. We find them.
          </p>
        </motion.div>

        {/* 4 Value Gap Cards in Light Theme */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gaps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-2xl border-2 border-[#39918d]/25 bg-gradient-to-br from-[#ffffff]/95 via-[#f0f7f6]/95 to-[#ffffff]/95 p-6 backdrop-blur-md shadow-md shadow-[#0c2940]/5 transition-all duration-300 hover:border-[#f8c51c] hover:shadow-[0_0_25px_rgba(248,197,28,0.25)] text-[#0c2940]"
            >
              <div>
                <span className="inline-block rounded-full bg-[#c57b4b] px-3 py-1 font-[family-name:var(--font-montserrat)] text-xs font-bold text-white">
                  {item.step}
                </span>

                <h3 className="mt-4 font-[family-name:var(--font-montserrat)] font-medium text-base text-[#0c2940]">
                  {item.title}
                </h3>

                <p className="mt-2 font-[family-name:var(--font-opensans)] text-sm leading-relaxed text-[#0c2940]/80">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Missing 30 Minutes Box in Light Theme */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 rounded-2xl border-2 border-[#f8c51c] bg-gradient-to-br from-[#ffffff] via-[#fefbf0] to-[#ffffff] p-7 sm:p-8 relative overflow-hidden backdrop-blur-md shadow-xl text-[#0c2940]"
        >
          <div className="pb-4 border-b border-[#f8c51c]/40">
            <h3 className="font-[family-name:var(--font-montserrat)] font-medium text-xl text-[#c57b4b] flex items-center gap-2.5">
              <Clock size={22} className="text-[#c57b4b] shrink-0" />
              The Missing 30 Minutes
            </h3>
          </div>

          <p className="mt-4 max-w-4xl font-[family-name:var(--font-opensans)] text-[15px] leading-relaxed text-[#0c2940]/90">
            If AI cuts a task from 60 minutes to 30, most vendors report “30 minutes saved” and call
            it a win. We ask what happened to those 30 minutes. Did the employee use that capacity
            to improve quality, reduce backlog, or take on higher-value work? If nothing changed,
            you created efficiency without capturing value. That’s the gap we close.
          </p>

          <p className="mt-4 max-w-4xl font-[family-name:var(--font-opensans)] text-[15px] font-semibold leading-relaxed text-[#0c2940]">
            The goal: Move from AI capability to captured organizational value. We measure every gap in
            the chain, so you know exactly where value is created and where it’s leaking.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

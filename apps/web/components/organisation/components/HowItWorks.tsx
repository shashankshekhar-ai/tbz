'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      n: '01',
      title: 'Expertise Capture',
      desc: 'Trapped expertise becomes structured, market-ready training assets.',
    },
    {
      n: '02',
      title: 'Guided AI Co-Creation',
      desc: 'An AI assistant guides your experts step by step. No blank-page friction.',
    },
    {
      n: '03',
      title: 'Actionable Program Design',
      desc: 'Every module produces a hands-on framework: scorecards, decision maps, trackers learners use immediately.',
    },
    {
      n: '04',
      title: 'Performance Alignment',
      desc: 'A direct line from learning activities to observable workplace metrics.',
    },
  ];

  return (
    <section
      id="how"
      className="scroll-mt-24 bg-gradient-to-b from-[#ffffff] via-[#f0f7f6] to-[#ffffff] py-16 sm:py-24 border-b border-[#39918d]/15 text-[#0c2940] relative"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-[0.25em] text-[#39918d]">
            HOW IT WORKS
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-tight text-[#0c2940] sm:text-3xl">
            Learning Architecture in four steps
          </h2>
        </motion.div>

        {/* 4 Steps Cards in Light Theme */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-2xl border-2 border-[#39918d]/25 bg-gradient-to-br from-[#ffffff]/95 via-[#f0f7f6]/95 to-[#ffffff]/95 p-6 backdrop-blur-md shadow-md shadow-[#0c2940]/5 transition-all duration-300 hover:border-[#f8c51c] hover:shadow-[0_0_25px_rgba(248,197,28,0.25)] text-[#0c2940]"
            >
              <div>
                <span className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[#39918d]">
                  {step.n}
                </span>

                <h3 className="mt-3 font-[family-name:var(--font-montserrat)] font-medium text-base text-[#0c2940]">
                  {step.title}
                </h3>

                <p className="mt-2 font-[family-name:var(--font-opensans)] text-sm leading-relaxed text-[#0c2940]/80">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 border-l-4 border-[#c57b4b] pl-6 py-4 rounded-r-2xl bg-gradient-to-r from-[#c57b4b]/10 via-[#f0f7f6]/80 to-transparent"
        >
          <div className="flex items-start gap-3">
            <Quote size={20} className="text-[#c57b4b] shrink-0 mt-0.5" />
            <p className="font-[family-name:var(--font-opensans)] italic text-lg leading-relaxed text-[#0c2940]/90">
              “One of the best succession planning initiatives you can do is a project like this.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

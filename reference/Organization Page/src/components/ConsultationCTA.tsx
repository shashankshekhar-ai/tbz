import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';

interface ConsultationCTAProps {
  onOpenConsultation: () => void;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ onOpenConsultation }) => {
  const points = [
    'Where friction lives in your organization (redundant work, timelines, capability gaps)',
    'What success looks like for you (what changes, how the human experience improves, which metrics matter)',
    'Whether embedded partnership, custom workshops, or community learning makes sense',
  ];

  return (
    <section
      id="cta"
      className="bg-gradient-to-b from-[#ffffff] via-[#f0f7f6] to-[#ffffff] px-6 py-20 sm:py-24 relative overflow-hidden text-[#0c2940]"
    >
      <div className="relative mx-auto max-w-4xl">
        {/* Main Title and Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-['Montserrat'] text-xs font-bold uppercase tracking-[0.25em] text-[#39918d] mb-3">
            CLOSING CTA
          </p>
          <h2 className="font-['Montserrat'] text-3xl font-bold tracking-tight sm:text-4xl text-[#0c2940]">
            Let’s Explore If Working Together Fits
          </h2>
          <p className="mt-4 text-center font-['Montserrat'] text-lg text-[#0c2940]/85 max-w-2xl mx-auto">
            One conversation. 30 minutes. Just clarity on whether this fits your situation.
          </p>
        </motion.div>

        {/* 3 Discussion Points in Light Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <h3 className="font-['Montserrat'] font-medium text-sm uppercase tracking-wider text-[#39918d] mb-4">
            We’ll work together to understand:
          </h3>

          <ul className="space-y-4">
            {points.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3 rounded-2xl p-5 backdrop-blur-md border border-[#39918d]/25 bg-gradient-to-br from-[#ffffff]/95 via-[#f0f7f6]/95 to-[#ffffff]/95 text-[#0c2940]/95 shadow-md shadow-[#0c2940]/5"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c57b4b]" />
                <span className="font-['Open_Sans'] text-[15px] leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <button
            onClick={onOpenConsultation}
            className="group inline-flex items-center gap-2.5 rounded-full px-9 py-4 font-['Montserrat'] text-sm font-bold uppercase tracking-wide bg-[#f8c51c] text-[#0c2940] transition-all duration-200 hover:bg-[#0c2940] hover:text-[#ffffff] hover:shadow-xl hover:shadow-[#f8c51c]/40 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
          >
            <Calendar size={17} className="shrink-0" />
            <span>SCHEDULE ORGANIZATIONAL CONSULTATION</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

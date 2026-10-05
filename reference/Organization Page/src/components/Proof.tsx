import React from 'react';
import { motion } from 'motion/react';
import { Quote as QuoteIcon } from 'lucide-react';

export const Proof: React.FC = () => {
  const practiceAreas = [
    {
      area: 'Knowledge Architecture',
      impact: 'A shared prompt library and decision tools the whole team uses.',
    },
    {
      area: 'Intake & Triage',
      impact: 'Single entry point routes work to the right team with full context. No more dropped requests.',
    },
    {
      area: 'Analyst Engine',
      impact: 'AI-powered synthesis frees analysts to focus on judgment, not assembly. AI handles the first pass on synthesis, so analysts spend their time on judgment.',
    },
    {
      area: 'Dynamic Reporting',
      impact: 'Automated compilation and formatting. Researchers review and approve, not coordinate and compile.',
    },
    {
      area: 'AI as Thought Partner',
      impact: 'The executive director uses AI for strategic work, saving countless hours and unlocking opportunities for the team.',
    },
  ];

  const stakeholderVoices = [
    {
      role: 'Executive Director',
      quote: '“Structured AI assistants moved me from ‘doer’ to ‘approver.’ Executive bandwidth is now for strategy, not coordination.”',
    },
    {
      role: 'Research Lead',
      quote: '“AI handles synthesis. My analysts focus on what they’re actually trained for.”',
    },
    {
      role: 'Project Lead',
      quote: '“It’s a process redesign. That’s the difference.”',
    },
  ];

  return (
    <section
      id="proof"
      className="bg-gradient-to-b from-[#f0f7f6] via-[#ffffff] to-[#f0f7f6] py-16 sm:py-24 relative overflow-hidden border-b border-[#39918d]/15 text-[#0c2940]"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-['Montserrat'] text-xs font-bold uppercase tracking-[0.25em] text-[#39918d]">
            PROOF: NCEMCH AT GEORGETOWN UNIVERSITY PARTNERSHIP
          </p>
          <h2 className="mt-3 font-['Montserrat'] text-2xl font-bold tracking-tight text-[#0c2940] sm:text-3xl">
            Six months embedded. Here’s the full picture.
          </h2>
          <p className="mt-3 font-['Montserrat'] text-base text-[#0c2940]/85">
            Projected annualized value from a 6-month embedded partnership.
          </p>
        </motion.div>

        {/* Practice Area & Impact Grid in Light Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10 overflow-hidden rounded-2xl border border-[#39918d]/25 bg-gradient-to-br from-[#ffffff]/95 via-[#f0f7f6]/95 to-[#ffffff]/95 backdrop-blur-md shadow-md shadow-[#0c2940]/5"
        >
          {/* Table Header */}
          <div className="hidden bg-[#39918d]/10 px-7 py-3.5 sm:grid sm:grid-cols-[260px_1fr] items-center border-b border-[#39918d]/20">
            <span className="font-['Montserrat'] font-medium text-xs uppercase tracking-wider text-[#39918d]">
              Practice Area
            </span>
            <span className="font-['Montserrat'] font-medium text-xs uppercase tracking-wider text-[#39918d]">
              Impact
            </span>
          </div>

          {/* Table Rows */}
          {practiceAreas.map((item, index) => (
            <div
              key={index}
              className={`grid gap-2 px-7 py-5 sm:grid-cols-[260px_1fr] sm:gap-6 transition-all duration-200 ${
                index < practiceAreas.length - 1 ? 'border-b border-[#39918d]/15' : ''
              } hover:bg-[#39918d]/10`}
            >
              <div>
                <h3 className="font-['Montserrat'] font-medium text-sm text-[#0c2940]">
                  {item.area}
                </h3>
              </div>

              <div>
                <p className="font-['Open_Sans'] text-sm leading-relaxed text-[#0c2940]/90">
                  {item.impact}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stakeholder Voices Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14"
        >
          <div className="flex items-center gap-2">
            <QuoteIcon size={18} className="text-[#c57b4b]" />
            <h3 className="font-['Montserrat'] font-medium text-xl text-[#0c2940]">
              Stakeholder Voices
            </h3>
          </div>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {stakeholderVoices.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex h-full flex-col justify-between rounded-2xl border-l-4 border-[#c57b4b] border-t border-r border-b border-[#39918d]/25 bg-gradient-to-br from-[#ffffff]/95 via-[#f0f7f6]/95 to-[#ffffff]/95 p-6 backdrop-blur-md shadow-md shadow-[#0c2940]/5 transition-all duration-300 hover:border-[#f8c51c] hover:shadow-[0_0_25px_rgba(248,197,28,0.25)] text-[#0c2940]"
            >
              <div>
                <p className="font-['Open_Sans'] italic text-sm leading-relaxed text-[#0c2940]/90">
                  {item.quote}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#39918d]/20">
                <h4 className="font-['Montserrat'] font-medium text-xs uppercase tracking-wider text-[#39918d]">
                  {item.role}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 rounded-2xl border border-[#39918d]/25 bg-gradient-to-r from-white via-[#f0f7f6] to-white p-6 text-center shadow-sm text-[#0c2940]/90"
        >
          <p className="font-['Open_Sans'] italic text-sm max-w-3xl mx-auto">
            Federal agencies · Municipalities · Nonprofits · Private sector. The industries change,
            the framework adapts, the results stay consistent.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

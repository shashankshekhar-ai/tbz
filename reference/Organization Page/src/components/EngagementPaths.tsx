import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Rocket, ShieldCheck } from 'lucide-react';

interface EngagementPathsProps {
  onSelectScope: (scope: string) => void;
}

export const EngagementPaths: React.FC<EngagementPathsProps> = ({ onSelectScope }) => {
  const paths = [
    {
      name: 'Pilot',
      tag: 'Test the approach with a focused team or project.',
      icon: <Compass size={20} className="transition-colors duration-300 group-hover:text-[#f8c51c]" />,
      items: [
        'Customized AI Fluency cohort (role-specific, industry-specific)',
        'Small-group facilitation with 1:1 coaching',
        'Built-in feedback loops and validation',
        'AI Learning Assistant access',
        'Aligned with U.S. DOL framework for workforce AI literacy',
      ],
      foot: 'The same approach that took one NCEMCH workflow from 3 weeks to 8 hours.',
    },
    {
      name: 'How It Works',
      tag: '',
      icon: <Rocket size={20} className="transition-colors duration-300 group-hover:text-[#f8c51c]" />,
      items: [
        '01 Expertise Capture: The know-how in your senior people\'s heads gets turned into structured training your team can use.',
        '02 Guided AI Co-Creation: A thinking-partner assistant guides your experts step by step, so nobody starts from a blank page.',
        '03 Applied Program Design: Every module is built around your team\'s real work. Learners leave each one with a framework they can use on the job right away, and they finish with a pilot they can measure.',
        '04 Performance Alignment: A direct line from learning activities to observable workplace metrics.',
      ],
      foot: 'For organizations ready to embed intentionally and measure over time.',
    },
    {
      name: 'Transform',
      tag: 'Full embedded partnership.',
      icon: <ShieldCheck size={20} className="transition-colors duration-300 group-hover:text-[#f8c51c]" />,
      items: [
        'Strategic planning and roadmap',
        'Custom AI assistant development',
        'Dedicated Change Architecture Officer',
        'Adoption facilitator embedded with frontline teams',
        'AI Governance Framework design',
        'Workflow Architecture optimization',
      ],
      foot: 'For organizations transforming how work moves through their teams.',
    },
  ];

  return (
    <section
      id="paths"
      className="bg-gradient-to-b from-[#ffffff] via-[#f0f7f6] to-[#ffffff] py-16 sm:py-24 border-b border-[#39918d]/15 text-[#0c2940] relative"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-['Montserrat'] text-xs font-bold uppercase tracking-[0.25em] text-[#39918d]">
            ENGAGEMENT PATHS
          </p>
          <h2 className="mt-3 font-['Montserrat'] text-2xl font-bold tracking-tight text-[#0c2940] sm:text-3xl">
            Three ways in. Pick your scope.
          </h2>
          <p className="mt-3 max-w-3xl font-['Montserrat'] text-base text-[#0c2940]/85">
            Every engagement includes strategic guidance, facilitation support, and access to our human and AI team. The only question is scope.
          </p>
        </motion.div>

        {/* 3 Paths Cards in Light Theme with Hover Yellow Glow & Yellow Icon */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {paths.map((path, index) => (
            <motion.div
              key={path.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex h-full flex-col justify-between rounded-2xl border-2 border-[#39918d]/25 bg-gradient-to-br from-[#ffffff]/95 via-[#f0f7f6]/95 to-[#ffffff]/95 p-7 transition-all duration-300 shadow-md shadow-[#0c2940]/5 backdrop-blur-md hover:border-[#f8c51c] hover:shadow-[0_0_30px_rgba(248,197,28,0.35)] text-[#0c2940]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-['Montserrat'] font-medium text-2xl uppercase tracking-wide text-[#0c2940]">
                    {path.name}
                  </h3>

                  <div className="p-2.5 rounded-xl border border-[#39918d]/25 bg-[#39918d]/10 text-[#39918d] transition-all duration-300 group-hover:border-[#f8c51c] group-hover:text-[#f8c51c] group-hover:bg-[#f8c51c]/15 group-hover:shadow-[0_0_15px_rgba(248,197,28,0.4)]">
                    {path.icon}
                  </div>
                </div>

                {path.tag && (
                  <p className="mt-3 font-['Montserrat'] font-medium text-sm text-[#39918d]">
                    {path.tag}
                  </p>
                )}

                {/* Items checklist */}
                <ul className="mt-5 space-y-3.5 border-t border-[#39918d]/15 pt-5">
                  {path.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 font-['Open_Sans'] text-sm leading-relaxed text-[#0c2940]/90"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c57b4b]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Foot & CTA Button */}
              <div className="mt-6 pt-4 border-t border-[#39918d]/15">
                <button
                  onClick={() => onSelectScope(path.name)}
                  className="w-full group/btn inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 font-['Montserrat'] text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-[#0c2940] text-[#ffffff] border border-[#0c2940] hover:bg-[#f8c51c] hover:text-[#0c2940] hover:border-[#f8c51c] hover:shadow-lg hover:shadow-[#f8c51c]/25"
                >
                  <span>Select {path.name} Scope</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/btn:translate-x-1"
                  />
                </button>

                <p className="mt-4 font-['Open_Sans'] italic text-xs leading-relaxed text-[#0c2940]/70">
                  {path.foot}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

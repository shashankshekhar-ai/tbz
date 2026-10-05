import React from 'react';
import { Sprout } from 'lucide-react';

export const Section3DelayedGratification: React.FC = () => {
  const stages = [
    {
      stage: 'Stage 1',
      title: 'Choose to Start',
      caption: "You don't need to feel ready. You just need to begin.",
      accent: '#39918d',
    },
    {
      stage: 'Stage 2',
      title: 'Emotions Surface',
      caption: "Doubt shows up early. That's normal, and we plan for it.",
      accent: '#3f6d67',
    },
    {
      stage: 'Stage 3',
      title: 'The Aha Moment',
      caption: 'Your first real win, on your own real work.',
      accent: '#f8c51c',
    },
    {
      stage: 'Stage 4',
      title: 'The Messy Middle',
      caption: 'Progress feels uneven here. This is where coaching matters most.',
      accent: '#c57b4b',
    },
    {
      stage: 'Stage 5',
      title: 'Momentum Builds',
      caption: 'Small wins add up to time and value you can measure.',
      accent: '#39918d',
    },
  ];

  return (
    <section className="bg-[#0c2940] text-white py-20 lg:py-24 border-b border-[#39918d]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-xs font-bold tracking-widest text-[#f8c51c] uppercase mb-2"
          >
            Delayed Gratification
          </div>
          <h2 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-3"
          >
            Go slow first. Go fast later.
          </h2>
          <p 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-base sm:text-lg font-medium text-slate-300"
          >
            AI adoption follows a growth pattern. We built the journey around it.
          </p>
        </div>

        {/* 5 Stages Grid - matching content width */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mb-10">
          {stages.map((item, index) => (
            <div 
              key={index}
              className="bg-[#0c2940]/90 border border-[#39918d]/30 rounded-xl p-5 flex flex-col justify-between hover:border-[#f8c51c]/40 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="text-xs font-bold tracking-wider text-[#f8c51c] uppercase"
                  >
                    {item.stage}
                  </span>
                  <Sprout className="w-4 h-4 text-[#39918d]" />
                </div>
                <h3 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-base font-bold text-white mb-2"
                >
                  {item.title}
                </h3>
              </div>
              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-xs sm:text-sm text-slate-300 italic leading-relaxed pt-2 border-t border-[#39918d]/20"
              >
                {item.caption}
              </p>
            </div>
          ))}
        </div>

        {/* EMPTY image card container placeholder of 1448 x 1000 px matching exact full content width */}
        <div className="w-full mb-10">
          <div className="w-full rounded-2xl border-2 border-dashed border-[#39918d]/40 bg-[#3f6d67]/10 flex flex-col items-center justify-center p-8 sm:p-12 text-center aspect-[1448/1000] max-h-[580px]">
            <div className="w-16 h-16 rounded-full bg-[#39918d]/20 border border-[#39918d]/40 flex items-center justify-center mb-4">
              <Sprout className="w-8 h-8 text-[#f8c51c]" />
            </div>
            <p 
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1"
            >
              Tree Graphic Image Card Placeholder
            </p>
            <p 
              style={{ fontFamily: "'Open Sans', sans-serif" }}
              className="text-xs sm:text-sm text-slate-300 font-mono"
            >
              1448 x 1000 px
            </p>
          </div>
        </div>

        {/* Quote Block matching exact full content width */}
        <div className="w-full bg-[#3f6d67]/40 border border-[#39918d]/30 rounded-2xl p-7 sm:p-9 shadow-lg">
          <blockquote 
            style={{ fontFamily: "'Open Sans', sans-serif" }}
            className="text-base sm:text-lg text-white italic leading-relaxed mb-6 font-normal"
          >
            “We’ve been conditioned for instant gratification. AI requires something different. It requires you to think deeper, iterate, and be comfortable with not knowing immediately. But for leaders brave enough to go slow first and go fast later, the dividends are extraordinary.”
          </blockquote>
          <div className="border-t border-[#39918d]/30 pt-4">
            <p 
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-sm font-semibold text-[#f8c51c]"
            >
              Paige Bradbury, CEO & Principal Learning Architect
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

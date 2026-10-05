'use client';

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface Section4AiInterviewProps {
  onStartInterview: () => void;
  onEnrollNow: () => void;
}

export const Section4AiInterview: React.FC<Section4AiInterviewProps> = ({
  onStartInterview,
  onEnrollNow,
}) => {
  return (
    <section id="ai-interview" className="scroll-mt-24 bg-[#ffffff] text-[#0c2940] py-20 lg:py-24 border-b border-[#39918d]/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div 
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            className="text-xs font-bold tracking-widest text-[#39918d] uppercase mb-2"
          >
            THE AI INTERVIEW (Two Paths)
          </div>
          <h2 
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0c2940] tracking-tight leading-tight mb-3"
          >
            Try the AI Interview
          </h2>
          <p 
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            className="text-base sm:text-lg font-semibold text-[#3f6d67] mb-4"
          >
            Thirty minutes, one real strategic challenge, and you’ll know whether this resonates.
          </p>
          <p 
            style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
            className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3 font-normal"
          >
            We’re in active beta. You’re not just learning about AI, you’re testing the tool we built for executive thinking.
          </p>
          <p 
            style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
            className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
          >
            Some leaders need to try first. Others are ready to commit immediately. This approach honors how you prefer to make decisions.
          </p>
        </div>

        {/* Two Paths Cards - matching full uniform content width */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Path 1: Interview first */}
          <div className="bg-white rounded-2xl border-2 border-[#39918d]/40 p-7 sm:p-9 shadow-lg flex flex-col justify-between hover:border-[#39918d] transition-all duration-200">
            <div>
              {/* Path Header */}
              <div className="flex items-center justify-between border-b border-[#39918d]/20 pb-4 mb-5">
                <span 
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="text-xs font-bold tracking-widest text-[#3f6d67] uppercase"
                >
                  PATH 01 / 30 MINUTES
                </span>
                <span 
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="text-xs font-semibold text-[#39918d]"
                >
                  Path 1: Interview first
                </span>
              </div>

              <h3 
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                className="text-xl font-bold text-[#0c2940] mb-2"
              >
                A conversation with the Solomon assistant
              </h3>
              
              <p 
                style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
                className="text-sm sm:text-base text-slate-700 font-medium mb-5"
              >
                Bring one real strategic challenge you’re facing right now.
              </p>

              {/* Bullet points */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-2 text-sm text-slate-700">
                  <span className="text-[#39918d] font-bold">·</span>
                  <span>Ask the AI questions about your challenge</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-slate-700">
                  <span className="text-[#39918d] font-bold">·</span>
                  <span>See how it thinks through your problem</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-slate-700">
                  <span className="text-[#39918d] font-bold">·</span>
                  <span>Experience a sophisticated thinking partner</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-slate-700">
                  <span className="text-[#39918d] font-bold">·</span>
                  <span>Decide whether this kind of partnership resonates</span>
                </li>
              </ul>

              <p 
                style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
                className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6 pt-3 border-t border-[#39918d]/20"
              >
                It also helps me understand how you think, so I can design your custom journey around the problems you actually have.
              </p>
            </div>

            <button
              onClick={onStartInterview}
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="w-full py-3.5 px-6 bg-[#3f6d67] hover:bg-[#39918d] text-white font-bold text-sm tracking-wide rounded-lg transition-all duration-200 shadow-md flex items-center justify-center space-x-2"
            >
              <span>START THE INTERVIEW</span>
              <Sparkles className="w-4 h-4 text-[#f8c51c]" />
            </button>
          </div>

          {/* Path 2: Enroll directly */}
          <div className="bg-[#0c2940] text-white rounded-2xl border-2 border-[#39918d]/40 p-7 sm:p-9 shadow-xl flex flex-col justify-between hover:border-[#f8c51c]/50 transition-all duration-200">
            <div>
              {/* Path Header */}
              <div className="flex items-center justify-between border-b border-[#39918d]/30 pb-4 mb-5">
                <span 
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="text-xs font-bold tracking-widest text-[#f8c51c] uppercase"
                >
                  PATH 02 / READY NOW
                </span>
                <span 
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="text-xs font-semibold text-slate-300"
                >
                  Path 2: Enroll directly
                </span>
              </div>

              <h3 
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                className="text-xl font-bold text-white mb-2"
              >
                Skip the preview and begin
              </h3>
              
              <p 
                style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
                className="text-sm sm:text-base text-slate-200 font-medium mb-5"
              >
                You’ll still get the interview during your first week, then move straight into the 12-week journey.
              </p>

              {/* Bullet points */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-2 text-sm text-slate-200">
                  <span className="text-[#f8c51c] font-bold">·</span>
                  <span>Week 1: Interview and calibration</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-slate-200">
                  <span className="text-[#f8c51c] font-bold">·</span>
                  <span>Weeks 1-4: Foundation, psychology, frameworks</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-slate-200">
                  <span className="text-[#f8c51c] font-bold">·</span>
                  <span>Weeks 5-8: Building your custom AI assistants</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-slate-200">
                  <span className="text-[#f8c51c] font-bold">·</span>
                  <span>Weeks 9-12: Strategy synthesis and organizational blueprint</span>
                </li>
              </ul>

              <p 
                style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
                className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6 pt-3 border-t border-[#39918d]/30"
              >
                Cohorts stay small because this work requires real attention, not a lecture hall.
              </p>
            </div>

            <button
              onClick={onEnrollNow}
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="w-full py-3.5 px-6 bg-[#f8c51c] hover:bg-[#eab314] text-[#0c2940] font-bold text-sm tracking-wide rounded-lg transition-all duration-200 shadow-md flex items-center justify-center space-x-2"
            >
              <span>ENROLL NOW</span>
              <ArrowRight className="w-4 h-4 text-[#0c2940]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

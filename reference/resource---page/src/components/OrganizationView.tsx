import React from 'react';
import { PageView } from '../types';
import { Building2, GraduationCap, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ParticleCanvas } from './ParticleCanvas';

interface OrganizationViewProps {
  onNavigate: (page: PageView) => void;
  onBookDiscovery: () => void;
}

export const OrganizationView: React.FC<OrganizationViewProps> = ({
  onNavigate,
  onBookDiscovery
}) => {
  return (
    <div className="w-full bg-white text-[#0c2940] pb-20">
      {/* Hero Section matching Image 1 with Moving Particle Animation background ONLY here */}
      <section className="relative w-full bg-[#0c2940] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-[#3f6d67]/30 overflow-hidden">
        {/* Interactive moving particle constellation background - ONLY on FOR ORGANIZATIONS landing section */}
        <ParticleCanvas className="opacity-90" />

        {/* Subtle atmospheric center glow using brand colors */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#39918d]/20 to-transparent blur-3xl pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-4 pointer-events-auto"
          >
            {/* Tag: FOR ORGANIZATIONS in #39918d from Image 1 */}
            <span className="font-h3 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#39918d] block">
              FOR ORGANIZATIONS
            </span>

            {/* H1: Enterprise AI Transformation in Inter */}
            <h1 className="font-h1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Enterprise AI Transformation
            </h1>

            {/* H2 / Subtitle: in Montserrat */}
            <h2 className="font-h2 text-base sm:text-lg md:text-xl font-normal text-slate-200 max-w-3xl mx-auto leading-relaxed pt-2">
              Enterprise-wide AI transformation, custom model integration, and proprietary ROI models — for CXOs, enterprise boards, and enterprise PMOs.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* 3 Pillar Cards Section matching Image 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Learning Architecture Design */}
          <motion.div
            whileHover={{ y: -6, boxShadow: '0 20px 30px -10px rgba(12, 41, 64, 0.12)' }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-200"
          >
            <div className="space-y-5">
              {/* Circular Badge: Teal #39918d with Building icon */}
              <div className="w-14 h-14 rounded-full bg-[#39918d] text-white flex items-center justify-center shadow-md">
                <Building2 className="w-7 h-7" />
              </div>

              {/* Title H3 in Montserrat-Medium / bold */}
              <h3 className="font-h3 text-2xl font-bold text-[#0c2940] leading-tight">
                Learning Architecture Design
              </h3>

              {/* Body in Roboto */}
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                A custom-built learning architecture mapped to your organization's roles, risk profile, and existing L&amp;D infrastructure — not a generic course library.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Embedded Training Partnership */}
          <motion.div
            whileHover={{ y: -6, boxShadow: '0 20px 30px -10px rgba(12, 41, 64, 0.12)' }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-200"
          >
            <div className="space-y-5">
              {/* Circular Badge: Terracotta #c57b4b with GraduationCap icon */}
              <div className="w-14 h-14 rounded-full bg-[#c57b4b] text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-7 h-7" />
              </div>

              {/* Title H3 in Montserrat-Medium */}
              <h3 className="font-h3 text-2xl font-bold text-[#0c2940] leading-tight">
                Embedded Training Partnership
              </h3>

              {/* Body in Roboto */}
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                Our facilitators embed directly within your teams over multiple quarters, building capability in the flow of real work rather than one-off workshops.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Community Upskilling Workshops */}
          <motion.div
            whileHover={{ y: -6, boxShadow: '0 20px 30px -10px rgba(12, 41, 64, 0.12)' }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-200"
          >
            <div className="space-y-5">
              {/* Circular Badge: Sage/Teal #3f6d67 with Users icon */}
              <div className="w-14 h-14 rounded-full bg-[#3f6d67] text-white flex items-center justify-center shadow-md">
                <Users className="w-7 h-7" />
              </div>

              {/* Title H3 in Montserrat-Medium */}
              <h3 className="font-h3 text-2xl font-bold text-[#0c2940] leading-tight">
                Community Upskilling Workshops
              </h3>

              {/* Body in Roboto */}
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                Open-enrollment workshops for broader workforce upskilling — see the full catalog for upcoming sessions and topics.
              </p>
            </div>

            {/* Link: See Workshop Catalog -> in #39918d */}
            <div className="pt-6 mt-4">
              <button
                onClick={() => onNavigate('workshops')}
                className="inline-flex items-center gap-2 font-h3 font-semibold text-sm text-[#39918d] hover:text-[#3f6d67] transition-colors group cursor-pointer"
              >
                <span>See Workshop Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Banner Section matching Image 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        {/* Banner from Image 2 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl bg-[#0c2940] border border-[#3f6d67]/40 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <div className="max-w-2xl space-y-3">
            {/* Tag: TEAM AI ENABLEMENT in #39918d */}
            <span className="font-h3 text-xs font-bold tracking-[0.16em] uppercase text-[#39918d] block">
              TEAM AI ENABLEMENT
            </span>

            {/* Title from Image 2 */}
            <h3 className="font-h2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Looking for individual enablement instead?
            </h3>

            {/* Body text in Roboto */}
            <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed">
              For single-seat or small-team enrollment rather than an organization-wide rollout, see the AI Fluency Cohort — our path built for individuals.
            </p>
          </div>

          {/* Button: Go to For You -> in #f8c51c */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('workshops')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#f8c51c] hover:brightness-105 active:scale-98 text-[#0c2940] font-h3 font-bold text-sm tracking-wide transition-all shadow-md group cursor-pointer"
            >
              <span>Go to For You</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Workshop, PageView } from '../types';
import { WORKSHOPS_DATA } from '../data/workshopsData';
import {
  ArrowLeft,
  Search,
  Ticket
} from 'lucide-react';
import { motion } from 'motion/react';
import { ParticleCanvas } from './ParticleCanvas';

interface WorkshopCatalogViewProps {
  onNavigate: (page: PageView) => void;
  onReserveSeat: (workshop: Workshop) => void;
}

export const WorkshopCatalogView: React.FC<WorkshopCatalogViewProps> = ({
  onNavigate,
  onReserveSeat
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Exact 3 categories from the workshops shown in the images
  const categories = [
    { id: 'all', label: 'All Sessions' },
    { id: 'leadership', label: 'Leadership Series' },
    { id: 'all-staff', label: 'All Staff' },
    { id: 'sme', label: 'Subject Matter Experts' }
  ];

  const filteredWorkshops = useMemo(() => {
    return WORKSHOPS_DATA.filter((ws) => {
      const matchesSearch =
        ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.formatTag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || ws.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-white text-[#0c2940] min-h-screen pb-20">
      {/* Top Banner: COMMUNITY UPSKILLING with Moving Particle Animation background */}
      <section className="relative bg-[#0c2940] text-white pt-10 pb-14 border-b border-[#3f6d67]/30 overflow-hidden">
        {/* Moving particle animation canvas background */}
        <ParticleCanvas className="opacity-80" />

        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[260px] bg-gradient-to-r from-[#39918d]/20 to-transparent blur-3xl pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Back link: <- Back to Organizations */}
          <button
            onClick={() => onNavigate('organizations')}
            className="inline-flex items-center gap-2 font-h3 text-xs font-semibold text-slate-300 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Organizations</span>
          </button>

          <div className="space-y-2 max-w-3xl">
            {/* Tag: COMMUNITY UPSKILLING in #39918d */}
            <span className="font-h3 text-xs font-bold tracking-[0.16em] uppercase text-[#39918d] block">
              COMMUNITY UPSKILLING
            </span>

            {/* Title: Workshop Catalog in Inter */}
            <h1 className="font-h1 text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Workshop Catalog
            </h1>

            {/* Subtitle in Montserrat */}
            <p className="font-h2 text-base sm:text-lg text-slate-300 leading-relaxed pt-1">
              Open-enrollment sessions for broader workforce AI upskilling.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Filter & Search Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog sessions..."
              className="w-full pl-10 pr-4 py-2 font-body text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50 text-[#0c2940] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full font-h3 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#39918d] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workshop List strictly featuring the sessions shown in the images/video */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {filteredWorkshops.map((workshop) => {
          return (
            <motion.div
              key={workshop.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full rounded-2xl bg-white border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden"
            >
              {/* Row Layout matching video screenshot */}
              <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2.5 max-w-3xl">
                  {/* Format Tag in #39918d */}
                  <span className="font-h3 text-xs font-bold tracking-[0.14em] uppercase text-[#39918d] block">
                    {workshop.formatTag}
                  </span>

                  {/* Title in Montserrat-Medium / bold */}
                  <h3 className="font-h3 text-2xl sm:text-3xl font-bold text-[#0c2940] leading-tight">
                    {workshop.title}
                  </h3>

                  {/* Description in Roboto */}
                  <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
                    {workshop.description}
                  </p>
                </div>

                {/* Right Action: Reserve a Seat Button */}
                <div className="flex-shrink-0 flex items-center lg:items-end">
                  <button
                    onClick={() => onReserveSeat(workshop)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border-2 border-[#0c2940] hover:bg-[#0c2940] hover:text-white text-[#0c2940] font-h3 font-bold text-xs tracking-wider uppercase transition-all duration-150 cursor-pointer shadow-sm"
                  >
                    <Ticket className="w-4 h-4 text-[#f8c51c]" />
                    <span>Reserve a Seat</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

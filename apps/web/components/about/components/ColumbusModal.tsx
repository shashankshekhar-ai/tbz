'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Compass, Cpu, Target, Award, ArrowRight, MapPin } from 'lucide-react';

interface ColumbusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ColumbusModal: React.FC<ColumbusModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  // Handle Escape key to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const columbusPillars = [
    {
      step: '01',
      title: 'Regional AI Capability Audit',
      icon: Target,
      badge: 'Diagnostic Index',
      description:
        'A comprehensive benchmark measuring your organization’s AI readiness, technology stack, and human workflow friction against top regional performers.',
    },
    {
      step: '02',
      title: 'Columbus Leadership Hub',
      icon: MapPin,
      badge: 'Executive Alignment',
      description:
        'Immersive executive sessions held in strategic hubs like Columbus, OH, giving leadership teams hands-on clarity and actionable AI roadmap execution.',
    },
    {
      step: '03',
      title: 'Custom Engine Deployment',
      icon: Cpu,
      badge: 'Solomon & Walter Suite',
      description:
        'Integration of bespoke AI assistants tailored to executive decision-making (Solomon) and talent development strategy (Walter).',
    },
    {
      step: '04',
      title: 'Ethical ROI & Workforce Metrics',
      icon: Award,
      badge: 'Impact Analytics',
      description:
        'Measurable capability metrics tracking confidence, output quality, and time-to-fluency while maintaining strict data governance.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="columbus-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-10 z-10 overflow-hidden max-h-[90vh] overflow-y-auto text-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b45309]">
                  <Compass className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="columbus-modal-title" className="font-h1 font-bold text-xl text-[#0c2940]">
                      Columbus AI Diagnostic & Hub
                    </h3>
                    <span className="bg-[#0c2940] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Strategic Hub
                    </span>
                  </div>
                  <span className="font-caption text-xs text-slate-600 font-medium">
                    The Bradbury Group • Regional Capability Architecture
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2.5 border border-slate-200 rounded-lg hover:border-[#0c2940] text-slate-600 hover:text-[#0c2940] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                aria-label="Close Columbus diagnostic dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pillars Overview */}
            <div className="py-6 space-y-6">
              <p className="font-body text-slate-700 text-sm leading-relaxed font-normal">
                The <span className="text-[#0f766e] font-bold">Columbus Initiative</span> bridges executive strategy with ground-level enterprise execution. Our diagnostic engine evaluates organizational AI maturity and accelerates workforce transformation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {columbusPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.step}
                      className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-[#0f766e] transition-colors group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-h1 font-bold text-xs text-[#0f766e] bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                          MODULE {pillar.step}
                        </span>
                        <Icon className="w-4 h-4 text-[#0f766e] group-hover:text-[#0c2940] transition-colors" />
                      </div>
                      <h4 className="font-h2 font-bold text-[#0c2940] text-base pt-1">
                        {pillar.title}
                      </h4>
                      <span className="font-caption text-xs text-[#b45309] block font-bold">
                        {pillar.badge}
                      </span>
                      <p className="font-body text-xs text-slate-600 leading-relaxed pt-1 font-normal">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-caption text-xs text-slate-600 font-medium">
                Explore the Columbus Diagnostic Framework with our strategy leads
              </span>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0c2940] hover:bg-[#163a59] text-white font-h2 text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
              >
                <span>Request Columbus Diagnostic</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#f8c51c]" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

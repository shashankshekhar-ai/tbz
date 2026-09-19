'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, ArrowRight, ShieldCheck, Cpu, Target, Award } from 'lucide-react';

interface ApproachModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ApproachModal: React.FC<ApproachModalProps> = ({
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

  const blueprintStages = [
    {
      step: '01',
      title: 'Diagnostic Audit & Strategy First',
      icon: Target,
      tagline: 'Strategy Before Implementation',
      description:
        'We evaluate your current learning infrastructure, workflow friction, and human culture before touching a single AI tool. Strategy defines tool selection—never the reverse.',
    },
    {
      step: '02',
      title: 'Psychological Safety & Agency',
      icon: ShieldCheck,
      tagline: 'Permission to Struggle & Adapt',
      description:
        'Giving teams explicit permission to push back, experiment, and wrestle with new concepts. Early small wins replace overwhelming compliance pressure.',
    },
    {
      step: '03',
      title: 'Applied AI Sprints & Custom Assistants',
      icon: Cpu,
      tagline: 'Skills Over Compliance Checkboxes',
      description:
        'Deploying bespoke AI learning strategists (such as Walter) and hands-on learning sprints tailored to actual revenue and operational workflows.',
    },
    {
      step: '04',
      title: 'Science-Backed Performance Metrics',
      icon: Award,
      tagline: 'Ethical & Measurable Capability',
      description:
        'Aligning with international ethical standards to measure real confidence, task fluency, and skill retention rather than vanity completion statistics.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="approach-modal-title"
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
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="approach-modal-title" className="font-h1 font-bold text-xl text-[#0c2940]">
                    The Bradbury Blueprint
                  </h3>
                  <span className="font-caption text-xs text-slate-600 font-medium">
                    AI-Powered Learning Architecture Framework
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2.5 border border-slate-200 rounded-lg hover:border-[#0c2940] text-slate-600 hover:text-[#0c2940] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                aria-label="Close Bradbury Blueprint dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stages Grid */}
            <div className="py-8 space-y-6">
              <p className="font-body text-slate-700 text-sm leading-relaxed font-normal">
                Our proprietary framework bridges the gap between executive AI strategy and front-line workforce adoption through diagnostic architecture and human psychology.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blueprintStages.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <div
                      key={stage.step}
                      className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-[#0f766e] transition-colors group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-h1 font-bold text-xs text-[#0f766e] bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                          STAGE {stage.step}
                        </span>
                        <Icon className="w-4 h-4 text-[#0f766e] group-hover:text-[#0c2940] transition-colors" />
                      </div>
                      <h4 className="font-h2 font-bold text-[#0c2940] text-base pt-1">
                        {stage.title}
                      </h4>
                      <span className="font-caption text-xs text-[#b45309] block font-bold">
                        {stage.tagline}
                      </span>
                      <p className="font-body text-xs text-slate-600 leading-relaxed pt-1 font-normal">
                        {stage.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-caption text-xs text-slate-600 font-medium">
                Peer-level collaboration • Defined deliverables • Mutual growth
              </span>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0c2940] hover:bg-[#163a59] text-white font-h2 text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
              >
                <span>Apply Blueprint to Your Organization</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#f8c51c]" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

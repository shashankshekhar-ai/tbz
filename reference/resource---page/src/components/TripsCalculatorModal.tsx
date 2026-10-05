import React, { useState } from 'react';
import { X, Check, Calculator, Download, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface TripsCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadFullScorecard: () => void;
}

export const TripsCalculatorModal: React.FC<TripsCalculatorModalProps> = ({
  isOpen,
  onClose,
  onDownloadFullScorecard
}) => {
  const [initiativeName, setInitiativeName] = useState('Vendor Contract Deviation Triage');
  const [time, setTime] = useState<number>(4);
  const [risk, setRisk] = useState<number>(4); // 5 = lowest risk
  const [impact, setImpact] = useState<number>(5);
  const [pain, setPain] = useState<number>(5);
  const [security, setSecurity] = useState<number>(4);

  if (!isOpen) return null;

  // Weighted calculation matching TBG methodology
  const rawScore = (time * 20 + risk * 20 + impact * 25 + pain * 25 + security * 10) / 10;
  const score = Math.round(rawScore);

  let recommendation = {
    tier: 'Tier 1 · Immediate Pilot',
    badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    summary: 'High impact, acute pain, and manageable execution risk. Greenlight for a 30-day contained sandbox pilot.'
  };

  if (score < 60) {
    recommendation = {
      tier: 'Tier 3 · Deprioritize',
      badgeClass: 'text-rose-700 bg-rose-50 border-rose-200',
      summary: 'High implementation friction or insufficient business impact. Defer until higher-value operational pain points are addressed.'
    };
  } else if (score < 80) {
    recommendation = {
      tier: 'Tier 2 · Secondary Discovery',
      badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
      summary: 'Promising upside with moderate friction. Conduct a targeted 2-week risk and workflow discovery before committing capital.'
    };
  }

  const dimensions = [
    {
      key: 'time',
      name: 'Time',
      label: 'Speed to Value',
      value: time,
      setter: setTime,
      low: 'Months of bespoke dev',
      high: 'Live in <14 days'
    },
    {
      key: 'risk',
      name: 'Risk',
      label: 'Governance & Containment',
      value: risk,
      setter: setRisk,
      low: 'Complex compliance exposure',
      high: 'Contained internal data'
    },
    {
      key: 'impact',
      name: 'Impact',
      label: 'Efficiency / Revenue Multiplier',
      value: impact,
      setter: setImpact,
      low: 'Minor convenience',
      high: 'Strategic operational leverage'
    },
    {
      key: 'pain',
      name: 'Pain',
      label: 'Acute Operational Bottleneck',
      value: pain,
      setter: setPain,
      low: 'Occasional nuisance',
      high: 'Severe weekly staff burnout'
    },
    {
      key: 'security',
      name: 'Security',
      label: 'Data Integrity & Grounding',
      value: security,
      setter: setSecurity,
      low: 'Unmonitored third-party SaaS',
      high: 'Audit-logged enterprise tenant'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0c2940]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#0c2940]"
      >
        {/* Header */}
        <div className="bg-[#0c2940] px-6 py-4 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#f8c51c]" />
            <h3 className="font-h2 text-base sm:text-lg font-bold text-white">
              Interactive TRIPS Prioritization Evaluator
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Candidate AI Initiative / Use Case Name
            </label>
            <input
              type="text"
              value={initiativeName}
              onChange={(e) => setInitiativeName(e.target.value)}
              placeholder="e.g. Automated Supplier RFP Comparison"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-white font-medium text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
            />
          </div>

          {/* 5 Dimensions Sliders */}
          <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
              <span className="font-semibold text-slate-700">TRIPS Dimension</span>
              <span>Rating (1 - 5)</span>
            </div>

            {dimensions.map((dim) => (
              <div key={dim.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-[#0c2940] font-h2">{dim.name}</span>
                    <span className="text-slate-500 font-normal">({dim.label})</span>
                  </div>
                  <span className="font-mono font-bold text-[#0c2940] bg-white border border-slate-200 px-2 py-0.5 rounded text-xs">
                    {dim.value} / 5
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={dim.value}
                  onChange={(e) => dim.setter(parseInt(e.target.value, 10))}
                  className="w-full accent-[#39918d] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>1: {dim.low}</span>
                  <span>5: {dim.high}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Result Card */}
          <div className="bg-[#0c2940] text-white rounded-xl p-5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#f8c51c] font-mono uppercase tracking-wider font-semibold">
                  TRIPS Score
                </span>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-white/80">{recommendation.tier}</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                {recommendation.summary}
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-white/10 sm:pl-6 shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
              <span className="text-xs text-slate-400 block">Index Score</span>
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#f8c51c] tabular-nums">
                {score}<span className="text-lg text-slate-400 font-normal">/100</span>
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                setTime(3);
                setRisk(3);
                setImpact(3);
                setPain(3);
                setSecurity(3);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Values</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onDownloadFullScorecard();
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 cursor-pointer shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full Scorecard</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

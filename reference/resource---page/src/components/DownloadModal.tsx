import React, { useState } from 'react';
import { X, CheckCircle2, Download, ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { PlaybookResource, UNIVERSAL_GRANT_PROMPT } from '../data/playbookData';

interface DownloadModalProps {
  resource: PlaybookResource;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ resource, onClose }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const generateFileContent = (res: PlaybookResource): string => {
    const divider = '======================================================================\n';
    let content = `THE BRADBURY GROUP · EXECUTIVE PLAYBOOK RESOURCE\n`;
    content += `Resource: ${res.metaString}\n`;
    content += `Title: ${res.title}\n`;
    content += divider;
    content += `OVERVIEW:\n${res.subtitle}\n\n`;
    content += `CORE HIGHLIGHTS:\n`;
    res.highlights.forEach((h, i) => {
      content += `  [${i + 1}] ${h}\n`;
    });
    content += `\n` + divider;

    if (res.id === 'leadership-case') {
      content += `
PRE-WRITTEN BUSINESS CASE MEMORANDUM
To: Executive Leadership / Chief Operating Officer / Human Resources Director
From: [Your Name & Role]
Subject: Strategic Investment in AI Workforce Fluency & Workflow Transformation

1. EXECUTIVE SUMMARY & ROI RATIONALE:
Our organization faces a critical inflection point: AI tooling is already permeating daily operations via ad-hoc individual usage. Without structured capability building, we incur significant data security exposure and fragmented productivity.
By partnering with The Bradbury Group, we deploy a battle-tested upskilling architecture that turns passive tool experimentation into verifiable operational leverage.

2. DEPARTMENT OF LABOR (DOL) COMPETENCY FRAMEWORK ALIGNMENT:
The program explicitly aligns with federal DOL Workforce Modernization benchmarks:
- Foundation 1: Data ethics, model boundary awareness, and privacy governance.
- Foundation 2: High-leverage task decomposition and prompt engineering rigor.
- Foundation 3: Human-in-the-loop auditability and automated pipeline maintenance.

3. TIME COMMITMENT & PARTICIPATION STRUCTURE:
- Frequency: 2 structured cohort sessions per week (~2 hours each)
- Applied Homework: ~1 hour of applied workflow redesign on live operational tasks.
- Duration: 4-6 weeks with measurable milestone defenses.

4. COMPETITIVE RISK OF INACTION:
Industry peers adopting systematic AI workflows report 3.4x faster cohort ramp-up and a 40%+ reduction in recurring transactional task cycle times. Inaction risks institutional lag and unchecked shadow IT liabilities.
`;
    } else if (res.id === 'strategy-trips') {
      content += `
TRIPS PRIORITIZATION SCORECARD (SCORE BEFORE YOU SPEND)
Score every prospective enterprise AI initiative from 1 to 5 across the 5 TRIPS dimensions:

1. TIME (Speed to Value):
   1 = >6 months to prototype | 3 = 60-90 days | 5 = Operational win in <14 days
2. RISK (Regulatory, Privacy, and Execution Risk):
   1 = Extreme compliance liability | 3 = Contained internal data | 5 = Zero external PII exposure
3. IMPACT (Revenue or Efficiency Multiplier):
   1 = Marginal vanity polish | 3 = Measurable department hours saved | 5 = Strategic multiplier
4. PAIN (Current Operational Bottleneck):
   1 = Minor friction | 3 = Chronic weekly slowdown | 5 = Mission-critical operational blockage
5. SECURITY (Governance, Source Grounding, and Audit Trail):
   1 = High shadow IT risk | 3 = SOC-2 tenant requirement | 5 = Fully grounded, local / audited environment

SCORING FORMULA:
TRIPS Priority Index = (Time * 1.5) + (Risk_Inverted * 2.0) + (Impact * 2.5) + (Pain * 2.5) + (Security * 1.5)
Target Priority:
- Score > 40: Phase 1 Immediate Pilot (Fund first)
- Score 28 - 40: Phase 2 Secondary Exploration
- Score < 28: Deprioritize immediately.
`;
    } else if (res.id === 'workforce-readiness') {
      content += `
THE CORE 4 WORKFORCE READINESS WORKSHEET
"Prove one use case. That proof becomes the playbook for the next."

STEP 1: PAIN POINT IDENTIFICATION
- What recurring operational task takes >4 hours per week per staff member?
- Where do handoffs between teams stall due to unstructured formatting?
- What task do knowledge workers describe as mentally exhausting but repetitive?

STEP 2: USE CASE FORMULATION
- Input: What source documents or raw data will be provided?
- Transformation: What exact logical operations should the model perform?
- Output Boundary: What schema, tone, and format must the final deliverable adhere to?

STEP 3: 30-DAY CONTAINED PILOT
- Cohort: Select 5-8 frontline practitioners (not just managers).
- Sandboxing: Provision secure enterprise accounts with no external data training.
- Check-ins: Bi-weekly 20-minute calibration huddles to share prompt formulas.

STEP 4: SUCCESS METRIC DEFENSE
- Metric 1: Cycle time reduction (hours saved per week).
- Metric 2: Error rate / rework frequency.
- Metric 3: Qualitative user confidence and peer replication.
`;
    } else if (res.id === 'tax-credits-funding') {
      content += `\n` + UNIVERSAL_GRANT_PROMPT + `\n`;
    }

    content += `\n` + divider;
    content += `© ${new Date().getFullYear()} The Bradbury Group. All rights reserved.\n`;
    content += `Partners in Learning & Growth · Engineering the AI-First Organization.\n`;
    return content;
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const fileData = generateFileContent(resource);
      const blob = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = resource.downloadFileName.replace('.pdf', '.txt').replace('.xlsx', '.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsProcessing(false);
      setDownloaded(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0c2940]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#0c2940]"
      >
        {/* Navy Header */}
        <div className="bg-[#0c2940] px-6 py-4 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-wider text-[#f8c51c]">
              {resource.metaString}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {downloaded ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-[#39918d]/15 text-[#39918d] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#39918d]/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="font-h2 text-xl font-bold text-[#0c2940]">
                  Download Complete
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your copy of <span className="font-semibold text-[#0c2940]">"{resource.title}"</span> has been prepared and downloaded.
                </p>
              </div>

              {/* Exact user requirement notice */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1.5 text-left max-w-sm mx-auto">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#39918d] shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold text-[#0c2940]">TBG Open Playbook Guarantee:</span> After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click anytime.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#0c2940] hover:bg-[#0c2940]/90 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer font-h3"
                >
                  Back to Playbook
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-5">
              <div>
                <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#39918d]" />
                  <span>The Bradbury Group · Field Framework</span>
                </div>
                <h3 className="font-h2 text-xl font-bold text-[#0c2940]">
                  {resource.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {resource.subtitle}
                </p>
              </div>

              {/* Highlights preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                  Included in this package:
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  {resource.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#39918d] font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  />
                </div>
              </div>

              {/* Notice */}
              <p className="text-[11px] text-slate-500 leading-normal">
                After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] font-h3 font-bold text-xs uppercase tracking-wider transition-all shadow hover:shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Preparing File...' : resource.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

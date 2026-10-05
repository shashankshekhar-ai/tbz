'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, FileText } from 'lucide-react';

export const ManagerLetterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const letterText = `Subject: Professional Development Proposal: The Bradbury Group AI Fluency Cohort

Dear [Manager Name],

I am requesting approval to enroll in The Bradbury Group's 12-week AI Fluency Cohort, an evidence-based professional development program aligned with the U.S. Department of Labor Federal AI Literacy Framework.

Key Business Highlights:
• Regulatory alignment: DOL framework is the federal standard
• Competitive risk: Teams without AI fluency fall behind on productivity and retention
• Affordable structured learning with immediate implementation
• Competencies: Understand · Use · Direct · Evaluate · Use Responsibly
• Opportunity for a 56% wage premium with these skills in hand
• Documented time savings and confidence gains across every cohort participant to date

Commitment:
• Your role: Approve enrollment, allocate 2 sessions/week (~2 hrs + homework)
• Our role: Deliver cohort-based learning with measurable outcomes

Thank you for investing in structured AI capability that brings measurable ROI back to our team.

Sincerely,
[Your Name]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Manager Sign-off Letter — The Bradbury Group</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #0c2940; max-width: 700px; margin: 40px auto; padding: 0 20px; }
            h1 { color: #0c2940; font-size: 20px; border-bottom: 2px solid #39918d; padding-bottom: 8px; }
            h2 { color: #3f6d67; font-size: 16px; margin-top: 24px; }
            ul { padding-left: 20px; }
            li { margin-bottom: 6px; }
            .footer { margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #ccc; padding-top: 12px; }
          </style>
        </head>
        <body>
          <h1>The Bradbury Group · AI Cohort Manager Letter</h1>
          <h2>“Start Building Something That Works Today”</h2>
          <p>Dear Manager,</p>
          <p>I am requesting approval to enroll in The Bradbury Group's evidence-based AI Fluency Cohort.</p>
          <ul>
            <li><strong>Regulatory alignment:</strong> DOL framework is the federal standard</li>
            <li><strong>Competitive risk:</strong> Teams without AI fluency fall behind on productivity and retention</li>
            <li><strong>Affordable structured learning</strong> with immediate implementation</li>
            <li><strong>Competencies:</strong> Understand · Use · Direct · Evaluate · Use Responsibly</li>
            <li><strong>Opportunity for a 56% wage premium</strong> with these skills in hand</li>
            <li><strong>Documented time savings</strong> and confidence gains across every cohort participant to date</li>
            <li><strong>Their role:</strong> Approve enrollment, allocate 2 sessions/week (~2 hrs + homework)</li>
            <li><strong>Our role:</strong> Deliver cohort-based learning with measurable outcomes</li>
          </ul>
          <p>Thank you for supporting structured AI enablement.</p>
          <div class="footer">The Bradbury Group · Engineering the AI-First Organization</div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <section className="bg-[#fbfdfd] text-[#0c2940] py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-h3 font-medium uppercase tracking-widest text-[#39918d] mb-2">
          Manager Letter
        </div>

        <h2 className="font-h2 text-2xl sm:text-4xl font-bold text-[#0c2940] tracking-tight mb-4">
          Need your manager’s sign-off?
        </h2>

        <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed mb-6 max-w-3xl">
          We wrote the letter. Download, forward, or copy-paste. It covers business case, ROI, and
          what we need from them.
        </p>

        {/* Letter Container */}
        <div className="bg-[#ffffff] rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <h3 className="font-h2 text-lg sm:text-xl font-bold text-[#0c2940] mb-4">
            “Start Building Something That Works Today”
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 font-body text-sm sm:text-base text-slate-700 mb-6">
            <li className="flex items-start gap-2.5">
              <span className="text-[#3f6d67] font-bold">•</span>
              <span>Regulatory alignment: DOL framework is the federal standard</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#3f6d67] font-bold">•</span>
              <span>Competitive risk: Teams without AI fluency fall behind on productivity and retention</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#3f6d67] font-bold">•</span>
              <span>Affordable structured learning with immediate implementation</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#3f6d67] font-bold">•</span>
              <span>Competencies: Understand · Use · Direct · Evaluate · Use Responsibly</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#3f6d67] font-bold">•</span>
              <span>Opportunity for a 56% wage premium with these skills in hand</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#3f6d67] font-bold">•</span>
              <span>Documented time savings and confidence gains across every cohort participant to date</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#3f6d67] font-bold">•</span>
              <span>Their role: Approve enrollment, allocate 2 sessions/week (~2 hrs + homework)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#3f6d67] font-bold">•</span>
              <span>Our role: Deliver cohort-based learning with measurable outcomes</span>
            </li>
          </ul>

          {/* Download manager letter (PDF) · Copy text */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0c2940] hover:bg-[#163f61] text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download manager letter (PDF)</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0c2940] text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>Copy text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import Link from "next/link";
import { Download, ShieldCheck } from "lucide-react";

export function TaxReimbursementSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f7f9fa]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Tax & Employer Reimbursement */}
        <div className="bg-white border border-[#3f6d67]/30 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#39918d]/15 border border-[#39918d]/30 flex items-center justify-center text-[#39918d] shrink-0 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="space-y-3.5 flex-1">
              <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-[#0c2940]">
                Tax &amp; Employer Reimbursement
              </h2>
              <p className="text-sm sm:text-base font-roboto text-[#0c2940]/80 leading-relaxed">
                Cohort tuition often qualifies for employer professional-development
                reimbursement or as a deductible continuing-education expense. We recommend
                checking with your employer&apos;s learning budget or a tax professional — we can
                provide an itemized invoice and program outline on request.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-montserrat font-semibold text-[#39918d]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30">
                  <span className="w-2 h-2 rounded-full bg-[#f8c51c]" />
                  Itemized Corporate Invoicing Available
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30">
                  <span className="w-2 h-2 rounded-full bg-[#f8c51c]" />
                  Detailed Program Outline on Request
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Manager sign-off */}
        <div className="bg-[#0c2940] text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-white">
              Need manager sign-off?
            </h3>
            <p className="text-sm sm:text-base font-roboto text-white/80 max-w-xl">
              Download a pre-written recommendation letter template to make the case for your
              manager to approve enrollment.
            </p>
          </div>

          <Link
            href="/resources/manager-recommendation-letter"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-inter font-semibold text-sm shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Letter</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

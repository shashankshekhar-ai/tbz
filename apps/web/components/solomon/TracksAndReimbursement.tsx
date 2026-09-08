import { Compass, FileText } from "lucide-react";

export function TracksAndReimbursement() {
  return (
    <section className="py-20 md:py-28 bg-white text-[#0c2940] border-b border-[#0c2940]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div
          id="walter-track"
          className="relative overflow-hidden rounded-3xl bg-[#0c2940] text-white p-8 sm:p-12 md:p-16 border border-white/10 shadow-xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39918d]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#39918d]/20 border border-[#39918d]/40 mb-6">
              <Compass className="w-4 h-4 text-[#f8c51c]" />
              <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#39918d]">
                Specialized Track
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold tracking-tight text-white mb-4">
              Walter — L&amp;D Strategist Track
            </h2>
            <h3 className="text-xl sm:text-2xl font-montserrat font-medium text-[#f8c51c] mb-6">
              A dedicated track for learning &amp; development leaders
            </h3>
            <p className="text-base sm:text-lg font-roboto text-white/85 leading-relaxed">
              Walter is our specialized curriculum track for L&amp;D strategists building internal
              AI capability programs — covering instructional design for AI fluency, change
              management, and measurement frameworks tailored to training organizations.
            </p>
          </div>
        </div>

        <div
          id="reimbursement"
          className="rounded-3xl bg-[#f8fafb] border border-[#0c2940]/15 p-8 sm:p-12 md:p-16 shadow-lg"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c57b4b]/15 border border-[#c57b4b]/30 mb-6">
            <FileText className="w-4 h-4 text-[#c57b4b]" />
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#c57b4b]">
              Tuition & Funding Support
            </span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold tracking-tight text-[#0c2940] mb-6">
            Tax &amp; Employer Reimbursement
          </h2>
          <p className="text-base sm:text-lg font-roboto text-[#0c2940]/85 leading-relaxed">
            Professional development and executive education expenses, including cohort tuition,
            are often eligible for employer tuition-reimbursement programs and may qualify as a
            deductible business expense. We recommend confirming eligibility with your employer&rsquo;s
            L&amp;D budget or a tax professional — our team can provide an itemized invoice and
            program outline to support your reimbursement request.
          </p>
        </div>
      </div>
    </section>
  );
}

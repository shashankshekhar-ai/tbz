import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { AiWaveCanvas } from "./AiWaveCanvas";

export function HomeClosingCta({
  headline,
  buttonText,
  subtext,
}: {
  headline: string;
  buttonText: string;
  subtext: string;
}) {
  return (
    <section id="closing-cta" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[20px] bg-[#0c2940] text-white p-10 sm:p-14 text-center shadow-2xl border border-[#39918d]/40 group">
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <AiWaveCanvas />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-extrabold text-white leading-tight tracking-tight">
            {headline}
          </h2>

          <p className="text-base sm:text-lg text-[#D9E3E6] font-roboto max-w-xl mx-auto leading-relaxed">
            {subtext}
          </p>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-[#c57b4b] hover:bg-[#f8c51c] text-white hover:text-[#0c2940] font-inter font-semibold px-8 py-4 rounded-xl text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#f8c51c]/50 group/btn"
            >
              <Calendar className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
              <span>{buttonText}</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <p className="text-xs font-roboto italic text-[#BFC9CD]">
            Confidential 30-minute strategic consultation with our senior executive team.
          </p>
        </div>
      </div>
    </section>
  );
}

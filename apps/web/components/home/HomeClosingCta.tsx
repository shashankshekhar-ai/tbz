import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
      <div className="relative starfield-bg rounded-3xl p-8 sm:p-14 text-center text-white overflow-hidden border border-[#39918d]/30 shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full">
            <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="#39918d" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="#c57b4b" strokeWidth="0.5" />
            <circle cx="10%" cy="20%" r="2" fill="#f8c51c" />
            <circle cx="40%" cy="50%" r="2.5" fill="#39918d" />
            <circle cx="80%" cy="30%" r="2" fill="#ffffff" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold tracking-tight text-white">
            {headline}
          </h2>

          <p className="text-sm sm:text-base text-[#D9E3E6] font-roboto max-w-2xl mx-auto leading-relaxed">
            {subtext}
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-inter font-semibold uppercase tracking-wider text-white bg-[#39918d] hover:bg-[#3f6d67] transition-all shadow-xl hover:shadow-[#39918d]/20 border border-[#39918d]/50 group"
            >
              <Calendar className="w-4 h-4 text-[#f8c51c]" />
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <p className="text-[11px] text-[#D9E3E6] font-roboto italic">
              Confidential 30-minute strategic consultation with our senior executive team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

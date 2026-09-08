import { ChevronRight } from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { HeadParticles } from "@/components/ai-fluency/HeadParticles";

export function HeroSection() {
  return (
    <section className="relative -mt-20 pt-14 pb-20 md:pt-20 md:pb-24 bg-[#0c2940] text-white overflow-hidden border-b border-[#3f6d67]/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
      <ParticleBackground variant="dark" />

      {/* Ambient glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-[#39918d]/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#c57b4b]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3f6d67]/15 blur-3xl pointer-events-none rounded-full" />

      {/* Small particle sparkle layer, biased toward the badge/head area */}
      <HeadParticles className="z-0 opacity-80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* "FOR YOU" badge with sparkle halo */}
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-4 pointer-events-none -z-10 flex items-center justify-center">
            <span className="absolute -top-1 -left-3 w-1.5 h-1.5 rounded-full bg-[#f8c51c]/30 animate-ping [animation-duration:3s]" />
            <span className="absolute -bottom-1 -right-3 w-1.5 h-1.5 rounded-full bg-[#39918d]/35 animate-pulse [animation-duration:2.4s]" />
            <span className="absolute top-1 -right-5 w-1 h-1 rounded-full bg-white/25 animate-ping [animation-duration:3.8s]" />
            <div className="w-28 h-12 bg-[#39918d]/15 blur-xl rounded-full" />
          </div>

          <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3f6d67]/30 border border-[#39918d]/40 backdrop-blur-sm shadow-sm transition-transform hover:scale-105">
            <span className="w-2 h-2 rounded-full bg-[#f8c51c] animate-pulse" />
            <span className="font-inter text-xs font-bold uppercase tracking-widest text-[#f8c51c]">
              For You
            </span>
          </div>
        </div>

        <h1 className="font-inter text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 max-w-3xl mx-auto">
          AI Fluency Cohort
        </h1>

        <p className="font-caption text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed mb-8">
          A structured, two-phase program engineered for leaders seeking strategic AI mastery.
        </p>

        <div className="flex items-center justify-center">
          <a
            href="#cohort-overview"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#3f6d67]/40 hover:bg-[#3f6d67]/60 text-white border border-[#39918d]/60 font-montserrat font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Explore the 2-Phase Path</span>
            <ChevronRight className="w-5 h-5 text-[#f8c51c]" />
          </a>
        </div>
      </div>
    </section>
  );
}

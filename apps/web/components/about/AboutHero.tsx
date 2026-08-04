import Image from "next/image";
import { ArrowRight, ChevronDown, PlayCircle } from "lucide-react";

export function AboutHero() {
  return (
    <section
      id="hero"
      className="relative -mt-20 min-h-screen pt-28 pb-16 bg-[#0c2940] text-white overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block">
              About Us
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-inter font-extrabold tracking-tight leading-[1.12] text-white">
              Human Intelligence. <br />
              <span className="text-[#39918d]">AI Transformation.</span> <br />
              Built on Trust.
            </h1>

            <p className="text-sm sm:text-base font-roboto text-[#D9E3E6] leading-relaxed max-w-xl">
              Transformation begins with people — not technology. The Bradbury Group helps
              leaders, organizations and teams build lasting AI capability through
              psychology-first learning architecture, executive guidance and ethical
              implementation.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#founder"
                className="bg-[#39918d] hover:bg-[#2d7774] text-white font-inter font-semibold text-sm px-6 py-3.5 rounded-lg shadow-lg hover:shadow-[#39918d]/30 hover:scale-[1.02] transition-all duration-200 flex items-center space-x-2 group"
              >
                <span>Meet Paige</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#philosophy"
                className="border border-white/30 hover:border-[#39918d] text-white font-inter font-medium text-sm px-6 py-3.5 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-200 flex items-center space-x-2.5"
              >
                <PlayCircle className="w-4 h-4 text-white" />
                <span>Explore Our Framework</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
            <div className="relative w-full h-[480px] sm:h-[520px] flex items-center justify-center">
              <Image
                src="/brand/Intelligence.png"
                alt="AI Intelligence Illustration"
                width={800}
                height={800}
                className="w-[90%] h-auto max-w-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-6 flex items-center justify-between">
        <div className="w-24 hidden sm:block" />

        <div className="mx-auto flex flex-col items-center justify-center space-y-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-inter font-bold tracking-widest text-[#BFC9CD] uppercase">
            SCROLL DOWN
          </span>
          <a
            href="#founder"
            className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#39918d] hover:text-[#39918d] transition-all"
            aria-label="Scroll to founder section"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

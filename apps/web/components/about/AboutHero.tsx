import { Shield, Cpu, Users } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";

export function AboutHero() {
  return (
    <section className="relative flex flex-col justify-center pt-24 sm:pt-28 lg:pt-28 pb-8 sm:pb-10 lg:pb-12 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#0c2940] via-[#0c2940] to-[#082033] overflow-hidden border-b border-[#3f6d67]/30">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#39918d]/15 pointer-events-none blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#3f6d67]/20 pointer-events-none blur-3xl rounded-full" />
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-[#f8c51c]/10 pointer-events-none blur-3xl rounded-full" />

      <ParticleBackground variant="dark" />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f8c51c] text-xs sm:text-sm font-h2 font-bold tracking-wider uppercase">
            <span>The Bradbury Philosophy</span>
          </div>

          <h1 className="font-h1 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white leading-[1.1] tracking-tight">
            Learning transformation <br />
            <span className="bg-gradient-to-r from-[#39918d] via-[#f8c51c] to-[#c57b4b] bg-clip-text text-transparent drop-shadow-sm">
              starts with people.
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-3xl font-normal">
            AI capability isn&rsquo;t built by checking boxes. It&rsquo;s built by creating the conditions where
            people can experiment, struggle, adapt, and gain confidence.
          </p>
        </div>

        {/* Condition cards */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-[#0c2940] rounded-2xl p-4 sm:p-5 border border-[#3f6d67]/50 hover:border-[#39918d] transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between group backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#39918d]/15 border border-[#39918d]/30 flex items-center justify-center text-[#39918d] group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-[#39918d]" />
                </div>
                <span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#39918d] bg-[#39918d]/15 px-2.5 py-1 rounded-full border border-[#39918d]/30">
                  Condition 01
                </span>
              </div>

              <h2 className="font-h2 text-lg font-bold text-white mb-1.5 group-hover:text-[#39918d] transition-colors">
                Psychological Safety
              </h2>

              <p className="font-body text-sm sm:text-[15px] text-slate-300 leading-snug">
                Safe-to-fail environments where people can freely{" "}
                <strong className="text-white font-semibold">experiment</strong>, test prompt limits, and make
                mistakes without fear of judgment or compliance risk.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#3f6d67]/30 flex items-center justify-between">
              <span className="font-caption text-xs font-bold text-[#39918d] tracking-wide uppercase">
                Zero-Risk Sandbox
              </span>
              <span className="text-xs text-slate-400 font-medium">Safe Practice</span>
            </div>
          </div>

          <div className="bg-[#0c2940] rounded-2xl p-4 sm:p-5 border border-[#3f6d67]/50 hover:border-[#c57b4b] transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between group backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#c57b4b]/15 border border-[#c57b4b]/30 flex items-center justify-center text-[#c57b4b] group-hover:scale-110 transition-transform">
                  <Cpu className="w-5 h-5 text-[#c57b4b]" />
                </div>
                <span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#c57b4b] bg-[#c57b4b]/15 px-2.5 py-1 rounded-full border border-[#c57b4b]/30">
                  Condition 02
                </span>
              </div>

              <h2 className="font-h2 text-lg font-bold text-white mb-1.5 group-hover:text-[#c57b4b] transition-colors">
                Learning Architecture
              </h2>

              <p className="font-body text-sm sm:text-[15px] text-slate-300 leading-snug">
                Structured multi-phase progression where teams{" "}
                <strong className="text-white font-semibold">struggle &amp; adapt</strong> together through real
                workflows, converting initial friction into lasting fluency.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#3f6d67]/30 flex items-center justify-between">
              <span className="font-caption text-xs font-bold text-[#c57b4b] tracking-wide uppercase">
                Workflow Grounded
              </span>
              <span className="text-xs text-slate-400 font-medium">Applied Fluency</span>
            </div>
          </div>

          <div className="bg-[#0c2940] rounded-2xl p-4 sm:p-5 border border-[#3f6d67]/50 hover:border-[#f8c51c] transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between group backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#f8c51c]/15 border border-[#f8c51c]/30 flex items-center justify-center text-[#f8c51c] group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5 text-[#f8c51c]" />
                </div>
                <span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#f8c51c] bg-[#f8c51c]/15 px-2.5 py-1 rounded-full border border-[#f8c51c]/30">
                  Condition 03
                </span>
              </div>

              <h2 className="font-h2 text-lg font-bold text-white mb-1.5 group-hover:text-[#f8c51c] transition-colors">
                Workforce Readiness
              </h2>

              <p className="font-body text-sm sm:text-[15px] text-slate-300 leading-snug">
                Equipping people to <strong className="text-white font-semibold">gain confidence</strong> as
                autonomous builders who deploy, govern, and scale bespoke AI tools that drive measurable business
                impact.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#3f6d67]/30 flex items-center justify-between">
              <span className="font-caption text-xs font-bold text-[#f8c51c] tracking-wide uppercase">
                Measurable ROI
              </span>
              <span className="text-xs text-slate-400 font-medium">Lasting Impact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

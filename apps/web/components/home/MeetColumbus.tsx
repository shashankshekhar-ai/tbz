"use client";

function openColumbus() {
  window.dispatchEvent(new CustomEvent("open-columbus"));
}

export function MeetColumbus() {
  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={openColumbus}
          className="group w-full rounded-3xl bg-[#F6F7F9] hover:bg-white transition-all duration-300 border border-slate-200 hover:border-[#39918d]/30 shadow-sm hover:shadow-lg px-10 py-8 text-left"
        >
          <p className="text-sm md:text-base uppercase tracking-[0.18em] text-slate-500 font-bold mb-2">
            2. MEET COLUMBUS
          </p>

          <h3 className="text-1xl md:text-1xl font-h3 text-[#0C2940]">
            Columbus is our AI assistant. It&apos;ll ask a few questions about what you&apos;re looking for, and our team follows up personally —
            no bots deciding anything, no automated sales pitch. Full details on how it works are one click away.
          </h3>
        </button>
      </div>
    </section>
  );
}

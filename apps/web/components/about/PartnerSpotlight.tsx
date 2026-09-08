"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Building2, ChevronRight } from "lucide-react";

export interface Partner {
  id: string;
  name: string;
  founder?: string;
  focus?: string;
  description?: string;
  outcome?: string;
  pullQuote?: string;
  philosophy?: string;
  isPending: boolean;
  category?: string;
}

export function PartnerSpotlight({ partners }: { partners: Partner[] }) {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(partners[0]?.id ?? "");

  const selectedPartner = partners.find((p) => p.id === selectedPartnerId) ?? partners[0];

  return (
    <section id="partners" className="relative py-24 px-6 sm:px-8 lg:px-12 bg-white border-b border-slate-200 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 glow-copper pointer-events-none opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline mb-16 border-b border-slate-200 pb-8">
          <div className="lg:col-span-3 flex items-baseline gap-4">
            <span className="font-h1 font-black text-6xl sm:text-8xl lg:text-9xl text-slate-200 tracking-tighter select-none">
              02
            </span>
            <div className="h-12 w-[1px] bg-slate-200 hidden lg:block" />
          </div>

          <div className="lg:col-span-9 space-y-2">
            <span className="font-h2 text-xs font-bold uppercase tracking-[0.2em] text-[#c57b4b]">
              Ecosystem &amp; Collaboration
            </span>
            <h2 className="font-h2 font-extrabold text-3xl sm:text-5xl text-[#0c2940]">Partner Spotlight</h2>
            <p className="font-body text-slate-700 text-base sm:text-lg font-normal max-w-2xl">
              Collaborating with industry pioneers, revenue strategists, and AI alliances to deliver strategy
              before implementation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 sm:p-10 relative min-h-[520px] flex flex-col justify-between shadow-sm">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <span className="font-caption text-xs font-bold uppercase tracking-widest text-[#39918d] block mb-1">
                    {selectedPartner.category || "Strategic Partner"}
                  </span>
                  <h3 className="font-h2 font-bold text-2xl sm:text-4xl text-[#0c2940] tracking-tight">
                    {selectedPartner.name}
                  </h3>
                </div>

                {selectedPartner.founder ? (
                  <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-right shadow-xs">
                    <span className="font-h3 text-xs font-medium text-[#c57b4b] block">{selectedPartner.founder}</span>
                    <span className="font-caption text-[11px] text-slate-600 font-medium">Leadership</span>
                  </div>
                ) : (
                  <span className="font-caption text-xs text-[#c57b4b] bg-[#c57b4b]/10 px-3 py-1 rounded-lg border border-[#c57b4b]/30 font-bold">
                    Partner Profile Active
                  </span>
                )}
              </div>

              {selectedPartner.focus && (
                <div>
                  <span className="font-caption text-xs text-slate-500 uppercase tracking-wider block mb-1 font-bold">
                    Domain Focus
                  </span>
                  <p className="font-h2 text-lg font-bold text-[#0c2940]">{selectedPartner.focus}</p>
                </div>
              )}

              {!selectedPartner.isPending && selectedPartner.description ? (
                <div className="space-y-6">
                  <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    {selectedPartner.description}
                  </p>

                  {selectedPartner.pullQuote && (
                    <div className="p-6 bg-[#c57b4b]/10 border-l-4 border-[#c57b4b] rounded-r-xl shadow-xs">
                      <span className="font-h2 font-bold text-base sm:text-lg text-[#c57b4b] block">
                        &ldquo;{selectedPartner.pullQuote}&rdquo;
                      </span>
                    </div>
                  )}

                  {selectedPartner.outcome && (
                    <div className="p-5 bg-white border border-teal-200 rounded-xl space-y-2 shadow-xs">
                      <div className="flex items-center gap-2 text-[#39918d]">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-h2 text-xs uppercase font-bold tracking-wider">
                          Measurable Outcome &amp; Client Impact
                        </span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {selectedPartner.outcome}
                      </p>
                    </div>
                  )}

                  {selectedPartner.philosophy && (
                    <p className="font-caption text-xs text-slate-600 italic pt-2 font-medium">
                      {selectedPartner.philosophy}
                    </p>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center space-y-4 bg-white border border-dashed border-slate-300 rounded-2xl p-8">
                  <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
                  <div>
                    <h4 className="font-h2 font-bold text-[#0c2940] text-lg">{selectedPartner.name}</h4>
                    <p className="font-caption text-sm text-[#c57b4b] mt-1 font-medium">
                      Partner profile coming soon
                    </p>
                  </div>
                  <p className="font-body text-xs text-slate-600 max-w-md mx-auto font-normal">
                    Strategic collaboration details and curriculum frameworks are currently being formatted for
                    publication.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <span className="font-caption text-xs text-slate-600 font-medium">
                Peer-Level Collaboration • Strategy Before Implementation
              </span>

              <Link
                href="/contact"
                className="flex items-center gap-2 text-xs font-h2 font-bold text-[#39918d] hover:text-[#0c2940] transition-colors"
              >
                <span>Inquire About Strategic Partnerships</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#0c2940]">
                Partner Index
              </span>
              <span className="font-caption text-xs text-[#39918d] font-bold">{partners.length} Collaborations</span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {partners.map((partner) => {
                const isSelected = partner.id === selectedPartnerId;
                return (
                  <button
                    key={partner.id}
                    onClick={() => setSelectedPartnerId(partner.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#0c2940] border-[#0c2940] text-white shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <span className="font-h2 text-xs font-bold block">{partner.name}</span>
                      {partner.founder && (
                        <span
                          className={`font-caption text-[10px] block ${isSelected ? "text-slate-200" : "text-slate-500"}`}
                        >
                          {partner.founder}
                        </span>
                      )}
                      {partner.isPending && (
                        <span
                          className={`font-caption text-[10px] block ${isSelected ? "text-[#f8c51c]" : "text-[#c57b4b]"}`}
                        >
                          Profile coming soon
                        </span>
                      )}
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-white translate-x-1" : "text-slate-400 group-hover:text-slate-800"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

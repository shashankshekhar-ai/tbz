"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Star, ChevronRight, ArrowUpRight } from "lucide-react";

export interface Partner {
  id: string;
  name: string;
  founder: string;
  desc: string;
  website: string;
  featured?: boolean;
  status?: string;
}

export function PartnerGrid({ partners }: { partners: Partner[] }) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const mainPartners = partners.filter((p) => p.desc);
  const bottomPartners = partners.filter((p) => !p.desc);

  return (
    <section id="partners" className="py-24 bg-[#F7F8F9] text-[#0c2940] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block">
              Our Partners
            </span>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-semibold text-[#0c2940]">Partner Spotlight</h2>
            <p className="text-sm font-roboto text-[#60707A] leading-relaxed">
              Strategic partnerships that expand client outcomes.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="border border-[#0c2940]/20 hover:border-[#39918d] text-[#0c2940] hover:text-[#39918d] font-inter font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all flex items-center space-x-2 bg-white shadow-sm w-fit"
              >
                <span>Become a Partner</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mainPartners.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  className="text-left bg-white rounded-xl border border-[#D9E3E6] p-6 shadow-sm hover:shadow-lg hover:border-[#39918d] transition-all duration-300 relative group cursor-pointer flex flex-col justify-between"
                >
                  {partner.featured && (
                    <div className="absolute top-3 right-3 bg-[#f8c51c]/20 text-[#0c2940] border border-[#f8c51c] text-[10px] font-inter font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-[#f8c51c]" />
                      <span>Featured Partner</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0c2940] text-[#39918d] flex items-center justify-center font-inter font-bold text-lg">
                        {partner.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-montserrat font-bold text-[#0c2940]">{partner.name}</h3>
                        {partner.founder && (
                          <span className="text-xs font-roboto text-[#60707A] block">{partner.founder}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs font-roboto text-[#60707A] leading-relaxed">{partner.desc}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EDF2F4] flex items-center justify-between text-xs font-inter font-semibold text-[#39918d] group-hover:text-[#0c2940]">
                    <span>Visit Website</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              ))}
            </div>

            {bottomPartners.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                {bottomPartners.map((bp) => (
                  <div
                    key={bp.id}
                    className="bg-white/80 rounded-lg border border-[#D9E3E6] p-3 text-center space-y-1 hover:border-[#39918d] transition-colors"
                  >
                    <span className="text-xs font-montserrat font-bold text-[#0c2940] block truncate">{bp.name}</span>
                    <span className="text-[10px] font-roboto text-[#60707A] block italic">
                      {bp.founder ? `${bp.founder} • ` : ""}
                      {bp.status || "Coming Soon"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedPartner && (
        <div
          className="fixed inset-0 z-50 bg-[#0c2940]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#D9E3E6] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-[#0c2940] text-[#39918d] flex items-center justify-center font-bold text-xl">
                  {selectedPartner.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-montserrat font-bold text-[#0c2940]">{selectedPartner.name}</h3>
                  <span className="text-xs font-roboto text-[#60707A]">{selectedPartner.founder}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="text-sm font-roboto text-[#60707A] leading-relaxed">{selectedPartner.desc}</p>

            <div className="pt-4 border-t flex items-center justify-between">
              <a
                href={selectedPartner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0c2940] text-white text-xs font-inter font-semibold px-4 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-[#123856]"
              >
                <span>Visit Official Partner Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-xs font-inter font-medium text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

'use client';

import React from "react";
import { ChevronRight } from "lucide-react";

const MeetColumbus: React.FC = () => {
  return (
    <section className="w-full home-section px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <button
          className="
            group
            w-full
            rounded-3xl
            bg-[#F6F7F9]
            hover:bg-white
            transition-all
            duration-300
            border
            border-slate-200
            hover:border-[#39918d]/30
            shadow-sm
            hover:shadow-lg
            px-10
            py-8
            text-left
          "
        >
          <div className="">
            <div>
              <p className="text-sm md:text-base uppercase tracking-[0.18em] text-slate-500 font-bold mb-2">
                MEET COLUMBUS
              </p>

              <h3 className="home-body md:text-lg font-medium text-[#0C2940]">
                              Columbus is our AI assistant. It'll ask a few questions about what you're looking for, and our team follows up personally —
                              no bots deciding anything, no automated sales pitch. Full details on how it works are one click away.

              </h3>
            </div>

            
          </div>
        </button>
      </div>
    </section>
  );
};

export default MeetColumbus;
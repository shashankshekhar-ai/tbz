'use client';

import React from "react";

const MeetColumbus: React.FC = () => {
  return (
    <section className="w-full home-section bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1420px] mx-auto">
        <div
          className="
            w-full
            rounded-3xl
            bg-[#F6F7F9]
            border
            border-slate-200
            shadow-sm
            hover:bg-white
            hover:border-[#39918d]/30
            hover:shadow-md
            transition-all
            duration-300
            px-6
            sm:px-8
            lg:px-10
            xl:px-12
            py-7
            sm:py-8
            lg:py-9
          "
        >
          <p
            className="
              text-sm
              md:text-base
              uppercase
              tracking-[0.18em]
              text-slate-500
              font-bold
              mb-3
            "
          >
            MEET COLUMBUS
          </p>

          <h3
            className="
              home-body
              text-base
              md:text-lg
              lg:text-xl
              font-medium
              text-[#0C2940]
              leading-relaxed
              max-w-none
              m-0
            "
          >
            Columbus is our AI assistant. It'll ask a few questions about
            what you're looking for, and our team follows up personally —
            no bots deciding anything, no automated sales pitch. Full
            details on how it works are one click away.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default MeetColumbus;
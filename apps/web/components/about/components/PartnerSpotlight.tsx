'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PARTNERS_DATA } from '../data/partners';
import { Partner } from '../types';
import AICollectiveLogo from './Logos/TBG Partner Logos/AI Collective Logo.png';
import AIForGoodLogo from './Logos/TBG Partner Logos/AI for Good Logo.png';
import AmplifiedConceptsLogo from './Logos/TBG Partner Logos/Amplfied Concepts.png';
import ArnaIntelligenceLogo from './Logos/TBG Partner Logos/Arna Intellegence Logo.png';
import GeorgiaAIAllianceLogo from './Logos/TBG Partner Logos/Georgia AI Alliance Logo.png';
import GwinnettChamberLogo from './Logos/TBG Partner Logos/Gwinnett-Chamber-Proud-Member-Logo.png';
import ETALogo from './Logos/TBG Partner Logos/ETA.Logo.png';
import WorkfastLogo from './Logos/TBG Partner Logos/Workfast Logo.png';
import {
  CheckCircle,
  Building2,
  ChevronRight,
} from 'lucide-react';

/* =========================================================
   PARTNER LOGOS
   ========================================================= */

const PARTNER_LOGOS: Record<string, string> = {
  'georgia ai alliance': GeorgiaAIAllianceLogo.src,
  'amplified concepts': AmplifiedConceptsLogo.src,
  'arna intelligence': ArnaIntelligenceLogo.src,
  'arna intellegence': ArnaIntelligenceLogo.src,
  'workfast consulting': WorkfastLogo.src,
  'ai for good': AIForGoodLogo.src,
  'ai collective': AICollectiveLogo.src,
  'gwinnett chamber': GwinnettChamberLogo.src,
  'gwinnett entrepreneur center': GwinnettChamberLogo.src,
  eta: ETALogo.src,
};

/* =========================================================
   NORMALIZE PARTNER NAME
   ========================================================= */

const normalizePartnerName = (
  name?: string
): string => {
  return (name || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
};

/* =========================================================
   GET PARTNER LOGO
   ========================================================= */

const getPartnerLogo = (
  partner?: Partner
): string | undefined => {
  const name = normalizePartnerName(
    partner?.name
  );

  if (!name) {
    return undefined;
  }

  /* Exact match */
  if (PARTNER_LOGOS[name]) {
    return PARTNER_LOGOS[name];
  }

  /* Flexible match */
  const matchedKey = Object.keys(
    PARTNER_LOGOS
  ).find(
    (key) =>
      name.includes(key) ||
      key.includes(name)
  );

  return matchedKey
    ? PARTNER_LOGOS[matchedKey]
    : undefined;
};

const getPartnerLogoSizeClass = (
  partner?: Partner
): string => {
  const name = normalizePartnerName(partner?.name);

  return ['ai collective'].includes(name)
    ? 'scale-125'
    : '';
};

/* =========================================================
   COMPONENT
   ========================================================= */

interface PartnerSpotlightProps {
  onOpenContact?: () => void;
}

export const PartnerSpotlight: React.FC<
  PartnerSpotlightProps
> = () => {
  const [
    selectedPartnerId,
    setSelectedPartnerId,
  ] = useState<string>(
    'amplified-concepts'
  );

  const selectedPartner: Partner =
    PARTNERS_DATA.find(
      (partner) =>
        partner.id === selectedPartnerId
    ) || PARTNERS_DATA[0];

  const selectedPartnerLogo =
    getPartnerLogo(selectedPartner);

  return (
    <section
      id="partners"
      className="
        relative
        pt-10 pb-16
        sm:pt-12 sm:pb-18
        lg:pt-14 lg:pb-20
        px-6 sm:px-8 lg:px-12
        bg-white
        border-b border-slate-200
        overflow-hidden
      "
    >
      {/* =====================================================
          BACKGROUND AMBIENT GLOW
          ===================================================== */}

      <div
        className="
          absolute
          top-1/3
          right-0
          w-96
          h-96
          glow-copper
          pointer-events-none
          opacity-40
          blur-3xl
        "
      />

      {/* =====================================================
          MAIN CONTENT CONTAINER
          ===================================================== */}

      <div
        className="
          w-full
          max-w-[1440px]
          mx-auto
          relative
          z-10
        "
      >
        {/* ===================================================
            SECTION HEADER
            =================================================== */}

        <div
          className="
            mb-10
            sm:mb-12
            border-b border-slate-200
            pb-6
          "
        >
          <h2 className="t-h2 text-[#0c2940]">
            Partner Spotlight
          </h2>
        </div>

        {/* ===================================================
            MAIN PARTNER CARD
            =================================================== */}

        <div
          className="
            w-full
            bg-[#f8fafc]
            border border-slate-200
            rounded-2xl
            p-6 sm:p-10
            relative
            shadow-sm
            overflow-hidden
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPartner.id}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
              }}
              className="w-full space-y-8"
            >
              {/* =================================================
                  PARTNER HEADER
                  ================================================= */}

              <div
                className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-6
                  border-b border-slate-200
                  pb-6
                "
              >
                {/* =================================================
                    LOGO + PARTNER NAME
                    ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    gap-5
                    min-w-0
                  "
                >
                  {/* =================================================
                      LARGE PARTNER LOGO
                      ================================================= */}

                  {selectedPartnerLogo ? (
                    <div
                      className="
                        w-28 h-20
                        sm:w-36 sm:h-24
                        shrink-0
                        rounded-xl
                        border border-slate-200
                        bg-white
                        flex
                        items-center
                        justify-center
                        p-3 sm:p-4
                        shadow-xs
                        overflow-hidden
                      "
                    >
                      <img
                        src={selectedPartnerLogo}
                        alt={`${selectedPartner.name} logo`}
                        className={`
                          max-w-full
                          max-h-full
                          w-auto
                          h-auto
                          object-contain
                          ${getPartnerLogoSizeClass(selectedPartner)}
                        `}
                      />
                    </div>
                  ) : (
                    <div
                      className="
                        w-28 h-20
                        sm:w-36 sm:h-24
                        shrink-0
                        rounded-xl
                        border border-slate-200
                        bg-white
                        flex
                        items-center
                        justify-center
                        p-4
                        text-slate-400
                      "
                      aria-hidden="true"
                    >
                      <Building2
                        className="w-8 h-8"
                      />
                    </div>
                  )}

                  {/* =================================================
                      PARTNER INFORMATION
                      ================================================= */}

                  <div className="min-w-0">
                    <span
                      className="
                        font-caption
                        text-xs
                        font-bold
                        uppercase
                        tracking-widest
                        text-[#2d7773]
                        block
                        mb-1
                      "
                    >
                      {selectedPartner.category ||
                        'Strategic Partner'}
                    </span>

                    <h3
                      className="
                        t-h3
                        text-[#0c2940]
                      "
                    >
                      {selectedPartner.name}
                    </h3>
                  </div>
                </div>

                {/* =================================================
                    FOUNDER
                    ================================================= */}

                {selectedPartner.founder && (
                  <div
                    className="
                      bg-white
                      px-4 py-2
                      rounded-xl
                      border border-slate-200
                      text-left
                      lg:text-right
                      shadow-xs
                      shrink-0
                    "
                  >
                    <span
                      className="
                        font-h3
                        text-xs
                        font-medium
                        text-[#9a5a2e]
                        block
                      "
                    >
                      {selectedPartner.founder}
                    </span>
                  </div>
                )}
              </div>

              {/* =================================================
                  FOCUS
                  ================================================= */}

              {selectedPartner.focus && (
                <div>
                  <p
                    className="
                      font-h2
                      text-lg
                      font-bold
                      text-[#0c2940]
                    "
                  >
                    {selectedPartner.focus}
                  </p>
                </div>
              )}

              {/* =================================================
                  CONTENT
                  ================================================= */}

              {!selectedPartner.isPending &&
              (selectedPartner.paragraphs ||
                selectedPartner.description) ? (
                <div className="space-y-5">

                  {/* =================================================
                      PARAGRAPH-BASED PARTNER CONTENT
                      ================================================= */}

                  {selectedPartner.paragraphs ? (
                    selectedPartner.paragraphs.map(
                      (paragraph, idx) => {

                        /* =========================================
                           RESULT CALLOUT
                           ========================================= */

                        if (
                          paragraph.startsWith(
                            'The result:'
                          )
                        ) {
                          return (
                            <div
                              key={idx}
                              className="
                                p-5 sm:p-6
                                bg-slate-50
                                border-l-4
                                border-[#0f766e]
                                rounded-r-xl
                                space-y-2
                              "
                            >
                              <p
                                className="
                                  font-body
                                  text-slate-800
                                  text-sm sm:text-base
                                  leading-relaxed
                                  font-normal
                                "
                              >
                                <strong
                                  className="
                                    text-[#0c2940]
                                    font-bold
                                  "
                                >
                                  The result:
                                </strong>{' '}

                                TBG&apos;s business
                                infrastructure got
                                audited, blueprinted,
                                and accelerated by a
                                world-class revenue
                                strategist.
                                Amplified Concepts
                                built their curriculum
                                with our frameworks
                                and tools.
                              </p>

                              <p
                                className="
                                  font-h2
                                  text-sm sm:text-base
                                  font-bold
                                  text-[#0c2940]
                                "
                              >
                                Peer-level collaboration.
                                Defined deliverables.
                                Mutual growth.
                              </p>
                            </div>
                          );
                        }

                        /* =========================================
                           PARTNERSHIP PHILOSOPHY
                           ========================================= */

                        if (
                          paragraph.startsWith(
                            'This partnership models'
                          )
                        ) {
                          return (
                            <p
                              key={idx}
                              className="
                                font-caption
                                text-sm
                                text-slate-600
                                italic
                                font-medium
                                pt-1
                              "
                            >
                              {paragraph}
                            </p>
                          );
                        }

                        /* =========================================
                           STANDARD PARAGRAPH
                           ========================================= */

                        return (
                          <p
                            key={idx}
                            className="
                              font-body
                              text-slate-700
                              text-sm sm:text-base
                              leading-relaxed
                              font-normal
                            "
                          >
                            {paragraph}
                          </p>
                        );
                      }
                    )
                  ) : (
                    <>
                      {/* =========================================
                          DESCRIPTION
                          ========================================= */}

                      <p
                        className="
                          font-body
                          text-slate-700
                          text-sm sm:text-base
                          leading-relaxed
                          font-normal
                        "
                      >
                        {selectedPartner.description}
                      </p>

                      {/* =========================================
                          PULL QUOTE
                          ========================================= */}

                      {selectedPartner.pullQuote && (
                        <div
                          className="
                            p-6
                            bg-amber-50/80
                            border-l-4
                            border-[#c57b4b]
                            rounded-r-xl
                            shadow-xs
                          "
                        >
                          <span
                            className="
                              font-h2
                              font-bold
                              text-base sm:text-lg
                              text-[#78350f]
                              block
                            "
                          >
                            “
                            {
                              selectedPartner.pullQuote
                            }
                            ”
                          </span>
                        </div>
                      )}

                      {/* =========================================
                          OUTCOME
                          ========================================= */}

                      {selectedPartner.outcome && (
                        <div
                          className="
                            p-5
                            bg-white
                            border
                            border-teal-200
                            rounded-xl
                            space-y-2
                            shadow-xs
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-[#0f766e]
                            "
                          >
                            <CheckCircle
                              className="w-4 h-4"
                            />

                            <span
                              className="
                                font-h2
                                text-xs
                                uppercase
                                font-bold
                                tracking-wider
                              "
                            >
                              Measurable Outcome &
                              Client Impact
                            </span>
                          </div>

                          <p
                            className="
                              font-body
                              text-xs sm:text-sm
                              text-slate-700
                              leading-relaxed
                              font-medium
                            "
                          >
                            {selectedPartner.outcome}
                          </p>
                        </div>
                      )}

                      {/* =========================================
                          PHILOSOPHY
                          ========================================= */}

                      {selectedPartner.philosophy && (
                        <p
                          className="
                            font-caption
                            text-xs
                            text-slate-600
                            italic
                            pt-2
                            font-medium
                          "
                        >
                          {selectedPartner.philosophy}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ) : (
                /* =================================================
                   PENDING CONTENT
                   ================================================= */

                <div
                  className="
                    py-12
                    text-center
                    space-y-4
                    bg-white
                    border
                    border-dashed
                    border-slate-300
                    rounded-2xl
                    p-8
                  "
                >
                  <Building2
                    className="
                      w-10 h-10
                      text-slate-400
                      mx-auto
                    "
                  />

                  <div>
                    <h4
                      className="
                        font-h2
                        font-bold
                        text-[#0c2940]
                        text-lg
                      "
                    >
                      {selectedPartner.name}
                    </h4>

                    <p
                      className="
                        font-body
                        text-sm
                        text-slate-700
                        mt-1
                      "
                    >
                      [Content pending from Paige]
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =====================================================
            PARTNER NAVIGATION
            ===================================================== */}

        <div
          className="
            w-full
            mt-8
            bg-white
            border border-slate-200
            rounded-2xl
            p-6
            shadow-sm
          "
        >
          {/* ===================================================
              NAVIGATION HEADER
              =================================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              pb-3
              border-b border-slate-200
            "
          >
            <span
              className="
                font-h2
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-[#0c2940]
              "
            >
              Partners
            </span>
          </div>

          {/* ===================================================
              PARTNER GRID
              =================================================== */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-3
              mt-4
            "
          >
            {/* AutoHive removed from the visible partner list */}

            {PARTNERS_DATA
              .filter(
                (partner) =>
                  partner.id.toLowerCase() !==
                    'autohive' &&
                  partner.name.toLowerCase() !==
                    'autohive'
              )
              .map((partner) => {
                const isSelected =
                  partner.id ===
                  selectedPartnerId;

                const partnerLogo =
                  getPartnerLogo(partner);

                return (
                  <button
                    key={partner.id}
                    type="button"
                    onClick={() =>
                      setSelectedPartnerId(
                        partner.id
                      )
                    }
                    className={`
                      w-full
                      text-left
                      p-3.5
                      rounded-xl
                      border
                      transition-all
                      duration-200
                      flex
                      items-center
                      justify-between
                      group

                      ${
                        isSelected
                          ? 'bg-[#0c2940] border-[#0c2940] text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                      }
                    `}
                  >
                    {/* =================================================
                        LOGO + PARTNER INFORMATION
                        ================================================= */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        min-w-0
                      "
                    >
                      {/* =================================================
                          PARTNER LOGO
                          ================================================= */}

                      {partnerLogo ? (
                        <div
                          className={`
                            w-12
                            h-10
                            shrink-0
                            rounded-lg
                            border
                            flex
                            items-center
                            justify-center
                            p-1.5
                            overflow-hidden

                            ${
                              isSelected
                                ? 'bg-white/10 border-white/20'
                                : 'bg-white border-slate-200'
                            }
                          `}
                        >
                          <img
                            src={partnerLogo}
                            alt=""
                            aria-hidden="true"
                            className={`
                              max-w-full
                              max-h-full
                              w-auto
                              h-auto
                              object-contain
                              ${getPartnerLogoSizeClass(partner)}
                            `}
                          />
                        </div>
                      ) : (
                        <div
                          className={`
                            w-12
                            h-10
                            shrink-0
                            rounded-lg
                            border
                            flex
                            items-center
                            justify-center

                            ${
                              isSelected
                                ? 'bg-white/10 border-white/20 text-white/70'
                                : 'bg-white border-slate-200 text-slate-400'
                            }
                          `}
                          aria-hidden="true"
                        >
                          <Building2
                            className="
                              w-5 h-5
                            "
                          />
                        </div>
                      )}

                      {/* =================================================
                          PARTNER NAME / FOUNDER / STATUS
                          ================================================= */}

                      <div className="min-w-0">
                        <span
                          className="
                            font-h2
                            text-xs
                            font-bold
                            block
                          "
                        >
                          {partner.name}
                        </span>

                        {partner.founder && (
                          <span
                            className={`
                              font-caption
                              text-xs
                              block

                              ${
                                isSelected
                                  ? 'text-slate-200'
                                  : 'text-slate-700'
                              }
                            `}
                          >
                            {partner.founder}
                          </span>
                        )}

                        {partner.isPending && (
                          <span
                            className={`
                              font-caption
                              text-xs
                              block

                              ${
                                isSelected
                                  ? 'text-amber-300'
                                  : 'text-[#9a5a2e]'
                              }
                            `}
                          >
                            [Content pending]
                          </span>
                        )}
                      </div>
                    </div>

                    {/* =================================================
                        ARROW
                        ================================================= */}

                    <ChevronRight
                      className={`
                        w-4 h-4
                        shrink-0
                        transition-transform

                        ${
                          isSelected
                            ? 'text-white translate-x-1'
                            : 'text-slate-400 group-hover:text-slate-800'
                        }
                      `}
                    />
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSpotlight;
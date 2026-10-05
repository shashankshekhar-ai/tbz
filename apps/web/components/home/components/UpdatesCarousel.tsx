'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Newspaper } from 'lucide-react';
import type { SheetUpdateCard } from '@/app/api/updates/route';

interface UpdateCard {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  imageUrl?: string;
  link?: string;
  status?: 'upcoming' | 'live';
}

const PLACEHOLDER_CARDS: UpdateCard[] = [1, 2, 3, 4, 5].map((n) => ({
  id: String(n),
  title: '[Title]',
  description: 'Learn more',
  ctaText: 'Click here',
}));

// Poll our own /api/updates route (which proxies the published Google Sheet
// CSV server-side, avoiding CORS) every 5 minutes so a new sheet row shows
// up without anyone touching the code or reloading the page.
const POLL_INTERVAL_MS = 5 * 60 * 1000;

function useSheetUpdates(): UpdateCard[] {
  const [cards, setCards] = useState<UpdateCard[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/updates', { cache: 'no-store' });
        const data: { cards: SheetUpdateCard[] } = await res.json();
        if (cancelled) return;
        if (data.cards && data.cards.length > 0) {
          setCards(
            data.cards.map((c) => ({
              id: c.id,
              title: c.title,
              description: c.details,
              ctaText: 'Learn more',
              imageUrl: c.imageUrl,
              link: c.link,
              status: c.status,
            }))
          );
        }
      } catch {
        // Network hiccup or sheet unreachable — keep whatever we last had
        // (or the placeholders), never blank the section.
      }
    };

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return cards ?? PLACEHOLDER_CARDS;
}

const STATUS_BADGE: Record<'upcoming' | 'live', { label: string; className: string }> = {
  live: { label: 'LIVE', className: 'bg-[#39918d] text-white' },
  upcoming: { label: 'UPCOMING', className: 'bg-[#f8c51c] text-[#0c2940]' },
};

export const UpdatesCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const cards = useSheetUpdates();

  const goTo = (i: number) => {
    const track = trackRef.current;

    if (!track) return;

    const next = Math.max(0, Math.min(cards.length - 1, i));

    track.scrollTo({
      left: next * track.clientWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const onScroll = () => {
      const width = Math.max(1, track.clientWidth);
      const currentIndex = Math.round(track.scrollLeft / width);

      setIndex(currentIndex);
    };

    track.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, cards.length - 1)));
  }, [cards.length]);

  const arrow =
    'absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#D9E3E8] shadow-md text-[#0c2940] hover:border-[#39918d] hover:text-[#2d7773] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 cursor-pointer';

  return (
    <section
      id="latest-updates"
      className="
        w-full
        home-section
        bg-white
        px-4
        sm:px-6
        lg:px-8
      "
    >
      <div className="w-full max-w-[1420px] mx-auto">

        {/* Section Heading */}
        <div className="home-section-head">
          <h2 className="t-h2 text-[#0c2940]">
            What&apos;s Moving? TBG &amp; Industry Updates
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative w-full">

          {/* LEFT ARROW — OUTSIDE CARD */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous update"
            className={`${arrow} left-[-24px] sm:left-[-60px]`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* RIGHT ARROW — OUTSIDE CARD */}
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === cards.length - 1}
            aria-label="Next update"
            className={`${arrow} right-[-24px] sm:right-[-60px]`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Slider Track */}
          <div
            ref={trackRef}
            className="
              w-full
              flex
              overflow-x-auto
              snap-x
              snap-mandatory
              no-scrollbar
            "
          >
            {cards.map((card, i) => {
              const badge = card.status ? STATUS_BADGE[card.status] : null;
              return (
              <article
                key={card.id}
                className="
                  snap-start
                  shrink-0
                  w-full
                  min-h-[500px]
                  md:min-h-[520px]
                  lg:min-h-[540px]
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  rounded-[2rem]
                  overflow-hidden
                  border
                  border-[#D9E3E8]
                  bg-white
                  shadow-lg
                "
              >
                {/* LEFT VISUAL PANEL */}
                <div
                  className="
                    relative
                    min-h-[280px]
                    md:min-h-full
                    bg-gradient-to-br
                    from-[#0c2940]
                    via-[#1a4a5c]
                    to-[#39918d]
                    flex
                    items-center
                    justify-center
                  "
                  style={{
                    backgroundImage: card.imageUrl
                      ? `url(${card.imageUrl})`
                      : 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(135deg, #0c2940, #1a4a5c 55%, #39918d)',
                    backgroundSize: card.imageUrl ? 'cover' : '32px 32px, 32px 32px, auto',
                    backgroundPosition: 'center',
                  }}
                >
                  {badge && (
                    <span
                      className={`absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-montserrat font-bold tracking-wider ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  )}
                  {!card.imageUrl && (
                    <span
                      className="
                        w-32
                        h-32
                        rounded-[2rem]
                        bg-white/10
                        border
                        border-white/20
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        text-white
                      "
                    >
                      <Newspaper className="w-12 h-12" />
                    </span>
                  )}
                </div>

                {/* RIGHT CONTENT PANEL */}
                <div
                  className="
                    p-8
                    md:p-12
                    lg:p-14
                    flex
                    flex-col
                    min-h-full
                  "
                >
                  {/* Title */}
                  <h3
                    className="
                      t-h2
                      text-[#0c2940]
                      mt-2
                      md:mt-4
                    "
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      font-body
                      text-lg
                      text-slate-600
                      leading-relaxed
                      mt-4
                      flex-1
                    "
                  >
                    {card.description}
                  </p>

                  {/* Bottom CTA + Counter */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      pt-8
                      mt-auto
                    "
                  >
                    {card.link ? (
                      <a
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-7
                          py-3.5
                          rounded-full
                          bg-[#39918d]
                          hover:bg-[#3f6d67]
                          text-white
                          font-semibold
                          transition-colors
                          shadow-md
                          cursor-pointer
                        "
                      >
                        {card.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-7
                          py-3.5
                          rounded-full
                          bg-[#39918d]
                          hover:bg-[#3f6d67]
                          text-white
                          font-semibold
                          transition-colors
                          shadow-md
                          cursor-pointer
                        "
                      >
                        {card.ctaText}

                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    <span className="font-montserrat text-sm text-slate-500">
                      <span className="font-bold text-[#0c2940]">
                        {String(i + 1).padStart(2, '0')}
                      </span>{' '}
                      / {String(cards.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </article>
            );})}
          </div>

          {/* MOBILE NAVIGATION */}
          <div className="sm:hidden flex justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous update"
              className="
                w-10
                h-10
                rounded-full
                border
                border-[#D9E3E8]
                bg-white
                text-[#0c2940]
                disabled:opacity-40
                flex
                items-center
                justify-center
                shadow-sm
              "
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === cards.length - 1}
              aria-label="Next update"
              className="
                w-10
                h-10
                rounded-full
                border
                border-[#D9E3E8]
                bg-white
                text-[#0c2940]
                disabled:opacity-40
                flex
                items-center
                justify-center
                shadow-sm
              "
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

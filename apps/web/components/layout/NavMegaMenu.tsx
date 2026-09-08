"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NavDropdown } from "./navDropdownData";

export function NavMegaMenu({
  label,
  dropdown,
  isOpen,
  onClose,
  align = "left",
}: {
  label: string;
  dropdown: NavDropdown;
  isOpen: boolean;
  onClose: () => void;
  align?: "left" | "right";
}) {
  if (!isOpen) return null;

  return (
    // Outer box: position + the invisible "bridge" (pt-2.5, not margin) that
    // closes the trigger-to-panel gap. Margin creates real empty pixels the
    // pointer must cross with nothing rendered there, so onMouseLeave on the
    // parent (HeaderNav.tsx) fires the instant the cursor leaves the trigger
    // — confirmed the actual cause of the menu closing on the way down to
    // it. Padding-top on THIS element instead means the gap is still part
    // of this DOM node's own hit-tested box, so hover never breaks. All
    // visual styling (bg/border/shadow/rounded/width) moved to the inner
    // div so the invisible bridge itself stays fully transparent.
    <div
      className={`absolute top-full pt-2.5 z-50 w-80 sm:w-96 ${
        align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left"
      }`}
    >
      <div
        role="region"
        aria-label={`${label} submenu`}
        className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-3 sm:p-4 text-slate-800 animate-fadeIn whitespace-normal"
      >
        <div className="px-3 pt-2 pb-2.5 mb-2 border-b border-slate-100">
          <span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#39918d] block">{label}</span>
          <p className="font-body text-xs sm:text-sm text-slate-600 font-normal mt-0.5 leading-snug">
            {dropdown.microcopy}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          {dropdown.children.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="group text-left w-full p-2.5 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 hover:border-[#39918d]/60 transition-all duration-200 flex items-center justify-between gap-3 focus:outline-none focus:ring-1 focus:ring-[#39918d]"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="font-h2 text-sm font-bold text-[#c57b4b] group-hover:text-[#0c2940] transition-colors pt-0.5 shrink-0">
                  {item.number}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-h2 text-sm sm:text-base font-bold text-[#0c2940] group-hover:text-[#39918d] transition-colors truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="font-caption text-[11px] px-2 py-0.5 rounded bg-[#39918d]/10 text-[#39918d] border border-[#39918d]/30 shrink-0 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs sm:text-sm text-slate-600 line-clamp-1 leading-snug font-normal mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-[#0c2940] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

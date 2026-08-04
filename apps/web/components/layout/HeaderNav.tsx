"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/cms";

function isActiveHref(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({ navItems }: { navItems: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#071b2e]/95 text-white backdrop-blur-xl ${
          scrolled ? "shadow-[0_8px_30px_rgba(7,27,46,0.25)] py-3" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <Image
                src="/brand/White-Monochrome-Text.png"
                alt="The Bradbury Group"
                width={168}
                height={105}
                priority
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <nav className="hidden xl:flex items-center gap-7 text-sm font-inter font-medium whitespace-nowrap">
              {navItems.map((item) => {
                const active = isActiveHref(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className={`transition-all duration-200 relative py-1 ${
                      active ? "text-[#f8c51c] font-semibold" : "text-[#edf2f4] hover:text-[#39918d]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden sm:flex items-center">
              <Link
                href="/contact"
                className="bg-[#f8c51c] hover:bg-[#f9d04b] text-[#0c2940] font-inter font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-[0_10px_24px_rgba(248,197,28,0.24)] hover:shadow-[0_12px_28px_rgba(248,197,28,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center space-x-2 group"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 stroke-[2.5]" />
              </Link>
            </div>

            <div className="xl:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#071b2e] pt-24 px-6 pb-8 flex flex-col justify-between xl:hidden transition-all animate-fadeIn">
          <div className="space-y-4">
            <div className="pb-4 border-b border-[#3f6d67]/30">
              <span className="text-xs uppercase font-inter font-semibold tracking-wider text-[#39918d]">
                Navigation Menu
              </span>
            </div>
            {navItems.map((item) => {
              const active = isActiveHref(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg font-inter font-medium py-2 ${
                    active ? "text-[#f8c51c] font-semibold" : "text-[#edf2f4]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="space-y-3 pt-6 border-t border-[#3f6d67]/30">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#f8c51c] text-[#0c2940] font-inter font-semibold text-sm py-3 rounded-full flex items-center justify-center space-x-2 shadow-[0_10px_24px_rgba(248,197,28,0.24)]"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Book a Discovery Call</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

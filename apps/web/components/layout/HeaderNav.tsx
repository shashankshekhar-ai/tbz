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

const DARK_HERO_ROUTES = new Set(["/", "/about"]);

export function HeaderNav({ navItems }: { navItems: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const hasDarkHero = DARK_HERO_ROUTES.has(pathname);
  const isScrolled = !hasDarkHero || scrolled;

  useEffect(() => {
    if (!hasDarkHero) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDarkHero]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white text-[#0c2940] shadow-md py-3" : "bg-transparent text-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-8 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/brand/logo-primary.png"
                  alt="The Bradbury Group"
                  fill
                  sizes="48px"
                  style={{ objectFit: "cover", objectPosition: "50% 8%" }}
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-extrabold text-xs sm:text-sm tracking-wider uppercase leading-tight">
                  The Bradbury Group
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] tracking-tight font-roboto font-normal opacity-80 ${
                    isScrolled ? "text-[#60707A]" : "text-[#BFC9CD]"
                  }`}
                >
                  Engineering the AI-First Organization
                </span>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6 text-sm font-inter font-medium whitespace-nowrap">
              {navItems.map((item) => {
                const active = isActiveHref(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className={`transition-colors duration-200 py-1 ${
                      active
                        ? "text-[#f8c51c] font-semibold"
                        : isScrolled
                          ? "text-[#0c2940] hover:text-[#39918d]"
                          : "text-[#EDF2F4] hover:text-[#39918d]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden xl:flex items-center space-x-3">
              <Link
                href="/contact"
                className="bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-inter font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2 group whitespace-nowrap"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
              </Link>
            </div>

            <div className="xl:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg ${isScrolled ? "text-[#0c2940]" : "text-white"}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c2940] pt-24 px-6 pb-8 flex flex-col justify-between xl:hidden">
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
                  className={`block text-lg font-inter py-2 ${
                    active ? "text-[#f8c51c] font-semibold" : "text-[#EDF2F4] font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[#3f6d67]/30">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#f8c51c] text-[#0c2940] font-inter font-semibold text-sm py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              <span>Book a Discovery Call</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

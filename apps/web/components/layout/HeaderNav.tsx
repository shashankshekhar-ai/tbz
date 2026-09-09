"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/cms";
import { NAV_DROPDOWNS } from "./navDropdownData";
import { NavMegaMenu } from "./NavMegaMenu";
import { BrandLogo } from "@/components/ui/BrandLogo";

function isActiveHref(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({ navItems }: { navItems: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[96px] sm:h-[102px] lg:h-[108px] flex items-center ${
          scrolled
            ? "bg-[#0c2940]/95 backdrop-blur-md border-b border-[#3f6d67]/30 shadow-lg shadow-black/25"
            : "bg-[#0c2940] border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8 h-full">
          <Link href="/" className="flex items-center shrink-0 transition-transform duration-300 hover:scale-105">
            <BrandLogo />
          </Link>

          <nav
            aria-label="Primary Navigation"
            className="hidden min-[1320px]:flex items-center justify-center gap-1 xl:gap-1.5 2xl:gap-3 flex-1 min-w-0 px-2"
          >
            {navItems.map((item) => {
              const active = isActiveHref(pathname, item.href);
              const dropdown = NAV_DROPDOWNS[item.href];
              const isOpen = openDropdown === item.href;

              if (!dropdown) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className={`font-h2 text-[13px] xl:text-sm 2xl:text-base font-bold tracking-tight py-2 px-1 xl:px-1.5 2xl:px-2.5 transition-all duration-200 flex items-center gap-1 whitespace-nowrap focus:outline-none relative ${
                      active ? "text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="navActiveLine"
                        className="absolute -bottom-1.5 left-2 right-2 h-[3px] rounded-full bg-[#f8c51c]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    aria-expanded={isOpen}
                    className={`font-h2 text-[13px] xl:text-sm 2xl:text-base font-bold tracking-tight py-2 px-1 xl:px-1.5 2xl:px-2.5 transition-all duration-200 flex items-center gap-1 whitespace-nowrap focus:outline-none relative ${
                      isOpen || active ? "text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 xl:w-4 xl:h-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                    {active && (
                      <motion.div
                        layoutId="navActiveLine"
                        className="absolute -bottom-1.5 left-2 right-2 h-[3px] rounded-full bg-[#f8c51c]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                  <NavMegaMenu
                    label={item.label}
                    dropdown={dropdown}
                    isOpen={isOpen}
                    onClose={() => setOpenDropdown(null)}
                    align={item.href === "/about" ? "right" : "left"}
                  />
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/contact"
              className="group hidden sm:flex bg-[#f8c51c] hover:bg-[#e0b018] text-[#0c2940] font-h2 text-xs xl:text-sm 2xl:text-base font-extrabold h-11 sm:h-12 px-3 xl:px-4 2xl:px-6 rounded-lg transition-all duration-200 items-center gap-1.5 xl:gap-2.5 shadow-sm hover:shadow-md active:scale-95 shrink-0 whitespace-nowrap"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="min-[1320px]:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white h-11 w-11 sm:h-12 sm:w-12 rounded-lg transition-colors focus:outline-none shrink-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c2940] pt-28 px-6 pb-8 flex flex-col justify-between min-[1320px]:hidden transition-all animate-fadeIn overflow-y-auto">
          <div className="space-y-1">
            <div className="pb-4 mb-2 border-b border-[#3f6d67]/30">
              <span className="text-xs uppercase font-inter font-semibold tracking-wider text-[#39918d]">
                Navigation Menu
              </span>
            </div>
            {navItems.map((item) => {
              const active = isActiveHref(pathname, item.href);
              const dropdown = NAV_DROPDOWNS[item.href];
              const isExpanded = expandedMobileItem === item.href;

              return (
                <div key={item.href} className="border-b border-[#3f6d67]/20 py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-lg font-inter font-medium py-2.5 flex-1 ${
                        active ? "text-[#f8c51c] font-semibold" : "text-[#edf2f4]"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {dropdown && (
                      <button
                        onClick={() => setExpandedMobileItem(isExpanded ? null : item.href)}
                        aria-label={`Toggle ${item.label} submenu`}
                        className="p-2.5 text-[#39918d]"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {dropdown && isExpanded && (
                    <div className="pl-3 pr-1 py-2 mb-2 space-y-2 bg-white/5 rounded-lg border-l-2 border-[#39918d]">
                      {dropdown.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block p-2 rounded-md hover:bg-white/5"
                        >
                          <span className="font-montserrat text-sm font-bold text-[#f8c51c] mr-1.5">
                            {child.number}
                          </span>
                          <span className="font-montserrat text-sm font-semibold text-white">{child.label}</span>
                          <p className="font-roboto text-xs text-[#BFC9CD] mt-0.5">{child.subtitle}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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

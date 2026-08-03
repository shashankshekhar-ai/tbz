import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import { getFooterNavigation, type FooterNavGroup } from "@/lib/cms";

const fallbackGroups: FooterNavGroup[] = [
  {
    heading: "AI Fluency",
    items: [
      { label: "Overview", href: "/ai-fluency-cohort" },
      { label: "Literacy → Fluency", href: "/ai-fluency-cohort#philosophy" },
      { label: "Manager Resources", href: "/ai-fluency-cohort#resources" },
    ],
  },
  {
    heading: "Solomon Engine",
    items: [
      { label: "Overview", href: "/the-solomon-engine" },
      { label: "For Executives", href: "/the-solomon-engine#executives" },
      { label: "Apply / Interview", href: "/contact" },
    ],
  },
  {
    heading: "For Organizations",
    items: [
      { label: "Learning Architecture", href: "/for-organizations" },
      { label: "Embedded Training", href: "/for-organizations#training" },
      { label: "AI Readiness Assessment", href: "/assessment" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Downloads", href: "/resources" },
      { label: "Case Studies", href: "/resources#case-studies" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Advisory Board", href: "/about#advisory" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export async function Footer() {
  const cmsGroups = await getFooterNavigation();
  const groups = cmsGroups.length > 0 ? cmsGroups : fallbackGroups;

  return (
    <footer className="bg-[#0c2940] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-6">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-8 overflow-hidden">
              <Image
                src="/brand/logo-primary.png"
                alt="The Bradbury Group"
                fill
                sizes="48px"
                style={{ objectFit: "cover", objectPosition: "50% 8%" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-inter font-extrabold text-base tracking-wider uppercase">
                The Bradbury Group
              </span>
              <span className="text-[10px] tracking-tight font-roboto text-[#BFC9CD]">
                Engineering the AI-First Organization
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4 text-[#BFC9CD]">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/10 hover:border-[#39918d] hover:text-[#39918d] transition-colors"
              aria-label="LinkedIn"
            >
              <span className="font-inter font-bold text-xs px-0.5">in</span>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/10 hover:border-[#39918d] hover:text-[#39918d] transition-colors"
              aria-label="X (Twitter)"
            >
              <span className="font-inter font-bold text-xs px-0.5">X</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/10 hover:border-[#39918d] hover:text-[#39918d] transition-colors"
              aria-label="YouTube"
            >
              <span className="font-inter font-bold text-xs px-0.5">YT</span>
            </a>
            <a
              href="https://thebradburygroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/10 hover:border-[#39918d] hover:text-[#39918d] transition-colors"
              aria-label="Website"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs font-roboto">
          {groups.map((group) => (
            <div key={group.heading} className="space-y-3">
              <span className="font-inter font-bold text-sm text-[#39918d] block uppercase tracking-wider">
                {group.heading}
              </span>
              <ul className="space-y-2 text-[#BFC9CD]">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#BFC9CD] gap-4">
          <span>© {new Date().getFullYear()} The Bradbury Group. All rights reserved.</span>
          <div className="flex items-center space-x-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span>|</span>
            <Link href="/cookie-preferences" className="hover:text-white transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

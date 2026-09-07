import Link from "next/link";
import Image from "next/image";
import { getFooterNavigation, type FooterNavGroup } from "@/lib/cms";
import { BrandLogo } from "@/components/ui/BrandLogo";

// Matches the original two hardcoded columns exactly — used only when the
// CMS has no footer navigation rows yet (nav_link actions with
// location:"footer" write to the `navigation` collection, which
// getFooterNavigation() already fully implements groups+sorting for; this
// component just never called it, so those writes silently had no visible
// effect — confirmed live, not hypothetical).
const fallbackGroups: FooterNavGroup[] = [
  {
    heading: "Programs",
    items: [
      { label: "AI Fluency Cohort", href: "/ai-fluency-cohort" },
      { label: "The Solomon Engine", href: "/the-solomon-engine" },
      { label: "For Organizations", href: "/for-organizations" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Our ROI", href: "/our-ai-return" },
      { label: "Resources", href: "/resources" },
      { label: "Insights", href: "/insights" },
      { label: "Case Studies", href: "/resources#case-studies" },
    ],
  },
];

export async function Footer() {
  const cmsGroups = await getFooterNavigation();
  const groups = cmsGroups.length > 0 ? cmsGroups : fallbackGroups;
  const programsGroup = groups.find((g) => g.heading.toLowerCase() !== "resources") ?? groups[0];
  const resourcesGroup = groups.find((g) => g.heading.toLowerCase() === "resources") ?? groups[1];

  return (
    <footer className="bg-[#0c2940] text-slate-300 pt-16 pb-12 border-t border-[#3f6d67]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
          {/* Column 1: Brand & mission */}
          <div className="lg:col-span-4 pr-4 space-y-4">
            <BrandLogo size="lg" />
            <p className="font-inter font-bold text-xs tracking-wider text-[#f8c51c] uppercase">
              Engineering the AI-First Organization
            </p>
            <p className="font-roboto text-sm text-slate-300 leading-relaxed max-w-sm">
              Helping organizations adopt AI responsibly through leadership, learning architecture, governance, and transformation.
            </p>
          </div>

          {/* Column 2: Resources */}
          {resourcesGroup && (
            <div className="lg:col-span-2 lg:pl-4 space-y-4">
              <span className="font-inter text-xs font-bold uppercase tracking-widest text-[#39918d] block">
                {resourcesGroup.heading}
              </span>
              <ul className="space-y-2.5 font-roboto text-sm text-slate-300">
                {resourcesGroup.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} target={item.openInNewTab ? "_blank" : undefined} className="hover:text-[#f8c51c] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 3: Programs */}
          {programsGroup && (
            <div className="lg:col-span-3 lg:pl-4 space-y-4">
              <span className="font-inter text-xs font-bold uppercase tracking-widest text-[#39918d] block">
                {programsGroup.heading}
              </span>
              <ul className="space-y-2.5 font-roboto text-sm text-slate-300">
                {programsGroup.items.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      className={`hover:text-[#f8c51c] transition-colors ${index === 0 ? "text-white font-semibold font-montserrat" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 4: Connect */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-inter text-xs font-bold uppercase tracking-widest text-[#39918d] block">
              Connect
            </span>
            <p className="font-roboto text-sm text-slate-300 leading-relaxed">
              Ready to accelerate your organizational AI capability? Contact our C-suite consulting team.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block w-full sm:w-auto text-center px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#39918d] hover:bg-[#3f6d67] transition-all shadow-md cursor-pointer border border-[#39918d]/40"
              >
                Book Discovery Call
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#3f6d67]/30 my-8 sm:my-10" />

        {/* Bottom bar: copyright & social buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p className="font-roboto">
            © {new Date().getFullYear()} The Bradbury Group. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com/in/paigebradbury"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#082033] hover:bg-[#3f6d67]/40 border border-[#3f6d67]/50 text-slate-200 text-xs sm:text-sm font-inter transition-colors"
            >
              <Image src="/brand/2.png" alt="" width={16} height={16} className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#082033] border border-[#3f6d67]/50 text-slate-400 text-xs sm:text-sm font-inter">
              <Image src="/brand/3.png" alt="" width={16} height={16} className="w-4 h-4 opacity-70" />
              <span>YouTube</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

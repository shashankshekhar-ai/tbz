import Link from "next/link";
import Image from "next/image";
import { getFooterNavigation, type FooterNavGroup } from "@/lib/cms";

// Matches the original two hardcoded columns exactly — used only when the
// CMS has no footer navigation rows yet (nav_link actions with
// location:"footer" write to the `navigation` collection, which
// getFooterNavigation() already fully implements groups+sorting for; this
// component just never called it, so those writes silently had no visible
// effect — confirmed live, not hypothetical).
const fallbackGroups: FooterNavGroup[] = [
  {
    heading: "Navigation",
    items: [
      { label: "About", href: "/about" },
      { label: "For You", href: "/for-you" },
      { label: "For Leaders", href: "/the-solomon-engine" },
      { label: "For Organizations", href: "/for-organizations" },
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

  return (
    <footer className="bg-[#0c2940] text-slate-300 pt-16 pb-8 border-t border-[#3f6d67]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-[#3f6d67]/30">
          {/* Brand & mission */}
          <div className="lg:col-span-4 pr-4 space-y-4">
            <Image
              src="/brand/White-Monochrome-Text.png"
              alt="The Bradbury Group"
              width={200}
              height={125}
              className="h-16 w-auto"
            />
            <p className="font-inter font-bold text-xs tracking-wider text-[#f8c51c] uppercase">
              Engineering the AI-First Organization
            </p>
            <p className="font-roboto text-sm text-slate-300 leading-relaxed max-w-sm">
              Helping organizations adopt AI responsibly through leadership, learning architecture, governance, and transformation.
            </p>
          </div>

          {/* Resources column (first CMS group) */}
          {groups[1] && (
            <div className="lg:col-span-2 lg:pl-4 space-y-3">
              <h4 className="font-inter text-xs font-bold uppercase tracking-widest text-[#39918d]">
                {groups[1].heading}
              </h4>
              <ul className="space-y-2.5 text-sm font-roboto text-slate-300">
                {groups[1].items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} target={item.openInNewTab ? "_blank" : undefined} className="hover:text-[#f8c51c] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Programs column (second CMS group) */}
          {groups[0] && (
            <div className="lg:col-span-3 lg:pl-4 space-y-3">
              <h4 className="font-inter text-xs font-bold uppercase tracking-widest text-[#39918d]">
                {groups[0].heading}
              </h4>
              <ul className="space-y-2.5 text-sm font-roboto text-slate-300">
                {groups[0].items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} target={item.openInNewTab ? "_blank" : undefined} className="hover:text-[#f8c51c] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Connect */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-inter text-xs font-bold uppercase tracking-widest text-[#39918d]">
              Connect
            </h4>
            <p className="font-roboto text-sm text-slate-300 leading-relaxed">
              Ready to accelerate your organizational AI capability? Contact our C-suite consulting team.
            </p>
            <Link
              href="/contact"
              className="inline-block w-full sm:w-auto text-center px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#39918d] hover:bg-[#3f6d67] transition-all shadow-md cursor-pointer border border-[#39918d]/40"
            >
              Book Discovery Call
            </Link>
          </div>
        </div>

        <div className="pt-8 pb-8 flex items-center justify-center gap-8 border-b border-[#3f6d67]/30">
          <Image src="/brand/2.png" alt="Partner 2" width={180} height={180} className="h-10 md:h-20 w-auto opacity-90" />
          <Image src="/brand/3.png" alt="Partner 3" width={180} height={180} className="h-10 md:h-20 w-auto opacity-90" />
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-400 gap-4">
          <p className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} The Bradbury Group. All rights reserved.</span>
            <span className="text-slate-500 sm:before:content-['|'] sm:before:mr-3 sm:before:text-slate-600">
              Disclaimer: Content is for informational purposes only.
            </span>
          </p>
          <p className="font-roboto italic text-slate-300">Human-Centered AI Transformation</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0c2940] text-white border-t border-[#39918d]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/brand/White-Monochrome-Text.png" alt="The Bradbury Group" width={160} height={40} className="h-[calc(var(--spacing)*15)] w-auto" />
            </div>
            <p className="text-[10px] font-h3 font-semibold text-[#f8c51c] uppercase tracking-wider">
              Engineering the AI-First Organization
            </p>
            <p className="text-xs font-body text-slate-300 leading-relaxed max-w-md">
              Helping organizations adopt AI responsibly through leadership, learning architecture, governance, and transformation.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-h3 font-bold uppercase tracking-widest text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-body text-slate-300">
              <li>
                <Link href="/about" className="hover:text-[#f8c51c] transition-colors">About</Link>
              </li>
              <li>
                <Link href="/ai-fluency-cohort" className="hover:text-[#f8c51c] transition-colors">For You</Link>
              </li>
              <li>
                <Link href="/the-solomon-engine" className="hover:text-[#f8c51c] transition-colors">For Leaders</Link>
              </li>
              <li>
                <Link href="/for-organizations" className="hover:text-[#f8c51c] transition-colors">For Organizations</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-h3 font-bold uppercase tracking-widest text-slate-400">
              Resources
            </h4>
            <ul className="space-y-2 text-xs font-body text-slate-300">
              <li>
                <Link href="/our-ai-return" className="hover:text-[#f8c51c] transition-colors">Our ROI</Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#f8c51c] transition-colors">Resources</Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#f8c51c] transition-colors">Insights</Link>
              </li>
              <li>
                <Link href="/resources#case-studies" className="hover:text-[#f8c51c] transition-colors">Case Studies</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-h3 font-bold uppercase tracking-widest text-slate-400">
              Connect
            </h4>
            <p className="text-xs font-body text-slate-300 leading-relaxed">
              Ready to accelerate your organizational AI capability? Contact our executive consulting team.
            </p>
            <Link
              href="/contact"
              className="inline-block w-full sm:w-auto text-center px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#39918d] hover:bg-[#3f6d67] transition-all shadow-md cursor-pointer border border-[#39918d]/40"
            >
              Book Discovery Call
            </Link>
          </div>
        </div>

        <div className="pt-8 pb-6 flex items-center justify-center gap-8">
          <Image src="/brand/2.png" alt="Partner 2" width={180} height={180} className="w-6 md:w-8 h-auto opacity-90" />
          <Image src="/brand/3.png" alt="Partner 3" width={180} height={180} className="w-6 md:w-8 h-auto opacity-90" />
          <Image src="/brand/4.png" alt="Partner 4" width={180} height={180} className="w-6 md:w-8 h-auto opacity-90" />
        </div>

        <div className="pt-0 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} The Bradbury Group. All rights reserved.</p>
          <p className="font-caption italic text-slate-300">Human-Centered AI Transformation</p>
        </div>
      </div>
    </footer>
  );
}

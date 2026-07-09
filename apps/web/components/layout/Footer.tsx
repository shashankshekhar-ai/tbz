import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-brand-navy)] text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <p className="font-bold text-white mb-2">The Bradbury Group</p>
          <p className="text-sm">
            Helping leaders and organizations build AI fluency and operational advantage.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Programs</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/ai-fluency-cohort" className="hover:text-white transition-colors">AI Fluency Cohort</Link></li>
            <li><Link href="/the-solomon-engine" className="hover:text-white transition-colors">The Solomon Engine</Link></li>
            <li><Link href="/for-organizations" className="hover:text-white transition-colors">For Organizations</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
            <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} The Bradbury Group. All rights reserved.
      </div>
    </footer>
  );
}

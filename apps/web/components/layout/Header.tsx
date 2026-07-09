import Link from "next/link";

const navItems = [
  { label: "AI Fluency Cohort", href: "/ai-fluency-cohort" },
  { label: "The Solomon Engine", href: "/the-solomon-engine" },
  { label: "For Organizations", href: "/for-organizations" },
  { label: "Our AI Return", href: "/our-ai-return" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function Header() {
  return (
    <header className="bg-[var(--color-brand-navy)] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-lg tracking-tight">
          The Bradbury Group
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-[var(--color-brand-gold)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-4 py-2 rounded text-sm font-medium bg-[var(--color-brand-gold)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-gold-light)] transition-colors"
        >
          Book a Discovery Call
        </Link>
      </div>
    </header>
  );
}

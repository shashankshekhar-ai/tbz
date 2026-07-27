import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/report", label: "Report" },
  { href: "/dashboard/book-call", label: "Book a call" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!clerkConfigured) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-gray-500">
          Sign-in isn&apos;t configured yet — Clerk keys are pending (Phase 7).
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <nav className="flex gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-600 hover:text-gray-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <UserButton />
      </div>
      {children}
    </div>
  );
}

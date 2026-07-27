import { getNavigation, type NavItem } from "@/lib/cms";
import { HeaderNav } from "./HeaderNav";

const fallbackNavItems: NavItem[] = [
  { label: "AI Fluency", href: "/ai-fluency-cohort" },
  { label: "Solomon Engine", href: "/the-solomon-engine" },
  { label: "For Organizations", href: "/for-organizations" },
  { label: "Our AI Return", href: "/our-ai-return" },
  { label: "Resources", href: "/resources" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export async function Header() {
  const cmsNavItems = await getNavigation();
  const navItems = cmsNavItems.length > 0 ? cmsNavItems : fallbackNavItems;

  return <HeaderNav navItems={navItems} />;
}

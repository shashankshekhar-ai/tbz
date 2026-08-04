import { HomeHero } from "@/components/home/HomeHero";
import { HomeCarousel, type CarouselSlide } from "@/components/home/HomeCarousel";
import { ThreePaths, type PathCard } from "@/components/home/ThreePaths";
import { HowItsDifferent, type DifferentiatorCard } from "@/components/home/HowItsDifferent";
import { HomeClosingCta } from "@/components/home/HomeClosingCta";

const slides: CarouselSlide[] = [
  {
    id: "slide-1",
    icon: "calendar",
    title: "Upcoming Cohort",
    subtitle: "For You dates",
    dateOrTag: "Q3 2026 Cohort",
    description: "Registration is open for our 4-week Human-Centered AI Executive Intensive.",
    linkText: "View Schedule →",
    linkUrl: "#for-you",
    accentColor: "#39918d",
  },
  {
    id: "slide-2",
    icon: "barChart",
    title: "Industry Report",
    subtitle: "AI adoption trend",
    dateOrTag: "July 2026 Edition",
    description: "Benchmark data on enterprise AI maturity, ROI metrics, and governance models.",
    linkText: "Download Report →",
    linkUrl: "#insights",
    accentColor: "#c57b4b",
  },
  {
    id: "slide-3",
    icon: "users",
    title: "TBG News",
    subtitle: "Team / partnership",
    dateOrTag: "Press Release",
    description: "The Bradbury Group expands advisory board with former Fortune 50 CTOs.",
    linkText: "Read Announcement →",
    linkUrl: "#about",
    accentColor: "#39918d",
  },
  {
    id: "slide-4",
    icon: "presentation",
    title: "Workshop Spotlight",
    subtitle: "Community Upskilling",
    dateOrTag: "Live Masterclass",
    description: "Interactive session: Designing Governance & Human-in-the-Loop Workflows.",
    linkText: "Reserve Seat →",
    linkUrl: "#resources",
    accentColor: "#c57b4b",
  },
  {
    id: "slide-5",
    icon: "fileText",
    title: "From Insights",
    subtitle: "Latest post",
    dateOrTag: "5 Min Read",
    description: "Why prompt engineering is secondary to contextual domain architecture.",
    linkText: "Read Article →",
    linkUrl: "#insights",
    accentColor: "#39918d",
  },
];

const paths: PathCard[] = [
  {
    id: "path-for-you",
    title: "For You",
    isPrimary: true,
    description: "Individual executive coaching, personal AI agent workflows, and foundational upskilling.",
    audience: "Founders, Executives & Solitary Leaders",
    features: ["1-on-1 Executive AI Strategy", "Custom Agent Workflow Suite", "Personal Productivity Blueprint"],
    ctaText: "Explore →",
    ctaTarget: "#for-you",
    accentColor: "#39918d",
    iconName: "user",
    columbusTopic: "Individual Executive Coaching & Personal Workflows",
  },
  {
    id: "path-for-leaders",
    title: "For Leaders",
    description: "Team enablement, cross-functional AI alignment, and leadership architecture design.",
    audience: "VPs, Department Heads & Directors",
    features: ["Departmental Readiness Audit", "Leadership Upskilling Cohorts", "Ethics & Governance Framework"],
    ctaText: "Learn more →",
    ctaTarget: "#for-leaders",
    accentColor: "#c57b4b",
    iconName: "crown",
    columbusTopic: "Team Enablement & Departmental Readiness",
  },
  {
    id: "path-for-orgs",
    title: "For Organizations",
    description: "Enterprise-wide AI transformation, custom model integration, and proprietary ROI models.",
    audience: "CXOs & Enterprise PMOs",
    features: ["Enterprise AI Architecture", "Proprietary ROI Dashboard", "Full-Stack Agent Deployment"],
    ctaText: "Explore →",
    ctaTarget: "#for-organizations",
    accentColor: "#39918d",
    iconName: "building",
    columbusTopic: "Enterprise-wide AI Transformation & Architecture",
  },
];

const differentiators: DifferentiatorCard[] = [
  {
    id: "diff-1",
    title: "Frameworks, not tutorials",
    linkText: "See the frameworks →",
    captionText: "links to Resources",
    targetSection: "#resources",
    iconName: "grid",
    description: "We don't teach tool shortcuts. We deliver repeatable strategic mental models and decision trees.",
  },
  {
    id: "diff-2",
    title: "People, not the tech stack",
    linkText: "Learning Architecture Design →",
    captionText: "links to Learning Architecture Design",
    targetSection: "#for-leaders",
    iconName: "people",
    description: "Technology fails without cultural readiness. We design human workflows that elevate your team.",
  },
  {
    id: "diff-3",
    title: "Proven, not promised",
    linkText: "See Our ROI →",
    captionText: "links to Our ROI for Human-Focused AI",
    targetSection: "#our-roi",
    iconName: "shield",
    description: "Rigorous measurement, verifiable performance benchmarks, and measurable business impact.",
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      <HomeHero />
      <HomeCarousel slides={slides} seeAllText="See All Updates →" />
      <ThreePaths paths={paths} />
      <HowItsDifferent differentiators={differentiators} />
      <HomeClosingCta
        headline="Not sure which path is right for you?"
        buttonText="Book a discovery call"
        subtext="Schedule a confidential 30-minute strategic consultation with our executive team."
      />
    </div>
  );
}

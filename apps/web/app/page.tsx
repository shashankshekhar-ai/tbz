import { HomeHero } from "@/components/home/HomeHero";
import { MeetColumbus } from "@/components/home/MeetColumbus";
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
    accentColor: "#3f6d67",
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
    accentColor: "#0c2940",
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
    title: "Build Your Own AI Fluency",
    isPrimary: true,
    description:
      "A structured program for individual professionals — practical skills, real frameworks, built for sustainable professional leverage.",
    audience: "",
    ctaTarget: "#about",
    columbusButtonText: "Explore AI Fluency Cohort",
    accentColor: "#39918d",
    iconName: "user",
    columbusTopic: "Individual Executive Coaching & Personal Workflows",
  },
  {
    id: "path-for-leaders",
    title: "A Strategic Partner for Executives",
    description:
      "A private, one-on-one engagement for leaders who need to build an AI strategy they can execute with confidence.",
    audience: "VPs, Department Heads & Directors",
    ctaTarget: "#about",
    columbusButtonText: "Learn About The Solomon Engine",
    accentColor: "#c57b4b",
    iconName: "crown",
    columbusTopic: "Team Enablement & Departmental Readiness",
  },
  {
    id: "path-for-orgs",
    title: "Bring AI Fluency to Your Team",
    description:
      "Training, learning architecture, and community workshops built for organizations who want to roll out AI at scale.",
    audience: "CXOs & Enterprise PMOs",
    ctaTarget: "#about",
    columbusButtonText: "Explore Organizational Partnerships",
    accentColor: "#39918d",
    iconName: "building",
    columbusTopic: "Enterprise-wide AI Transformation & Architecture",
  },
];

const differentiators: DifferentiatorCard[] = [
  {
    id: "diff-1",
    title: "Built on structure, not screenshots.",
    iconName: "grid",
    description: "We explore how to think with AI, not which buttons to click.",
  },
  {
    id: "diff-2",
    title: "People-first.",
    iconName: "people",
    description:
      "Every learning journey starts with how people actually learn and adopt new skills — not just the tools themselves.",
  },
  {
    id: "diff-3",
    title: "Proven, not promised.",
    iconName: "shield",
    description: "Every framework we use has been vetted and tested with real clients.",
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      <HomeHero />
      <MeetColumbus />
      <HomeCarousel slides={slides} seeAllText="See All Updates →" />
      <ThreePaths paths={paths} />
      <HowItsDifferent differentiators={differentiators} />
      <HomeClosingCta
        headline="Not sure which path is right for you?"
        buttonText="Book a discovery call"
        subtext="Talk it through with us directly."
      />
    </div>
  );
}

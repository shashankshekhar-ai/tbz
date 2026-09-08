export interface NavDropdownChild {
  id: string;
  number: string;
  label: string;
  subtitle: string;
  href: string;
  badge?: string;
}

export interface NavDropdown {
  microcopy: string;
  children: NavDropdownChild[];
}

// Keyed by the top-level nav item's href. Items not listed here render as a
// plain link. Every href/anchor below points at a real section id already
// rendered on that page — see AboutHero/PaigeStory/PartnerSpotlight/
// Testimonials/TeamIntro, the-solomon-engine/page.tsx, and
// ai-fluency-cohort's TwoPhaseSection for the ids.
export const NAV_DROPDOWNS: Record<string, NavDropdown> = {
  "/ai-fluency-cohort": {
    microcopy: "Individual capability tracks, learning phases & sponsorship",
    children: [
      {
        id: "phase-overview",
        number: "01",
        label: "AI Literacy & Fluency Phases",
        subtitle: "Two-phase progression from foundations to applied workflows",
        href: "/ai-fluency-cohort#cohort-overview",
      },
      {
        id: "tax-reimbursement",
        number: "02",
        label: "Tax & Reimbursement",
        subtitle: "Employer tuition reimbursement & deductible expense guidance",
        href: "/ai-fluency-cohort#tax-reimbursement",
      },
      {
        id: "manager-letter",
        number: "03",
        label: "Manager Recommendation Letter",
        subtitle: "Ready-to-use sponsorship template for HR sign-off",
        badge: "Download",
        href: "/resources/manager-recommendation-letter",
      },
    ],
  },
  "/the-solomon-engine": {
    microcopy: "Build AI capability across your leadership & organization.",
    children: [
      {
        id: "enterprise-tier",
        number: "01",
        label: "Enterprise Tier",
        subtitle: "Dedicated cohort & departmental readiness audit",
        href: "/the-solomon-engine#enterprise",
      },
      {
        id: "small-business-tier",
        number: "02",
        label: "Small Business Tier",
        subtitle: "Shared cohort following the standard 12-week curriculum",
        href: "/the-solomon-engine#small-business",
      },
      {
        id: "walter-track",
        number: "03",
        label: "Walter — L&D Strategist Track",
        subtitle: "Dedicated track for learning & development leaders",
        badge: "L&D Track",
        href: "/the-solomon-engine#walter-track",
      },
      {
        id: "apply",
        number: "04",
        label: "Apply / Interview",
        subtitle: "Start your application — Solomon AI guides the process",
        badge: "Solomon Engine",
        href: "/the-solomon-engine#apply",
      },
    ],
  },
  "/for-organizations": {
    microcopy: "Design and embed AI capability across your organization.",
    children: [
      {
        id: "learning-architecture",
        number: "01",
        label: "Learning Architecture Design",
        subtitle: "Custom learning taxonomy & AI skill mapping",
        href: "/for-organizations#learning-architecture",
      },
      {
        id: "embedded-training",
        number: "02",
        label: "Embedded Training Partnership",
        subtitle: "Facilitators embedded in your teams over multiple quarters",
        href: "/for-organizations#embedded-training",
      },
      {
        id: "community-workshops",
        number: "03",
        label: "Community Upskilling Workshops",
        subtitle: "Workshop catalog & hands-on capability labs",
        badge: "Catalog",
        href: "/for-organizations/workshops",
      },
    ],
  },
  "/about": {
    microcopy: "Meet the people, partners, and thinking behind The Bradbury Group.",
    children: [
      {
        id: "story",
        number: "01",
        label: "Paige's Story",
        subtitle: "Founder's story & vision for human-centered AI",
        href: "/about#story",
      },
      {
        id: "partners",
        number: "02",
        label: "Partner Spotlight",
        subtitle: "Current collaborations and shared curricula",
        href: "/about#partners",
      },
      {
        id: "testimonials",
        number: "03",
        label: "Testimonials",
        subtitle: "Stories and impact from our community",
        href: "/about#testimonials",
      },
      {
        id: "team",
        number: "04",
        label: "The Team",
        subtitle: "Meet the people behind the frameworks",
        href: "/about#team",
      },
    ],
  },
};

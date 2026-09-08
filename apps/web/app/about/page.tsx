import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { PaigeStory } from "@/components/about/PaigeStory";
import { PartnerSpotlight, type Partner } from "@/components/about/PartnerSpotlight";
import { Testimonials, type Testimonial } from "@/components/about/Testimonials";
import { TeamIntro } from "@/components/about/TeamIntro";
import { getTestimonials } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paige Bradbury is an instructional designer, AI consultant, and former CNN Radio correspondent helping leaders build AI-ready organizations.",
};

const partners: Partner[] = [
  {
    id: "amplified-concepts",
    name: "AMPLIFIED CONCEPTS",
    founder: "Sherry Heyl, Founder",
    focus: "Revenue Strategy & Organizational Change Architecture",
    description:
      "We don't believe learning exists in isolation from business strategy—so when we partnered with Sherry Heyl and Amplified Concepts, we designed a symmetric knowledge exchange. Sherry brought her expertise in revenue architecture, CRM strategy, and AI-assisted sales workflows. We brought our Learning Architecture Blueprint and direct access to Walter, our proprietary AI learning strategist, along with Paige's strategic guidance.",
    outcome:
      "The result: TBG's business infrastructure got audited, blueprinted, and accelerated by a world-class revenue strategist. Amplified Concepts built their curriculum with our frameworks and tools.",
    pullQuote: "Peer-level collaboration. Defined deliverables. Mutual growth.",
    philosophy:
      "This partnership models what we believe about transformation: strategy before implementation. Recommendations before execution. Both parties own the work; neither owns dependency.",
    isPending: false,
    category: "Featured Collaboration",
  },
  { id: "autohive", name: "AUTOHIVE", focus: "AI Workflow Automation", isPending: true, category: "AI Infrastructure" },
  {
    id: "arna-intelligence",
    name: "ARNA INTELLIGENCE",
    focus: "Enterprise AI Infrastructure & Data Strategy",
    isPending: true,
    category: "Enterprise Intelligence",
  },
  {
    id: "georgia-ai-alliance",
    name: "GEORGIA AI ALLIANCE",
    focus: "Workforce AI Readiness Initiative",
    isPending: true,
    category: "Statewide Readiness",
  },
  {
    id: "ai-for-good",
    name: "AI FOR GOOD",
    focus: "Ethical AI Standards & Social Impact",
    isPending: true,
    category: "Ethical AI Governance",
  },
  {
    id: "trainingpros",
    name: "TRAININGPROS",
    focus: "Instructional Design & Custom Talent Solutions",
    isPending: true,
    category: "Instructional Architecture",
  },
  {
    id: "sweetrush",
    name: "SWEETRUSH",
    focus: "Immersive Learning & Cultural Transformation",
    isPending: true,
    category: "Learning Ecosystems",
  },
  {
    id: "workfast-consulting",
    name: "WORKFAST CONSULTING",
    founder: "James Stovall",
    focus: "Operations & Agile Execution",
    isPending: true,
    category: "Operational Excellence",
  },
  {
    id: "ai-collective",
    name: "AI COLLECTIVE",
    founder: "Mark Michelson",
    focus: "Research & Market Intelligence",
    isPending: true,
    category: "Market Intelligence",
  },
  { id: "arnas", name: "ARNAS", focus: "Strategic AI Advisory", isPending: true, category: "Strategic Advisory" },
  {
    id: "lda",
    name: "LDA",
    focus: "Learning & Development Advisory",
    isPending: true,
    category: "Talent Development",
  },
  {
    id: "gwinnett-entrepreneur-center",
    name: "GWINNETT ENTREPRENEUR CENTER",
    focus: "Regional Innovation & Business Acceleration",
    isPending: true,
    category: "Regional Ecosystems",
  },
];

const fallbackTestimonials: Testimonial[] = [
  {
    id: "chris-rachel-mccluskey",
    name: "Chris & Rachel McCluskey",
    title: "Founders",
    organization: "Professional Christian Coaching Institute",
    quote: "Testimonial pending confirmation",
    isPending: true,
  },
  {
    id: "lindsey-quistgaard",
    name: "Lindsey Quistgaard",
    title: "Director of Global Customer Enablement",
    organization: "Wellspring",
    quote: "Testimonial pending confirmation",
    isPending: true,
  },
  {
    id: "sam-weber",
    name: "Sam Weber",
    title: "Strategic Learning Partner",
    organization: "Enterprise Transformation Group",
    quote: "Testimonial pending confirmation",
    isPending: true,
  },
  {
    id: "rick-walker",
    name: "Rick Walker",
    title: "Executive Advisor",
    organization: "Workforce Readiness Initiative",
    quote: "Testimonial pending confirmation",
    isPending: true,
  },
];

export default async function AboutPage() {
  const cmsTestimonials = await getTestimonials();
  const testimonials = cmsTestimonials.length > 0 ? cmsTestimonials : fallbackTestimonials;

  return (
    <div>
      <AboutHero />
      <PaigeStory />
      <PartnerSpotlight partners={partners} />
      <Testimonials testimonials={testimonials} />
      <TeamIntro />
    </div>
  );
}

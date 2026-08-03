import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Globe, Mic, Brain, UserCheck, ShieldCheck, ArrowUpRight, Building2 } from "lucide-react";
import { AboutHero } from "@/components/about/AboutHero";
import { TestimonialCarousel, type Testimonial } from "@/components/about/TestimonialCarousel";
import { PartnerGrid, type Partner } from "@/components/about/PartnerGrid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paige Bradbury is an instructional designer, AI consultant, and former CNN Radio correspondent helping leaders build AI-ready organizations.",
};

const founderStats = [
  { label: "Years Experience", value: "15+", icon: Calendar, color: "#39918d" },
  { label: "Training Programs", value: "Global", icon: Globe, color: "#3f6d67" },
  { label: "Former Correspondent", value: "CNN", icon: Mic, color: "#c57b4b" },
  { label: "Learning Architect", value: "AI", icon: Brain, color: "#f8c51c" },
];

const team = [
  { id: "1", name: "Paige Bradbury", role: "Founder & Principal Learning Architect" },
  { id: "2", name: "Team Member", role: "Coming Soon" },
  { id: "3", name: "Team Member", role: "Coming Soon" },
  { id: "4", name: "Team Member", role: "Coming Soon" },
];

const advisoryBoard = [
  { id: "1", title: "AI Strategy & Innovation", status: "Coming Soon", role: "Specialist Advisor" },
  { id: "2", title: "Workforce Development", status: "Coming Soon", role: "Specialist Advisor" },
  { id: "3", title: "Organizational Psychology", status: "Coming Soon", role: "Specialist Advisor" },
  { id: "4", title: "Enterprise Transformation", status: "Coming Soon", role: "Specialist Advisor" },
];

const partners: Partner[] = [
  {
    id: "p1",
    name: "Amplified Concepts",
    founder: "Sherry Heyl, Founder",
    desc: "Revenue Strategy & Organizational Change Architecture",
    website: "https://amplifiedconcepts.com",
    featured: false,
  },
  {
    id: "p2",
    name: "Arna Intelligence",
    founder: "Enterprise Knowledge Intelligence",
    desc: "AI Transformation • Knowledge Graphs • LLM Integration • Learning Architecture",
    website: "https://arnaintelligence.com",
    featured: true,
  },
  {
    id: "p3",
    name: "Georgia AI Alliance",
    founder: "AI Workforce Readiness",
    desc: "Policy • Community • Innovation",
    website: "https://georgiaaialliance.org",
  },
  {
    id: "p4",
    name: "AI For Good",
    founder: "Responsible AI",
    desc: "Ethical Innovation",
    website: "https://aiforgood.org",
  },
  { id: "p5", name: "Autohive", founder: "", desc: "", website: "#", status: "Coming Soon" },
  { id: "p6", name: "TrainingPros", founder: "", desc: "", website: "#", status: "Coming Soon" },
  { id: "p7", name: "SweetRush", founder: "", desc: "", website: "#", status: "Coming Soon" },
  { id: "p8", name: "Workfast Consulting", founder: "James Stovall", desc: "", website: "#", status: "Coming Soon" },
  { id: "p9", name: "AI Collective", founder: "Mark Michelson", desc: "", website: "#", status: "In Progress" },
];

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "TBG helped us build training that actually changes behavior—and scales.",
    name: "Chris & Rachel McCluskey",
    role: "Founders, Professional Christian Coaching Institute",
  },
  {
    id: "t2",
    quote: "Their approach to AI fluency is the most practical and human-centered I've seen.",
    name: "Lindsey Quistgaard",
    role: "Director, Global Customer Enablement, Wellspring",
  },
  {
    id: "t3",
    quote: "The frameworks gave us clarity. The partnership gave us momentum.",
    name: "Sam Weber",
    role: "Leader, Strategy & Growth",
  },
  {
    id: "t4",
    quote: "Practical, actionable, and built for the real world—not just theory.",
    name: "Rick Walker",
    role: "Executive Coach, Leadership Advisory",
  },
];

const philosophy = [
  {
    title: "Psychological Safety",
    desc: "We create safe environments where people feel empowered to challenge, explore and grow.",
    Icon: ShieldCheck,
    color: "#39918d",
  },
  {
    title: "Agency First",
    desc: "People learn best when they have choice, autonomy and ownership of their journey.",
    Icon: UserCheck,
    color: "#c57b4b",
  },
  {
    title: "Capability Over Compliance",
    desc: "We build durable capability—not just compliance—so organizations thrive in the age of AI.",
    Icon: Brain,
    color: "#3f6d67",
  },
];

const impact = [
  { number: "15+", label: "Years", sublabel: "Experience", Icon: Calendar },
  { number: "Global", label: "Training", sublabel: "Programs", Icon: Globe },
  { number: "Executive", label: "Coaching", sublabel: "Guidance", Icon: UserCheck },
  { number: "Enterprise", label: "Transformation", sublabel: "Architecture", Icon: Building2 },
  { number: "AI Capability", label: "Frameworks", sublabel: "Durable Wins", Icon: Brain },
];

export default function AboutPage() {
  return (
    <div>
      <AboutHero />

      {/* Founder */}
      <section id="paiges-story" className="py-24 bg-[#F7F8F9] text-[#0c2940] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D9E3E6] h-[520px]">
                <Image
                  src="/brand/paige-headshot.jpg"
                  alt="Paige Bradbury — Founder, The Bradbury Group"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "50% 12%" }}
                  priority
                />
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white p-6 rounded-xl backdrop-blur-md bg-[#0c2940]/80 border border-white/20">
                  <span className="text-xs font-inter font-bold tracking-wider text-[#39918d] uppercase block">
                    Founder &amp; Principal Learning Architect
                  </span>
                  <span className="text-lg font-montserrat font-bold text-white block">Paige Bradbury</span>
                  <span className="text-xs font-roboto text-[#D9E3E6] italic block mt-0.5">
                    &ldquo;Permission to wrestle with learning builds real AI capability.&rdquo;
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-1">
                  Our Founder
                </span>
                <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-[#0c2940] tracking-tight">
                  Paige Bradbury
                </h2>
                <p className="text-base font-montserrat font-medium text-[#3f6d67] mt-1">
                  Founder &amp; Principal Learning Architect
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base font-roboto text-[#60707A] leading-relaxed">
                <p>
                  Paige Bradbury is the Founder and Principal Learning Architect of The Bradbury Group. She
                  spent over 15+ years in international training, working across sectors and cultures —
                  building on an earlier career as a broadcast journalist and CNN Radio correspondent.
                </p>
                <p>
                  Her approach starts with psychological safety: giving people explicit permission to
                  exercise their own agency to push back on learning and struggle with something new. She
                  contends that this &ldquo;wrestling match&rdquo; builds confidence through small, early
                  wins instead of overwhelming them all at once.
                </p>
                <p>
                  Paige is a stakeholder in the Georgia AI Alliance, which is part of a national network
                  shaping responsible AI readiness. She is also a founding member of an international
                  initiative building ethical, science-backed standards for how organizations measure
                  learning and performance.
                </p>
                <p>
                  She loves building her own AI assistants for fun. Outside of work, she loves geeking out
                  on history and audiobooks, cooking, and being in her garden. She may or may not be using
                  AI to chart to a pollinator garden and keep her front yard green.
                </p>
              </div>

              <div className="pt-6 border-t border-[#D9E3E6] grid grid-cols-2 sm:grid-cols-4 gap-4">
                {founderStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3.5 rounded-xl bg-white border border-[#D9E3E6] shadow-sm flex items-center space-x-3"
                  >
                    <div className="p-2.5 rounded-lg bg-[#0c2940]/5 text-[#0c2940]">
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <span className="text-base font-montserrat font-bold text-[#0c2940] block">{stat.value}</span>
                      <span className="text-[11px] font-roboto text-[#60707A] block leading-tight">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="our-team" className="py-20 bg-white text-[#0c2940] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-12 text-center">
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-[#0c2940]">The People Behind TBG</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl border border-[#D9E3E6] p-6 text-center hover:border-[#39918d] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#EDF2F4] border border-[#D9E3E6] mx-auto mb-4 flex items-center justify-center text-[#39918d] font-montserrat font-bold text-lg">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-base font-montserrat font-bold text-[#0c2940]">{member.name}</h3>
                <p className="text-xs font-roboto text-[#60707A] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section id="advisory" className="py-20 bg-[#0c2940] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block">
                Advisory Board
              </span>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-semibold text-white">Advisory Board</h2>
              <p className="text-sm font-roboto text-[#D9E3E6] leading-relaxed">
                Our advisory board is currently being expanded with experts across AI, workforce
                development, organizational psychology and enterprise transformation.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {advisoryBoard.map((advisor) => (
                <div
                  key={advisor.id}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col items-center text-center space-y-4 group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 flex items-center justify-center text-[#39918d] group-hover:scale-110 group-hover:border-[#39918d] transition-all">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-montserrat font-bold text-white block">{advisor.status}</span>
                    <span className="text-xs font-roboto text-[#BFC9CD] block mt-1 leading-snug">
                      {advisor.title}
                    </span>
                  </div>
                  <div className="w-full pt-3 border-t border-white/10 text-[10px] text-[#39918d] font-inter font-medium tracking-wide uppercase">
                    {advisor.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PartnerGrid partners={partners} />

      <TestimonialCarousel testimonials={testimonials} />

      {/* Philosophy */}
      <section id="philosophy" className="py-24 bg-[#EDF2F4] text-[#0c2940] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block">
              Our Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-[#0c2940]">What Drives Our Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-[#D9E3E6] shadow-sm hover:shadow-xl hover:border-[#39918d] transition-all duration-300 group flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-[#F7F8F9] border border-[#D9E3E6] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#39918d]/10 transition-all">
                    {item.title === "Psychological Safety" ? (
                      <Image src="/brand/1.png" alt="Psychological Safety" width={32} height={32} className="object-contain" />
                    ) : (
                      <item.Icon className="w-8 h-8" style={{ color: item.color }} />
                    )}
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-[#0c2940]">{item.title}</h3>
                  <p className="text-sm font-roboto text-[#60707A] leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#EDF2F4] flex items-center justify-between text-xs font-inter font-semibold text-[#39918d] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more in framework</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-24 bg-[#0c2940] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block">
                Our Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-white leading-tight">
                Why Organizations <br />
                Choose TBG
              </h2>
            </div>

            <div className="lg:col-span-8 relative">
              <div className="hidden sm:block absolute top-10 left-8 right-8 h-0.5 border-t-2 border-dashed border-[#39918d]/40 z-0" />
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative z-10">
                {impact.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl glass-card border border-white/10 hover:border-[#39918d] transition-all hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0c2940] border-2 border-[#39918d] flex items-center justify-center shadow-lg">
                      <item.Icon className="w-5 h-5 text-[#39918d]" />
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-montserrat font-extrabold text-white block">
                        {item.number}
                      </span>
                      <span className="text-xs font-roboto text-[#BFC9CD] block mt-1 font-medium">{item.label}</span>
                      <span className="text-[10px] font-roboto text-[#39918d] block mt-0.5">{item.sublabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0c2940] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0c2940] via-[#3f6d67]/60 to-[#0c2940] border border-[#39918d]/40 p-8 sm:p-12 shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-3 flex justify-center lg:justify-start">
                <div className="w-24 h-24 rounded-2xl bg-[#0c2940]/90 border-2 border-[#39918d] flex flex-col items-center justify-center text-white shadow-xl">
                  <Calendar className="w-8 h-8 text-[#f8c51c] mb-1" />
                  <span className="text-xs font-inter font-bold tracking-wider uppercase text-[#39918d]">
                    Discovery
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white leading-tight">
                  Ready to Build <br className="hidden sm:inline" />
                  Human-Centered AI Capability?
                </h2>
                <p className="text-sm font-roboto text-[#D9E3E6]">
                  Let&rsquo;s design your organization&rsquo;s AI roadmap together.
                </p>
              </div>

              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <Link
                  href="/contact"
                  className="bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-inter font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  <span>Book a Discovery Call</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

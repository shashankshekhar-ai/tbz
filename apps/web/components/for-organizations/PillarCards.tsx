"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Building2, GraduationCap, Users2, ArrowRight, type LucideIcon } from "lucide-react";

interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  href?: string;
}

const pillars: Pillar[] = [
  {
    id: "learning-architecture",
    title: "Learning Architecture Design",
    description:
      "A custom-built learning architecture mapped to your organization's roles, risk profile, and existing L&D infrastructure — not a generic course library.",
    icon: Building2,
    accentColor: "#39918d",
  },
  {
    id: "embedded-training",
    title: "Embedded Training Partnership",
    description:
      "Our facilitators embed directly within your teams over multiple quarters, building capability in the flow of real work rather than one-off workshops.",
    icon: GraduationCap,
    accentColor: "#c57b4b",
  },
  {
    id: "community-workshops",
    title: "Community Upskilling Workshops",
    description:
      "Open-enrollment workshops for broader workforce upskilling — see the full catalog for upcoming sessions and topics.",
    icon: Users2,
    accentColor: "#3f6d67",
    href: "/for-organizations/workshops",
  },
];

export function PillarCards() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="flex flex-col justify-between h-full p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-shadow duration-200"
            >
              <div className="space-y-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: pillar.accentColor }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-[#0c2940] leading-tight">{pillar.title}</h3>
                <p className="text-sm font-roboto text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
              {pillar.href && (
                <div className="pt-6 mt-4 flex items-center gap-2 text-sm font-inter font-semibold text-[#39918d] group">
                  <span>See Workshop Catalog</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </motion.div>
          );
          return pillar.href ? (
            <Link key={pillar.id} href={pillar.href} className="group">
              {content}
            </Link>
          ) : (
            <div key={pillar.id}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}

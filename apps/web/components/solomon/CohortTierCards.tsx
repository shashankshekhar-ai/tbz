"use client";

import { motion } from "motion/react";
import { Check, ArrowRight, Building2, Users2, type LucideIcon } from "lucide-react";

interface Tier {
  id: string;
  name: string;
  badge: string;
  price: string;
  description: string;
  features: string[];
  accentColor: string;
  icon: LucideIcon;
}

const tiers: Tier[] = [
  {
    id: "enterprise",
    name: "Enterprise Tier",
    badge: "Dedicated Cohort",
    price: "Custom pricing",
    description: "A dedicated cohort built for your organization, facilitated by our senior team.",
    features: [
      "Dedicated facilitator & custom curriculum",
      "Departmental readiness audit included",
      "Org-wide rollout planning",
      "Priority Solomon AI access",
    ],
    accentColor: "#39918d",
    icon: Building2,
  },
  {
    id: "small-business",
    name: "Small Business Tier",
    badge: "Shared Peer Cohort",
    price: "Starting at $2,400 / seat",
    description: "Join a shared cohort of peer leaders following our standard 12-week curriculum.",
    features: [
      "Shared cohort, standard curriculum",
      "Leadership upskilling sessions",
      "Ethics & governance framework",
      "Solomon AI access during application",
    ],
    accentColor: "#c57b4b",
    icon: Users2,
  },
];

export function CohortTierCards() {
  return (
    <section id="tiers" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-[#0c2940] mb-3">
          Choose Your Cohort Tier
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {tiers.map((tier, i) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.id}
              id={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl bg-[#ffffff] border border-[#0c2940]/15 hover:border-[#39918d]/60 p-8 sm:p-10 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="p-3 rounded-xl border"
                    style={{
                      backgroundColor: `${tier.accentColor}26`,
                      borderColor: `${tier.accentColor}4D`,
                      color: tier.accentColor,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </span>
                  <span
                    className="text-xs font-inter font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{
                      color: tier.accentColor,
                      backgroundColor: `${tier.accentColor}1A`,
                      borderColor: `${tier.accentColor}4D`,
                    }}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-montserrat font-medium text-[#0c2940] mb-3">{tier.name}</h3>
                <p className="text-sm sm:text-base font-roboto text-[#0c2940]/80 mb-8 leading-relaxed">
                  {tier.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#39918d]" />
                      </span>
                      <span className="text-sm sm:text-base font-roboto text-[#0c2940]/90">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[#0c2940]/10">
                <span className="block text-2xl sm:text-3xl font-montserrat font-bold text-[#0c2940] mb-6">
                  {tier.price}
                </span>
                <a
                  href="#apply"
                  className="w-full inline-flex items-center justify-center gap-2 font-montserrat font-bold text-base py-4 rounded-xl shadow-md transition-all group"
                  style={{
                    backgroundColor: tier.accentColor,
                    color: tier.id === "small-business" ? "#0c2940" : "#ffffff",
                  }}
                >
                  <span>Apply</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-center text-sm font-roboto italic text-[#0c2940]/70 mt-12 max-w-2xl mx-auto">
        Pricing shown is indicative — final tier pricing is confirmed during the discovery call.
      </p>
    </section>
  );
}

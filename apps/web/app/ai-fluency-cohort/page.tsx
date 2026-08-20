import type { Metadata } from "next";
import { ForYouPage } from "@/components/for-you/ForYouPage";

export const metadata: Metadata = {
  title: "For You — AI Fluency Cohort",
  description:
    "Individual executive coaching, personal AI agent workflows, and foundational upskilling — a two-phase path from AI literacy to AI fluency.",
};

export default function AiFluencyCohortPage() {
  return <ForYouPage />;
}

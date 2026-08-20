import type { Metadata } from "next";
import { ForYouPage } from "@/components/for-you/ForYouPage";

export const metadata: Metadata = {
  title: "For You",
  description:
    "Individual executive coaching, personal AI agent workflows, and foundational upskilling — a two-phase path from AI literacy to AI fluency.",
};

export default function ForYouRoutePage() {
  return <ForYouPage />;
}

"use client";

import { useState } from "react";
import { ApplyInterviewForm } from "./ApplyInterviewForm";
import { SolomonWidget } from "./SolomonWidget";

export function ApplySection() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <ApplyInterviewForm onUnlocked={() => setUnlocked(true)} />
      {unlocked && <SolomonWidget />}
    </div>
  );
}

export interface CohortPhaseData {
  id: 'literacy' | 'fluency';
  phaseNumber: number;
  title: string;
  badge: string;
  tagline: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  capabilities: {
    title: string;
    description: string;
  }[];
}

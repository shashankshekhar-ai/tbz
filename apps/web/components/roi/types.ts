export interface AggregateMetric {
  id: string;
  metric: string;
  value: string;
  subtext?: string;
  icon?: string;
}

export interface PractitionerCase {
  id: string;
  name: string;
  role: string;
  tagline: string;
  narrative: string;
  metrics: {
    metric: string;
    result: string;
  }[];
  skillGained: string;
  categoryTag: string;
}

export interface CohortOutcome {
  metric: string;
  result: string;
  detail?: string;
}

export interface ExecutiveCase {
  name: string;
  title: string;
  organization: string;
  tagline: string;
  narrative: string;
  recoveredHours: {
    item: string;
    hours: string;
  }[];
  freedTeamMembers: number;
  immediateValueCaptured: string;
  roi: {
    trainingInvestment: string;
    projectedAnnualReturn: string;
    returnPerDollar: string;
    benchmarkComparison: string;
  };
  quote: string;
}

export interface BenchmarkRow {
  benchmark: string;
  before: string;
  after: string;
  impact: string;
}

export interface TeamQuote {
  genericRole: string;
  fullName: string;
  quote: string;
  leadTask?: string;
}

export interface OrgCase {
  name: string;
  tagline: string;
  narrative: string;
  fourPillars: {
    title: string;
    desc: string;
  }[];
  benchmarks: BenchmarkRow[];
  quotes: TeamQuote[];
}

export interface SectorItem {
  id: string;
  title: string;
  example: string;
  challenge: string;
  transformation: string;
}

export interface ModalContent {
  title: string;
  subtitle: string;
  category: string;
  body: string[];
  keyHighlights: string[];
}

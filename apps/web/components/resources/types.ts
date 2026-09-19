export type ResourceId =
  | 'manager-letter'
  | 'trips-scorecard'
  | 'core4-worksheet'
  | 'case-studies'
  | 'tax-guide'
  | 'glossary';

export type ResourceStatus = 'available' | 'content-hold';

export interface ResourceItem {
  id: ResourceId;
  resourceNumber: number;
  badgeLabel: string;
  cardHeadline: string; // Montserrat Medium H3
  cardBody: string; // Roboto Body
  bulletPoints?: {
    label: string;
    description: string;
  }[];
  covers?: string;
  includes?: string;
  footerNote?: string;
  ctaText: string;
  status: ResourceStatus;
  statusNotice?: {
    title: string;
    details: string;
    actionRequired: string;
  };
  category: 'Leadership & Case' | 'Strategy & Prioritization' | 'Workforce Readiness' | 'Evidence & Benchmarks' | 'Policy & Funding' | 'Reference & Taxonomy';
  fileFormat: string;
  fileSizeApprox: string;
  fullContent: {
    overview: string;
    keyTakeaways: string[];
    documentContent: string;
    metadata?: Record<string, string>;
  };
}

export interface UserLead {
  email: string;
  fullName?: string;
  organization?: string;
  role?: string;
  resourceId: ResourceId;
  timestamp: string;
  nurtureSequence: 'Desire' | 'Ability' | 'Context';
}

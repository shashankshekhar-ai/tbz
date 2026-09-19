export interface Partner {
  id: string;
  name: string;
  founder?: string;
  focus?: string;
  description?: string;
  outcome?: string;
  pullQuote?: string;
  philosophy?: string;
  paragraphs?: string[];
  isPending: boolean;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  quote: string;
  isPending: boolean;
}

export interface AdvisoryBoardMember {
  id: string;
  isPending: boolean;
  roleHint?: string;
}

export type SectionId =
  | 'hero'
  | 'for-you'
  | 'ai-literacy'
  | 'ai-fluency'
  | 'tax-reimbursement'
  | 'manager-letter'
  | 'story'
  | 'advisory'
  | 'partners'
  | 'testimonials'
  | 'team'
  | 'contact';

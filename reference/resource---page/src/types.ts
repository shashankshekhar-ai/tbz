export type PageView = 'organizations' | 'workshops';

export interface Workshop {
  id: string;
  category: 'leadership' | 'all-staff' | 'sme' | 'executive' | 'technical' | 'compliance';
  formatTag: string; // e.g. "LEADERSHIP SERIES • LIVE MASTERCLASS"
  title: string;
  description: string;
  fullOverview?: string;
  duration: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced' | 'Executive';
  targetAudience: string;
  availableDates: {
    id: string;
    date: string;
    time: string;
    timezone: string;
    seatsLeft: number;
    format: 'Live Virtual' | 'In-Person (London/Bristol)' | 'In-Person (London HQ)' | 'Hybrid' | 'Hybrid (Bristol Hub)' | string;
  }[];
  facilitator: {
    name: string;
    role: string;
    company?: string;
    avatar?: string;
  };
  syllabus: {
    moduleNumber: number;
    title: string;
    topics: string[];
  }[];
  keyTakeaways: string[];
}

export interface EnterprisePillar {
  id: string;
  title: string;
  shortDescription: string;
  fullDetails: string;
  iconType: 'learning' | 'embedded' | 'community' | 'governance';
  tag: string;
  deliverables: string[];
  metrics: string;
  actionText?: string;
  actionTarget?: PageView;
}

export interface ReservationDetails {
  workshopId: string;
  workshopTitle: string;
  selectedDateId: string;
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  seatsCount: number;
  notes?: string;
}

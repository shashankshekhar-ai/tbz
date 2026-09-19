export type CohortTierId = 'enterprise' | 'small-business';

export interface ApplicationFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  cohortTier: CohortTierId;
  goals: string;
}

export interface SolomonMessage {
  id: string;
  sender: 'solomon' | 'user';
  text: string;
  timestamp: string;
}

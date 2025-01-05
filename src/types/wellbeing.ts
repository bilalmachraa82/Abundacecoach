export interface GratitudeEntry {
  id: string;
  date: Date;
  content: string;
  category: 'financial' | 'personal' | 'professional' | 'health';
  mood: 1 | 2 | 3 | 4 | 5;
}

export interface Affirmation {
  id: string;
  text: string;
  category: 'abundance' | 'success' | 'growth' | 'confidence';
  audioUrl?: string;
}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: 'abundance' | 'clarity' | 'manifestation' | 'gratitude';
  completed: boolean;
}

export interface FengShuiTip {
  id: string;
  area: 'wealth' | 'career' | 'knowledge' | 'relationships';
  tip: string;
  implementation: string[];
}

export interface ManifestationEntry {
  id: string;
  goal: string;
  visualizations: string[];
  targetDate: Date;
  progress: number; // 0-100
  milestones: {
    description: string;
    completed: boolean;
  }[];
}

export interface GenerosityLog {
  id: string;
  date: Date;
  type: 'donation' | 'volunteer' | 'support';
  description: string;
  impact: string;
  amount?: number;
}
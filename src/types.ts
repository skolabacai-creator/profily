export interface Project {
  id: string;
  title: string;
  category: 'code' | 'design';
  problem?: string;
  solution?: string;
  result?: string;
  description?: string;
  technologies?: string[];
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  metric?: string;
}

export interface Transformation {
  id: string;
  number: string;
  before: string;
  after: string;
  details: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

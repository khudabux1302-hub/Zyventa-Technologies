// src/constants/projects.ts
import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import type { Media } from './project-media';
import { MEDIA } from './project-media';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type Project = Media & {
  slug: string;
  featured?: boolean; // true = shown on the home page
  icon: IconName;
  tags: string[];
  title: string;
  description: string;
  chipsLabel: string;
  chips: string[];
  github?: string; // delete this line for a project to hide its GitHub button
};

// replace your-username with your real GitHub name (or edit each link below)
const GH = 'https://github.com/your-username/';

const BASE_PROJECTS: Project[] = [
  {
    slug: 'ai-proctoring',
    featured: true,
    icon: 'eye',
    tags: ['Computer Vision', 'AI'],
    title: 'AI Smart Examination Proctoring System',
    description:
      'Real-time AI proctoring with multi-modal detection to ensure exam integrity at scale.',
    chipsLabel: 'Key features',
    chips: [
      'Eye Tracking',
      'Face Detection',
      'Mobile Detection',
      'Cheating Detection',
      'Teacher Dashboard Alerts',
    ],
    github: GH + 'ai-proctoring',
  },
  {
    slug: 'ai-recruitment',
    icon: 'people',
    tags: ['AI & Automation'],
    title: 'AI Recruitment & HR Automation Platform',
    description:
      'End-to-end AI hiring pipeline from CV upload to shortlisted candidates with zero manual effort.',
    chipsLabel: 'How it works',
    chips: ['CV Upload', 'OCR', 'AI Score', 'Shortlist', 'HR Dashboard'],
    github: GH + 'ai-recruitment',
  },
  {
    slug: 'meeting-intelligence',
    featured: true,
    icon: 'mic',
    tags: ['AI', 'NLP'],
    title: 'AI Meeting Intelligence System',
    description:
      'Transform every meeting into structured intelligence — summaries, action items, automated follow-ups.',
    chipsLabel: 'Key features',
    chips: [
      'Meeting Recording',
      'Speech-to-Text',
      'AI Summary',
      'Action Items',
      'Automated Email',
    ],
    github: GH + 'meeting-intelligence',
  },
  {
    slug: 'cura-ai',
    icon: 'medkit',
    tags: ['AI & Automation'],
    title: 'Cura AI Healthcare Assistant',
    description:
      'Intelligent healthcare assistant providing symptom analysis and medical guidance powered by AI.',
    chipsLabel: 'Key areas',
    chips: ['AI', 'Healthcare', 'NLP'],
    github: GH + 'cura-ai',
  },
  {
    slug: 'telecom-churn',
    icon: 'cellular',
    tags: ['Business Intelligence'],
    title: 'Telecom Customer Churn Dashboard',
    description:
      'Predictive churn analytics with real-time KPIs, customer segmentation, and retention intelligence.',
    chipsLabel: 'Built with',
    chips: ['Power BI', 'Python', 'ML', 'Azure'],
    github: GH + 'telecom-churn',
  },
  {
    slug: 'retail-analytics',
    icon: 'cart',
    tags: ['Business Intelligence'],
    title: 'Retail Sales Analytics Dashboard',
    description:
      '360-degree retail intelligence covering sales trends, inventory turns, and store performance.',
    chipsLabel: 'Built with',
    chips: ['Power BI', 'SQL', 'Python'],
    github: GH + 'retail-analytics',
  },
  {
    slug: 'sales-profit',
    icon: 'cash',
    tags: ['Business Intelligence'],
    title: 'Sales & Profit Analysis Dashboard',
    description:
      'Deep-dive profit analytics with margin analysis, product mix optimization, and trend forecasting.',
    chipsLabel: 'Built with',
    chips: ['Power BI', 'DAX', 'SQL', 'CFO reporting'],
    github: GH + 'sales-profit',
  },
  {
    slug: 'hr-attrition',
    icon: 'people-circle',
    tags: ['Business Intelligence'],
    title: 'HR Attrition Dashboard',
    description:
      'Workforce intelligence platform predicting employee attrition and identifying retention risks.',
    chipsLabel: 'Built with',
    chips: ['Power BI', 'Python', 'HR Analytics'],
    github: GH + 'hr-attrition',
  },
  {
    slug: 'bank-loan-risk',
    icon: 'card',
    tags: ['Business Intelligence'],
    title: 'Bank Loan Risk Dashboard',
    description:
      'Credit risk intelligence platform for portfolio monitoring, default prediction, and regulatory reporting.',
    chipsLabel: 'Built with',
    chips: ['Power BI', 'SQL', 'Python', 'Risk Analytics'],
    github: GH + 'bank-loan-risk',
  },
  {
    slug: 'supply-chain',
    icon: 'cube',
    tags: ['Business Intelligence'],
    title: 'Supply Chain Dashboard',
    description:
      'End-to-end supply chain visibility from procurement to delivery with bottleneck detection.',
    chipsLabel: 'Built with',
    chips: ['Power BI', 'SQL', 'ERP Integration'],
    github: GH + 'supply-chain',
  },
  {
    slug: 'education-analytics',
    icon: 'school',
    tags: ['Business Intelligence'],
    title: 'Education Analytics Dashboard',
    description:
      'Institution-wide academic performance analytics for administrators, faculty, and students.',
    chipsLabel: 'Built with',
    chips: ['Power BI', 'SQL', 'Python', 'Academic BI'],
    github: GH + 'education-analytics',
  },
  {
    slug: 'finance-expense',
    icon: 'wallet',
    tags: ['Software Development'],
    title: 'Finance Expense Tracker',
    description:
      'Full-stack personal and business finance management application with AI-powered insights.',
    chipsLabel: 'Built with',
    chips: ['React', 'Node.js', 'PostgreSQL', 'AI Insights'],
    github: GH + 'finance-expense',
  },
  {
    slug: 'smart-route',
    icon: 'navigate',
    tags: ['Software Development'],
    title: 'Smart Route Finder',
    description:
      'AI-powered route optimization application for logistics, delivery, and field operations.',
    chipsLabel: 'Built with',
    chips: ['React', 'Python', 'Maps API', 'OR-Tools'],
    github: GH + 'smart-route',
  },
  {
    slug: 'job-portal',
    featured: true,
    icon: 'briefcase',
    tags: ['Software Development'],
    title: 'Job Search Portal',
    description:
      'Full-featured job marketplace connecting employers and job seekers with AI-powered matching.',
    chipsLabel: 'Built with',
    chips: ['React', 'Node.js', 'PostgreSQL', 'AI Matching'],
    github: GH + 'job-portal',
  },
  {
    slug: 'flood-risk',
    icon: 'water',
    tags: ['GIS & Machine Learning'],
    title: 'Flood Risk Prediction System',
    description:
      'ML-powered flood risk assessment and early warning system using geospatial data.',
    chipsLabel: 'Built with',
    chips: ['Python', 'QGIS', 'PostGIS', 'ML', 'Satellite APIs'],
    github: GH + 'flood-risk',
  },
];

// joins each project with its photos and video from project-media.ts
export const PROJECTS: Project[] = BASE_PROJECTS.map((project) => ({
  ...project,
  ...MEDIA[project.slug],
}));
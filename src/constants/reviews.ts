// src/constants/reviews.ts
export type Review = {
  name: string;
  role: string; // job title and company
  rating: number; // 1 to 5
  text: string;
};

// Add real reviews here, newest first. Only the first 10 are shown on the home page.
export const REVIEWS: Review[] = [
  {
    name: 'Client Name',
    role: 'Job title, Company',
    rating: 5,
    text: 'Replace this with your first real client review.',
  },
  {
    name: 'Client Name',
    role: 'Job title, Company',
    rating: 5,
    text: 'Replace this with your second real client review.',
  },
  {
    name: 'Client Name',
    role: 'Job title, Company',
    rating: 4,
    text: 'Replace this with your third real client review.',
  },
];
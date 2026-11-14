// src/constants/project-media.ts
import type { ImageSourcePropType } from 'react-native';

export type Media = {
  cover?: ImageSourcePropType; // photo on the home page card
  images?: ImageSourcePropType[]; // photos on the Portfolio screen
  video?: number; // video on the Portfolio screen
};

// Add your files here, one project at a time.
// Remove the // in front of a project and use your own file names.
// File names must be lowercase, with lowercase endings (.jpg, .png, .mp4).
export const MEDIA: Record<string, Media> = {
  // 'ai-proctoring': {
  //   cover: require('../../assets/images/projects/ai-proctoring-cover.jpg'),
  //   images: [
  //     require('../../assets/images/projects/ai-proctoring-1.jpg'),
  //     require('../../assets/images/projects/ai-proctoring-2.jpg'),
  //   ],
  //   video: require('../../assets/videos/ai-proctoring.mp4'),
  // },
  'smart-route':{
    images: require('../../assets/images/covers/smart-route-cover.jpg'),
    video: require('../../assets/videos/route-finder.mp4'),
  },
};
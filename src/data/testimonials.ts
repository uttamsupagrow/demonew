import { images } from '../lib/images';

export interface Testimonial {
  name: string;
  location: string;
  treatment: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Amelia Hart',
    location: 'Lincoln Park',
    treatment: 'Laser Hair Removal',
    rating: 5,
    quote:
      'Six sessions and I have thrown away every razor in my house. The team explains exactly what is happening at each visit, and the cooling tip makes it far easier than I expected.',
    avatar: images.team01,
  },
  {
    name: 'Sofia Reyes',
    location: 'Wicker Park',
    treatment: 'Morpheus8',
    rating: 5,
    quote:
      'My acne scars softened more in two Morpheus8 sessions than in three years of topical treatments. They were honest with me about realistic expectations — and then exceeded them.',
    avatar: images.team02,
  },
  {
    name: 'Daniel Okafor',
    location: 'Downers Grove',
    treatment: 'LaseMD Ultra',
    rating: 5,
    quote:
      'As a guy who had never done anything facial, this was the perfect entry point. Thirty minutes, one day of light texture, and my skin looks like it did a decade ago.',
    avatar: images.team03,
  },
  {
    name: 'Grace Lindqvist',
    location: 'Rolling Meadows',
    treatment: 'Injectables',
    rating: 5,
    quote:
      'I was terrified of looking "done." My injector spent as long talking me out of filler as she spent placing it — and the Botox result is so natural that people just say I look rested.',
    avatar: images.team04,
  },
  {
    name: 'Maya Chen',
    location: 'Streeterville',
    treatment: 'Membership — Elite',
    rating: 5,
    quote:
      'The membership pays for itself if you do facials monthly. Booking through the app takes ten seconds and I always get a same-week appointment.',
  },
];

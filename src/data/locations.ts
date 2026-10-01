import { images } from '../lib/images';

export interface Location {
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  mapUrl: string;
  note?: string;
}

export const locations: Location[] = [
  {
    name: 'Lincoln Park',
    address: '2140 N Clark St, Chicago, IL 60614',
    hours: 'Mon–Sat · 9:00 – 20:00',
    phone: '+1 (312) 555-0119',
    image: images.location01,
    mapUrl: 'https://maps.google.com/?q=2140+N+Clark+St+Chicago',
    note: 'Flagship studio — full laser & injector suite',
  },
  {
    name: 'Wicker Park',
    address: '1523 N Milwaukee Ave, Chicago, IL 60622',
    hours: 'Tue–Sat · 10:00 – 19:00',
    phone: '+1 (773) 555-0164',
    image: images.location02,
    mapUrl: 'https://maps.google.com/?q=1523+N+Milwaukee+Ave+Chicago',
    note: 'Laser hair removal & facials',
  },
  {
    name: 'Oak Brook',
    address: '815 Commons Dr, Oak Brook, IL 60523',
    hours: 'Mon–Fri · 9:00 – 18:00',
    phone: '+1 (630) 555-0142',
    image: images.location03,
    mapUrl: 'https://maps.google.com/?q=815+Commons+Dr+Oak+Brook',
    note: 'Suburban flagship — Morpheus8 & LaseMD',
  },
];

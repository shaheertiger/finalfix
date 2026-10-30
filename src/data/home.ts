import type { FAQ } from './services';

/** Four-step process shown on the homepage. */
export const PROCESS_STEPS = [
  { title: 'Contact', body: 'Call or text us. Tell us what is going on with your roof.' },
  { title: 'Inspect', body: 'We look at the roof and give you a clear written estimate.' },
  { title: 'Install', body: 'Our crew does the work and protects your property.' },
  { title: 'Clean up', body: 'We clean the site and walk through the finished job with you.' },
];

/** Homepage FAQ. The FAQPage schema is generated from this same list. */
export const HOME_FAQS: FAQ[] = [
  {
    question: 'What does Final Fix Roofing & Construction do?',
    answer:
      'Final Fix Roofing & Construction handles roof replacement, roof repair, leak and emergency repair, eavestrough and soffit, siding, and exterior construction for homeowners in Southern Ontario.',
  },
  {
    question: 'Where does Final Fix Roofing work?',
    answer:
      'Final Fix Roofing serves homes within 100 miles of Toronto and London, Ontario. The service area includes Toronto, Mississauga, Hamilton, Kitchener, Waterloo, London and St. Thomas, among other cities.',
  },
  {
    question: 'How do I get a free estimate?',
    answer:
      'Call 437-869-1930 or text us about your roof. Tell us what is going on, and we will arrange an inspection and a written estimate.',
  },
  {
    question: 'How do I know if I need roof repair or a full replacement?',
    answer:
      'A repair suits a few damaged shingles, a vent or a small flashing problem. A replacement is usually better when the roof is near the end of its life, the damage is widespread, or leaks keep coming back. Final Fix Roofing tells you which option makes sense, in writing.',
  },
  {
    question: 'Do you handle roof leaks after a storm?',
    answer:
      'Yes. Call 437-869-1930 about active leaks and storm damage. The team will stop further water getting in and plan the permanent repair.',
  },
];

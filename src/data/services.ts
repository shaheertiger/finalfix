/**
 * Service pages. Each entry drives one prerendered route at /{slug}.
 * Copy stays general and avoids unverified claims (prices, warranties, years in
 * business, licences). Add those only when they are confirmed in business.ts.
 */

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  /** Short name used in cards, nav and breadcrumbs. */
  name: string;
  /** Visible H1. Contains the primary keyword. */
  h1: string;
  /** Full <title>, 60 characters or fewer where possible. */
  metaTitle: string;
  /** 140 to 160 characters. */
  metaDescription: string;
  /** Short card description shown on the homepage. */
  summary: string;
  /** First paragraph. Answers the reader's situation directly. */
  intro: string;
  /** Six items, shown as the "What's included" grid. */
  features: string[];
  faqs: FAQ[];
}

export const SERVICES: Service[] = [
  {
    slug: 'roof-replacement-ontario',
    name: 'Roof Replacement',
    h1: 'Roof Replacement in Southern Ontario',
    metaTitle: 'Roof Replacement Ontario | Final Fix Roofing',
    metaDescription:
      'Full roof replacement in Southern Ontario: tear-off, deck inspection and new shingles or other roofing systems, with a written estimate. Call 437-869-1930.',
    summary: 'Full tear-off and installation of asphalt shingle and other roofing systems.',
    intro:
      'A full roof replacement makes sense when the shingles are worn out, the roof leaks in more than one place, or the decking underneath has soft spots. We tear the old roofing off down to the deck, inspect the boards, and install new underlayment, flashing and your chosen roofing system. You get a written estimate before any work starts, so you know what is being replaced and what it costs.',
    features: [
      'Full tear-off to the deck, so problems underneath are found, not covered',
      'Deck inspection, with rotten or damaged boards replaced before the new roof goes on',
      'New underlayment, drip edge and flashing at walls, valleys and penetrations',
      'Attic ventilation checked so the new roof can breathe',
      'Asphalt shingle and other roofing systems chosen to suit your home',
      'Site clean-up and a walk-through of the finished job with you',
    ],
    faqs: [
      {
        question: 'How do I know if I need a full roof replacement instead of a repair?',
        answer:
          'A repair can fix a few missing shingles, a single bad vent or a small flashing problem. A replacement is usually the better choice when the roof is near the end of its service life, shingles are curling or cracking across many areas, or the same leaks keep coming back. Final Fix Roofing inspects the roof and tells you which option makes sense, in writing, with the reasons.',
      },
      {
        question: 'Do you tear off the old shingles before installing a new roof?',
        answer:
          'Yes. Final Fix Roofing replacement work is a full tear-off down to the deck. That lets the crew inspect the boards and fix any rot before new roofing goes on, instead of installing over problems that would show up later.',
      },
      {
        question: 'How long does a roof replacement take?',
        answer:
          'It depends on the size of the roof, the roofing system and the weather. Final Fix Roofing gives you a timeline in the written estimate so you know what to expect before work starts.',
      },
      {
        question: 'Do you serve homes in my area?',
        answer:
          'Final Fix Roofing serves homes within 100 miles of Toronto and London, Ontario. Call 437-869-1930 and the team will confirm whether your address is in the service area.',
      },
      {
        question: 'What does the free estimate include?',
        answer:
          'Final Fix Roofing looks at the roof, explains what it found, and gives you a clear written estimate that covers the scope of work. You can compare it with other quotes before you decide.',
      },
    ],
  },
  {
    slug: 'roof-repair-ontario',
    name: 'Roof Repair',
    h1: 'Roof Repair in Southern Ontario',
    metaTitle: 'Roof Repair Ontario | Final Fix Roofing',
    metaDescription:
      'Roof repair in Southern Ontario for missing shingles, damaged flashing, vents and leaks. Final Fix Roofing finds the source and fixes it. Call 437-869-1930.',
    summary: 'Missing shingles, flashing, vents and damaged sections fixed properly.',
    intro:
      'Missing shingles, damaged flashing, failed vents and small patches of damage can usually be repaired before they spread into water damage. Final Fix Roofing finds the source of the problem, repairs it properly, and tells you what else was noticed during the visit. The repair is done right, not patched over, so the fix is worth the money.',
    features: [
      'Missing or lifted shingles replaced',
      'Flashing around chimneys, skylights and walls repaired',
      'Vents and pipe boots resealed or replaced',
      'Damaged sections cut out and replaced',
      'Source of the leak traced, not just the stain on the ceiling',
      'Written findings, so you know what was fixed and what to watch',
    ],
    faqs: [
      {
        question: 'What are the signs that I need roof repair?',
        answer:
          'Common signs include missing or curling shingles, granules in your gutters, stains on ceilings or walls, daylight visible in the attic, and damp insulation. If you see any of these, call Final Fix Roofing at 437-869-1930 for an inspection before the problem spreads.',
      },
      {
        question: 'Can you repair just one section of a roof?',
        answer:
          'Yes. Many repairs are limited to one area, such as a valley, a vent or a patch of damaged shingles. Final Fix Roofing will also tell you if the rest of the roof is near the end of its life, because patching more and more sections can cost more than replacing the roof.',
      },
      {
        question: 'Do you match the existing shingles?',
        answer:
          'Final Fix Roofing tries to match the shingles already on your roof. Colour and style can change over time, so the crew will show you what is available when they inspect the job.',
      },
      {
        question: 'Will a repair stop a leak that is already in my ceiling?',
        answer:
          'A repair stops new water getting in once the source is fixed. The stained area inside may need separate drying or repair, and Final Fix Roofing will point that out during the inspection.',
      },
      {
        question: 'Can I get an inspection without committing to a repair?',
        answer:
          'Yes. Call 437-869-1930 for an inspection and a written estimate. If the roof is in good shape, the team will say so.',
      },
    ],
  },
  {
    slug: 'emergency-roof-leak-repair-ontario',
    name: 'Leak & Emergency',
    h1: 'Emergency Roof Leak and Storm Damage Repair',
    metaTitle: 'Emergency Roof Leak Repair Ontario | Final Fix Roofing',
    metaDescription:
      'Active roof leak or storm damage in Southern Ontario? Final Fix Roofing responds fast to protect your home from more water damage. Call 437-869-1930 now.',
    summary: 'Fast response to active leaks and storm damage to protect your home.',
    intro:
      'A roof leak or storm damage can get worse by the hour. Water that reaches insulation, drywall and framing causes costly damage quickly. Call Final Fix Roofing and the team will respond fast to stop active leaks and secure damaged areas, then follow up with a full repair plan once the area is safe.',
    features: [
      'Fast response to active leaks and storm damage',
      'Temporary protection for storm-damaged areas',
      'Water entry point located and stopped',
      'Damaged shingles, flashing and decking assessed',
      'Photos and written notes you can share with your insurer',
      'Permanent repair scheduled once the area is safe to work on',
    ],
    faqs: [
      {
        question: 'What should I do if my roof is leaking right now?',
        answer:
          'Move valuables and electronics away from the leak, and place a bucket or tarp under it if that is safe. Then call Final Fix Roofing at 437-869-1930. Do not climb onto a wet or damaged roof yourself.',
      },
      {
        question: 'Can you tarp a roof after a storm?',
        answer:
          'Yes. Stopping further water entry is the first priority after storm damage. Final Fix Roofing secures the damaged area and then discusses the permanent repair once it is safe to do the full job.',
      },
      {
        question: 'Will you help with my insurance claim?',
        answer:
          'Final Fix Roofing can document the damage with photos and written notes that you can share with your insurer. The claim itself is between you and your insurance company.',
      },
      {
        question: 'How quickly can you respond to a leak?',
        answer:
          'Final Fix Roofing responds quickly to active leaks and storm damage. Call 437-869-1930 and describe what is happening so the team can plan the visit.',
      },
      {
        question: 'Do you only handle emergencies?',
        answer:
          'No. Final Fix Roofing also handles scheduled roof repairs and full roof replacements. Emergency calls are a first step, not the only work the team does.',
      },
    ],
  },
  {
    slug: 'eavestrough-soffit-ontario',
    name: 'Eavestrough & Soffit',
    h1: 'Eavestrough, Fascia and Soffit in Southern Ontario',
    metaTitle: 'Eavestrough & Soffit Ontario | Final Fix Roofing',
    metaDescription:
      'Eavestrough, fascia and soffit repair and installation in Southern Ontario. Keep water moving away from your home. Call Final Fix Roofing at 437-869-1930.',
    summary: 'Eavestroughs, fascia and soffit that keep water moving away from the house.',
    intro:
      'Eavestroughs, fascia and soffit are the parts of your roofline that move water away from the house. When they sag, leak or pull away, water runs down walls and collects near the foundation instead. Final Fix Roofing repairs or replaces the components that are failing and checks that the system drains where it should.',
    features: [
      'Eavestrough repair and replacement',
      'Downspout placement checked so water drains away from the house',
      'Fascia boards repaired or replaced',
      'Soffit repaired or replaced',
      'Sagging, leaking or pulled-away sections reattached',
      'Clear written scope, so you know exactly what was fixed',
    ],
    faqs: [
      {
        question: 'How do I know if my eavestroughs need replacing?',
        answer:
          'Look for sagging sections, separated joints, staining on the fascia or siding below the gutters, and water that overflows during rain. A repair often fixes these problems, but badly damaged runs are usually better replaced.',
      },
      {
        question: 'Why do eavestroughs and soffit matter for my roof?',
        answer:
          'Water that stays on the roofline or runs behind the gutters can rot fascia, damage soffit and reach the foundation. Good drainage protects the parts of your home that are harder to see.',
      },
      {
        question: 'Do you repair fascia and soffit as well?',
        answer:
          'Yes. Fascia and soffit are often part of the same job, so Final Fix Roofing checks them together with the eavestrough.',
      },
      {
        question: 'Can eavestrough work be done during a roof repair?',
        answer:
          'Often, yes. If the crew is already on your roof, they can check the eavestrough and fascia during the same visit and include them in one written estimate.',
      },
      {
        question: 'Is my home within your service area?',
        answer:
          'Final Fix Roofing serves homes within 100 miles of Toronto and London, Ontario. Call 437-869-1930 to confirm your address.',
      },
    ],
  },
  {
    slug: 'siding-repair-replacement-ontario',
    name: 'Siding',
    h1: 'Siding Repair and Replacement in Southern Ontario',
    metaTitle: 'Siding Repair & Replacement Ontario | Final Fix Roofing',
    metaDescription:
      'Siding repair and replacement in Southern Ontario to finish your home exterior. Get a clear written estimate from Final Fix Roofing. Call 437-869-1930.',
    summary: 'Siding repair and replacement to finish the exterior.',
    intro:
      'Damaged or faded siding lets water and pests behind the wall and makes the whole exterior look worn. Final Fix Roofing repairs damaged panels and replaces sections that can no longer be fixed, so the siding works with your roof, eavestrough and soffit as one finished exterior.',
    features: [
      'Cracked, warped or damaged panels repaired or replaced',
      'Full siding replacement when repairs are no longer practical',
      'Flashing and trim checked around windows, doors and corners',
      'Siding installed to work with your roofline and drainage',
      'Written estimate covering materials and scope',
      'Clean-up and walk-through at the end of the job',
    ],
    faqs: [
      {
        question: 'When should I repair siding instead of replacing it?',
        answer:
          'Repair is usually the right choice when damage is limited to a few panels. Replacement makes more sense when damage is widespread, the material is failing, or repairs would not match the rest of the wall.',
      },
      {
        question: 'Can you match my existing siding?',
        answer:
          'Final Fix Roofing tries to match the siding you have. Older siding can be discontinued, so the crew will show you the closest available option during the inspection.',
      },
      {
        question: 'Does siding affect my roof or eavestrough?',
        answer:
          'Yes. Siding, roofing, eavestrough and soffit work together to keep water out. Final Fix Roofing checks how they meet so repairs do not leave gaps.',
      },
      {
        question: 'Can I book siding work on its own?',
        answer:
          'Yes. Siding can be booked on its own or as part of a bigger exterior project.',
      },
      {
        question: 'How do I get a siding estimate?',
        answer:
          'Call or text 437-869-1930 with a description of the damage and, if you can, a few photos.',
      },
    ],
  },
  {
    slug: 'exterior-construction-ontario',
    name: 'Construction',
    h1: 'Exterior Construction in Southern Ontario',
    metaTitle: 'Exterior Construction Ontario | Final Fix Roofing',
    metaDescription:
      'Exterior and general construction beyond the roofline across Southern Ontario, from Final Fix Roofing & Construction. Written estimates. Call 437-869-1930.',
    summary: 'Exterior and general construction work beyond the roofline.',
    intro:
      'Final Fix Roofing & Construction does not stop at the roofline. Exterior construction projects connect to your roof, siding and drainage, so the whole outside of the home is planned by one team that understands how the pieces fit together. Each project starts with an inspection and a written scope.',
    features: [
      'Exterior construction beyond the roofline',
      'Projects scoped in writing before work begins',
      'Coordinated with roofing, siding and eavestrough work',
      'Site clean-up and a walk-through at completion',
      'Work within 100 miles of Toronto and London',
      'Clear communication from the first call to the final walk-through',
    ],
    faqs: [
      {
        question: 'What kinds of exterior construction do you do?',
        answer:
          'Final Fix Roofing handles exterior construction work beyond the roofline. Call 437-869-1930 to describe your project, and the team will tell you whether it is something they can take on.',
      },
      {
        question: 'Do you do general construction too?',
        answer:
          'The focus is exterior and roofline work. For projects outside that scope, Final Fix Roofing will say so and point you in the right direction where it can.',
      },
      {
        question: 'How do you price a construction project?',
        answer:
          'Every project is different, so Final Fix Roofing gives a written estimate after an inspection. The estimate outlines the scope of work so you can compare it with other quotes.',
      },
      {
        question: 'Do you serve my area?',
        answer:
          'Final Fix Roofing serves homes within 100 miles of Toronto and London, Ontario.',
      },
      {
        question: 'Can construction be combined with a roof or siding project?',
        answer:
          'Yes. Exterior projects often overlap with roofing and siding, and they can be planned together in one estimate.',
      },
    ],
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);

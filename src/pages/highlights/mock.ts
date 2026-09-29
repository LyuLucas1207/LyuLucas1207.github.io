/**
 * Temporary honor rail — future useHighlightsRailQuery.
 */

import { ContentTag } from '@/enums'

export type HonorRailItem = {
  id: string
  index: string
  title: string
  statTags: ContentTag[]
  detail: string
}

export const HONOR_RAIL: HonorRailItem[] = [
  {
    id: 'h1',
    index: '01',
    title: "Dean's List",
    statTags: [ContentTag.Year2024_2025, ContentTag.UbcAppliedScience],
    detail:
      'Maintained above threshold GPA across digital logic, embedded systems, and software-heavy terms while balancing NFX stack development and co-op prep.',
  },
  {
    id: 'h2',
    index: '02',
    title: 'CPEN Capstone Track',
    statTags: [ContentTag.HardwareFirmware],
    detail:
      'Energy-recovery dryer prototype with multi-sensor feedback, Arduino control loops, and documented thermal efficiency measurements for design review.',
  },
  {
    id: 'h3',
    index: '03',
    title: 'NFX Platform Lead',
    statTags: [ContentTag.Repos16Plus, ContentTag.PrivateInfra],
    detail:
      'Architected NAS-grade stacks spanning identity, vault, news crawl, storage, and edge proxy — each with Docker packaging and operator runbooks.',
  },
  {
    id: 'h4',
    index: '04',
    title: 'Open Source',
    statTags: [ContentTag.Repos12Plus],
    detail:
      'NebulaForgeX org hosts production-oriented tooling: compose stacks, TLS automation, news aggregation, and documentation hubs with CI badges.',
  },
  {
    id: 'h5',
    index: '05',
    title: 'Ice Ribbon Staff',
    statTags: [ContentTag.Summer2024, ContentTag.Beijing],
    detail:
      'Robotics event operations at the National Speed Skating Oval during IRO China finals — field troubleshooting, schedule coordination, and bilingual crew support.',
  },
  {
    id: 'h6',
    index: '06',
    title: 'FPGA Lab Cluster',
    statTags: [ContentTag.Verilog, ContentTag.OneTerm],
    detail:
      'Organ, iPod UI, PicoBlaze scope, RC4 crypto, DDS waveform generator — each with timing reports, simulation benches, and demo videos.',
  },
  {
    id: 'h7',
    index: '07',
    title: 'Pure Scan Ship',
    statTags: [ContentTag.Flutter, ContentTag.CrossPlatform],
    detail:
      'End-to-end QR app from camera permissions through parsing edge cases, share intents, and Material 3 theming — published-ready build pipeline.',
  },
  {
    id: 'h8',
    index: '08',
    title: 'Gesture CV Prototype',
    statTags: [ContentTag.Mediapipe, ContentTag.Realtime],
    detail:
      'Hand landmark pipeline with custom gesture vocabulary, latency profiling on laptop-class hardware, and modular inference stages for future embedded targets.',
  },
  {
    id: 'h9',
    index: '09',
    title: 'Spring HRM Backend',
    statTags: [ContentTag.Enterprise, ContentTag.Java, ContentTag.Rest],
    detail:
      'Role-based HR modules with payroll calculations, audit trails, and OpenAPI-documented endpoints consumed by a React admin dashboard.',
  },
  {
    id: 'h10',
    index: '10',
    title: 'Lyu Star Realm',
    statTags: [ContentTag.CreativeWeb, ContentTag.Gsap],
    detail:
      'This portfolio universe — pinned horizontal rails, diagonal drift stages, site-wide voyager motion path, and i18n-aware mock-to-hook architecture.',
  },
  {
    id: 'h11',
    index: '11',
    title: 'Co-op Readiness',
    statTags: [ContentTag.GradWindow2027],
    detail:
      'Resume-aligned project narrative, technical writing samples, and system design stories prepared for new-grad backend / full-stack interviews.',
  },
  {
    id: 'h12',
    index: '12',
    title: 'Bilingual Delivery',
    statTags: [ContentTag.English, ContentTag.Chinese, ContentTag.French],
    detail:
      'Site content, error strings, and mock API payloads maintain trilingual fields — practice for products that ship localized operator consoles.',
  },
]

/**
 * Temporary hardcoded content so the page layout can be built first.
 * Each block maps 1:1 to a future query hook (same pattern as Lsr-Admin),
 * e.g. useIntroHeroQuery / useIntroProjectsQuery / useIntroJourneyQuery.
 */

import { AccentTone, ContentTag } from '@/enums'

export type IntroWallItem = {
  id: string
  index: string
  title: string
  tags: ContentTag[]
  year: string
  blurb: string
  accent: AccentTone
}

export type IntroJourneyStop = {
  id: string
  period: string
  title: string
  detail: string
}

export const INTRO_HERO = {
  eyebrow: 'Lyu Star Realm — Pilot Log',
  name: 'Lucas Lyu',
  roleTags: [ContentTag.ComputerEngineering, ContentTag.Ubc],
  yearTag: ContentTag.Year4Senior,
  locationTag: ContentTag.VancouverBc,
  statusTags: [ContentTag.Graduating2027, ContentTag.NewGrad],
  statement: 'I build systems, interfaces, and the motion between them.',
  scrollHint: 'Keep scrolling — the route bends.',
}

export const INTRO_WALL: IntroWallItem[] = [
  {
    id: 'nebulaforgex',
    index: '01',
    title: 'NebulaForgeX NAS Stack',
    tags: [ContentTag.Platform, ContentTag.Docker, ContentTag.Traefik],
    year: '2024 — now',
    blurb:
      'Modular compose stacks for MySQL, Postgres, Mongo, Redis, Kafka, and MinIO on private NAS hardware — plus NFX-Edge for HTTPS termination and SPA fallbacks across multiple hosted sites.',
    accent: AccentTone.Cosmic,
  },
  {
    id: 'nfx-vault',
    index: '02',
    title: 'NFX-Vault TLS Control',
    tags: [ContentTag.Fastapi, ContentTag.React, ContentTag.Kafka],
    year: '2024 — now',
    blurb:
      'Certificate lifecycle automation with ACME HTTP-01, PEM parsing, scheduled health scans, Kafka renewal pipelines, and a React console that mirrors CLI export workflows.',
    accent: AccentTone.Amber,
  },
  {
    id: 'nfx-news',
    index: '03',
    title: 'NFX-News Intelligence',
    tags: [ContentTag.Crawl, ContentTag.Mcp, ContentTag.Analytics],
    year: '2024 — now',
    blurb:
      'Resilient crawlers for 11+ Chinese media sources, keyword DSL filtering, Fastify news APIs, HTML report generation, and FastMCP tool packs for AI-assisted operator queries.',
    accent: AccentTone.Forest,
  },
  {
    id: 'nfx-identity',
    index: '04',
    title: 'NFX-Identity IAM',
    tags: [ContentTag.Go, ContentTag.Fiber, ContentTag.Grpc],
    year: '2024 — now',
    blurb:
      'Unified auth plane with JWT/bcrypt middleware, CQRS repositories, Kafka event bridges, and RBAC-ready permission lists shared by internal consoles and edge apps.',
    accent: AccentTone.Rose,
  },
  {
    id: 'pure-scan',
    index: '05',
    title: 'Pure Scan',
    tags: [ContentTag.Flutter, ContentTag.Material3],
    year: '2024',
    blurb:
      'Cross-platform QR generate / scan / share with camera pipeline tuning, offline UX, permission flows, and a Material 3 surface that stays readable under bright outdoor conditions.',
    accent: AccentTone.Amber,
  },
  {
    id: 'fpga-cluster',
    index: '06',
    title: 'CPEN Verilog Sprint',
    tags: [ContentTag.Fpga, ContentTag.DigitalDesign],
    year: '2024',
    blurb:
      'Six hardware labs in one term block — organ synthesizer, iPod UI, PicoBlaze oscilloscope, RC4 crypto core, DDS waveform engine — each with simulation benches and timing reports.',
    accent: AccentTone.Forest,
  },
  {
    id: 'gesture-cv',
    index: '07',
    title: 'Hand Gesture CV',
    tags: [ContentTag.Mediapipe, ContentTag.Python],
    year: '2024',
    blurb:
      'Real-time landmark tracking with custom gesture vocabulary, latency profiling, and modular inference stages designed to port toward embedded-class targets later.',
    accent: AccentTone.Cosmic,
  },
  {
    id: 'spring-hrm',
    index: '08',
    title: 'Spring HRM Suite',
    tags: [ContentTag.Java, ContentTag.Enterprise, ContentTag.Rest],
    year: '2023 — 2024',
    blurb:
      'HR backend with payroll modules, audit trails, role-based access, and OpenAPI-documented endpoints — paired with a React admin dashboard for department operators.',
    accent: AccentTone.Rose,
  },
  {
    id: 'capstone-dryer',
    index: '09',
    title: 'Energy-Recovery Dryer',
    tags: [ContentTag.Capstone, ContentTag.Mechatronics],
    year: '2023',
    blurb:
      'Heat-exchange clothes dryer prototype — temperature and humidity sensing, Arduino PID-style control, heater/fan/motor integration, and thermal efficiency data for design review.',
    accent: AccentTone.Amber,
  },
  {
    id: 'star-realm',
    index: '10',
    title: 'Lyu Star Realm',
    tags: [ContentTag.ThisSite, ContentTag.Gsap],
    year: '2025 — now',
    blurb:
      'The site you are flying through: React 19, Lenis smooth scroll, pinned horizontal rails, diagonal drift stages, paper-plane voyager, and mock-to-hook data architecture.',
    accent: AccentTone.Cosmic,
  },
  {
    id: 'nfx-storages',
    index: '11',
    title: 'NFX-Storages',
    tags: [ContentTag.ObjectStorage, ContentTag.S3],
    year: '2024 — now',
    blurb:
      'S3-compatible buckets with presigned uploads, lifecycle policies, bucket ACLs, and integration hooks for backup workflows across the broader NebulaForgeX ecosystem.',
    accent: AccentTone.Forest,
  },
  {
    id: 'nfx-docs',
    index: '12',
    title: 'NFX Documentation Hub',
    tags: [ContentTag.Dx, ContentTag.Runbooks],
    year: '2024 — now',
    blurb:
      'Versioned architecture diagrams, deployment runbooks, API references, and changelogs — the onboarding surface for anyone operating private NFX stacks without tribal knowledge.',
    accent: AccentTone.Rose,
  },
]

export type IntroManifestoBlock = {
  id: string
  paragraphs: string[]
}

export const INTRO_MANIFESTO: IntroManifestoBlock[] = [
  {
    id: 'identity',
    paragraphs: [
      'Hello — I am Lucas. I study Computer Engineering at UBC, and I care about the layer where hardware discipline meets interface taste.',
      'Most of my work orbits one idea: a system should feel inevitable. State machines, typed APIs, and motion curves are all the same craft at different altitudes.',
    ],
  },
  {
    id: 'runway',
    paragraphs: [
      'Senior year is a launch runway. Everything here — the projects, the records, the small rituals — is the flight log of getting ready for what comes after May 2027.',
      'I did not start with web animation. I started with Verilog state machines, sensor fusion labs, and the stubborn feeling that a datapath should behave predictably before it looks impressive.',
    ],
  },
  {
    id: 'craft',
    paragraphs: [
      'NebulaForgeX grew out of that instinct applied to ops: if deployment is repeatable, creativity has room elsewhere. Docker compose, Traefik routes, and TLS automation are boring until they save a weekend.',
      'On the frontend I chase editorial rhythm — large type, restrained motion, scroll choreography that respects reading order. GSAP timelines are layout tools, not fireworks.',
    ],
  },
  {
    id: 'field',
    paragraphs: [
      'I write in three languages on this site on purpose. Products I want to build will ship localized consoles; mock data should stress i18n fields early.',
      'Ice Ribbon taught me that engineering also happens in loud arenas — cables, schedules, bilingual crews, robots that fail in public. Reliability is a social contract, not only a metric.',
    ],
  },
  {
    id: 'process',
    paragraphs: [
      'When I debug, I sketch the data flow first. When I design, I ask what fails at 2 a.m. When I animate, I ask whether the motion explains hierarchy or hides missing content.',
      'This portfolio is intentionally dense. Scroll it the way you would read a flight manual — sideways where the route bends, diagonally where records drift, slowly where cards stack.',
    ],
  },
  {
    id: 'signal',
    paragraphs: [
      'If you are hiring for new-grad backend, full-stack, or systems-leaning frontend roles, the case studies here are aligned with my resume and the repos they link to.',
      'Signal open. The paper plane keeps flying. Keep scrolling — the next section has more mass than the last.',
    ],
  },
]

export const INTRO_JOURNEY: IntroJourneyStop[] = [
  {
    id: 'wuhan-start',
    period: '2017 — 2019',
    title: 'Wuhan Ruisheng — middle school',
    detail:
      'First formal math olympiad prep, first exposure to competitive programming puzzles, and the habit of keeping notebooks for ideas that did not fit homework prompts.',
  },
  {
    id: 'wuhan-high',
    period: '2019 — 2022',
    title: 'Ruisheng — high school arc',
    detail:
      'Physics contests, Arduino club experiments, and late-night Verilog tutorials on borrowed laptops — the bridge from curiosity to engineering vocabulary.',
  },
  {
    id: 'delta',
    period: '2022 — 2023',
    title: 'Delta Secondary — Grade 12',
    detail:
      'Landed in Ladner, BC; AP calculus, English immersion, and the application sprint to UBC Engineering with portfolio essays about systems thinking.',
  },
  {
    id: 'ubc-entry',
    period: 'Sept 2023',
    title: 'UBC Computer Engineering',
    detail:
      'Entered BASc CpE with co-op track — digital logic, C programming, and the first taste of campus labs where theory meets solder smoke.',
  },
  {
    id: 'dryer-capstone',
    period: 'May — Jul 2023',
    title: 'Energy-recovery dryer capstone',
    detail:
      'Grade 12 capstone hardware: sensors, control loop tuning, and presenting thermal recovery data to judges who asked hard questions about safety margins.',
  },
  {
    id: 'embedded-labs',
    period: '2024 Winter',
    title: 'Embedded systems term',
    detail:
      'STM32 firmware, interrupt-driven UART, SPI sensor reads, and debugging with oscilloscope screenshots attached to lab reports like evidence in court.',
  },
  {
    id: 'fpga-sprint',
    period: 'Spring 2024',
    title: 'FPGA coursework cluster',
    detail:
      'Six Verilog builds in one block — timing closure battles, ModelSim waves, demo day with a DDS speaker that squealed until the clock domain was tamed.',
  },
  {
    id: 'pure-scan-ship',
    period: 'Jul — Nov 2024',
    title: 'Pure Scan shipped',
    detail:
      'Flutter QR toolkit from camera permissions through share intents — first end-to-end mobile product where UX polish mattered as much as parsing correctness.',
  },
  {
    id: 'ice-ribbon',
    period: 'Summer 2024',
    title: 'Ice Ribbon, Beijing',
    detail:
      'Robotics event staff at the National Speed Skating Oval — field troubleshooting, bilingual coordination, and learning that live events punish fragile tooling.',
  },
  {
    id: 'nfx-origin',
    period: 'Fall 2024',
    title: 'NebulaForgeX begins',
    detail:
      'NAS stacks, vault automation, news crawl — the long-arc platform that turned homelab experiments into documented, repeatable infrastructure patterns.',
  },
  {
    id: 'senior',
    period: '2026',
    title: 'Senior year runway',
    detail:
      'Thesis prep, portfolio world-building, interview narratives, and the Lyu Star Realm site as a living sketchbook for motion, layout, and typed mock APIs.',
  },
  {
    id: 'grad',
    period: 'May 2027',
    title: 'Launch window',
    detail:
      'Graduation — co-op complete, repos public, flight log archived. The next orbit is production teams, research labs, or founder-shaped side quests.',
  },
]

export const INTRO_CLOSING = {
  kicker: 'Transmission open',
  title: 'Build the next system with me.',
  body: 'Internships, new-grad roles, ambitious side quests — if it needs someone fluent from registers to render loops, signal me.',
  cta: 'Open a channel',
}

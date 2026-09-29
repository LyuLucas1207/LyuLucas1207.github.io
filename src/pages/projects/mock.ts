/**
 * Temporary layout data — maps to future useProjectsRailQuery (Admin makeUnifiedQuery pattern).
 */

import { AccentTone, ContentTag } from '@/enums'

export type ProjectRailItem = {
  slug: string
  index: string
  title: string
  tags: ContentTag[]
  year: string
  accent: AccentTone
  blurb: string
  stack: string[]
}

export const PROJECTS_RAIL: ProjectRailItem[] = [
  {
    slug: 'nebulaforgex-nas-ecosystem',
    index: '01',
    title: 'NebulaForgeX NAS Ecosystem',
    tags: [ContentTag.Platform, ContentTag.Infra],
    year: '2024 — now',
    accent: AccentTone.Cosmic,
    blurb:
      'Unified NAS stack with Dockerized data services, Traefik edge routing, and SPA-ready Nginx — a repeatable deployment model for private multi-site hosting without ad-hoc scripts.',
    stack: ['Docker', 'Traefik', 'Kafka', 'PostgreSQL', 'Redis', 'Nginx'],
  },
  {
    slug: 'nfx-vault',
    index: '02',
    title: 'NFX-Vault',
    tags: [ContentTag.Tls, ContentTag.ControlPlane],
    year: '2024 — now',
    accent: AccentTone.Amber,
    blurb:
      'FastAPI + React certificate lifecycle manager: ACME HTTP-01, Kafka-driven renewal pipelines, PEM parsing, and operator consoles beside CLI helpers for NAS volume roots.',
    stack: ['FastAPI', 'React 19', 'Kafka', 'OpenSSL', 'Redis'],
  },
  {
    slug: 'nfx-news',
    index: '03',
    title: 'NFX-News',
    tags: [ContentTag.Crawl, ContentTag.Mcp, ContentTag.Ml],
    year: '2024 — now',
    accent: AccentTone.Forest,
    blurb:
      'Microservices crawling 11+ CN media sources with keyword DSL, Fastify news APIs, HTML report generation, and FastMCP analytics tools on a shared Kafka data plane.',
    stack: ['Python', 'Fastify', 'FastAPI', 'PostgreSQL', 'FastMCP'],
  },
  {
    slug: 'nfx-identity',
    index: '04',
    title: 'NFX-Identity',
    tags: [ContentTag.Auth, ContentTag.Iam],
    year: '2024 — now',
    accent: AccentTone.Rose,
    blurb:
      'Go 1.24 identity plane combining Fiber REST, gRPC bridges, CQRS repositories, JWT/bcrypt security, and RBAC-ready permission lists for internal consoles.',
    stack: ['Go', 'Fiber', 'gRPC', 'Kafka', 'PostgreSQL', 'Redis'],
  },
  {
    slug: 'nfx-storages',
    index: '05',
    title: 'NFX-Storages',
    tags: [ContentTag.ObjectStorage],
    year: '2024 — now',
    accent: AccentTone.Cosmic,
    blurb:
      'S3-compatible object storage layer with presigned uploads, bucket policies, lifecycle rules, and integration hooks for the broader NFX stack on edge hardware.',
    stack: ['MinIO', 'Go', 'Docker', 'Traefik'],
  },
  {
    slug: 'pure-scan-app',
    index: '06',
    title: 'Pure Scan',
    tags: [ContentTag.Flutter, ContentTag.Mobile],
    year: '2024',
    accent: AccentTone.Amber,
    blurb:
      'Cross-platform QR toolkit — camera pipeline, parsing, generation, and share flows with Material 3 UI, offline-first behavior, and clean permission handling.',
    stack: ['Flutter', 'Dart', 'Material 3', 'Camera'],
  },
  {
    slug: 'hand-gesture-recognition',
    index: '07',
    title: 'Hand Gesture Recognition',
    tags: [ContentTag.Cv, ContentTag.Ml],
    year: '2024',
    accent: AccentTone.Forest,
    blurb:
      'Real-time hand landmark tracking with MediaPipe, custom gesture classifiers, and a lightweight inference loop tuned for embedded-class hardware constraints.',
    stack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy'],
  },
  {
    slug: 'java-spring-hrm',
    index: '08',
    title: 'Spring HRM Suite',
    tags: [ContentTag.Enterprise, ContentTag.Java],
    year: '2023 — 2024',
    accent: AccentTone.Rose,
    blurb:
      'Human-resource management backend with Spring Boot, JPA repositories, role-based access, payroll modules, and REST APIs consumed by a React admin console.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'React'],
  },
  {
    slug: 'fpga-dds-nios',
    index: '09',
    title: 'FPGA DDS + Nios II',
    tags: [ContentTag.Hardware, ContentTag.Cpen],
    year: '2024',
    accent: AccentTone.Cosmic,
    blurb:
      'Direct digital synthesis on FPGA with Nios II soft-core control, SPI DAC interface, waveform tables, and timing closure across a multi-clock datapath.',
    stack: ['Verilog', 'Quartus', 'Nios II', 'SignalTap'],
  },
  {
    slug: 'fpga-rc4',
    index: '10',
    title: 'FPGA RC4 Crypto',
    tags: [ContentTag.Hardware, ContentTag.Security],
    year: '2024',
    accent: AccentTone.Amber,
    blurb:
      'Pipelined RC4 keystream generator in Verilog with state-machine key scheduling, throughput benchmarks, and side-channel aware register placement experiments.',
    stack: ['Verilog', 'ModelSim', 'FPGA'],
  },
  {
    slug: 'energy-recovery-dryer',
    index: '11',
    title: 'Energy-Recovery Dryer',
    tags: [ContentTag.Capstone, ContentTag.Mechatronics],
    year: '2023',
    accent: AccentTone.Forest,
    blurb:
      'Heat-exchange clothes dryer prototype — temperature/humidity sensing, Arduino control loop, heater/fan/motor integration, and energy recovery justification via test data.',
    stack: ['Arduino', 'C++', 'Sensors', 'Control theory'],
  },
  {
    slug: 'nfx-documentation',
    index: '12',
    title: 'NFX Documentation Hub',
    tags: [ContentTag.Docs, ContentTag.Dx],
    year: '2024 — now',
    accent: AccentTone.Rose,
    blurb:
      'Centralized documentation site for the NFX ecosystem — architecture diagrams, deployment runbooks, API references, and versioned changelogs for operator onboarding.',
    stack: ['VitePress', 'Markdown', 'Mermaid', 'TypeScript'],
  },
]

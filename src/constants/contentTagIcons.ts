import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Box,
  Brain,
  Camera,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileCode2,
  Fingerprint,
  Flame,
  Globe,
  Layers,
  Lock,
  Newspaper,
  Radio,
  ScanLine,
  Server,
  Shield,
  Sparkles,
  Workflow,
} from 'lucide-react'

import { ContentTag, type ContentTag as ContentTagType } from '@/enums'

const contentTagIconMap: Partial<Record<ContentTagType, LucideIcon>> = {
  [ContentTag.Platform]: Server,
  [ContentTag.Infra]: Layers,
  [ContentTag.Docker]: Box,
  [ContentTag.Traefik]: Workflow,
  [ContentTag.Tls]: Shield,
  [ContentTag.ControlPlane]: Lock,
  [ContentTag.Fastapi]: Code2,
  [ContentTag.React]: Sparkles,
  [ContentTag.Kafka]: Radio,
  [ContentTag.Crawl]: Globe,
  [ContentTag.Mcp]: Brain,
  [ContentTag.Analytics]: Newspaper,
  [ContentTag.Ml]: Brain,
  [ContentTag.Auth]: Fingerprint,
  [ContentTag.Iam]: Shield,
  [ContentTag.Go]: Code2,
  [ContentTag.Fiber]: Workflow,
  [ContentTag.Grpc]: Radio,
  [ContentTag.Flutter]: ScanLine,
  [ContentTag.Material3]: Sparkles,
  [ContentTag.Mobile]: Camera,
  [ContentTag.Fpga]: Cpu,
  [ContentTag.DigitalDesign]: Cpu,
  [ContentTag.Hardware]: Cpu,
  [ContentTag.Mediapipe]: Camera,
  [ContentTag.Python]: Code2,
  [ContentTag.Java]: FileCode2,
  [ContentTag.Enterprise]: Server,
  [ContentTag.Rest]: Workflow,
  [ContentTag.Capstone]: Flame,
  [ContentTag.Mechatronics]: Cpu,
  [ContentTag.ThisSite]: Sparkles,
  [ContentTag.Gsap]: Sparkles,
  [ContentTag.ObjectStorage]: Database,
  [ContentTag.S3]: Cloud,
  [ContentTag.Docs]: BookOpen,
  [ContentTag.Dx]: BookOpen,
  [ContentTag.Runbooks]: BookOpen,
  [ContentTag.Cv]: Camera,
  [ContentTag.Security]: Shield,
  [ContentTag.Creative]: Sparkles,
  [ContentTag.CreativeWeb]: Sparkles,
  [ContentTag.Cpen]: Cpu,
}

function iconForContentTags(tags: ContentTagType[]): LucideIcon {
  for (const tag of tags) {
    const icon = contentTagIconMap[tag]
    if (icon) return icon
  }
  return Sparkles
}

export { contentTagIconMap, iconForContentTags }

import type { I18nStruct, I18nText } from './info'

export const ProjectCategory = {
  Platform: 'Platform',
  Product: 'Product',
  Experience: 'Experience',
} as const

export type ProjectCategory = (typeof ProjectCategory)[keyof typeof ProjectCategory]

export const ProjectGroup = {
  Featured: 'featured',
  Systems: 'systems',
  Experimental: 'experimental',
} as const

export type ProjectGroup = (typeof ProjectGroup)[keyof typeof ProjectGroup]

export const ProjectAccent = {
  Rose: 'rose',
  Cosmic: 'cosmic',
  Amber: 'amber',
  Forest: 'forest',
} as const

export type ProjectAccent = (typeof ProjectAccent)[keyof typeof ProjectAccent]

export type ProjectApiItem = {
  id: string
  slug: string
  title: I18nText
  category: ProjectCategory
  group: ProjectGroup
  featured: boolean
  year: string
  summary: I18nText
  impact: I18nText
  role: I18nText
  stack: string[]
  accent: ProjectAccent
  repositoryUrl: string
  liveUrl?: string
  challenge: I18nText
  outcome: I18nText
  details: I18nStruct<string[]>
}

export type ProjectItem = {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  group: ProjectGroup
  featured: boolean
  year: string
  summary: string
  impact: string
  role: string
  stack: string[]
  accent: ProjectAccent
  repositoryUrl: string
  liveUrl?: string
  challenge: string
  outcome: string
  details: string[]
}

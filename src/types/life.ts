import type { I18nStruct, I18nText } from './info'

export const LifeRecordType = {
  Note: 'note',
  Moment: 'moment',
  Ritual: 'ritual',
  Snapshot: 'snapshot',
} as const

export type LifeRecordType = (typeof LifeRecordType)[keyof typeof LifeRecordType]

export const LifeTimelineKind = {
  Education: 'education',
  Project: 'project',
  Event: 'event',
  Milestone: 'milestone',
} as const

export type LifeTimelineKind = (typeof LifeTimelineKind)[keyof typeof LifeTimelineKind]

export const LifeTimelineSide = {
  Left: 'left',
  Right: 'right',
} as const

export type LifeTimelineSide = (typeof LifeTimelineSide)[keyof typeof LifeTimelineSide]

export type LifeRecordApiItem = {
  id: string
  title: I18nText
  type: LifeRecordType
  date: string
  place: I18nText
  mood: I18nText
  excerpt: I18nText
  body: I18nText
  tags: I18nStruct<string[]>
}

export type LifeRecord = {
  id: string
  title: string
  type: LifeRecordType
  date: string
  place: string
  mood: string
  excerpt: string
  body: string
  tags: string[]
}

export type LifeTimelineApiItem = {
  id: string
  sortDate: string
  side: LifeTimelineSide
  kind: LifeTimelineKind
  title: I18nText
  period: I18nText
  body: I18nText
  projectSlug?: string
}

export type LifeTimelineItem = {
  id: string
  sortDate: string
  side: LifeTimelineSide
  kind: LifeTimelineKind
  title: string
  period: string
  body: string
  projectSlug?: string
}

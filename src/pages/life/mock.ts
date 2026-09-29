/**
 * Temporary flipbook data — future useLifeDriftQuery.
 */

export type LifeDriftCard = {
  id: string
  period: string
  title: string
  detail: string
}

export const LIFE_DRIFT: LifeDriftCard[] = [
  {
    id: 'ruisheng-notebooks',
    period: '2019',
    title: 'Ruisheng lab notebooks',
    detail:
      'Filled three notebooks with circuit sketches, competition math, and pseudocode for games I never finished — the earliest record of caring about structure before syntax.',
  },
  {
    id: 'delta-arrival',
    period: '2022',
    title: 'First winter in Delta',
    detail:
      'Walked to school in rain that felt nothing like Wuhan. Rewrote my study system in English, rebuilt friend groups, and learned that adaptation is also engineering.',
  },
  {
    id: 'ubc-lab',
    period: '2024 Winter',
    title: 'Embedded lab sprint',
    detail:
      'STM32 firmware + sensor fusion for a capstone-adjacent prototype. Oscilloscope screenshots, I²C timing bugs, and a lab partner who taught me to read reference manuals like novels.',
  },
  {
    id: 'fpga-demo-day',
    period: 'Spring 2024',
    title: 'FPGA demo day panic',
    detail:
      'DDS speaker squealed until clock domains agreed. Demo day became a live debugging performance — judges laughed, we fixed it, timing report attached like a trophy.',
  },
  {
    id: 'nfx-night',
    period: '2024 — now',
    title: 'NFX late sessions',
    detail:
      'Design tokens, typed APIs, Kafka topic naming debates, and motion systems for this universe. The NAS fans spin louder after midnight; so do the ideas.',
  },
  {
    id: 'pure-scan-testflight',
    period: 'Oct 2024',
    title: 'Pure Scan field tests',
    detail:
      'Tested QR scanning in Vancouver bus stops, dim cafés, and reflective glass lobby walls. Brightness auto-exposure mattered more than any algorithm tweak on paper.',
  },
  {
    id: 'ice-ribbon',
    period: 'Summer 2024',
    title: 'Ice Ribbon crew',
    detail:
      'Robotics event ops at the National Speed Skating Oval, Beijing — cable runs, schedule changes, bilingual crew coordination, and robots that fail in front of audiences.',
  },
  {
    id: 'museum-color',
    period: 'Jan 2026',
    title: 'Gallery spacing study',
    detail:
      'Spent more time between paintings than on them. Curation is negative space; UI whitespace is the same discipline — room for the viewer to arrive without being pushed.',
  },
  {
    id: 'night-walk-ui',
    period: 'Mar 2026',
    title: 'Night walk interface notes',
    detail:
      'Layout decisions for the footer constellation came on a Kitsilano walk — rhythm obvious only after leaving the monitor. Pacing is a body problem, not a Figma problem.',
  },
  {
    id: 'thesis-outline',
    period: 'Feb 2026',
    title: 'Thesis outline draft',
    detail:
      'Senior thesis topic narrowed to intelligent systems meeting edge deployment constraints — literature review spreadsheet, advisor meeting notes, and fear translated into milestones.',
  },
  {
    id: 'badminton-reset',
    period: 'Weekly',
    title: 'Badminton reset ritual',
    detail:
      'Thursday evenings at the community center — the best debugger is footwork drills. Physical rhythm resets the mental stack before another week of compile cycles.',
  },
  {
    id: 'senior-runway',
    period: '2026',
    title: 'Senior runway',
    detail:
      'Portfolio, interview stories, co-op reflection essays, and this flight log you are scrolling through — evidence that senior year is a launch window, not a countdown.',
  },
]

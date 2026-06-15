// lib/data.ts — Single source of truth for all static content
// From /design/design_handoff_citymarin_site/index.html

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  code: string;
  title: string;
  location: string;
  type: 'hospitality' | 'residential' | 'commercial';
  typology: string;
  size: string;
  status: string;
  year: string;
  client: string;
  hue: number;
}

export type ProjectType = Project['type'];

export const projects: Project[] = [
  { code:'ELA',  title:'Ela Quality Resort',        location:'ANTALYA, TURKEY',  type:'hospitality', typology:'Hotel & Resort',     size:'12,000 m²', status:'COMPLETED', year:'2025', client:'Private Developer',      hue:210 },
  { code:'HST',  title:'Hostel Boutique Hotel',     location:'ISTANBUL, TURKEY', type:'hospitality', typology:'Boutique Hotel',      size:'8,500 m²',  status:'COMPLETED', year:'2025', client:'Boutique Hotels Group',  hue:30  },
  { code:'MONO', title:'Mono Hotel',                location:'ISTANBUL, TURKEY', type:'hospitality', typology:'Boutique Hotel',      size:'6,200 m²',  status:'COMPLETED', year:'2024', client:'Mono Hospitality Group', hue:160 },
  { code:'BCV',  title:'Bodrum Coastal Villa',      location:'BODRUM, TURKEY',   type:'residential', typology:'Residential Villa',   size:'850 m²',    status:'COMPLETED', year:'2024', client:'Private Client',         hue:50  },
  { code:'IST',  title:'Istanbul Residence',        location:'ISTANBUL, TURKEY', type:'residential', typology:'Residential',         size:'420 m²',    status:'COMPLETED', year:'2023', client:'Private Family',          hue:0   },
  { code:'OZK',  title:'Ozak Global Tower',         location:'ISTANBUL, TURKEY', type:'residential', typology:'Residential Tower',   size:'45,000 m²', status:'COMPLETED', year:'2023', client:'Ozak Group',             hue:220 },
  { code:'ZRL',  title:'Zorlu Residence',           location:'ISTANBUL, TURKEY', type:'residential', typology:'Residential Complex', size:'38,000 m²', status:'COMPLETED', year:'2022', client:'Zorlu Holding',          hue:280 },
  { code:'DIA',  title:'Dia Office Complex',        location:'ISTANBUL, TURKEY', type:'commercial',  typology:'Office',              size:'28,000 m²', status:'COMPLETED', year:'2024', client:'Dia Development',        hue:190 },
  { code:'DXB',  title:'Dubai Corporate Office',    location:'DUBAI, UAE',       type:'commercial',  typology:'Office Tower',        size:'52,000 m²', status:'COMPLETED', year:'2023', client:'Dubai Corporate Group',  hue:35  },
  { code:'MCK',  title:'Macka Office Tower',        location:'ISTANBUL, TURKEY', type:'commercial',  typology:'Mixed-Use Office',    size:'35,000 m²', status:'COMPLETED', year:'2023', client:'Macka Development',      hue:150 },
  { code:'SCH',  title:'Schneider Electric Office', location:'ISTANBUL, TURKEY', type:'commercial',  typology:'Office',              size:'15,000 m²', status:'COMPLETED', year:'2021', client:'Schneider Electric',     hue:200 },
  { code:'GFG',  title:'Go Fungo Restaurant',       location:'ISTANBUL, TURKEY', type:'hospitality', typology:'Restaurant',          size:'380 m²',    status:'COMPLETED', year:'2024', client:'Go Fungo Group',         hue:10  },
  { code:'KFC',  title:'KFC Restaurant Design',     location:'TURKEY',           type:'hospitality', typology:'Restaurant',          size:'250 m²',    status:'COMPLETED', year:'2023', client:'KFC Turkey',             hue:355 },
];

export const subfilters: Record<ProjectType, string[]> = {
  hospitality: ['Hotel & Resort', 'Boutique Hotel', 'Restaurant'],
  residential: ['Villa', 'Residential', 'Tower', 'Complex'],
  commercial:  ['Office', 'Mixed-Use', 'Tower'],
};

// ─── About ────────────────────────────────────────────────────────────────────

export interface AboutStat { num: string; label: string; }
export interface AboutValue { label: string; text: string; }
export interface ProcessStep { num: string; name: string; desc: string; }
 
export const aboutStats: AboutStat[] = [
  { num: '14', label: 'Years of practice' },
  { num: '42', label: 'Completed projects' },
  { num: '7',  label: 'Awards received' },
  { num: '5',  label: 'Countries worked in' },
];

export const aboutValues: AboutValue[] = [
  { label: 'Precision',      text: 'Every detail is considered. We believe that the quality of a space is determined by the care taken at every scale, from master plan to door handle.' },
  { label: 'Sustainability', text: 'Environmental responsibility is embedded in our design process from the very beginning — not as an afterthought, but as a fundamental driver of form and material.' },
  { label: 'Place',          text: 'We design for specific places, specific cultures, and specific communities. Our buildings grow from the ground they stand on.' },
];

export const processSteps: ProcessStep[] = [
  { num: '01', name: 'Listen',  desc: 'We start by understanding the place, the client, and the brief — walking the site, studying the climate, and asking the questions that shape everything after.' },
  { num: '02', name: 'Concept', desc: 'A single clear idea is tested through sketches, massing models and early environmental analysis until the architecture feels inevitable.' },
  { num: '03', name: 'Develop', desc: 'Plans, sections and materials are resolved together with engineers and consultants in-house — coordination, not compromise.' },
  { num: '04', name: 'Detail',  desc: 'Every junction, finish and fixture is drawn at full scale. This is where the quality of a space is quietly decided.' },
  { num: '05', name: 'Deliver', desc: 'We stay on site through construction and return after handover to measure how the building actually performs.' },
];

// ─── Sustainability ──────────────────────────────────────────────────────────

export interface SustainabilityStat { num: string; label: string; desc: string; }
export interface SustainabilityPrinciple { num: string; name: string; desc: string; }
 
export const sustainabilityStats: SustainabilityStat[] = [
  { num: '40%',  label: 'Energy Reduction',  desc: 'Average energy savings across hospitality projects through passive design and renewable energy systems.' },
  { num: '35%',  label: 'Water Conservation', desc: 'Reduction in water use through rainwater harvesting, greywater recycling, and native landscaping.' },
  { num: '100%', label: 'Local Materials',    desc: 'Commitment to locally sourced or certified sustainable materials on every new project from 2024.' },
  { num: 'LEED', label: 'Gold Certified',    desc: 'Multiple projects achieving LEED Gold certification, including Ozak Global Tower and Dubai Corporate Office.' },
];

export const sustainabilityPrinciples: SustainabilityPrinciple[] = [
  { num: '01', name: 'Passive first',       desc: 'Orientation, massing, shading and ventilation are tuned to the climate before any active systems are considered. Most of the work happens at the drawing board.' },
  { num: '02', name: 'Honest materials',    desc: 'Local stone, timber and earth-based finishes age beautifully and travel short distances. We pick what the land can give us before we look further.' },
  { num: '03', name: 'Long life, loose fit', desc: 'Buildings should outlast their first purpose. Generous structures, accessible services and reusable interiors make adaptation simple — not a demolition.' },
  { num: '04', name: 'Measured outcomes',   desc: 'Every project ships with energy and water targets, then is monitored after handover. Real performance, not predicted performance, is what matters.' },
];

export const sustainabilityMeta = {
  eyebrow: 'Our commitment',
  title: 'Sustainability',
  intro1: 'City Marin Studio is committed to designing buildings and spaces that contribute positively to their environments. Sustainability is not a certification we seek — it is a way of thinking embedded in everything we do.',
  intro2: 'From material selection to energy systems, from site orientation to water management, our projects are designed to minimize environmental impact while maximizing human wellbeing and comfort.',
  principlesEyebrow: 'Principles',
  principlesTitle: 'Four ideas, applied to every project.',
};

// ─── People ──────────────────────────────────────────────────────────────────

interface TeamMember { name: string; role: string; hue: number; }
export interface TeamSection { section: string; count: string; members: TeamMember[]; }

export const teams: TeamSection[] = [
  { section: 'Leadership', count: '04', members: [
    { name: 'Marin Cakir', role: 'Founder & Principal', hue: 40 },
    { name: 'Studio Director', role: 'Operations', hue: 180 },
    { name: 'Design Director', role: 'Architecture', hue: 220 },
    { name: 'Technical Director', role: 'Engineering', hue: 0 },
  ]},
  { section: 'Architecture', count: '06', members: [
    { name: 'Senior Architect', role: 'Hospitality', hue: 200 },
    { name: 'Senior Architect', role: 'Residential', hue: 160 },
    { name: 'Project Architect', role: 'Commercial', hue: 100 },
    { name: 'Project Architect', role: 'Mixed-Use', hue: 280 },
    { name: 'Junior Architect', role: 'Hospitality', hue: 30 },
    { name: 'Junior Architect', role: 'Residential', hue: 320 },
  ]},
  { section: 'Interior & Materials', count: '04', members: [
    { name: 'Senior Interior Designer', role: 'Hospitality', hue: 50 },
    { name: 'Interior Designer', role: 'Residential', hue: 240 },
    { name: 'Material Specialist', role: 'Furniture & Finishes', hue: 120 },
    { name: 'Lighting Designer', role: 'Custom Lighting', hue: 350 },
  ]},
  { section: 'Sustainability & Engineering', count: '04', members: [
    { name: 'Sustainability Consultant', role: 'LEED · Passive Design', hue: 140 },
    { name: 'Structural Engineer', role: 'In-house', hue: 20 },
    { name: 'MEP Engineer', role: 'Systems', hue: 190 },
    { name: 'Environmental Analyst', role: 'Energy modelling', hue: 260 },
  ]},
];

// ─── Careers ─────────────────────────────────────────────────────────────────

export interface Job { dept: string; loc: string; title: string; desc: string; }

export const jobs: Job[] = [
  { dept: 'Architecture', loc: 'Istanbul · Full-time', title: 'Senior Architect — Hospitality',  desc: 'Lead the design and delivery of luxury hospitality projects across Turkey and the Mediterranean. Min. 8 years of experience.' },
  { dept: 'Interior',     loc: 'Istanbul · Full-time', title: 'Interior Designer — Residential', desc: 'Curate materials, furniture and lighting for high-end residential commissions. 3–6 years of practice expected.' },
  { dept: 'Sustainability', loc: 'Istanbul · Hybrid',  title: 'Sustainability Consultant',       desc: 'Embed environmental performance, LEED workflows and passive design strategies into every stage of our projects.' },
  { dept: 'Internship',   loc: 'Istanbul · 6 months', title: 'Architectural Intern',             desc: 'Hands-on involvement across all studio projects. For students in their final year of architecture school.' },
];

export const careersLocations = 'Istanbul · Istanbul'; // Display header for careers page

export const careersApplicationEmail = 'careers@citymarinstudio.com';

export const careersMeta = {
  eyebrow: 'Join the Studio',
  title: 'Careers',
  lede: 'We\'re looking for architects, interior designers, and sustainability specialists who care deeply about craft, context, and the people who will inhabit the spaces we make.',
  jobsListingLabel: 'Open positions',
  generalApplicationsLabel: 'General applications',
  faqEyebrow: 'Questions',
  faqTitle: 'Before you apply',
};

 

// ─── About Page ──────────────────────────────────────────────────────────────

 

export interface StudioBio {
  studio: string;
  approach: string;
}
 

export const studioBio: StudioBio = {
  studio: 'City Marin Studio is a dynamic architectural and design firm dedicated to creating innovative spaces that harmonize with their urban and natural environments. Founded and led by Marin Cakir, the studio brings together architects, interior designers, and sustainability experts.',
  approach: 'Our approach is rooted in a deep understanding of place, culture, and the needs of those who inhabit the spaces we create. From boutique hotels on the Turkish coastline to high-rise towers in Dubai, each project is a bespoke response to its unique context.',
};

export const aboutHero = {
  heading: 'Architecture & Design Studio',
};

export const aboutSectionMeta = {
  process: {
    eyebrow: 'How we work',
    title: 'Five stages, one continuous conversation.',
  },
  awards: {
    eyebrow: 'Selected recognition',
  },
  testimonials: {
    eyebrow: 'In their words',
    title: 'What our clients say.',
  },
  timeline: {
    eyebrow: 'Milestones',
    title: 'A practice, built slowly.',
  },
  portfolio: {
    locationLabel1: 'Istanbul',
    locationLabel2: 'Other',
  },
};
 

// ─── Contact Page ────────────────────────────────────────────────────────────
 

export const contactMeta = {
  eyebrow: 'Get in touch',
  title: 'Contact',
  studioLabel: 'Studio',
  inquiriesLabel: 'Inquiries',
  followLabel: 'Follow',
  hoursLabel: 'Hours',
};

export const contactData = {
  studio: {
    label: 'Studio',
    place: 'Istanbul, Turkey',
    address: 'Cevizli\nIstanbul\nTurkey',
  },
  inquiries: [
    { label: 'New Projects', email: 'projects@citymarinstudio.com' },
    { label: 'Press', email: 'press@citymarinstudio.com' },
    { label: 'Careers', email: 'careers@citymarinstudio.com' },
    { label: 'General', email: 'mail@citymarinstudio.com' },
  ],
  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/citymarinstudio/' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Behance', url: '#' },
  ],
  hours: [
    { day: 'Mon–Fri', time: '09:00 – 18:00' },
    { day: 'Sat', time: '10:00 – 14:00' },
    { day: 'Sun', time: 'Closed' },
  ],
  mapLabel: 'CEVIZLI · ISTANBUL',
};

// ─── Shared UI ───────────────────────────────────────────────────────────────

export const homepageMeta = {
  emptyTitle: 'No projects found',
  emptyDesc: 'Try a different category.',
  emptyCTA: 'View all projects →',
  toggleOpen: 'CLOSE',
  toggleClosed: 'VIEW',
};

export const headerFilters = [
  { label: 'ALL',         value: 'all' },
  { label: 'HOSPITALITY', value: 'hospitality' },
  { label: 'RESIDENTIAL', value: 'residential' },
  { label: 'COMMERCIAL',  value: 'commercial' },
  { label: 'SAVED',       value: 'saved', isSaved: true },
];

export const headerSubfilters: Record<string, string[]> = {
  hospitality: ['Hotel & Resort', 'Boutique Hotel', 'Restaurant'],
  residential: ['Villa', 'Residential', 'Tower', 'Complex'],
  commercial:  ['Office', 'Office Tower', 'Mixed-Use'],
};

export const headerLeftNav = [
  { label: 'Projects',       href: '/projects' },
  { label: 'About',          href: '/about' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'People',         href: '/people' },
  { label: 'Careers',        href: '/careers' },
  { label: 'Contact',        href: '/contact', secondary: true },
];

export const headerRightNav = [
  { label: 'All',         value: 'all',         subItems: [] as string[] },
  { label: 'Hospitality', value: 'hospitality', subItems: ['Hotel & Resort', 'Boutique Hotel', 'Restaurant'] },
  { label: 'Residential', value: 'residential', subItems: ['Villa', 'Residential', 'Tower', 'Complex'] },
  { label: 'Commercial',  value: 'commercial',  subItems: ['Office', 'Office Tower', 'Mixed-Use'] },
];

export const headerMeta = {
  studioName: 'City Marin Studio',
  studioLocation: 'Istanbul · 2026',
  projectsLabel: 'projects',
};

 

export const searchMeta = {
  placeholder: 'Search projects by name, location, typology…',
  closeLabel: 'CLOSE',
  startTyping: 'Start typing to search',
  ofLabel: 'of',
  projectsLabel: 'projects',
};

export const keyboardShortcuts = [
  { label: 'Open search',            key: '⌘ K' },
  { label: 'Toggle nightshift',      key: 'N' },
  { label: 'Open menu',              key: 'M' },
  { label: 'Back to top',            key: 'T' },
  { label: 'This help',              key: '?' },
  { label: 'Close · cancel',         key: 'Esc' },
  { label: 'Scroll project detail',  key: '← →' },
  { label: 'Next · previous project', key: '↑ ↓' },
] as const;

export const keyboardHelpMeta = {
  title: 'Keyboard shortcuts',
  eyebrow: 'Help · Keyboard',
  closeLabel: 'CLOSE',
};

export const footerMeta = {
  sections: {
    email: 'EMAIL',
    offices: 'OFFICES',
    social: 'SOCIAL',
    legal: 'LEGAL',
  },
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
  socialLabel: 'INSTAGRAM',
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const siteMetadata = {
  title: "City Marin Studio — Architecture & Design, Istanbul",
  description: "Architecture and design studio based in Istanbul, Turkey.",
};

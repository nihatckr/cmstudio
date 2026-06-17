// lib/data.ts — Single source of truth for all static content
// From /design/design_handoff_citymarin_site/index.html
// Database-ready structure with IDs, timestamps, enums, and normalized fields

// ─── Enums ───────────────────────────────────────────────────────────────────

export enum ProjectType {
  HOSPITALITY = 'hospitality',
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export enum JobDepartment {
  ARCHITECTURE = 'Architecture',
  INTERIOR = 'Interior',
  SUSTAINABILITY = 'Sustainability',
  ENGINEERING = 'Engineering',
  MANAGEMENT = 'Management',
  INTERNSHIP = 'Internship',
}

export enum EmploymentType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
  HYBRID = 'Hybrid',
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  id: number;
  code: string;
  slug: string;
  title: string;
  description: string | null;
  city: string;
  country: string;
  location: string; // Legacy: "CITY, COUNTRY" format for backward compatibility
  type: ProjectType;
  typology: string;
  area: number;
  areaUnit: string;
  size: string; // Legacy: "12,000 m²" format for backward compatibility
  status: ProjectStatus;
  year: string;
  client: string;
  hue: number;
  tags: string[];
  images: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export const projects: Project[] = [
  {
    id: 1, code: 'ELA', slug: 'ela-quality-resort', title: 'Ela Quality Resort',
    description: null,
    city: 'Antalya', country: 'Turkey', location: 'ANTALYA, TURKEY',
    type: ProjectType.HOSPITALITY, typology: 'Hotel & Resort',
    area: 12000, areaUnit: 'm²', size: '12,000 m²',
    status: ProjectStatus.COMPLETED, year: '2025', client: 'Private Developer',
    hue: 210, tags: ['luxury', 'resort', 'mediterranean'],
    images: ['/projects/hotels/ela-hotel/Antalya_Ela_Hotel.jpg', '/projects/hotels/ela-hotel/Antalya_Ela_Hotel_01.jpg'],
    featured: true, published: true, sortOrder: 1,
    createdAt: '2024-01-15T09:00:00Z', updatedAt: '2025-01-15T14:30:00Z',
  },
  {
    id: 2, code: 'HST', slug: 'hostel-boutique-hotel', title: 'Hostel Boutique Hotel',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.HOSPITALITY, typology: 'Boutique Hotel',
    area: 8500, areaUnit: 'm²', size: '8,500 m²',
    status: ProjectStatus.COMPLETED, year: '2025', client: 'Boutique Hotels Group',
    hue: 30, tags: ['boutique', 'urban', 'hospitality'],
    images: ['/projects/hotels/hostel/Hostel_01.jpg', '/projects/hotels/hostel/Hostel_03.jpg', '/projects/hotels/hostel/Hostel_04.jpg', '/projects/hotels/hostel/Hostel_05.jpg', '/projects/hotels/hostel/Hostel_06.jpg', '/projects/hotels/hostel/Hostel_07.jpg', '/projects/hotels/hostel/Hostel_08.jpg', '/projects/hotels/hostel/Hostel_11.jpg', '/projects/hotels/hostel/Hostel_12.jpg', '/projects/hotels/hostel/Hostel_41.jpg', '/projects/hotels/hostel/Hostel_43.jpg', '/projects/hotels/hostel/Hostel_44.jpg', '/projects/hotels/hostel/Hostel_47.jpg', '/projects/hotels/hostel/Hostel_48.jpg', '/projects/hotels/hostel/Hostel_49.jpg', '/projects/hotels/hostel/Hostel_50.jpg', '/projects/hotels/hostel/Hostel_51.jpg', '/projects/hotels/hostel/Hostel_52.jpg'],
    featured: true, published: true, sortOrder: 2,
    createdAt: '2024-02-10T10:00:00Z', updatedAt: '2025-02-10T16:00:00Z',
  },
  {
    id: 3, code: 'MONO', slug: 'mono-hotel', title: 'Mono Hotel',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.HOSPITALITY, typology: 'Boutique Hotel',
    area: 6200, areaUnit: 'm²', size: '6,200 m²',
    status: ProjectStatus.COMPLETED, year: '2024', client: 'Mono Hospitality Group',
    hue: 160, tags: ['boutique', 'contemporary', 'hospitality'],
    images: ['/projects/hotels/mono-hotel/Mono.jpg', '/projects/hotels/mono-hotel/Mono_01.jpg', '/projects/hotels/mono-hotel/Mono_02.jpg', '/projects/hotels/mono-hotel/Mono_03.jpg', '/projects/hotels/mono-hotel/Mono_04.jpg', '/projects/hotels/mono-hotel/Mono_05.jpg', '/projects/hotels/mono-hotel/Mono_06.jpg', '/projects/hotels/mono-hotel/Mono_07.jpg', '/projects/hotels/mono-hotel/Mono_08.jpg', '/projects/hotels/mono-hotel/Mono_09.jpg'],
    featured: true, published: true, sortOrder: 3,
    createdAt: '2023-03-20T11:00:00Z', updatedAt: '2024-12-15T18:00:00Z',
  },
  {
    id: 4, code: 'BCV', slug: 'bodrum-coastal-villa', title: 'Bodrum Coastal Villa',
    description: null,
    city: 'Bodrum', country: 'Turkey', location: 'BODRUM, TURKEY',
    type: ProjectType.RESIDENTIAL, typology: 'Residential Villa',
    area: 850, areaUnit: 'm²', size: '850 m²',
    status: ProjectStatus.COMPLETED, year: '2024', client: 'Private Client',
    hue: 50, tags: ['villa', 'coastal', 'luxury'],
    images: ['/projects/home/bodrum/Bodrum_Home.jpg', '/projects/home/bodrum/Bodrum_Home_01.jpg', '/projects/home/bodrum/Bodrum_Home_02.jpg', '/projects/home/bodrum/Bodrum_Home_03.jpg', '/projects/home/bodrum/Bodrum_Home_22.jpg', '/projects/home/bodrum/Bodrum_Home_23.jpg', '/projects/home/bodrum/Bodrum_Home_24.jpg', '/projects/home/bodrum/Bodrum_Home_25.jpg', '/projects/home/bodrum/Bodrum_Home_26.jpg'],
    featured: true, published: true, sortOrder: 4,
    createdAt: '2023-05-10T09:30:00Z', updatedAt: '2024-11-20T17:00:00Z',
  },
  {
    id: 5, code: 'IST', slug: 'istanbul-residence', title: 'Istanbul Residence',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.RESIDENTIAL, typology: 'Residential',
    area: 420, areaUnit: 'm²', size: '420 m²',
    status: ProjectStatus.COMPLETED, year: '2023', client: 'Private Family',
    hue: 0, tags: ['apartment', 'urban', 'residential'],
    images: ['/projects/home/istanbul/Home_p.jpg'],
    featured: false, published: true, sortOrder: 5,
    createdAt: '2022-06-15T10:00:00Z', updatedAt: '2023-10-05T15:30:00Z',
  },
  {
    id: 6, code: 'OZK', slug: 'ozak-global-tower', title: 'Ozak Global Tower',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.RESIDENTIAL, typology: 'Residential Tower',
    area: 45000, areaUnit: 'm²', size: '45,000 m²',
    status: ProjectStatus.COMPLETED, year: '2023', client: 'Ozak Group',
    hue: 220, tags: ['tower', 'high-rise', 'residential'],
    images: ['/projects/home/ozak/Ozak.jpg', '/projects/home/ozak/Ozak_06.jpg', '/projects/home/ozak/Ozak_Global.jpg', '/projects/home/ozak/Ozak_H.jpg'],
    featured: true, published: true, sortOrder: 6,
    createdAt: '2021-01-10T08:00:00Z', updatedAt: '2023-09-15T14:00:00Z',
  },
  {
    id: 7, code: 'ZRL', slug: 'zorlu-residence', title: 'Zorlu Residence',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.RESIDENTIAL, typology: 'Residential Complex',
    area: 38000, areaUnit: 'm²', size: '38,000 m²',
    status: ProjectStatus.COMPLETED, year: '2022', client: 'Zorlu Holding',
    hue: 280, tags: ['complex', 'luxury', 'residential'],
    images: ['/projects/home/zorlu/Zorlu-Home-01.jpg', '/projects/home/zorlu/Zorlu-Home.jpg'],
    featured: true, published: true, sortOrder: 7,
    createdAt: '2020-03-20T09:00:00Z', updatedAt: '2022-12-10T16:30:00Z',
  },
  {
    id: 8, code: 'DIA', slug: 'dia-office-complex', title: 'Dia Office Complex',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.COMMERCIAL, typology: 'Office',
    area: 28000, areaUnit: 'm²', size: '28,000 m²',
    status: ProjectStatus.COMPLETED, year: '2024', client: 'Dia Development',
    hue: 190, tags: ['office', 'commercial', 'corporate'],
    images: ['/projects/offices/dia/Dia-Office.jpg', '/projects/offices/dia/Dia_Office_06.jpg', '/projects/offices/dia/Dia_Office_07.jpg', '/projects/offices/dia/Dia_Office_08.jpg'],
    featured: true, published: true, sortOrder: 8,
    createdAt: '2023-02-15T10:30:00Z', updatedAt: '2024-11-05T17:45:00Z',
  },
  {
    id: 9, code: 'DXB', slug: 'dubai-corporate-office', title: 'Dubai Corporate Office',
    description: null,
    city: 'Dubai', country: 'UAE', location: 'DUBAI, UAE',
    type: ProjectType.COMMERCIAL, typology: 'Office Tower',
    area: 52000, areaUnit: 'm²', size: '52,000 m²',
    status: ProjectStatus.COMPLETED, year: '2023', client: 'Dubai Corporate Group',
    hue: 35, tags: ['tower', 'office', 'international'],
    images: ['/projects/offices/dubai/Dubai_Office.jpg', '/projects/offices/dubai/Dubai_Office_02.jpg', '/projects/offices/dubai/Dubai_Office_03.jpg', '/projects/offices/dubai/Dubai_Office_04.jpg', '/projects/offices/dubai/Dubai_Office_05.jpg'],
    featured: true, published: true, sortOrder: 9,
    createdAt: '2021-06-10T11:00:00Z', updatedAt: '2023-08-20T18:00:00Z',
  },
  {
    id: 10, code: 'MCK', slug: 'macka-office-tower', title: 'Macka Office Tower',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.COMMERCIAL, typology: 'Mixed-Use Office',
    area: 35000, areaUnit: 'm²', size: '35,000 m²',
    status: ProjectStatus.COMPLETED, year: '2023', client: 'Macka Development',
    hue: 150, tags: ['mixed-use', 'office', 'urban'],
    images: ['/projects/offices/macka/Macka-Home-Office-01.jpg', '/projects/offices/macka/Macka-Home-Office-02.jpg', '/projects/offices/macka/Macka.jpg', '/projects/offices/macka/Macka_Home_Office.jpg', '/projects/offices/macka/Macka_Office_21.jpg'],
    featured: false, published: true, sortOrder: 10,
    createdAt: '2021-09-25T09:00:00Z', updatedAt: '2023-07-30T16:00:00Z',
  },
  {
    id: 11, code: 'SCH', slug: 'schneider-electric-office', title: 'Schneider Electric Office',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.COMMERCIAL, typology: 'Office',
    area: 15000, areaUnit: 'm²', size: '15,000 m²',
    status: ProjectStatus.COMPLETED, year: '2021', client: 'Schneider Electric',
    hue: 200, tags: ['office', 'corporate', 'sustainable'],
    images: ['/projects/offices/schneider/Office_00.jpg', '/projects/offices/schneider/Office_31.jpg', '/projects/offices/schneider/Office_Project.jpg', '/projects/offices/schneider/Office_Project_01.jpg'],
    featured: false, published: true, sortOrder: 11,
    createdAt: '2020-01-15T08:30:00Z', updatedAt: '2021-11-10T15:00:00Z',
  },
  {
    id: 12, code: 'GFG', slug: 'go-fungo-restaurant', title: 'Go Fungo Restaurant',
    description: null,
    city: 'Istanbul', country: 'Turkey', location: 'ISTANBUL, TURKEY',
    type: ProjectType.HOSPITALITY, typology: 'Restaurant',
    area: 380, areaUnit: 'm²', size: '380 m²',
    status: ProjectStatus.COMPLETED, year: '2024', client: 'Go Fungo Group',
    hue: 10, tags: ['restaurant', 'hospitality', 'interior'],
    images: ['/projects/restaurants/go-fungo/Go_Fungo.jpg'],
    featured: false, published: true, sortOrder: 12,
    createdAt: '2023-08-20T10:00:00Z', updatedAt: '2024-10-15T14:30:00Z',
  },
  {
    id: 13, code: 'KFC', slug: 'kfc-restaurant-design', title: 'KFC Restaurant Design',
    description: null,
    city: 'Turkey', country: 'Turkey', location: 'TURKEY',
    type: ProjectType.HOSPITALITY, typology: 'Restaurant',
    area: 250, areaUnit: 'm²', size: '250 m²',
    status: ProjectStatus.COMPLETED, year: '2023', client: 'KFC Turkey',
    hue: 355, tags: ['restaurant', 'franchise', 'hospitality'],
    images: ['/projects/restaurants/kfc/Kfc.jpg'],
    featured: false, published: true, sortOrder: 13,
    createdAt: '2022-11-10T09:00:00Z', updatedAt: '2023-09-05T16:00:00Z',
  },
];

export const subfilters: Record<ProjectType, string[]> = {
  [ProjectType.HOSPITALITY]: ['Hotel & Resort', 'Boutique Hotel', 'Restaurant'],
  [ProjectType.RESIDENTIAL]: ['Villa', 'Residential', 'Tower', 'Complex'],
  [ProjectType.COMMERCIAL]: ['Office', 'Mixed-Use', 'Tower'],
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

export interface TeamMember {
  id: number;
  name: string;
  slug: string;
  role: string;
  email: string | null;
  phone: string | null;
  bio: string | null;
  avatar: string | null;
  linkedin: string | null;
  portfolio: string | null;
  specializations: string[];
  hue: number;
  active: boolean;
  sortOrder: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface TeamSection {
  section: string;
  count: string;
  members: TeamMember[];
}

export const teams: TeamSection[] = [
  {
    section: 'Leadership',
    count: '04',
    members: [
      {
        id: 1, name: 'Marin Cakir', slug: 'marin-cakir', role: 'Founder & Principal',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['leadership', 'design', 'strategy'], hue: 40,
        active: true, sortOrder: 1,
        createdAt: '2010-01-01T08:00:00Z', updatedAt: '2025-01-15T10:00:00Z',
      },
      {
        id: 2, name: 'Studio Director', slug: 'studio-director', role: 'Operations',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['operations', 'management'], hue: 180,
        active: true, sortOrder: 2,
        createdAt: '2015-03-10T09:00:00Z', updatedAt: '2025-01-10T11:00:00Z',
      },
      {
        id: 3, name: 'Design Director', slug: 'design-director', role: 'Architecture',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['architecture', 'design'], hue: 220,
        active: true, sortOrder: 3,
        createdAt: '2016-06-15T10:00:00Z', updatedAt: '2025-01-08T14:00:00Z',
      },
      {
        id: 4, name: 'Technical Director', slug: 'technical-director', role: 'Engineering',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['engineering', 'technical'], hue: 0,
        active: true, sortOrder: 4,
        createdAt: '2017-09-20T11:00:00Z', updatedAt: '2025-01-05T15:00:00Z',
      },
    ],
  },
  {
    section: 'Architecture',
    count: '06',
    members: [
      {
        id: 5, name: 'Senior Architect', slug: 'senior-architect-hospitality', role: 'Hospitality',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['hospitality', 'hotel', 'resort'], hue: 200,
        active: true, sortOrder: 1,
        createdAt: '2018-02-10T09:00:00Z', updatedAt: '2024-12-20T10:00:00Z',
      },
      {
        id: 6, name: 'Senior Architect', slug: 'senior-architect-residential', role: 'Residential',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['residential', 'housing'], hue: 160,
        active: true, sortOrder: 2,
        createdAt: '2018-05-15T10:00:00Z', updatedAt: '2024-12-18T11:00:00Z',
      },
      {
        id: 7, name: 'Project Architect', slug: 'project-architect-commercial', role: 'Commercial',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['commercial', 'office'], hue: 100,
        active: true, sortOrder: 3,
        createdAt: '2019-08-20T11:00:00Z', updatedAt: '2024-12-15T12:00:00Z',
      },
      {
        id: 8, name: 'Project Architect', slug: 'project-architect-mixed-use', role: 'Mixed-Use',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['mixed-use', 'urban'], hue: 280,
        active: true, sortOrder: 4,
        createdAt: '2020-01-10T09:30:00Z', updatedAt: '2024-12-10T13:00:00Z',
      },
      {
        id: 9, name: 'Junior Architect', slug: 'junior-architect-hospitality', role: 'Hospitality',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['hospitality', 'hotel'], hue: 30,
        active: true, sortOrder: 5,
        createdAt: '2022-03-15T10:00:00Z', updatedAt: '2024-12-05T14:00:00Z',
      },
      {
        id: 10, name: 'Junior Architect', slug: 'junior-architect-residential', role: 'Residential',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['residential', 'villa'], hue: 320,
        active: true, sortOrder: 6,
        createdAt: '2022-06-20T11:00:00Z', updatedAt: '2024-12-01T15:00:00Z',
      },
    ],
  },
  {
    section: 'Interior & Materials',
    count: '04',
    members: [
      {
        id: 11, name: 'Senior Interior Designer', slug: 'senior-interior-designer-hospitality', role: 'Hospitality',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['interior', 'hospitality', 'luxury'], hue: 50,
        active: true, sortOrder: 1,
        createdAt: '2019-04-10T09:00:00Z', updatedAt: '2024-11-28T10:00:00Z',
      },
      {
        id: 12, name: 'Interior Designer', slug: 'interior-designer-residential', role: 'Residential',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['interior', 'residential'], hue: 240,
        active: true, sortOrder: 2,
        createdAt: '2020-07-15T10:00:00Z', updatedAt: '2024-11-25T11:00:00Z',
      },
      {
        id: 13, name: 'Material Specialist', slug: 'material-specialist', role: 'Furniture & Finishes',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['materials', 'furniture', 'finishes'], hue: 120,
        active: true, sortOrder: 3,
        createdAt: '2021-02-20T11:00:00Z', updatedAt: '2024-11-20T12:00:00Z',
      },
      {
        id: 14, name: 'Lighting Designer', slug: 'lighting-designer', role: 'Custom Lighting',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['lighting', 'design'], hue: 350,
        active: true, sortOrder: 4,
        createdAt: '2021-05-25T12:00:00Z', updatedAt: '2024-11-15T13:00:00Z',
      },
    ],
  },
  {
    section: 'Sustainability & Engineering',
    count: '04',
    members: [
      {
        id: 15, name: 'Sustainability Consultant', slug: 'sustainability-consultant', role: 'LEED · Passive Design',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['sustainability', 'leed', 'passive-design'], hue: 140,
        active: true, sortOrder: 1,
        createdAt: '2018-11-10T09:00:00Z', updatedAt: '2024-11-10T10:00:00Z',
      },
      {
        id: 16, name: 'Structural Engineer', slug: 'structural-engineer', role: 'In-house',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['structural', 'engineering'], hue: 20,
        active: true, sortOrder: 2,
        createdAt: '2019-01-15T10:00:00Z', updatedAt: '2024-11-05T11:00:00Z',
      },
      {
        id: 17, name: 'MEP Engineer', slug: 'mep-engineer', role: 'Systems',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['mep', 'systems', 'engineering'], hue: 190,
        active: true, sortOrder: 3,
        createdAt: '2019-03-20T11:00:00Z', updatedAt: '2024-11-01T12:00:00Z',
      },
      {
        id: 18, name: 'Environmental Analyst', slug: 'environmental-analyst', role: 'Energy modelling',
        email: null, phone: null, bio: null, avatar: null, linkedin: null, portfolio: null,
        specializations: ['environmental', 'energy', 'analysis'], hue: 260,
        active: true, sortOrder: 4,
        createdAt: '2020-06-10T12:00:00Z', updatedAt: '2024-10-28T13:00:00Z',
      },
    ],
  },
];

// ─── Careers ─────────────────────────────────────────────────────────────────

export interface Job {
  id: number;
  slug: string;
  dept: JobDepartment;
  location: string;
  employmentType: EmploymentType;
  remote: boolean;
  title: string;
  desc: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  active: boolean;
  featured: boolean;
  postedAt: string; // ISO 8601
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  // Legacy fields for backward compatibility
  loc: string; // "Istanbul · Full-time" format
}

export const jobs: Job[] = [
  {
    id: 1,
    slug: 'senior-architect-hospitality',
    dept: JobDepartment.ARCHITECTURE,
    location: 'Istanbul',
    employmentType: EmploymentType.FULL_TIME,
    remote: false,
    title: 'Senior Architect — Hospitality',
    desc: 'Lead the design and delivery of luxury hospitality projects across Turkey and the Mediterranean. Min. 8 years of experience.',
    requirements: ['8+ years architecture experience', 'hospitality portfolio', 'licensed architect'],
    responsibilities: ['Lead design teams', 'Client presentations', 'Construction oversight'],
    benefits: ['Health insurance', 'Flexible hours', 'Professional development'],
    salaryMin: 80000,
    salaryMax: 120000,
    salaryCurrency: 'TRY',
    active: true,
    featured: true,
    postedAt: '2025-01-10T08:00:00Z',
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    loc: 'Istanbul · Full-time',
  },
  {
    id: 2,
    slug: 'interior-designer-residential',
    dept: JobDepartment.INTERIOR,
    location: 'Istanbul',
    employmentType: EmploymentType.FULL_TIME,
    remote: false,
    title: 'Interior Designer — Residential',
    desc: 'Curate materials, furniture and lighting for high-end residential commissions. 3–6 years of practice expected.',
    requirements: ['3-6 years interior design', 'residential portfolio', 'material knowledge'],
    responsibilities: ['Material selection', 'Furniture curation', 'Client liaison'],
    benefits: ['Health insurance', 'Design budget', 'Creative freedom'],
    salaryMin: 60000,
    salaryMax: 90000,
    salaryCurrency: 'TRY',
    active: true,
    featured: true,
    postedAt: '2025-01-12T09:00:00Z',
    createdAt: '2025-01-12T09:00:00Z',
    updatedAt: '2025-01-14T11:00:00Z',
    loc: 'Istanbul · Full-time',
  },
  {
    id: 3,
    slug: 'sustainability-consultant',
    dept: JobDepartment.SUSTAINABILITY,
    location: 'Istanbul',
    employmentType: EmploymentType.HYBRID,
    remote: true,
    title: 'Sustainability Consultant',
    desc: 'Embed environmental performance, LEED workflows and passive design strategies into every stage of our projects.',
    requirements: ['LEED certification', 'environmental systems', 'passive design experience'],
    responsibilities: ['LEED documentation', 'Energy modeling', 'Design consultation'],
    benefits: ['Remote flexibility', 'Conference budget', 'Health insurance'],
    salaryMin: 70000,
    salaryMax: 100000,
    salaryCurrency: 'TRY',
    active: true,
    featured: false,
    postedAt: '2025-01-08T10:00:00Z',
    createdAt: '2025-01-08T10:00:00Z',
    updatedAt: '2025-01-10T12:00:00Z',
    loc: 'Istanbul · Hybrid',
  },
  {
    id: 4,
    slug: 'architectural-intern',
    dept: JobDepartment.INTERNSHIP,
    location: 'Istanbul',
    employmentType: EmploymentType.INTERNSHIP,
    remote: false,
    title: 'Architectural Intern',
    desc: 'Hands-on involvement across all studio projects. For students in their final year of architecture school.',
    requirements: ['Final year student', 'CAD skills', 'portfolio'],
    responsibilities: ['Design support', 'Drawing production', 'Research'],
    benefits: ['Mentorship', 'Portfolio development', 'Stipend'],
    salaryMin: null,
    salaryMax: null,
    salaryCurrency: null,
    active: true,
    featured: false,
    postedAt: '2025-01-15T11:00:00Z',
    createdAt: '2025-01-15T11:00:00Z',
    updatedAt: '2025-01-16T09:00:00Z',
    loc: 'Istanbul · 6 months',
  },
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
  siteUrl: 'https://cmstudio.com', // TODO: Update with real production URL
  siteName: 'City Marin Studio',
  locale: 'en_US',
  type: 'website',
  twitterHandle: '@citymarinstudio', // TODO: Update with real Twitter handle
  ogImage: {
    url: '/og-image.png', // TODO: Add real OG image (1200x630px)
    width: 1200,
    height: 630,
    alt: 'City Marin Studio - Architecture & Design',
  },
};

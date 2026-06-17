// prisma/seed.ts
// Seed database with data from lib/data.ts

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import {
  projects,
  teams,
  jobs,
  siteMetadata,
  homepageMeta,
  aboutSectionMeta,
  careersMeta,
  sustainabilityMeta,
  contactMeta,
  studioBio,
} from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ─── Clear existing data ─────────────────────────────────────────────────────
  console.log('🧹 Clearing existing data...');
  await prisma.contentBlock.deleteMany();
  await prisma.pageMetadata.deleteMany();
  await prisma.siteMetadata.deleteMany();
  await prisma.job.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.project.deleteMany();
  console.log('✓ Cleared\n');

  // ─── Seed Projects ───────────────────────────────────────────────────────────
  console.log(`📁 Seeding ${projects.length} projects...`);
  for (const project of projects) {
    await prisma.project.create({
      data: {
        id: project.id,
        code: project.code,
        slug: project.slug,
        title: project.title,
        description: project.description,
        city: project.city,
        country: project.country,
        location: project.location,
        type: project.type.toUpperCase() as any, // Convert lowercase enum to uppercase
        typology: project.typology,
        area: project.area,
        areaUnit: project.areaUnit,
        size: project.size,
        status: project.status,
        year: project.year,
        client: project.client,
        hue: project.hue,
        tags: project.tags,
        images: project.images,
        featured: project.featured,
        published: project.published,
        sortOrder: project.sortOrder,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt),
      },
    });
  }
  console.log(`✓ Seeded ${projects.length} projects\n`);

  // ─── Seed Team Members ───────────────────────────────────────────────────────
  console.log(`👥 Seeding team members...`);
  let memberCount = 0;
  for (const section of teams) {
    for (const member of section.members) {
      await prisma.teamMember.create({
        data: {
          id: member.id,
          name: member.name,
          slug: member.slug,
          role: member.role,
          email: member.email,
          phone: member.phone,
          bio: member.bio,
          avatar: member.avatar,
          linkedin: member.linkedin,
          portfolio: member.portfolio,
          specializations: member.specializations,
          hue: member.hue,
          active: member.active,
          sortOrder: member.sortOrder,
          sectionName: section.section,
          createdAt: new Date(member.createdAt),
          updatedAt: new Date(member.updatedAt),
        },
      });
      memberCount++;
    }
  }
  console.log(`✓ Seeded ${memberCount} team members\n`);

  // ─── Seed Jobs ───────────────────────────────────────────────────────────────
  console.log(`💼 Seeding ${jobs.length} jobs...`);
  for (const job of jobs) {
    // Map employment type: "Full-time" -> "FULL_TIME"
    const employmentTypeMap: Record<string, string> = {
      'Full-time': 'FULL_TIME',
      'Part-time': 'PART_TIME',
      'Contract': 'CONTRACT',
      'Internship': 'INTERNSHIP',
      'Hybrid': 'HYBRID',
    };

    // Map dept: "Architecture" -> "ARCHITECTURE"
    const deptMap: Record<string, string> = {
      'Architecture': 'ARCHITECTURE',
      'Interior': 'INTERIOR',
      'Sustainability': 'SUSTAINABILITY',
      'Engineering': 'ENGINEERING',
      'Management': 'MANAGEMENT',
      'Internship': 'INTERNSHIP',
    };

    await prisma.job.create({
      data: {
        id: job.id,
        slug: job.slug,
        dept: deptMap[job.dept] as any,
        location: job.location,
        employmentType: employmentTypeMap[job.employmentType] as any,
        remote: job.remote,
        title: job.title,
        desc: job.desc,
        requirements: job.requirements,
        responsibilities: job.responsibilities,
        benefits: job.benefits,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.salaryCurrency,
        active: job.active,
        featured: job.featured,
        loc: job.loc,
        postedAt: new Date(job.postedAt),
        createdAt: new Date(job.createdAt),
        updatedAt: new Date(job.updatedAt),
      },
    });
  }
  console.log(`✓ Seeded ${jobs.length} jobs\n`);

  // ─── Seed Site Metadata ──────────────────────────────────────────────────────
  console.log('🌐 Seeding site metadata...');
  await prisma.siteMetadata.create({
    data: {
      id: 1,
      siteName: siteMetadata.siteName,
      title: siteMetadata.title,
      description: siteMetadata.description,
      siteUrl: siteMetadata.siteUrl,
      locale: siteMetadata.locale,
      twitterHandle: siteMetadata.twitterHandle,
      ogImageUrl: siteMetadata.ogImage.url,
      ogImageWidth: siteMetadata.ogImage.width,
      ogImageHeight: siteMetadata.ogImage.height,
      ogImageAlt: siteMetadata.ogImage.alt,
    },
  });
  console.log('✓ Seeded site metadata\n');

  // ─── Seed Page Metadata ──────────────────────────────────────────────────────
  console.log('📄 Seeding page metadata...');
  const pageMetadata = [
    { pageName: 'homepage', ...homepageMeta },
    { pageName: 'about', ...aboutSectionMeta },
    { pageName: 'careers', ...careersMeta },
    { pageName: 'sustainability', ...sustainabilityMeta },
    { pageName: 'contact', ...contactMeta },
  ];

  for (const page of pageMetadata) {
    await prisma.pageMetadata.create({
      data: {
        pageName: page.pageName,
        title: (page as any).title || null,
        description: (page as any).description || (page as any).desc || null,
        keywords: [],
        ogTitle: null,
        ogDescription: null,
      },
    });
  }
  console.log(`✓ Seeded ${pageMetadata.length} page metadata entries\n`);

  // ─── Seed Content Blocks ─────────────────────────────────────────────────────
  console.log('📝 Seeding content blocks...');
  const contentBlocks = [
    {
      blockKey: 'studio_bio',
      blockType: 'json',
      content: JSON.stringify(studioBio),
    },
    {
      blockKey: 'about_section_meta',
      blockType: 'json',
      content: JSON.stringify(aboutSectionMeta),
    },
    {
      blockKey: 'careers_meta',
      blockType: 'json',
      content: JSON.stringify(careersMeta),
    },
    {
      blockKey: 'sustainability_meta',
      blockType: 'json',
      content: JSON.stringify(sustainabilityMeta),
    },
    {
      blockKey: 'contact_meta',
      blockType: 'json',
      content: JSON.stringify(contactMeta),
    },
  ];

  for (const block of contentBlocks) {
    await prisma.contentBlock.create({ data: block });
  }
  console.log(`✓ Seeded ${contentBlocks.length} content blocks\n`);

  console.log('✅ Database seed completed successfully!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

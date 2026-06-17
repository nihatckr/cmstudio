import 'server-only';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const getJobs = cache(async () => {
  const jobs = await prisma.job.findMany({
    where: { active: true },
    orderBy: { postedAt: 'desc' },
  });
  return jobs;
});

export const getJobBySlug = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });
  return job;
});

export const getFeaturedJobs = cache(async () => {
  const jobs = await prisma.job.findMany({
    where: {
      active: true,
      featured: true,
    },
    orderBy: { postedAt: 'desc' },
  });
  return jobs;
});

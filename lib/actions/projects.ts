import 'server-only';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';
import { ProjectType } from '@prisma/client';

export const getProjects = cache(async () => {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });
  return projects;
});

export const getProjectBySlug = cache(async (slug: string) => {
  const project = await prisma.project.findUnique({
    where: { slug },
  });
  return project;
});

export const getProjectsByType = cache(async (type?: ProjectType) => {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
      ...(type && { type }),
    },
    orderBy: { sortOrder: 'asc' },
  });
  return projects;
});

export const getFeaturedProjects = cache(async () => {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: { sortOrder: 'asc' },
  });
  return projects;
});

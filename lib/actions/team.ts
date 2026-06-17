import 'server-only';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const getTeamMembers = cache(async () => {
  const members = await prisma.teamMember.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });
  return members;
});

export const getTeamBySection = cache(async (sectionName: string) => {
  const members = await prisma.teamMember.findMany({
    where: {
      active: true,
      sectionName,
    },
    orderBy: { sortOrder: 'asc' },
  });
  return members;
});

export const getTeamMemberBySlug = cache(async (slug: string) => {
  const member = await prisma.teamMember.findUnique({
    where: { slug },
  });
  return member;
});

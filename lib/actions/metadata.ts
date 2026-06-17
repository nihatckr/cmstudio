import 'server-only';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const getSiteMetadata = cache(async () => {
  const metadata = await prisma.siteMetadata.findUnique({
    where: { id: 1 },
  });
  return metadata;
});

export const getPageMetadata = cache(async (pageName: string) => {
  const metadata = await prisma.pageMetadata.findUnique({
    where: { pageName },
  });
  return metadata;
});

export const getContentBlock = cache(async (blockKey: string) => {
  const block = await prisma.contentBlock.findUnique({
    where: { blockKey },
  });
  return block;
});

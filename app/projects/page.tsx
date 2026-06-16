import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/data';
import ProjectsPageClient from '../ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore our portfolio of 13+ luxury projects. Hotels, resorts, villas, and boutique spaces across Turkey and the Mediterranean. From concept to completion.',
  openGraph: {
    title: 'Projects — City Marin Studio',
    description: 'Explore our portfolio of luxury architecture and interior design projects.',
    url: `${siteMetadata.siteUrl}/projects`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — City Marin Studio',
    description: 'Explore our portfolio of luxury architecture and interior design projects.',
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

import type { Metadata } from 'next';
import { getProjects, getSiteMetadata } from '@/lib/actions';
import ProjectsPageClient from '../ProjectsPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const siteMetadata = await getSiteMetadata();
  
  return {
    title: 'Projects',
    description: 'Explore our portfolio of 13+ luxury projects. Hotels, resorts, villas, and boutique spaces across Turkey and the Mediterranean. From concept to completion.',
    openGraph: {
      title: 'Projects — City Marin Studio',
      description: 'Explore our portfolio of luxury architecture and interior design projects.',
      url: `${siteMetadata?.siteUrl}/projects`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Projects — City Marin Studio',
      description: 'Explore our portfolio of luxury architecture and interior design projects.',
    },
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return <ProjectsPageClient initialProjects={projects} />;
}

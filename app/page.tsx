import type { Metadata } from 'next';
import { getSiteMetadata, getProjects } from '@/lib/actions';
import ProjectsPageClient from './ProjectsPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const siteMetadata = await getSiteMetadata();
  
  return {
    title: 'Home',
    description: 'Award-winning architecture and interior design studio in Istanbul, Turkey. Specializing in luxury hospitality, residential, and commercial projects across the Mediterranean.',
    openGraph: {
      title: 'City Marin Studio — Architecture & Interior Design',
      description: 'Award-winning architecture and interior design studio in Istanbul, Turkey.',
      url: siteMetadata?.siteUrl || 'https://cmstudio.com',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'City Marin Studio — Architecture & Interior Design',
      description: 'Award-winning architecture and interior design studio in Istanbul, Turkey.',
    },
  };
}

export default async function HomePage() {
  const projects = await getProjects();
  
  return <ProjectsPageClient initialProjects={projects} />;
}

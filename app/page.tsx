import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/data';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Award-winning architecture and interior design studio in Istanbul, Turkey. Specializing in luxury hospitality, residential, and commercial projects across the Mediterranean.',
  openGraph: {
    title: 'City Marin Studio — Architecture & Interior Design',
    description: 'Award-winning architecture and interior design studio in Istanbul, Turkey.',
    url: siteMetadata.siteUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City Marin Studio — Architecture & Interior Design',
    description: 'Award-winning architecture and interior design studio in Istanbul, Turkey.',
  },
};

export default function HomePage() {
  return <ProjectsPageClient />;
}

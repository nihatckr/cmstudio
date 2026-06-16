import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, siteMetadata } from '@/lib/data';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/structuredData';
import { StructuredData } from '@/components/StructuredData';
import type { Metadata } from 'next';
import ProjectImage from '@/components/UI/ProjectImage';

// Generate static params for all project slugs
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const projectUrl = `${siteMetadata.siteUrl}/projects/${project.slug}`;
  const ogImage = project.images && project.images.length > 0 
    ? project.images[0] 
    : `${siteMetadata.siteUrl}/api/placeholder?hue=${project.hue}&w=1200&h=630`;

  const description = project.description || 
    `${project.typology} project in ${project.city}, ${project.country}. ${project.area.toLocaleString('en-US')} ${project.areaUnit}. ${project.status.replace('_', ' ')} — ${project.year}.`;

  return {
    title: project.title,
    description,
    keywords: [
      project.typology,
      project.city,
      project.country,
      project.type,
      'architecture',
      'design',
      ...project.tags,
    ],
    openGraph: {
      type: 'article',
      url: projectUrl,
      title: project.title,
      description,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${project.typology}`,
        },
      ],
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      authors: [siteMetadata.siteName],
      tags: project.tags,
    },
    twitter: {
      card: 'summary_large_image',
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      title: project.title,
      description,
      images: [ogImage],
    },
  };
}

export default function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Breadcrumb structured data
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/' },
    { name: project.title, url: `/projects/${project.slug}` },
  ];

  return (
    <div className="project-page">
      {/* Structured Data - JSON-LD */}
      <StructuredData data={[
        generateArticleSchema(project),
        generateBreadcrumbSchema(breadcrumbs)
      ]} />
      
      <div className="project-hero">
        {project.images && project.images.length > 0 && (
          <div className="project-hero-image">
            <ProjectImage 
              images={project.images} 
              title={project.title} 
              hue={project.hue} 
              featured={project.featured}
              className="project-detail-hero-image"
            />
          </div>
        )}
        {project.images && project.images.length > 0 && (
          <div className="project-hero-image">
            <ProjectImage 
              images={project.images} 
              title={project.title} 
              hue={project.hue} 
              featured={project.featured}
              className="project-detail-hero-image"
            />
          </div>
        )}
        <h1>{project.title}</h1>
        <div className="project-meta">
          <span className="project-location">{project.city}, {project.country}</span>
          <span className="project-type">{project.typology}</span>
          <span className="project-year">{project.year}</span>
        </div>
      </div>

      <div className="project-info">
        <div className="project-info-grid">
          <div className="project-info-item">
            <span className="label">Location</span>
            <span className="value">{project.city}, {project.country}</span>
          </div>
          <div className="project-info-item">
            <span className="label">Type</span>
            <span className="value">{project.typology}</span>
          </div>
          <div className="project-info-item">
            <span className="label">Area</span>
            <span className="value">{project.area.toLocaleString('en-US')} {project.areaUnit}</span>
          </div>
          <div className="project-info-item">
            <span className="label">Status</span>
            <span className="value">{project.status.replace('_', ' ')}</span>
          </div>
          <div className="project-info-item">
            <span className="label">Year</span>
            <span className="value">{project.year}</span>
          </div>
          <div className="project-info-item">
            <span className="label">Client</span>
            <span className="value">{project.client}</span>
          </div>
        </div>

        {project.description && (
          <div className="project-description">
            <p>{project.description}</p>
          </div>
        )}

        {project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="project-back">
        <Link href="/projects">← Back to Projects</Link>
      </div>
    </div>
  );
}

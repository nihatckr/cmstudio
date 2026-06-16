export default function ProjectLoading() {
  return (
    <div className="project-loading">
      <div className="project-loading-hero">
        <div className="skeleton skeleton-hero-image" />
        <div className="skeleton skeleton-project-title" />
      </div>
      
      <div className="project-loading-info">
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text skeleton-text-short" />
      </div>

      <div className="project-loading-gallery">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton skeleton-gallery-image" />
        ))}
      </div>
    </div>
  );
}

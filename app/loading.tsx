export default function Loading() {
  return (
    <div className="loading-skeleton">
      <div className="loading-header">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-subtitle" />
      </div>
      
      <div className="loading-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton-image" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text skeleton-text-short" />
          </div>
        ))}
      </div>
    </div>
  );
}

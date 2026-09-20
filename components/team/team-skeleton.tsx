export default function TeamSkeleton() {
  const skeletons = Array.from({ length: 6 }, (_, index) => `team-skeleton-${index}`);

  return (
    <section aria-label="Loading team" className="team-skeleton section-shell">
      <div className="team-skeleton-hero">
        <span />
        <strong />
        <strong />
        <p />
      </div>
      <div className="team-skeleton-section">
        <div className="team-skeleton-heading">
          <span />
          <strong />
        </div>
        <div className="team-skeleton-grid">
          {skeletons.map((id) => (
            <div key={id}>
              <span />
              <strong />
              <p />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

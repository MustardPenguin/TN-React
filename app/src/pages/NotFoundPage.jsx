import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="container">
        <p className="eyebrow">Page not found</p>
        <h1>We couldn't find that page</h1>
        <p className="sub">The listing may have been removed, or the link is incorrect.</p>
        <a className="btn btn-primary" href="#/">Back to home</a>
      </div>
    </main>
  );
}

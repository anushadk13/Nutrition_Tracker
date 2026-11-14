export default function Page({ title, eyebrow, className = '', children }) {
  return <section className={`page card ${className}`}><span className="page-eyebrow">{eyebrow}</span><h2>{title}</h2>{children}</section>;
}

export default function Page({ title, eyebrow, children }) {
  return <section className="page card"><span className="page-eyebrow">{eyebrow}</span><h2>{title}</h2>{children}</section>;
}

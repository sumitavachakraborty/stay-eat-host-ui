// StatCard — one of the 4 analytics tiles on the Host Dashboard.
// tone: 'default' | 'coral' | 'green'

export default function StatCard({ label, value, sub, tone = 'default' }) {
  const bg = tone === 'green'
    ? 'var(--c-pale-green)'
    : tone === 'coral'
    ? '#fff7f4'
    : '#fff';

  return (
    <div style={{
      padding: 22,
      borderRadius: 18,
      background: bg,
      border: '1px solid var(--c-hairline)',
    }}>
      <div className="mono" style={{ marginBottom: 10 }}>{label}</div>
      <div className="display" style={{ fontSize: 38, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'var(--c-slate)', marginTop: 6 }}>{sub}</div>
    </div>
  );
}

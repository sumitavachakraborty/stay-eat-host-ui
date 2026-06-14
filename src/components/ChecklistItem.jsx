// ChecklistItem — a single room row in the Quality Check submission page.
// Shows photo thumb, room name, status chip, photo count, coral/green progress bar, upload button.

import Icon from './Icon.jsx';

export default function ChecklistItem({ r }) {
  const pct = Math.min(100, (r.count / r.required) * 100);
  const isDone = r.count >= r.required;

  return (
    <div style={{
      border: '1px solid var(--c-hairline)',
      borderRadius: 16,
      padding: 16,
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      background: isDone ? '#fff' : '#fffaf7',
    }}>
      {/* Photo thumb */}
      <div style={{
        width: 84,
        height: 84,
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--c-stone)',
        flexShrink: 0,
      }}>
        {r.img ? (
          <img src={r.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--c-muted)',
          }}>
            <Icon.Camera />
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}>
          <div style={{ fontSize: 16, fontWeight: 500 }}>{r.name}</div>
          <span className={`status ${r.status === 'verified' ? 'live' : r.status === 'pending' ? 'pending' : 'draft'}`}>
            {r.status === 'verified'
              ? <><Icon.Check size={10} /> Verified</>
              : r.status === 'pending'
              ? <><span className="dot" /> Pending</>
              : 'To do'}
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--c-slate)' }}>
          {r.count} of {r.required} photos · taken just now
        </div>
        <div style={{ height: 4, background: 'var(--c-border-light)', borderRadius: 2, marginTop: 10, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: isDone ? 'var(--c-deep-green)' : 'var(--c-coral)',
            transition: 'width .4s',
          }} />
        </div>
      </div>

      {/* Upload / Add more */}
      <button className="pill-outline" style={{ borderColor: 'var(--c-hairline)', flexShrink: 0 }}>
        {r.count > 0 ? 'Add more' : 'Upload'}
      </button>
    </div>
  );
}

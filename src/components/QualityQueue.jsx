// QualityQueue — the tabbed queue section on the Host Dashboard.
// Shows Quality Check queue, Arrivals, Reviews tabs.
// Renders booking rows with thumbnail, status chip, progress bar, action button.

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function QualityQueue({ checks = [] }) {
  const [tab, setTab] = useState('queue');

  const tabs = [
    ['queue', `Quality Check queue · ${checks.length}`],
    ['arr', 'Arrivals · 5'],
    ['rev', 'Reviews · 2 new'],
  ];

  return (
    <div>
      {/* Tab pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={tab === id ? 'pill-outline active' : 'pill-outline'}
            style={{ borderColor: tab === id ? 'var(--c-near-black)' : 'var(--c-hairline)' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Queue rows */}
      {tab === 'queue' && (
        <div style={{ display: 'grid', gap: 14 }}>
          {checks.map((b, i) => (
            <div key={b.id || i} className="qqueue-row">
              {/* Thumbnail */}
              <div
                className="qqueue-row-thumb"
                style={{
                  height: 90,
                  borderRadius: 12,
                  background: b.property?.photos?.[0]
                    ? `url(${b.property.photos[0]}) center/cover`
                    : 'var(--c-stone)',
                }}
              />

              {/* Info */}
              <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                  <div style={{ fontWeight: 600 }}>{b.property?.name || 'Property'}</div>
                  <span className={`status ${b.state === 'progress' ? 'pending' : 'draft'}`}>
                    <span className="dot" />
                    {b.state === 'progress' ? 'In progress' : 'Scheduled'}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--c-slate)' }}>
                  Guest {b.guest} · check-in {b.checkIn}
                </div>
                <div style={{
                  fontSize: 13,
                  color: b.state === 'progress' ? 'var(--c-coral)' : 'var(--c-slate)',
                  marginTop: 4,
                }}>
                  {b.desc}
                </div>
                {b.pct > 0 && (
                  <div style={{
                    height: 3,
                    background: 'var(--c-border-light)',
                    borderRadius: 2,
                    marginTop: 10,
                    maxWidth: 240,
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${b.pct}%`,
                      background: 'var(--c-coral)',
                      borderRadius: 2,
                    }} />
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="qqueue-row-action">
                <Link to={`/quality-check/${b.id || 'qc1'}`} style={{ textDecoration: 'none' }}>
                  <button
                    className={i === 0 ? 'btn-primary' : 'pill-outline'}
                    style={{ padding: '10px 18px', fontSize: 13 }}
                  >
                    {i === 0 ? 'Continue →' : 'Open'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'arr' && (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--c-muted)', fontSize: 14 }}>
          Arrivals view coming soon.
        </div>
      )}

      {tab === 'rev' && (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--c-muted)', fontSize: 14 }}>
          Reviews view coming soon.
        </div>
      )}
    </div>
  );
}

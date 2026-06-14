// RewardsRail — dark rewards card + recent review card in the right column.
// Accepts rewards[], points, delta, review props.

import Icon from './Icon.jsx';

export default function RewardsRail({ rewards, points = 2148, delta = '+328 vs last season' }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* Dark rewards card with coral radial glow */}
      <div style={{
        background: 'var(--c-near-black)',
        color: '#fff',
        borderRadius: 22,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Coral radial glow */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ff7759 0%, transparent 70%)',
          opacity: 0.5,
          pointerEvents: 'none',
        }} />

        <div className="mono" style={{ color: 'rgba(255,255,255,.6)', position: 'relative' }}>
          Rewards · This season
        </div>
        <div className="display" style={{ fontSize: 44, lineHeight: 1, margin: '12px 0 4px', position: 'relative' }}>
          <span style={{ color: 'var(--c-coral)' }}>{points.toLocaleString()}</span>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', position: 'relative' }}>
          Hearth points earned · {delta}
        </div>

        <div style={{ marginTop: 18, position: 'relative' }}>
          {rewards.map((r) => (
            <div key={r.tier} style={{
              padding: '12px 0',
              borderTop: '1px solid rgba(255,255,255,.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {r.tier}
                  {r.met && <span style={{ color: 'var(--c-coral)', marginLeft: 6 }}>✓</span>}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{r.desc}</div>
              </div>
              <div style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 11,
                color: r.met ? 'var(--c-coral)' : 'rgba(255,255,255,.6)',
              }}>
                {r.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent review card */}
      <div style={{ border: '1px solid var(--c-hairline)', borderRadius: 22, padding: 20 }}>
        <div className="mono" style={{ marginBottom: 12 }}>New review · 2 hr ago</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          {[1,2,3,4,5].map((i) => (
            <Icon.Star key={i} size={14} fill="#ff7759" />
          ))}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.5, margin: 0, color: 'var(--c-near-black)' }}>
          "The Quality Check photos arrived right on time. We walked into a cabin that looked exactly like the listing — and the welcome basket was a beautiful surprise."
        </p>
        <div style={{ marginTop: 12, fontSize: 13, color: 'var(--c-slate)' }}>
          — Hana K., Pinewood Cabin
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <span className="status live">+12 pts</span>
          <span className="status pending">Photo bonus</span>
        </div>
      </div>
    </div>
  );
}

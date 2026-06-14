// QualityCheck — Host photo submission page.
// Ported from web-quality.jsx HostQualityCheck.
// Route: /quality-check/:id?

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ChecklistItem from '../components/ChecklistItem.jsx';
import { getQualityCheck } from '../lib/api.js';
import { FALLBACK_ROOMS, FALLBACK_QUALITY_CHECKS } from '../lib/fallbackData.js';

export default function QualityCheck() {
  const { id } = useParams();
  const [check, setCheck] = useState(null);
  const [rooms, setRooms] = useState(FALLBACK_ROOMS);

  useEffect(() => {
    if (id) {
      getQualityCheck(id).then(setCheck).catch(() => {
        setCheck(FALLBACK_QUALITY_CHECKS[0]);
      });
    } else {
      setCheck(FALLBACK_QUALITY_CHECKS[0]);
    }
  }, [id]);

  const total = rooms.reduce((a, r) => a + Math.min(r.count, r.required), 0);
  const need = rooms.reduce((a, r) => a + r.required, 0);
  const pct = Math.round((total / need) * 100);

  const qc = check || FALLBACK_QUALITY_CHECKS[0];

  return (
    <div className="app fade-in" style={{ minHeight: '100vh' }}>
      {/* Sub-nav */}
      <div className="qc-subnav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link
            to="/"
            className="btn-secondary"
            style={{ display: 'flex', gap: 8, alignItems: 'center', textDecoration: 'none' }}
          >
            <Icon.ArrowLeft size={14} />
            {qc.property?.name || 'Lake Reflection House'}
          </Link>
          <span className="mono">Quality Check · Booking #HRT-2618</span>
        </div>
        <div className="status pending">
          <span className="dot" /> Awaiting guest approval
        </div>
      </div>

      {/* Main layout */}
      <div className="qc-main">
        {/* Left: form + checklist */}
        <div>
          <div className="mono" style={{ marginBottom: 12 }}>Step 02 · Photograph & submit</div>
          <h1 className="display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1, margin: 0, letterSpacing: '-0.03em' }}>
            Show {qc.guest?.split(' ')[0] || 'Eli'} the cabin<br />is ready for them.
          </h1>
          <p style={{ marginTop: 18, fontSize: 16, color: 'var(--c-slate)', maxWidth: 520, lineHeight: 1.5 }}>
            Upload fresh photos of every room after cleaning. {qc.guest?.split(' ')[0] || 'Eli'} gets 4&nbsp;hours to approve before check-in at{' '}
            <strong style={{ color: 'var(--c-near-black)' }}>3:00 PM, March 23</strong>.
          </p>

          {/* Progress band */}
          <div className="qc-progress-band">
            <div className="qc-progress-band-info">
              <div style={{
                fontSize: 12,
                color: 'rgba(255,255,255,.6)',
                fontFamily: 'var(--f-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                Submission progress
              </div>
              <div style={{ fontSize: 28, fontWeight: 500, marginTop: 4 }}>{pct}%</div>
            </div>
            <div className="qc-progress-bar">
              <div style={{
                width: `${pct}%`,
                height: '100%',
                background: 'var(--c-coral)',
                borderRadius: 3,
                transition: 'width .6s',
              }} />
            </div>
            <div className="qc-submit-btn">
              <button className="btn-primary invert">
                Submit to {qc.guest?.split(' ')[0] || 'Eli'} →
              </button>
            </div>
          </div>

          {/* Room checklist */}
          <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
            {rooms.map((r) => (
              <ChecklistItem key={r.id} r={r} />
            ))}
          </div>
        </div>

        {/* Right: side panel */}
        <div>
          <div className="qc-side-panel">
            {/* Guest preview card */}
            <div style={{ border: '1px solid var(--c-hairline)', borderRadius: 22, padding: 20 }}>
              <div className="mono" style={{ marginBottom: 14 }}>Guest preview</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#a4d6f5,#1863dc)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontWeight: 600,
                }}>
                  {(qc.guest?.charAt(0) || 'E')}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{qc.guest || 'Eli Tanaka'}</div>
                  <div style={{ fontSize: 12, color: 'var(--c-slate)' }}>
                    Check-in · {qc.checkIn || 'Mar 23 at 3:00 PM'}
                  </div>
                </div>
              </div>
              {/* Photo thumbnails grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} style={{
                    aspectRatio: '1/1',
                    borderRadius: 6,
                    background: i < 5 && rooms[i % 5]?.img
                      ? `url(${rooms[i % 5].img}) center/cover`
                      : 'var(--c-stone)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                ))}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
                marginTop: 10,
                color: 'var(--c-slate)',
              }}>
                <span>{total} photos uploaded</span>
                <span>{rooms.filter((r) => r.status === 'verified').length} rooms verified</span>
              </div>
            </div>

            {/* Deep-green host reward card */}
            <div style={{ background: 'var(--c-deep-green)', color: '#fff', borderRadius: 22, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Icon.Trophy size={20} />
                <div className="mono" style={{ color: 'rgba(255,255,255,.7)' }}>Host reward</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.3 }}>
                Submit early to keep your{' '}
                <em style={{ color: '#ff7759', fontStyle: 'normal' }}>Verified+</em>{' '}
                badge — adds 18% to your visibility.
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,.15)', borderRadius: 2 }}>
                  <div style={{ width: '74%', height: '100%', background: '#ff7759', borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 13, color: '#fff' }}>74% to next tier</span>
              </div>
            </div>

            {/* Photo guidance */}
            <div style={{ border: '1px solid var(--c-hairline)', borderRadius: 22, padding: 20 }}>
              <div className="mono" style={{ marginBottom: 12 }}>Photo guidance</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--c-near-black)', display: 'grid', gap: 10 }}>
                {['Natural light, no filters', 'Wide shot of each room', 'Detail of bedding & towels', 'Cleaned surfaces close-up'].map((tip) => (
                  <li key={tip} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Icon.Check size={14} /> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

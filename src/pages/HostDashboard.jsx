// HostDashboard — the "Today" view.
// Analytics stat cards, Quality Check queue, Listings grid, Rewards rail.
// All data fetched from API with static fallback.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import StatCard from '../components/StatCard.jsx';
import QualityQueue from '../components/QualityQueue.jsx';
import RewardsRail from '../components/RewardsRail.jsx';
import {
  getHostAnalytics,
  getHostListings,
  getHostQualityChecks,
} from '../lib/api.js';
import {
  FALLBACK_ANALYTICS,
  FALLBACK_REWARDS,
  FALLBACK_QUALITY_CHECKS,
  PROPERTIES,
} from '../lib/fallbackData.js';

export default function HostDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [listings, setListings] = useState([]);
  const [checks, setChecks] = useState([]);

  useEffect(() => {
    getHostAnalytics().then(setAnalytics).catch(() => {
      setAnalytics({ ...FALLBACK_ANALYTICS, rewards: FALLBACK_REWARDS, rewardsPoints: 2148, rewardsDelta: '+328 vs last season' });
    });
    getHostListings().then(setListings).catch(() => setListings(PROPERTIES.slice(0, 4)));
    getHostQualityChecks().then(setChecks).catch(() => setChecks(FALLBACK_QUALITY_CHECKS));
  }, []);

  const stats = analytics || FALLBACK_ANALYTICS;
  const rewards = analytics?.rewards || FALLBACK_REWARDS;
  const rewardsPoints = analytics?.rewardsPoints || 2148;
  const rewardsDelta = analytics?.rewardsDelta || '+328 vs last season';

  const displayListings = listings.length > 0 ? listings : PROPERTIES.slice(0, 4);
  const displayChecks = checks.length > 0 ? checks : FALLBACK_QUALITY_CHECKS;

  return (
    <div className="app fade-in" style={{ minHeight: '100vh' }}>
      {/* Hero greeting */}
      <div style={{ padding: '36px 56px 0' }}>
        <div className="mono" style={{ marginBottom: 12 }}>Tuesday, March 22 · Boulder, CO</div>
        <h1 className="display" style={{ fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: '-0.03em' }}>
          Good morning, Mara.<br />
          <em style={{ fontStyle: 'normal', color: 'var(--c-slate)' }}>3 stays starting tomorrow.</em>
        </h1>
      </div>

      {/* Stat cards */}
      <div style={{
        padding: '32px 56px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
      }}>
        <StatCard
          label="Confirmed bookings"
          value={String(stats.confirmedBookings)}
          sub={stats.confirmedBookingsDelta}
          tone="default"
        />
        <StatCard
          label="Quality Checks pending"
          value={String(stats.qualityChecksPending)}
          sub={stats.qualityChecksNext}
          tone="coral"
        />
        <StatCard
          label="Avg approval time"
          value={stats.avgApprovalTime}
          sub={stats.avgApprovalRank}
          tone="default"
        />
        <StatCard
          label="March payout"
          value={stats.marchPayout}
          sub={stats.marchPayoutDate}
          tone="green"
        />
      </div>

      {/* Main content: queue + rewards */}
      <div style={{
        padding: '40px 56px 56px',
        display: 'grid',
        gridTemplateColumns: '1.7fr 1fr',
        gap: 48,
      }}>
        {/* Left: Quality Check queue + Listings */}
        <div>
          <QualityQueue checks={displayChecks} />

          {/* Your listings */}
          <div style={{ marginTop: 40 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 16,
            }}>
              <h2 className="display" style={{ fontSize: 32, margin: 0, letterSpacing: '-0.02em' }}>
                Your listings
              </h2>
              <button className="btn-secondary">Manage all {displayListings.length}</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {displayListings.slice(0, 4).map((p) => (
                <div key={p.id} style={{
                  border: '1px solid var(--c-hairline)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  display: 'flex',
                }}>
                  <div style={{
                    width: 120,
                    flexShrink: 0,
                    background: p.photos?.[0]
                      ? `url(${p.photos[0]}) center/cover`
                      : 'var(--c-stone)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                  <div style={{ padding: 14, flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.name}
                      </div>
                      <span className="status live" style={{ flexShrink: 0 }}>
                        <Icon.Shield size={10} /> Verified
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--c-slate)', marginTop: 4 }}>{p.place}</div>
                    <div style={{
                      marginTop: 10,
                      fontSize: 12,
                      color: 'var(--c-slate)',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icon.Star size={11} /> {p.rating} · {p.reviews}
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--c-near-black)' }}>
                        ${p.price}/n
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Rewards + Review */}
        <div>
          <div style={{ position: 'sticky', top: 24 }}>
            <RewardsRail
              rewards={rewards}
              points={rewardsPoints}
              delta={rewardsDelta}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

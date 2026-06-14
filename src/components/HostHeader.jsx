// HostHeader — sticky top nav for the host app.
// Contains: brand "hearth · host", nav tabs, host/traveller mode toggle, avatar, New listing btn.

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';

const NAV_TABS = ['Today', 'Listings', 'Earnings', 'Inbox'];

export default function HostHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname === '/' ? 'Today'
    : location.pathname.startsWith('/listings') ? 'Listings'
    : location.pathname.startsWith('/earnings') ? 'Earnings'
    : location.pathname.startsWith('/inbox') ? 'Inbox'
    : 'Today';

  function switchToTraveller() {
    const url = import.meta.env.VITE_TRAVELLER_APP_URL || 'http://localhost:3000';
    window.location.href = url;
  }

  return (
    <header style={{
      padding: '20px 56px',
      borderBottom: '1px solid var(--c-hairline)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Brand */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, letterSpacing: '-0.02em', color: 'var(--c-near-black)' }}>
          hearth · host
        </span>
      </Link>

      {/* Nav tabs */}
      <nav style={{ display: 'flex', gap: 24, fontSize: 14 }}>
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab;
          const to = tab === 'Today' ? '/' : `/${tab.toLowerCase()}`;
          return (
            <Link
              key={tab}
              to={to}
              style={{
                color: isActive ? 'var(--c-near-black)' : 'var(--c-slate)',
                fontWeight: isActive ? 600 : 400,
                borderBottom: isActive ? '2px solid var(--c-near-black)' : '2px solid transparent',
                paddingBottom: 4,
                textDecoration: 'none',
                transition: 'color .15s',
              }}
            >
              {tab}
            </Link>
          );
        })}
      </nav>

      {/* Right cluster */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {/* Host / Traveller toggle */}
        <div className="mode-toggle">
          <button className="mode-toggle-btn" onClick={switchToTraveller}>
            Traveller
          </button>
          <button className="mode-toggle-btn active">
            Host
          </button>
        </div>

        {/* New listing */}
        <Link to="/new-listing" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>
            <Icon.Plus size={14} /> New listing
          </button>
        </Link>

        {/* Avatar */}
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#ffad9b,#ff7759)',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
          flexShrink: 0,
        }}>
          M
        </div>
      </div>
    </header>
  );
}

// HostHeader — sticky top nav for the host app.
// Contains: brand "stay and eat · host", nav tabs, host/traveller mode toggle, avatar, New listing btn.

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
    <header className="host-header">
      {/* Brand */}
      <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <span className="host-header-brand">
          stay and eat · host
        </span>
      </Link>

      {/* Nav tabs — horizontal scroll on mobile */}
      <nav className="host-header-nav">
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab;
          const to = tab === 'Today' ? '/' : `/${tab.toLowerCase()}`;
          return (
            <Link
              key={tab}
              to={to}
              className={`host-header-tab${isActive ? ' active' : ''}`}
            >
              {tab}
            </Link>
          );
        })}
      </nav>

      {/* Right cluster */}
      <div className="host-header-right">
        {/* Host / Traveller toggle — always visible */}
        <div className="mode-toggle">
          <button className="mode-toggle-btn" onClick={switchToTraveller}>
            Traveller
          </button>
          <button className="mode-toggle-btn active">
            Host
          </button>
        </div>

        {/* New listing — full text on desktop, + icon on mobile */}
        <Link to="/new-listing" style={{ textDecoration: 'none' }}>
          <button className="btn-primary host-new-listing-btn" style={{ padding: '10px 16px', fontSize: 13 }}>
            <Icon.Plus size={14} />
            <span className="host-new-listing-label">New listing</span>
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
          minWidth: 36,
        }}>
          M
        </div>
      </div>
    </header>
  );
}

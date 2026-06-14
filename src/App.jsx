// App.jsx — root router + layout wrapper.

import { Routes, Route, Navigate } from 'react-router-dom';
import HostHeader from './components/HostHeader.jsx';
import HostDashboard from './pages/HostDashboard.jsx';
import QualityCheck from './pages/QualityCheck.jsx';
import NewListing from './pages/NewListing.jsx';

export default function App() {
  return (
    <>
      <HostHeader />
      <Routes>
        <Route path="/" element={<HostDashboard />} />
        <Route path="/quality-check" element={<QualityCheck />} />
        <Route path="/quality-check/:id" element={<QualityCheck />} />
        <Route path="/new-listing" element={<NewListing />} />
        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

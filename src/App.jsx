import React from 'react';
import { WalletBar } from './components/WalletBar.jsx';
import { MapGrid } from './components/MapGrid.jsx';
import { ChargerPanel } from './components/ChargerPanel.jsx';
import { Leaderboard } from './components/Leaderboard.jsx';
import { ActivityFeed } from './components/ActivityFeed.jsx';
import { ChargePointsPanel } from './components/ChargePointsPanel.jsx';
import { GoogleMapsView } from './components/GoogleMapsView.jsx';
import { FooterBar } from './components/FooterBar.jsx';
import { StatsHeader } from './components/StatsHeader.jsx';
import { RecentEventsStrip as RecentEvents } from './components/RecentEventsStrip.jsx';
import { OnboardingToast } from './components/OnboardingToast.jsx';

export default function App() {
  const [view, setView] = React.useState(() => {
    try { return localStorage.getItem('vdw_view') || 'grid'; } catch { return 'grid'; }
  });
  React.useEffect(() => { try { localStorage.setItem('vdw_view', view); } catch {} }, [view]);
  return (
    <div className="app">
      <WalletBar />
      <StatsHeader />
      <RecentEvents />
      <main className="layout">
        <section className="left">
          <h2>Virtual DeCharge World</h2>
          <p className="muted">Own plots, deploy chargers, and simulate charging sessions.</p>
          <div className="view-toggle">
            <button className={`tab ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</button>
            <button className={`tab ${view === 'map' ? 'active' : ''}`} onClick={() => setView('map')}>Map</button>
          </div>
          {view === 'grid' ? <MapGrid /> : <GoogleMapsView />}
        </section>
        <section className="right">
          <ChargerPanel />
          <Leaderboard />
          <ChargePointsPanel />
          <ActivityFeed />
        </section>
      </main>
      <FooterBar />
      <OnboardingToast />
    </div>
  );
}



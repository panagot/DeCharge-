import React from 'react';
import { Link } from 'react-router-dom';
import { FooterBar } from '../components/FooterBar.jsx';
import { WalletBar } from '../components/WalletBar.jsx';
import { StatsHeader } from '../components/StatsHeader.jsx';

export function About() {
  return (
    <div className="app">
      <WalletBar />
      <StatsHeader />
      <main className="layout">
        <section className="left">
          <h2>What is Virtual DeCharge World?</h2>
          <p className="muted">A gamified DePIN prototype that mirrors DeCharge’s network vision on Solana.</p>
          <div className="panel">
            <h3>Core Idea</h3>
            <p>
              Bridge real charging behavior with on-chain engagement. Own virtual plots, deploy chargers, and run
              live charging sessions with per-second settlement and on-chain-ready POINTS.
            </p>
            <ul>
              <li>Live map with heatmap and session cards</li>
              <li>Drivers pay per-second, owners earn yield, drivers earn rewards</li>
              <li>Support for discounted POINTS purchases (coming next via Solana Pay)</li>
              <li>Attestation path for real-world charge data → on-chain points (oracle/claims)</li>
            </ul>
          </div>

          <div className="panel">
            <h3>How it fits DeCharge</h3>
            <p className="muted">Anchored by DeCharge’s docs and litepaper.</p>
            <ul>
              <li>Reward Engine: points for energy/time with transparent settlement</li>
              <li>DePIN ethos: community-owned charging assets, clear economics</li>
              <li>On-chain transparency: events/receipts with explorer links (next phase)</li>
            </ul>
            <div style={{ display: 'flex', gap: 8 }}>
              <a className="secondary" href="https://decharge.network/" target="_blank" rel="noreferrer">Website</a>
              <a className="secondary" href="https://decharge.network/network" target="_blank" rel="noreferrer">Network</a>
              <a className="secondary" href="https://docs.decharge.network/" target="_blank" rel="noreferrer">Docs</a>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <Link to="/"><button>Back to App</button></Link>
          </div>
        </section>
        <section className="right">
          <div className="panel">
            <h3>Roadmap</h3>
            <ol>
              <li>Wallet Adapter + devnet POINTS mint</li>
              <li>Anchor PDAs: Land/Charger/Session + events</li>
              <li>2s batch settlement and explorer feed</li>
              <li>Solana Pay discounted buy and gifting</li>
              <li>Attestation/claims from telemetry</li>
            </ol>
          </div>
        </section>
      </main>
      <FooterBar />
    </div>
  );
}



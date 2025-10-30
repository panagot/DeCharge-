# Virtual DeCharge World ⚡

A gamified DePIN prototype that bridges real-world EV charging behavior with on-chain engagement on Solana. Built for the DeCharge hackathon.

## Concept

**Virtual DeCharge World** is an interactive simulation that mirrors DeCharge's vision of a decentralized, community-powered EV charging network. It demonstrates how physical charging infrastructure can connect with Web3 participation through:

- **Real-time charging sessions**: Users start/stop charging on virtual plots, with per-second settlement and transparent point economics
- **Map visualization**: Live heatmap of charge points weighted by kW and activity, with session cards showing kWh, INR pricing, and POINTS earned
- **Community economics**: Land owners deploy chargers and earn yield; drivers pay per-second and earn rewards; Web3 users can participate by purchasing discounted points
- **On-chain readiness**: Architecture designed to migrate to Solana smart contracts (Anchor PDAs for land/charger/session accounts)

### How It Fits DeCharge

This prototype aligns with DeCharge's core principles:

- **Reward Engine**: Points are earned based on energy/time usage with transparent settlement
- **DePIN Ethos**: Community-owned charging assets with clear yield mechanics
- **On-chain Transparency**: Event logs and receipts ready for explorer integration
- **Bridge Real-World Data**: Sample charge points from DeCharge's network can spawn virtual chargers on the grid

See [DeCharge Litepaper](https://decharge.network/litepaper) and [Documentation](https://docs.decharge.network/) for reference.

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Environment Setup (Optional)

For Google Maps integration, create a `.env` file:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

Without the API key, the app uses a mock map that works offline.

### Run

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Features

### 🌍 Grid World
- **8x12 plot grid**: Mint land (50 POINTS), deploy chargers with stake (100 POINTS)
- **Per-second settlement**: Drivers pay rate per second; owners earn ~70% yield; drivers earn ~30% rewards
- **Activity feed**: Real-time events for land minting, charger deployment, sessions, and batch settlements

### 🗺️ Live Map
- **Heatmap**: Intensity weighted by connector kW and active sessions (queue signal)
- **Session cards**: Click markers to see live metrics: kWh estimate, INR pricing (per-kWh and per-minute), POINTS cost
- **Filters**: Active only, DC only, Min kW threshold
- **Share to X**: One-click session recap with stats

### 📊 Analytics
- **Stats header**: Sites, active sites, cities, total kW, active sessions
- **Recent events strip**: Last 5 events at a glance
- **Leaderboards**: Top earners by yield, plot counts
- **Your holdings**: Real-time POINTS, earned/spent, owned plots

### 🎯 Onboarding
- Welcome toast with 3-step demo path
- Persistent view preferences (Grid/Map)
- Reset World button for clean demos

## Demo Path (90 seconds)

1. **Spawn virtual chargers**: In the right panel, click "Spawn virtual" on 2-3 DeCharge charge points (Bengaluru, Delhi, Mumbai, etc.)
2. **Switch to Map**: Click the "Map" tab to see heatmap and markers
3. **Start a session**: Click a marker → "Start Session" → watch the session card update in real-time
4. **Watch settlement**: Activity feed shows "Batch settled N active session(s)" every 2 seconds
5. **Share recap**: Stop session → click "Share to X" from the session card

## Architecture

### Current (MVP)
- **Frontend**: React + Vite, Zustand for state
- **Maps**: Google Maps API (or mock map fallback)
- **Data**: Sample charge points JSON from DeCharge litepaper
- **Storage**: LocalStorage for persistence (state, preferences)

### On-Chain Roadmap
- **Token**: token-2022 POINTS mint (program as mint authority)
- **PDAs**: 
  - `LandPDA(row, col, owner)` - Plot ownership
  - `ChargerPDA(land, rate, stake)` - Charger deployment
  - `SessionPDA(land, driver, start_ts, active)` - Active sessions
- **Instructions**:
  - `mint_land`, `deploy_charger`, `start_session`, `stop_session`
  - `settle_batch` (cron/crank every 2s)
  - `buy_points` (Solana Pay, 50% discount)
- **Events**: `LandMinted`, `ChargerDeployed`, `SessionStarted`, `SessionSettled`, `PointsBought`

## Project Structure

```
src/
├── components/
│   ├── WalletBar.jsx          # Header with wallet selector
│   ├── StatsHeader.jsx        # Live stats bar
│   ├── RecentEventsStrip.jsx  # Recent events chip strip
│   ├── MapGrid.jsx            # Grid world UI
│   ├── GoogleMapsView.jsx     # Google Maps + heatmap
│   ├── MockMapView.jsx        # Offline map fallback
│   ├── ChargePointsPanel.jsx  # Spawn virtual chargers
│   ├── ChargerPanel.jsx       # Holdings + CTAs
│   ├── Leaderboard.jsx        # Top earners
│   ├── ActivityFeed.jsx       # Event log
│   └── OnboardingToast.jsx   # Welcome guide
├── pages/
│   └── About.jsx              # Explanation page
├── state/
│   └── store.js               # Zustand state + ticker
└── data/
    └── chargePointsSample.json # DeCharge sample data
```

## Tech Stack

- **React 18** + **Vite**
- **Zustand** for state management
- **@react-google-maps/api** for map visualization
- **react-router-dom** for routing
- **@solana/web3.js** (prepared for wallet adapter integration)

## Key Files

- `src/state/store.js`: World state, economy rules, per-second ticker, batch settlement heartbeat
- `src/components/MapGrid.jsx`: Grid interactions (mint, deploy, charge)
- `src/components/GoogleMapsView.jsx`: Map with heatmap, session cards, filters
- `src/components/ChargePointsPanel.jsx`: Links real charge points to virtual plots

## References

- [DeCharge Website](https://decharge.network/)
- [DeCharge Network](https://decharge.network/network)
- [DeCharge Documentation](https://docs.decharge.network/)
- [DeCharge Litepaper](https://decharge.network/litepaper)

## Hackathon Submission

**Problem Solved**: Most Web3 users can't directly participate in real EV charging ecosystems. EV drivers who contribute to sustainable energy earn no real-time on-chain recognition.

**Our Solution**: A Solana-based app that visualizes real-world charging sessions in real-time, with per-second billing, point rewards for drivers, and discounted point purchases for Web3 users—creating an on-chain economy that connects real-world actions with digital participation.

**Why Judges Should Care**:
- ✅ **Innovation**: Virtual world that gamifies DePIN participation while maintaining economic realism
- ✅ **Technical**: Clean architecture ready for Solana integration (PDAs, events, settlement)
- ✅ **Impact**: Demonstrates how DeCharge's network can engage both drivers and non-drivers
- ✅ **Clarity**: Onboarding, About page, and visual polish make it accessible

## License

Built for the DeCharge hackathon. See hackathon terms for usage.

---

**Powering the EVolution on Solana** ⚡


import React, { useMemo, useState } from 'react';
import data from '../data/chargePointsSample.json';
import { useWorldStore } from '../state/store.js';

// Simple mock map that lays out markers using a normalized lat/lon projection
// over a styled container. This avoids any external Maps API for local demos.

const containerStyle = {
  width: '100%',
  height: '520px',
  borderRadius: '10px',
  overflow: 'hidden',
  position: 'relative',
  background:
    'radial-gradient(1000px 500px at 50% 0%, #0b1220 0%, #0c111a 60%, #0a0f16 100%)',
  border: '1px solid #1b2635'
};

const gridStyle = {
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(#12202f 1px, transparent 1px), linear-gradient(90deg, #12202f 1px, transparent 1px)',
  backgroundSize: '48px 48px, 48px 48px',
  opacity: 0.35,
  pointerEvents: 'none'
};

function normalize(points) {
  const lats = points.map(p => p.location.latitude);
  const lons = points.map(p => p.location.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const latSpan = Math.max(0.0001, maxLat - minLat);
  const lonSpan = Math.max(0.0001, maxLon - minLon);
  return points.map(p => ({
    ...p,
    _x: (p.location.longitude - minLon) / lonSpan,
    _y: 1 - (p.location.latitude - minLat) / latSpan
  }));
}

export function MockMapView() {
  const { charge_points } = data;
  const [selected, setSelected] = useState(null);
  const points = useMemo(() => normalize(charge_points), [charge_points]);
  const cpMap = useWorldStore(s => s.cpToPlot);
  const sessions = useWorldStore(s => s.sessions);
  const grid = useWorldStore(s => s.grid);
  const startSession = useWorldStore(s => s.startSession);
  const stopSession = useWorldStore(s => s.stopSession);

  return (
    <div className="panel">
      <h3>Charge Points Map (Mock)</h3>
      <div style={containerStyle}>
        <div style={gridStyle} />
        {points.map(cp => (
          <button
            key={cp.code}
            title={`${cp.name} • ${cp.location.city}`}
            onClick={() => setSelected(cp)}
            style={{
              position: 'absolute',
              left: `calc(${(cp._x * 100).toFixed(2)}% - 6px)`,
              top: `calc(${(cp._y * 100).toFixed(2)}% - 6px)`,
              width: 12,
              height: 12,
              borderRadius: 12,
              border: '1px solid #2b3d63',
              background: cp.status === 'active' ? '#22c55e' : cp.status === 'maintenance' ? '#fbbf24' : '#ef4444',
              boxShadow: '0 0 0 3px rgba(34,197,94,0.15)'
            }}
          />
        ))}
        {selected && (
          <div
            style={{
              position: 'absolute',
              left: `calc(${(selected._x * 100).toFixed(2)}% + 10px)`,
              top: `calc(${(selected._y * 100).toFixed(2)}% - 10px)`,
              minWidth: 220,
              padding: '10px 12px',
              borderRadius: 8,
              background: '#0b1220',
              border: '1px solid #1b2635',
              color: '#e6edf3'
            }}
          >
            <div style={{ fontWeight: 700 }}>{selected.name}</div>
            <div className="muted">{selected.code} • {selected.status}</div>
            <div className="muted">{selected.location.address}</div>
            <div style={{ marginTop: 6 }}>
              <div>Connectors: {selected.no_of_connectors}</div>
              <div>Energy: {selected.pricing.energy_based.rate} {selected.pricing.energy_based.unit}</div>
              <div>Time: {selected.pricing.time_based.rate} {selected.pricing.time_based.unit}</div>
            </div>
            {(() => {
              const plotId = cpMap[selected.code];
              const active = plotId && sessions[plotId];
              const plot = grid.find(p => p.id === plotId);
              const powerKw = selected.connectors?.[0]?.power_kw || 3;
              const rate = plot?.charger?.ratePerSec || Math.max(1, Math.round(powerKw * 0.5));
              const startTs = active?.startTs || null;
              const secs = startTs ? Math.floor((Date.now() - startTs) / 1000) : 0;
              const costPts = secs * rate;
              const kwh = ((powerKw * secs) / 3600).toFixed(3);
              const inrPerKwh = selected.pricing.energy_based.rate;
              const inrPerMin = selected.pricing.time_based.rate;
              const inrEnergy = (Number(kwh) * inrPerKwh).toFixed(2);
              const inrTime = ((secs / 60) * inrPerMin).toFixed(2);
              return (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed #1b2635' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    <div className="stat"><div className="label">Rate</div><div className="value">{rate}/s</div></div>
                    <div className="stat"><div className="label">Time</div><div className="value">{secs}s</div></div>
                    <div className="stat"><div className="label">Cost</div><div className="value">{costPts}</div></div>
                  </div>
                  <div className="muted" style={{ marginTop: 6 }}>≈ {kwh} kWh • ₹{inrEnergy} (kWh) • ₹{inrTime} (min)</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    {!active && plotId && <button onClick={() => startSession(plotId)}>Start Session</button>}
                    {active && <button className="secondary" onClick={() => stopSession(plotId)}>Stop</button>}
                    {!plotId && <span className="muted">Spawn from panel to link this site.</span>}
                  </div>
                </div>
              );
            })()}
            <div style={{ marginTop: 6 }}>
              <button className="secondary" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
      <div className="muted" style={{ marginTop: 8 }}>Mock map uses normalized lat/lon for layout. No API key required.</div>
    </div>
  );
}



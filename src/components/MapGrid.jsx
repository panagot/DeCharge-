import React, { useMemo, useState } from 'react';
import { useWorldStore } from '../state/store.js';

function PlotCell({ plot, onMint, onDeploy, onStart, onStop, isActive }) {
  const ownerShort = plot.owner ? `${plot.owner.slice(0, 4)}…${plot.owner.slice(-4)}` : null;
  return (
    <div className={['cell', plot.owner ? 'owned' : 'unowned', plot.charger ? 'has-charger' : '', isActive ? 'active' : ''].join(' ')}>
      <div className="coords">{plot.id}</div>
      {plot.owner && <div className="owner">{ownerShort}</div>}
      {plot.charger && <div className="charger">⚡ {plot.charger.ratePerSec}/s</div>}
      <div className="actions">
        {!plot.owner && (
          <button onClick={() => onMint(plot.id)}>Mint (50)</button>
        )}
        {plot.owner && !plot.charger && (
          <button onClick={() => onDeploy(plot.id)}>Deploy (stake 100)</button>
        )}
        {plot.charger && !isActive && (
          <button onClick={() => onStart(plot.id)}>Charge</button>
        )}
        {isActive && (
          <button className="secondary" onClick={() => onStop(plot.id)}>Stop</button>
        )}
      </div>
    </div>
  );
}

export function MapGrid() {
  const grid = useWorldStore(s => s.grid);
  const rows = useWorldStore(s => s.rows);
  const cols = useWorldStore(s => s.cols);
  const sessions = useWorldStore(s => s.sessions);

  const mintLand = useWorldStore(s => s.mintLand);
  const deployCharger = useWorldStore(s => s.deployCharger);
  const startSession = useWorldStore(s => s.startSession);
  const stopSession = useWorldStore(s => s.stopSession);
  const pushEvent = useWorldStore(s => s.pushEvent);

  const [error, setError] = useState('');

  const handle = (fn) => async (plotId) => {
    setError('');
    try { await fn(plotId); }
    catch (e) { setError(e.message); pushEvent('error', e.message); }
  };

  const byRow = useMemo(() => {
    const r = Array.from({ length: rows }, () => []);
    grid.forEach(p => { r[p.row].push(p); });
    r.forEach(arr => arr.sort((a, b) => a.col - b.col));
    return r;
  }, [grid, rows]);

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {byRow.flat().map(plot => (
          <PlotCell
            key={plot.id}
            plot={plot}
            onMint={handle(mintLand)}
            onDeploy={handle(deployCharger)}
            onStart={handle(startSession)}
            onStop={handle(stopSession)}
            isActive={!!sessions[plot.id]}
          />
        ))}
      </div>
      <div className="legend">
        <span className="badge owned">Owned</span>
        <span className="badge has-charger">Charger</span>
        <span className="badge active">Active</span>
      </div>
    </div>
  );
}



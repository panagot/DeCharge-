import React, { useMemo, useState } from 'react';
import data from '../data/chargePointsSample.json';
import { useWorldStore } from '../state/store.js';

export function ChargePointsPanel() {
  const { charge_points } = data;
  const grid = useWorldStore(s => s.grid);
  const mintLand = useWorldStore(s => s.mintLand);
  const deployCharger = useWorldStore(s => s.deployCharger);
  const linkChargePointToPlot = useWorldStore(s => s.linkChargePointToPlot);
  const pushEvent = useWorldStore(s => s.pushEvent);
  const user = useWorldStore(s => s.user);
  const [msg, setMsg] = useState('');

  const byCity = useMemo(() => {
    const m = new Map();
    charge_points.forEach(cp => {
      const key = cp.location.city;
      const arr = m.get(key) || [];
      arr.push(cp);
      m.set(key, arr);
    });
    return Array.from(m.entries());
  }, [charge_points]);

  const spawnFromPoint = async (cp) => {
    setMsg('');
    try {
      if (!user) throw new Error('Connect a wallet');
      const unowned = grid.filter(p => !p.owner);
      if (unowned.length === 0) throw new Error('No free plots available');
      const choice = unowned[Math.floor(Math.random() * unowned.length)];
      // Map real-world pricing to a virtual rate per sec
      const rate = Math.max(1, Math.round((cp.connectors?.[0]?.power_kw || 3) * 0.5));
      await mintLand(choice.id);
      await deployCharger(choice.id, rate);
      const pkw = cp.connectors?.[0]?.power_kw || 3;
      linkChargePointToPlot(cp.code, choice.id, pkw);
      pushEvent('oracle', `Spawned virtual charger from ${cp.code} on plot ${choice.id} @ ${rate}/s`);
      setMsg(`Spawned on ${choice.id}`);
    } catch (e) {
      setMsg(e.message);
      pushEvent('error', e.message);
    }
  };

  return (
    <div className="panel">
      <h3>DeCharge Charge Points (Sample)</h3>
      {msg && <div className="error">{msg}</div>}
      <div className="list">
        {byCity.map(([city, arr]) => (
          <div key={city} style={{ marginBottom: 10 }}>
            <div className="row" style={{ fontWeight: 700 }}>
              <div>{city}</div>
              <div>{arr.length} sites</div>
            </div>
            {arr.map(cp => (
              <div key={cp.code} className="row">
                <div>{cp.name} • {cp.code} • {cp.status}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="muted">{cp.connectors?.map(c => c.type).join(', ')}</span>
                  <button onClick={() => spawnFromPoint(cp)}>Spawn virtual</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        Source: DeCharge litepaper/docs sample.
      </div>
    </div>
  );
}



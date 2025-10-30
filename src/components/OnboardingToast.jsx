import React, { useEffect, useState } from 'react';

export function OnboardingToast() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      const seen = localStorage.getItem('vdw_onboard_seen');
      if (!seen) setVisible(true);
    } catch {}
  }, []);

  if (!visible) return null;
  return (
    <div className="toast">
      <div className="toast-content">
        <div className="title">Welcome to Virtual DeCharge World</div>
        <div className="muted">You have 500 POINTS to start.</div>
        <ol className="muted" style={{ margin: '8px 0 0 18px' }}>
          <li>Click Spawn in the right panel for 2–3 sites.</li>
          <li>Switch to Map and Start a session from a marker.</li>
          <li>Watch the heatmap and Activity feed; settle every 2s.</li>
        </ol>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button onClick={() => { setVisible(false); try { localStorage.setItem('vdw_onboard_seen', '1'); } catch {} }}>Got it</button>
          <button className="secondary" onClick={() => { try { localStorage.removeItem('vdw_state_v1'); location.reload(); } catch {} }}>Reset World</button>
        </div>
      </div>
    </div>
  );
}



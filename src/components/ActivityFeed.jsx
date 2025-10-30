import React from 'react';
import { useWorldStore } from '../state/store.js';

export function ActivityFeed() {
  const events = useWorldStore(s => s.events);

  return (
    <div className="panel">
      <h3>Activity</h3>
      <div className="feed">
        {events.length === 0 && <div className="muted">No activity yet.</div>}
        {events.map(ev => (
          <div key={ev.id} className={["event", ev.kind].join(' ')}>
            <div className="meta">{new Date(ev.ts).toLocaleTimeString()} • {ev.kind}</div>
            <div className="text">{ev.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



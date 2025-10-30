import React from 'react';
import { useWorldStore } from '../state/store.js';

export function RecentEventsStrip() {
  const events = useWorldStore(s => s.events).slice(0, 5);
  if (events.length === 0) return null;
  return (
    <div className="recent-strip">
      {events.map(e => (
        <div key={e.id} className="chip">
          <span className="muted">{new Date(e.ts).toLocaleTimeString()} •</span> {e.text}
        </div>
      ))}
    </div>
  );
}



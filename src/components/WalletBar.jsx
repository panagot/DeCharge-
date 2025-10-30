import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Keypair } from '@solana/web3.js';
import { useWorldStore, startTicker } from '../state/store.js';

function generateLocalKey() {
  const existing = localStorage.getItem('vdw_dev_wallet');
  if (existing) {
    try { return JSON.parse(existing); } catch {}
  }
  const kp = Keypair.generate();
  const obj = { pubkey: kp.publicKey.toBase58(), secret: Array.from(kp.secretKey) };
  localStorage.setItem('vdw_dev_wallet', JSON.stringify(obj));
  return obj;
}

export function WalletBar() {
  const [mode, setMode] = useState('local');
  const [localWallet, setLocalWallet] = useState(null);
  const user = useWorldStore(s => s.user);
  const ensureUser = useWorldStore(s => s.ensureUser);
  const initFromStorage = useWorldStore(s => s.initFromStorage);

  const balances = useWorldStore(s => s.balances);

  const currentBal = useMemo(() => {
    if (!user) return { points: 0, earned: 0, spent: 0 };
    return balances[user.pubkey] || { points: 0, earned: 0, spent: 0 };
  }, [user, balances]);

  useEffect(() => {
    initFromStorage();
    startTicker();
    const w = generateLocalKey();
    setLocalWallet(w);
    ensureUser({ pubkey: w.pubkey, label: 'Local Dev Wallet' });
  }, []);

  return (
    <header className="walletbar">
      <div className="brand-wrap">
        <div className="brand">⚡ Virtual DeCharge World</div>
        <div className="slogan">Powering the EVolution on Solana</div>
      </div>
      <div className="actions">
        <Link to="/about"><button className="about-btn">What is this?</button></Link>
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="local">Local Dev Wallet</option>
          <option value="solana" disabled>Solana Wallet Adapter (coming soon)</option>
        </select>
        {user && (
          <div className="balance">
            <span className="pk">{user.label}</span>
            <span className="pts">{currentBal.points} POINTS</span>
          </div>
        )}
      </div>
    </header>
  );
}



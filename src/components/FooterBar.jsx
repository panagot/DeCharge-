import React from 'react';

export function FooterBar() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="left">
          <div className="tag">Powering the EVolution on Solana</div>
          <div className="muted">Virtual DeCharge World is a hackathon MVP for demonstration.</div>
        </div>
        <nav className="links">
          <a href="https://decharge.network/litepaper" target="_blank" rel="noreferrer">Litepaper</a>
          <a href="https://docs.decharge.network/" target="_blank" rel="noreferrer">Docs</a>
          <a href="https://x.com/DeCharge" target="_blank" rel="noreferrer">X</a>
          <a href="https://discord.gg/Xy2RPUSYbX" target="_blank" rel="noreferrer">Discord</a>
        </nav>
      </div>
    </footer>
  );
}



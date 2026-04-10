import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.65; transform: scale(1.07); }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        .footer-root { animation: floatUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        .orb-fl { animation: pulseGlow 7s ease-in-out infinite; }
        .orb-fr { animation: pulseGlow 9s ease-in-out infinite 3s; }

       
        .f-card {
          position: relative;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(24px);
          padding: 24px;
          height: 100%;
          overflow: hidden;
          transition:
            border-color 0.35s ease,
            box-shadow 0.35s ease,
            transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .f-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 21px;
          background: linear-gradient(135deg, #22d3ee22, #818cf811, #c084fc22);
          background-size: 300% 300%;
          animation: borderShimmer 6s linear infinite;
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
          pointer-events: none;
        }
     
        .f-card::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 40%;
          background: linear-gradient(180deg, transparent, rgba(34,211,238,0.04), transparent);
          transform: translateY(-100%);
          transition: none;
          pointer-events: none;
          z-index: 1;
        }
        .f-card:hover { transform: translateY(-3px); }
        .f-card:hover::before { opacity: 1; }
        .f-card:hover::after  { animation: scanline 1s ease forwards; }

        .f-card-cyan:hover {
          border-color: rgba(34,211,238,0.22);
          box-shadow: 0 0 50px rgba(34,211,238,0.1), 0 8px 40px rgba(0,0,0,0.35);
        }
        .f-card-violet:hover {
          border-color: rgba(192,132,252,0.22);
          box-shadow: 0 0 50px rgba(192,132,252,0.1), 0 8px 40px rgba(0,0,0,0.35);
        }

       
        .f-section-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.4);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 2;
        }
        .f-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(148,163,184,0.15), transparent);
        }

      
        .f-link {
          display: inline-block;
          position: relative;
          font-size: 0.8125rem;
          font-weight: 400;
          color: rgba(203,213,225,0.6);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.25s ease, padding-left 0.25s ease, letter-spacing 0.25s ease;
          z-index: 2;
        }
        .f-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #22d3ee, #818cf8);
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .f-link:hover {
          color: rgba(224,242,254,0.9);
          padding-left: 6px;
          letter-spacing: 0.01em;
        }
        .f-link:hover::after { width: 100%; }

        
        .logo-inner {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 8px 14px 8px 8px;
          margin-bottom: 20px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          z-index: 2;
        }
        .logo-inner:hover {
          border-color: rgba(34,211,238,0.25);
          box-shadow: 0 0 30px rgba(34,211,238,0.1);
        }

        .logo-brand-footer {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.04em;
          background: linear-gradient(135deg, #67e8f9 0%, #818cf8 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

         
        .footer-bottom {
          position: relative;
          margin-top: 32px;
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-bottom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.18), rgba(129,140,248,0.22), rgba(192,132,252,0.18), transparent);
        }

       
        .footer-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.45;
        }

         
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 5fr 2fr 2fr 3fr; }
        }

      
        .f-desc {
          font-size: 0.8125rem;
          line-height: 1.75;
          color: rgba(148,163,184,0.6);
          max-width: 280px;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }

        .f-copy {
          font-size: 0.72rem;
          color: rgba(100,116,139,0.55);
          letter-spacing: 0.02em;
          position: relative;
          z-index: 2;
        }
      `}</style>

      <section
        className="footer-root"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(0deg, rgba(3,5,16,1) 0%, rgba(5,8,22,0.97) 100%)',
          paddingTop: '40px',
          paddingBottom: '28px',
          color: 'white',
        }}
      >
      
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="orb-fl" style={{
            position: 'absolute', left: '-80px', top: '-80px',
            width: '350px', height: '350px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          <div className="orb-fr" style={{
            position: 'absolute', right: '-80px', bottom: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,132,252,0.09) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 15% 0%, rgba(34,211,238,0.05) 0%, transparent 40%), radial-gradient(ellipse at 85% 100%, rgba(168,85,247,0.07) 0%, transparent 40%)',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="footer-grid">

          
            <div className="f-card f-card-cyan">
              <div className="logo-inner">
                <Logo width="72px" />
                <span className="logo-brand-footer">DevUI</span>
              </div>
              <p className="f-desc">
                Building futuristic experiences with modern UI, premium design,
                and high-end interactive interfaces.
              </p>
              <p className="f-copy">&copy; Copyright 2023. All Rights Reserved by DevUI.</p>
            </div>

         
            <div className="f-card f-card-violet">
              <h3 className="f-section-label">Company</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative', zIndex: 2 }}>
                {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                  <li key={item} style={{ marginBottom: '10px' }}>
                    <Link className="f-link" to="/">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="f-card f-card-violet">
              <h3 className="f-section-label">Support</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative', zIndex: 2 }}>
                {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                  <li key={item} style={{ marginBottom: '10px' }}>
                    <Link className="f-link" to="/">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legals */}
            <div className="f-card f-card-violet">
              <h3 className="f-section-label">Legals</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative', zIndex: 2 }}>
                {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                  <li key={item} style={{ marginBottom: '10px' }}>
                    <Link className="f-link" to="/">{item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span style={{ fontSize: '0.72rem', color: 'rgba(100,116,139,0.4)', letterSpacing: '0.04em', fontFamily: "'Syne', sans-serif" }}>
              DEVUI — FUTURE STARTS HERE
            </span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {['cyan', 'indigo', 'purple'].map((c, i) => (
                <div key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: c === 'cyan' ? '#22d3ee' : c === 'indigo' ? '#818cf8' : '#c084fc',
                  opacity: 0.4,
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
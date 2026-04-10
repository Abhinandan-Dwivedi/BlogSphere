import React from 'react'
import Logo from '../Logo.jsx'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      postid: '/',
      active: true,
    },
    {
      name: 'Login',
      postid: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      postid: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      postid: '/allposts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      postid: '/postform',
      active: authStatus,
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .header-root {
          font-family: 'DM Sans', sans-serif;
        }

        /* Animated border shimmer */
        @keyframes borderShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }

        @keyframes floatIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes navStagger {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .header-root {
          animation: floatIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Orb pulse */
        .orb-left  { animation: pulseGlow 6s ease-in-out infinite; }
        .orb-right { animation: pulseGlow 8s ease-in-out infinite 2s; }

        /* Logo brand name */
        .logo-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: 0.04em;
          background: linear-gradient(135deg, #67e8f9 0%, #818cf8 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Logo wrapper shimmer border on hover */
        .logo-wrap {
          position: relative;
          border-radius: 16px;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.3s ease;
        }
        .logo-wrap::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 17px;
          background: linear-gradient(120deg, #22d3ee33, #818cf833, #c084fc33);
          background-size: 300% 300%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          animation: borderShimmer 4s linear infinite;
        }
        .logo-wrap:hover::before { opacity: 1; }
        .logo-wrap:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(103, 232, 249, 0.15),
                      0 0 80px rgba(192, 132, 252, 0.08);
        }

        /* Nav items stagger */
        .nav-item { animation: navStagger 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .nav-item:nth-child(1) { animation-delay: 0.05s; }
        .nav-item:nth-child(2) { animation-delay: 0.10s; }
        .nav-item:nth-child(3) { animation-delay: 0.15s; }
        .nav-item:nth-child(4) { animation-delay: 0.20s; }
        .nav-item:nth-child(5) { animation-delay: 0.25s; }

        /* Nav button */
        .nav-btn {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.8125rem;
          letter-spacing: 0.025em;
          color: rgba(203, 213, 225, 0.75);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 9px 22px;
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(12px);
          transition:
            color 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            transform 0.25s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.25s ease;
        }
        .nav-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(34,211,238,0.08), rgba(129,140,248,0.08), rgba(192,132,252,0.08));
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: inherit;
        }
        .nav-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #22d3ee, #818cf8, #c084fc);
          transform: translateX(-50%);
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          border-radius: 2px;
        }
        .nav-btn:hover {
          color: #e0f2fe;
          border-color: rgba(34, 211, 238, 0.3);
          background: rgba(34, 211, 238, 0.06);
          transform: translateY(-2px);
          box-shadow:
            0 0 20px rgba(34, 211, 238, 0.12),
            0 4px 24px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .nav-btn:hover::before { opacity: 1; }
        .nav-btn:hover::after  { width: 60%; }
        .nav-btn:active { transform: translateY(0); }

        /* Logout pill */
        .logout-pill {
          border-radius: 100px;
          border: 1px solid rgba(248, 113, 113, 0.15);
          background: rgba(239, 68, 68, 0.04);
          padding: 4px;
          backdrop-filter: blur(12px);
          transition:
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .logout-pill:hover {
          border-color: rgba(248, 113, 113, 0.35);
          background: rgba(239, 68, 68, 0.09);
          box-shadow: 0 0 24px rgba(239, 68, 68, 0.15), 0 4px 16px rgba(0,0,0,0.2);
          transform: translateY(-1px);
        }

        /* Divider dot between logo and nav */
        .nav-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22d3ee, #818cf8);
          opacity: 0.4;
          margin: 0 4px;
          flex-shrink: 0;
        }

        /* Subtle noise texture overlay on header */
        .header-noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
          mix-blend-mode: overlay;
        }
      `}</style>

      <header className="header-root header-noise sticky top-0 z-50"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(180deg, rgba(5,8,22,0.92) 0%, rgba(5,8,22,0.82) 100%)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        }}
      >
        
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div
            className="orb-left"
            style={{
              position: 'absolute',
              left: '-60px',
              top: '-100px',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="orb-right"
            style={{
              position: 'absolute',
              right: '-60px',
              top: '-120px',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
         
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '-60px',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div
                className="logo-wrap"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '8px 16px 8px 10px',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <Logo width="68px" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <h1 className="logo-brand" style={{ fontSize: '1.15rem', margin: 0, lineHeight: 1.1 }}>
                    DevUI
                  </h1>
                  <p style={{
                    margin: 0,
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(148,163,184,0.55)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                  }}>
                    Future Starts Here
                  </p>
                </div>
              </div>
            </Link>

        
            <ul style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 0, padding: 0, listStyle: 'none' }}>
              {navItems.map((item, i) =>
                item.active ? (
                  <li key={item.name} className="nav-item" style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
                    <button
                      onClick={() => navigate(item.postid)}
                      className="nav-btn"
                    >
                      <span style={{ position: 'relative', zIndex: 1 }}>{item.name}</span>
                    </button>
                  </li>
                ) : null
              )}

              {authStatus && (
                <li className="nav-item logout-pill" style={{ marginLeft: '8px' }}>
                  <Logout />
                </li>
              )}
            </ul>

          </nav>
        </div>

        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.2), rgba(129,140,248,0.25), rgba(192,132,252,0.2), transparent)',
          pointerEvents: 'none',
        }} />
      </header>
    </>
  )
}

export default Header
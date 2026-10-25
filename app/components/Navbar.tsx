'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Bell, Zap } from 'lucide-react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import AuthModal from './AuthModal'

const links = ['Home', 'Esports Hub', 'Game Updates', 'Media', 'Community', 'Rankings']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: '#0A0B0F', borderBottom: '1px solid #1E2028', position: 'sticky', top: 0, zIndex: 100 }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Zap size={28} fill="#6C5CE7" color="#6C5CE7" />
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '26px', background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              GAME<span style={{ color: '#FD79A8' }}>PULSE</span>
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '32px' }} className="hidden md:flex">
            {links.map((link, i) => (
              <motion.a key={i} href="#" whileHover={{ color: '#00D2D3', y: -2 }} style={{ color: '#aaaaaa', textDecoration: 'none', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase', transition: 'color 0.2s' }}>
                {link}
              </motion.a>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <motion.button whileHover={{ scale: 1.1 }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaaaaa' }}>
              <Bell size={20} />
            </motion.button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '16px', color: 'white' }}>
                  {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => signOut(auth)}
                  style={{ background: 'transparent', border: '1px solid #1E2028', borderRadius: '6px', padding: '6px 14px', color: '#888', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                >
                  SIGN OUT
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowAuth(true)}
                style={{ background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', border: 'none', borderRadius: '6px', padding: '8px 18px', color: 'white', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '1px', cursor: 'pointer' }}
              >
                SIGN IN
              </motion.button>
            )}

            <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }} className="md:hidden">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#12141A', padding: '16px 24px', borderTop: '1px solid #1E2028' }}>
            {links.map((link, i) => (
              <a key={i} href="#" style={{ display: 'block', padding: '12px 0', color: '#aaaaaa', textDecoration: 'none', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '16px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid #1E2028' }}>
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}

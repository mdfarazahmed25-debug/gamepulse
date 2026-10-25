'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Zap } from 'lucide-react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(result.user, { displayName: name })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      onClose()
    } catch (err: any) {
      setError(err.message.replace('Firebase: ', ''))
    }
    setLoading(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          style={{ background: '#12141A', border: '1px solid #1E2028', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', position: 'relative' }}
        >
          {/* Close button */}
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
            <X size={20} />
          </button>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Zap size={24} fill="#6C5CE7" color="#6C5CE7" />
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '22px', background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>GAMEPULSE</span>
          </div>

          {/* Title */}
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '28px', color: 'white', marginBottom: '8px' }}>
            {mode === 'login' ? 'WELCOME BACK' : 'JOIN THE ARENA'}
          </h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '28px' }}>
            {mode === 'login' ? 'Sign in to your GamePulse account' : 'Create your free GamePulse account'}
          </p>

          {/* Toggle */}
          <div style={{ display: 'flex', background: '#0A0B0F', borderRadius: '8px', padding: '4px', marginBottom: '24px' }}>
            {(['login', 'signup'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', background: mode === m ? 'linear-gradient(90deg, #6C5CE7, #00D2D3)' : 'transparent', color: mode === m ? 'white' : '#666', transition: 'all 0.2s' }}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mode === 'signup' && (
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Username" style={{ width: '100%', background: '#0A0B0F', border: '1px solid #1E2028', borderRadius: '8px', padding: '12px 12px 12px 40px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            )}
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={{ width: '100%', background: '#0A0B0F', border: '1px solid #1E2028', borderRadius: '8px', padding: '12px 12px 12px 40px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={{ width: '100%', background: '#0A0B0F', border: '1px solid #1E2028', borderRadius: '8px', padding: '12px 12px 12px 40px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* Error */}
          {error && <p style={{ color: '#FD79A8', fontSize: '13px', marginTop: '12px' }}>{error}</p>}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', marginTop: '24px', background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', border: 'none', borderRadius: '8px', padding: '14px', color: 'white', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '16px', letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase' }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

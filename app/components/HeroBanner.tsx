'use client'
import { motion } from 'framer-motion'
import { Play, Trophy } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #0A0B0F 0%, #0d0e1a 50%, #0A0B0F 100%)' }}>
      
      {/* Animated background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(108,92,231,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.07) 1px, transparent 1px)', backgroundSize: '50px 50px', zIndex: 0 }} />

      {/* Glow blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,210,211,0.1) 0%, transparent 70%)', zIndex: 0 }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: '800px' }}>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(253,121,168,0.15)', border: '1px solid rgba(253,121,168,0.4)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px' }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FD79A8', display: 'inline-block', boxShadow: '0 0 8px #FD79A8', animation: 'pulse 1.5s infinite' }} />
            <span style={{ color: '#FD79A8', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '2px' }}>LIVE TOURNAMENTS NOW</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(52px, 8vw, 96px)', lineHeight: '0.95', textTransform: 'uppercase', marginBottom: '24px' }}
          >
            WHERE
            <br />
            <span style={{ background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ESPORTS</span>
            <br />
            LIVES
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ color: '#888', fontSize: '18px', maxWidth: '500px', marginBottom: '40px', lineHeight: '1.6' }}
          >
            Live scores, breaking news, tournament brackets, and the global gaming community — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,210,211,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(90deg, #00D2D3, #6C5CE7)', border: 'none', borderRadius: '8px', padding: '14px 28px', color: 'white', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase' }}
            >
              <Play size={20} fill="white" /> Watch Highlights
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(108,92,231,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: '2px solid #6C5CE7', borderRadius: '8px', padding: '14px 28px', color: '#6C5CE7', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase' }}
            >
              <Trophy size={20} /> View Brackets
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ display: 'flex', gap: '40px', marginTop: '60px', flexWrap: 'wrap' }}
          >
            {[
              { value: '2.4M+', label: 'Active Players' },
              { value: '$48M+', label: 'Prize Pools' },
              { value: '340+', label: 'Tournaments' },
              { value: '9', label: 'Game Titles' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '32px', background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
                <div style={{ color: '#666', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(transparent, #0A0B0F)', zIndex: 1 }} />
    </section>
  )
}
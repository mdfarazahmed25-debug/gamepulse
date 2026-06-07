'use client'
import { motion } from 'framer-motion'

const headlines = [
  '🔥 BMPS 2026 Grand Finals — Team Soul defeats Godlike in epic 5-game series',
  '⚡ VCT Masters London 2026 — Sentinels advance to semifinals with 2-0 victory',
  '🎮 BGMI Season 14 patch drops tomorrow — new weapon balance changes revealed',
  '🏆 Free Fire World Series 2026 — Prize pool increased to $2,000,000',
  '💥 Valorant Episode 9 Act 2 — New agent "Spectre" officially confirmed',
  '🚀 Apex Legends Season 22 — Ranked system overhaul coming next week',
  '⚔️ Call of Duty Warzone — Major anti-cheat update eliminates 500K accounts',
  '🌟 Minecraft Championship 2026 — Registration now open for all teams',
]

export default function NewsTicker() {
  const repeated = [...headlines, ...headlines]

  return (
    <div style={{ background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', padding: '10px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Left fade */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(90deg, #6C5CE7, transparent)', zIndex: 2 }} />
      {/* Right fade */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(270deg, #00D2D3, transparent)', zIndex: 2 }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '60px', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {repeated.map((headline, i) => (
          <span key={i} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {headline}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>|</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
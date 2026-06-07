'use client'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { useState } from 'react'

const gameColors: Record<string, string> = {
  BGMI: '#00D2D3',
  Valorant: '#FD79A8',
  'Free Fire': '#fdcb6e',
  'Apex Legends': '#e17055',
  Minecraft: '#55efc4',
  'Call of Duty': '#6C5CE7',
  GTA: '#a29bfe',
  Roblox: '#fd79a8',
  'FC Mobile': '#00b894',
}

export const news = [
  { game: 'BGMI', title: 'Team Soul Wins BMPS 2026 Grand Finals in Stunning Comeback', desc: 'Soul Mortal leads his team to victory in a nail-biting 5-game series against Godlike Esports, securing the ₹1 Crore prize pool.', time: '2 hours ago', comments: 84 },
  { game: 'Valorant', title: 'Sentinels Dominate VCT Masters London 2026 Semifinals', desc: 'TenZ delivers a flawless 30-kill performance as Sentinels crush NaVi 2-0 to advance to the grand finals in London.', time: '4 hours ago', comments: 127 },
  { game: 'Free Fire', title: 'Free Fire World Series 2026 Prize Pool Hits $2 Million', desc: 'Garena announces record-breaking prize pool for FFWS 2026, with 24 teams competing from across the globe in Bangkok.', time: '6 hours ago', comments: 56 },
  { game: 'Apex Legends', title: 'Season 22 Ranked Overhaul Revealed — Everything You Need to Know', desc: 'Respawn Entertainment reveals massive ranked system changes including new LP system, split resets, and exclusive rewards.', time: '8 hours ago', comments: 203 },
  { game: 'Call of Duty', title: 'Warzone Anti-Cheat Bans 500,000 Accounts in Single Wave', desc: 'Activision anti-cheat system executes its largest ban wave ever, targeting aimbots and wallhack users globally.', time: '10 hours ago', comments: 341 },
  { game: 'Minecraft', title: 'Minecraft Championship 2026 — Full Team Roster Announced', desc: 'MCC 2026 reveals 20 teams of 4 players each, featuring top creators and competitive players from around the world.', time: '12 hours ago', comments: 91 },
]

type NewsItem = {
  game: string
  title: string
  desc: string
  time: string
  comments: number
}

export default function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(100 + index * 37)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&hashtags=GamePulse,Esports`, '_blank')
  const shareOnWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(item.title + ' - Read on GamePulse')}`, '_blank')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(108,92,231,0.2)' }}
      style={{ background: '#12141A', border: '1px solid #1E2028', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
    >
      {/* Thumbnail */}
      <div style={{ height: '180px', background: `linear-gradient(135deg, ${gameColors[item.game] || '#6C5CE7'}33, #1a1a2e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '48px', opacity: 0.15, textTransform: 'uppercase', color: 'white' }}>{item.game}</span>
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: gameColors[item.game] || '#6C5CE7', borderRadius: '4px', padding: '4px 10px' }}>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '12px', color: '#0A0B0F', letterSpacing: '1px' }}>{item.game.toUpperCase()}</span>
        </div>
        <div style={{ position: 'absolute', top: '12px', right: '12px', color: '#666', fontSize: '12px' }}>{item.time}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '20px', lineHeight: '1.2', marginBottom: '10px', color: 'white' }}>{item.title}</h3>
        <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{item.desc}</p>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #1E2028', paddingTop: '16px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <motion.button whileTap={{ scale: 0.85 }} onClick={handleLike} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: liked ? '#FD79A8' : '#666', fontSize: '13px' }}>
              <Heart size={16} fill={liked ? '#FD79A8' : 'none'} color={liked ? '#FD79A8' : '#666'} /> {likes}
            </motion.button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '13px' }}>
              <MessageCircle size={16} /> {item.comments}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <motion.button whileHover={{ scale: 1.1 }} onClick={shareOnTwitter} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1DA1F2', fontWeight: 700, fontSize: '12px' }}>X</motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={shareOnWhatsApp} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#25D366', fontWeight: 700, fontSize: '12px' }}>WA</motion.button>
            <motion.button whileHover={{ scale: 1.1 }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
              <ExternalLink size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

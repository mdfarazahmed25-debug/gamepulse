'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Image as ImageIcon } from 'lucide-react'

const filters = ['All', 'BGMI', 'Valorant', 'Free Fire', 'Apex Legends', 'Tournaments']

const media = [
  { id: 1, type: 'image', game: 'BGMI', title: 'BMPS 2026 Grand Finals Moment', color: '#00D2D3' },
  { id: 2, type: 'video', game: 'Valorant', title: 'VCT Masters London Highlights', color: '#FD79A8', videoId: 'dQw4w9WgXcQ' },
  { id: 3, type: 'image', game: 'Free Fire', title: 'FFWS 2026 Opening Ceremony', color: '#fdcb6e' },
  { id: 4, type: 'video', game: 'BGMI', title: 'Soul Mortal Clutch Play', color: '#00D2D3', videoId: 'dQw4w9WgXcQ' },
  { id: 5, type: 'image', game: 'Apex Legends', title: 'Season 22 New Map Preview', color: '#e17055' },
  { id: 6, type: 'image', game: 'Tournaments', title: 'ESL Pro League Season 20', color: '#6C5CE7' },
  { id: 7, type: 'video', game: 'Valorant', title: 'TenZ Ace Round Highlights', color: '#FD79A8', videoId: 'dQw4w9WgXcQ' },
  { id: 8, type: 'image', game: 'Free Fire', title: 'Free Fire World Series Trophy', color: '#fdcb6e' },
  { id: 9, type: 'image', game: 'Tournaments', title: 'BGMI Pro Series Finals Stage', color: '#6C5CE7' },
  { id: 10, type: 'video', game: 'Apex Legends', title: 'Ranked Season 22 Trailer', color: '#e17055', videoId: 'dQw4w9WgXcQ' },
  { id: 11, type: 'image', game: 'BGMI', title: 'Team Soul Victory Celebration', color: '#00D2D3' },
  { id: 12, type: 'image', game: 'Valorant', title: 'VCT Masters London Arena', color: '#FD79A8' },
]

type MediaItem = typeof media[0]

export default function MediaGallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState<MediaItem | null>(null)

  const filtered = activeFilter === 'All' ? media : media.filter(m => m.game === activeFilter)

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 24px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '4px', height: '32px', background: 'linear-gradient(180deg, #6C5CE7, #00D2D3)', borderRadius: '2px' }} />
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '36px', textTransform: 'uppercase', color: 'white' }}>
            Media Gallery
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', marginLeft: '16px' }}>Tournament highlights, game trailers & esports moments</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {filters.map(filter => (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter)}
            style={{ padding: '8px 20px', borderRadius: '100px', border: activeFilter === filter ? 'none' : '1px solid #1E2028', background: activeFilter === filter ? 'linear-gradient(90deg, #6C5CE7, #00D2D3)' : 'transparent', color: activeFilter === filter ? 'white' : '#888', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}
      >
        <AnimatePresence>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${item.color}33` }}
              onClick={() => setSelected(item)}
              style={{ background: '#12141A', border: '1px solid #1E2028', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Thumbnail */}
              <div style={{ height: '180px', background: `linear-gradient(135deg, ${item.color}33, #1a1a2e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '40px', opacity: 0.15, color: 'white', textTransform: 'uppercase' }}>{item.game}</span>
                
                {/* Play/Image icon */}
                <div style={{ position: 'absolute', width: '48px', height: '48px', borderRadius: '50%', background: item.type === 'video' ? item.color : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                  {item.type === 'video' ? <Play size={20} color="white" fill="white" /> : <ImageIcon size={20} color="white" />}
                </div>

                {/* Type badge */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: item.type === 'video' ? '#FD79A8' : '#6C5CE7', borderRadius: '4px', padding: '3px 8px' }}>
                  <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '11px', color: 'white', letterSpacing: '1px' }}>
                    {item.type === 'video' ? '▶ VIDEO' : '📷 IMAGE'}
                  </span>
                </div>

                {/* Game badge */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: `${item.color}33`, border: `1px solid ${item.color}66`, borderRadius: '4px', padding: '3px 8px' }}>
                  <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '11px', color: item.color }}>
                    {item.game}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '16px', color: 'white', marginBottom: '8px' }}>{item.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666', fontSize: '12px' }}>{item.type === 'video' ? 'Click to watch' : 'Click to view'}</span>
                  <motion.div whileHover={{ x: 4 }} style={{ color: item.color, fontSize: '12px', fontWeight: 700 }}>VIEW →</motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#12141A', border: '1px solid #1E2028', borderRadius: '16px', overflow: 'hidden', width: '100%', maxWidth: '800px' }}
            >
              {/* Modal Header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2028', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '20px', color: 'white' }}>{selected.title}</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, ${selected.color}22, #0A0B0F)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {selected.type === 'video' ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selected.videoId}?autoplay=1`}
                    style={{ border: 'none', position: 'absolute', inset: 0 }}
                    allow="autoplay"
                  />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '80px', marginBottom: '16px' }}>🎮</div>
                    <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '24px', color: 'white' }}>{selected.title}</p>
                    <p style={{ color: selected.color, fontSize: '14px', marginTop: '8px' }}>{selected.game}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '16px 20px', display: 'flex', gap: '10px' }}>
                <div style={{ background: `${selected.color}22`, border: `1px solid ${selected.color}44`, borderRadius: '6px', padding: '4px 12px' }}>
                  <span style={{ color: selected.color, fontSize: '13px', fontWeight: 700 }}>{selected.game}</span>
                </div>
                <div style={{ background: '#0A0B0F', borderRadius: '6px', padding: '4px 12px' }}>
                  <span style={{ color: '#666', fontSize: '13px' }}>{selected.type === 'video' ? '▶ Video' : '📷 Image'}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

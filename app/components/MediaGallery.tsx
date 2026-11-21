'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Image as ImageIcon } from 'lucide-react'

const filters = ['All', 'BGMI', 'Valorant', 'Free Fire', 'Apex Legends', 'Tournaments']

const media = [
  { id: 1, type: 'image', game: 'BGMI', title: 'BMPS 2026 Grand Finals Moment', color: '#00D2D3', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600' },
  { id: 2, type: 'video', game: 'Valorant', title: 'VCT Masters London Highlights', color: '#FD79A8', videoId: 'dQw4w9WgXcQ', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600' },
  { id: 3, type: 'image', game: 'Free Fire', title: 'FFWS 2026 Opening Ceremony', color: '#fdcb6e', img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600' },
  { id: 4, type: 'video', game: 'BGMI', title: 'Soul Mortal Clutch Play', color: '#00D2D3', videoId: 'dQw4w9WgXcQ', img: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600' },
  { id: 5, type: 'image', game: 'Apex Legends', title: 'Season 22 New Map Preview', color: '#e17055', img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600' },
  { id: 6, type: 'image', game: 'Tournaments', title: 'ESL Pro League Season 20', color: '#6C5CE7', img: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600' },
  { id: 7, type: 'video', game: 'Valorant', title: 'TenZ Ace Round Highlights', color: '#FD79A8', videoId: 'dQw4w9WgXcQ', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600' },
  { id: 8, type: 'image', game: 'Free Fire', title: 'Free Fire World Series Trophy', color: '#fdcb6e', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600' },
  { id: 9, type: 'image', game: 'Tournaments', title: 'BGMI Pro Series Finals Stage', color: '#6C5CE7', img: 'https://images.unsplash.com/photo-1548686304-89d188a80029?w=600' },
  { id: 10, type: 'video', game: 'Apex Legends', title: 'Ranked Season 22 Trailer', color: '#e17055', videoId: 'dQw4w9WgXcQ', img: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600' },
  { id: 11, type: 'image', game: 'BGMI', title: 'Team Soul Victory Celebration', color: '#00D2D3', img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600' },
  { id: 12, type: 'image', game: 'Valorant', title: 'VCT Masters London Arena', color: '#FD79A8', img: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600' },
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
            style={{ padding: '8px 20px', borderRadius: '100px', border: activeFilter === filter ? 'none' : '1px solid #1E2028', background: activeFilter === filter ? 'linear-gradient(90deg, #6C5CE7, #00D2D3)' : 'transparent', color: activeFilter === filter ? 'white' : '#888', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '1px', cursor: 'pointer' }}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelected(item)}
            style={{ background: '#12141A', border: '1px solid #1E2028', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
          >
            {/* Thumbnail with real image */}
            <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={item.img}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              {/* Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${item.color}22, transparent)` }} />

              {/* Play button for videos */}
              {item.type === 'video' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={20} color="white" fill="white" />
                  </div>
                </div>
              )}

              {/* Type badge */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: item.type === 'video' ? '#FD79A8' : '#6C5CE7', borderRadius: '4px', padding: '3px 8px' }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '11px', color: 'white', letterSpacing: '1px' }}>
                  {item.type === 'video' ? '▶ VIDEO' : '📷 IMAGE'}
                </span>
              </div>

              {/* Game badge */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', border: `1px solid ${item.color}66`, borderRadius: '4px', padding: '3px 8px' }}>
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
                <span style={{ color: item.color, fontSize: '12px', fontWeight: 700 }}>VIEW →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2028', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '20px', color: 'white' }}>{selected.title}</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                  <X size={24} />
                </button>
              </div>
              <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}>
                {selected.type === 'video' ? (
                  <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${(selected as any).videoId}?autoplay=1`} style={{ border: 'none', position: 'absolute', inset: 0 }} allow="autoplay" />
                ) : (
                  <img src={selected.img} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', gap: '10px' }}>
                <div style={{ background: `${selected.color}22`, border: `1px solid ${selected.color}44`, borderRadius: '6px', padding: '4px 12px' }}>
                  <span style={{ color: selected.color, fontSize: '13px', fontWeight: 700 }}>{selected.game}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

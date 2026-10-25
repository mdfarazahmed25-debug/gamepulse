'use client'
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import NewsTicker from './components/NewsTicker'
import NewsCard from './components/NewsCard'
import { news } from './components/NewsCard'
import Community from './components/Community'
import GameBot from './components/GameBot'


export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0B0F' }}>
      <Navbar />
      <NewsTicker />
      <HeroBanner />

      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ width: '4px', height: '32px', background: 'linear-gradient(180deg, #6C5CE7, #00D2D3)', borderRadius: '2px' }} />
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '36px', textTransform: 'uppercase', color: 'white' }}>
                Breaking News
              </h2>
            </div>
            <p style={{ color: '#666', fontSize: '14px', marginLeft: '16px' }}>Latest from the esports world</p>
          </div>
          <button style={{ background: 'transparent', border: '1px solid #6C5CE7', borderRadius: '6px', padding: '8px 20px', color: '#6C5CE7', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '1px', cursor: 'pointer' }}>
            VIEW ALL
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {news.map((item, i) => (
            <NewsCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #1E2028', padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '24px', background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>GAMEPULSE</p>
        <p style={{ color: '#444', fontSize: '13px' }}>© 2026 GamePulse. Built for the global gaming community.</p>
        <Community />
        <GameBot />
      </footer>
    </main>
  )
}

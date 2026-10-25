'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Users, Mic, Volume2 } from 'lucide-react'
import { auth, rtdb } from '../firebase'
import { ref, push, onValue, serverTimestamp } from 'firebase/database'
import { onAuthStateChanged, User } from 'firebase/auth'

type Message = {
  id: string
  text: string
  username: string
  avatar: string
  timestamp: number
  uid: string
}

const voiceChannels = [
  { name: 'General Voice', users: 12 },
  { name: 'BGMI Squad', users: 8 },
  { name: 'Valorant Comms', users: 5 },
  { name: 'Free Fire Drop Zone', users: 15 },
  { name: 'Casual Chat', users: 3 },
]

export default function Community() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [onlineCount, setOnlineCount] = useState(247)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  useEffect(() => {
    const messagesRef = ref(rtdb, 'globalChat')
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const msgs = Object.entries(data).map(([id, val]: any) => ({ id, ...val }))
        msgs.sort((a: any, b: any) => a.timestamp - b.timestamp)
        setMessages(msgs.slice(-50))
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    if (!user) { alert('Please sign in to chat!'); return }
    const messagesRef = ref(rtdb, 'globalChat')
    await push(messagesRef, {
      text: input.trim(),
      username: user.displayName || user.email?.split('@')[0] || 'Gamer',
      avatar: user.displayName?.charAt(0).toUpperCase() || 'G',
      uid: user.uid,
      timestamp: serverTimestamp()
    })
    setInput('')
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const formatTime = (ts: number) => {
    if (!ts) return ''
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '4px', height: '32px', background: 'linear-gradient(180deg, #6C5CE7, #00D2D3)', borderRadius: '2px' }} />
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '36px', textTransform: 'uppercase', color: 'white' }}>
            Global Community
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D2D3', boxShadow: '0 0 8px #00D2D3' }} />
          <span style={{ color: '#00D2D3', fontSize: '14px', fontWeight: 600 }}>{onlineCount} players online worldwide</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>

        {/* Chat Panel */}
        <div style={{ background: '#12141A', border: '1px solid #1E2028', borderRadius: '12px', display: 'flex', flexDirection: 'column', height: '600px' }}>
          
          {/* Chat Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2028', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FD79A8', boxShadow: '0 0 8px #FD79A8' }} />
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '1px', color: 'white' }}>GLOBAL CHAT</span>
            <span style={{ marginLeft: 'auto', color: '#666', fontSize: '12px' }}>Last 50 messages</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#444', marginTop: '40px' }}>
                <p style={{ fontSize: '32px', marginBottom: '8px' }}>🎮</p>
                <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '18px' }}>No messages yet</p>
                <p style={{ fontSize: '13px' }}>Be the first to say something!</p>
              </div>
            )}
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '16px', color: 'white', flexShrink: 0 }}>
                    {msg.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '14px', color: msg.uid === user?.uid ? '#00D2D3' : '#6C5CE7' }}>{msg.username}</span>
                      <span style={{ color: '#444', fontSize: '11px' }}>{formatTime(msg.timestamp)}</span>
                    </div>
                    <div style={{ background: '#0A0B0F', borderRadius: '8px', padding: '8px 12px', color: '#ccc', fontSize: '14px', lineHeight: '1.5', wordBreak: 'break-word' }}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid #1E2028', display: 'flex', gap: '12px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={user ? 'Type a message... (Enter to send)' : 'Sign in to chat'}
              disabled={!user}
              style={{ flex: 1, background: '#0A0B0F', border: '1px solid #1E2028', borderRadius: '8px', padding: '10px 16px', color: 'white', fontSize: '14px', outline: 'none' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              style={{ background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', color: 'white' }}
            >
              <Send size={18} />
            </motion.button>
          </div>
        </div>

        {/* Voice Channels Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#12141A', border: '1px solid #1E2028', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Volume2 size={18} color="#6C5CE7" />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '1px', color: 'white' }}>VOICE CHANNELS</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {voiceChannels.map((ch, i) => (
                <motion.div
                  key={i}
                  whileHover={{ background: '#1a1c24', x: 4 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #1E2028' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mic size={14} color="#6C5CE7" />
                    <span style={{ color: '#ccc', fontSize: '13px' }}>{ch.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={12} color="#666" />
                    <span style={{ color: '#666', fontSize: '12px' }}>{ch.users}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Online Users */}
          <div style={{ background: '#12141A', border: '1px solid #1E2028', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Users size={18} color="#00D2D3" />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '1px', color: 'white' }}>ONLINE NOW</span>
            </div>
            {['SoulMortal', 'TenZinho', 'ScoutOP', 'Mavi_FF', 'GodLike99'].map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `hsl(${i * 60}, 70%, 50%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'white' }}>
                    {u.charAt(0)}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#00D2D3', border: '2px solid #12141A' }} />
                </div>
                <span style={{ color: '#ccc', fontSize: '13px' }}>{u}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

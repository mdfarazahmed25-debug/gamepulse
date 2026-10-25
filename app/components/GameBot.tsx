'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function GameBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '🎮 Yo! I\'m GameBot — your esports AI assistant! Ask me anything about tournaments, game updates, player rankings, or gaming strategies. Let\'s go! 🔥' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const response = await fetch('/api/gamebot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMsg }]
        })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Connection error! Check your API key and try again.' }])
    }
    setLoading(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        style={{ position: 'fixed', bottom: '24px', right: '24px', width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #6C5CE7, #00D2D3)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(0,210,211,0.5)', zIndex: 999 }}
      >
        <Bot size={28} color="white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ position: 'fixed', bottom: '100px', right: '24px', width: '380px', height: '520px', background: '#12141A', border: '1px solid #1E2028', borderRadius: '16px', display: 'flex', flexDirection: 'column', zIndex: 998, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
          >
            {/* Header */}
            <div style={{ padding: '16px 20px', background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={22} color="white" />
                <div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '18px', color: 'white', letterSpacing: '1px' }}>GAMEBOT</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>AI Esports Assistant</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: msg.role === 'user' ? 'linear-gradient(90deg, #6C5CE7, #00D2D3)' : '#1E2028', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {msg.role === 'user' ? <User size={16} color="white" /> : <Bot size={16} color="#00D2D3" />}
                  </div>
                  <div style={{ maxWidth: '75%', background: msg.role === 'user' ? 'linear-gradient(90deg, #6C5CE7, #00D2D3)' : '#0A0B0F', borderRadius: msg.role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px', padding: '10px 14px', color: 'white', fontSize: '13px', lineHeight: '1.5' }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1E2028', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={16} color="#00D2D3" />
                  </div>
                  <div style={{ background: '#0A0B0F', borderRadius: '4px 12px 12px 12px', padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D2D3' }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #1E2028', display: 'flex', gap: '8px' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about esports..."
                style={{ flex: 1, background: '#0A0B0F', border: '1px solid #1E2028', borderRadius: '8px', padding: '10px 14px', color: 'white', fontSize: '13px', outline: 'none' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={loading}
                style={{ background: 'linear-gradient(90deg, #6C5CE7, #00D2D3)', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', color: 'white' }}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

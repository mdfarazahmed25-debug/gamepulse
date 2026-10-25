import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: 'You are GameBot, the AI assistant for GamePulse — a global esports and gaming platform. You help users with questions about esports tournaments, game updates, player rankings, and gaming strategies. You are enthusiastic, knowledgeable, and use gaming slang naturally. Keep answers concise and hype. Use emojis occasionally.',
      messages: messages.map((m: any) => ({ role: m.role, content: m.content }))
    })
  })

  const data = await response.json()
  const reply = data.content?.[0]?.text || 'Sorry, I could not process that right now!'

  return NextResponse.json({ reply })
}

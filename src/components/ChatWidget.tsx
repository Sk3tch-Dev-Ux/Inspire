'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MessageCircle, X, Send, Loader2, LogIn } from 'lucide-react'
import { useAuth } from './AuthProvider'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const { user } = useAuth()

  // Hide on admin pages
  if (pathname.startsWith('/admin')) return null

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-10),
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to send message')
      }

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: err instanceof Error ? err.message : 'Something went wrong. Please try again.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Panel */}
      <div
        className={`absolute bottom-16 right-0 mb-2 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-obsidian border border-steel rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-steel bg-midnight/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric to-volt flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-midnight" />
              </div>
              <div>
                <p className="text-sm font-semibold text-pearl">Inspire Assistant</p>
                <p className="text-xs text-silver">Ask us anything</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-steel/30 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-silver" />
            </button>
          </div>

          {/* Auth Banner */}
          {!user && (
            <div className="px-4 py-2 bg-steel/20 border-b border-steel/50 flex items-center gap-2">
              <LogIn className="w-3.5 h-3.5 text-electric shrink-0" />
              <p className="text-xs text-silver">
                <Link href="/login" className="text-electric hover:text-volt transition-colors">
                  Sign in
                </Link>{' '}
                to check order status
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="w-10 h-10 text-steel mx-auto mb-3" />
                <p className="text-silver text-sm mb-1">Hi! How can I help?</p>
                <p className="text-silver/60 text-xs">Ask about our services, pricing, or process</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-electric/20 text-pearl rounded-br-md'
                      : 'bg-steel/30 text-pearl rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-steel/30 px-3.5 py-2.5 rounded-2xl rounded-bl-md">
                  <Loader2 className="w-4 h-4 text-electric animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-steel">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                maxLength={2000}
                className="flex-1 px-3.5 py-2.5 bg-midnight border border-steel rounded-xl text-sm text-pearl placeholder:text-silver focus:outline-none focus:border-electric transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-3 py-2.5 bg-gradient-to-br from-electric to-volt rounded-xl transition-opacity disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-midnight" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-steel/80'
            : 'bg-gradient-to-br from-electric to-volt hover:shadow-electric/30 hover:shadow-xl'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-pearl" />
        ) : (
          <MessageCircle className="w-5 h-5 text-midnight" />
        )}
      </button>
    </div>
  )
}

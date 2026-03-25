'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Mail,
  MailOpen,
  Phone,
} from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  created_at: string
  read_at: string | null
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [expandedContact, setExpandedContact] = useState<string | null>(null)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/contacts?page=${page}&limit=25`)
      const data = await res.json()
      setContacts(data.contacts || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { fetchContacts() }, [fetchContacts])

  const toggleRead = async (contact: Contact) => {
    const newRead = !contact.read_at
    try {
      const res = await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: newRead }),
      })
      if (res.ok) {
        setContacts(prev => prev.map(c =>
          c.id === contact.id ? { ...c, read_at: newRead ? new Date().toISOString() : null } : c
        ))
      }
    } catch (error) {
      console.error('Failed to update contact:', error)
    }
  }

  const handleExpand = (contact: Contact) => {
    const isExpanding = expandedContact !== contact.id
    setExpandedContact(isExpanding ? contact.id : null)

    // Auto-mark as read when expanding
    if (isExpanding && !contact.read_at) {
      toggleRead(contact)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-pearl mb-8">Contact Submissions</h1>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-8 h-8 text-electric animate-spin" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-obsidian rounded-xl border border-steel p-12 text-center text-silver">
          No contact submissions yet.
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-obsidian rounded-xl border border-steel overflow-hidden">
              {/* Header Row */}
              <div
                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-steel/10 transition-colors"
                onClick={() => handleExpand(contact)}
              >
                {/* Read Indicator */}
                <div className="shrink-0">
                  {contact.read_at ? (
                    <MailOpen className="w-5 h-5 text-silver" />
                  ) : (
                    <Mail className="w-5 h-5 text-electric" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${contact.read_at ? 'text-silver' : 'text-pearl font-semibold'}`}>
                      {contact.name}
                    </span>
                    <span className="text-xs text-silver">— {contact.email}</span>
                  </div>
                  <div className={`text-sm truncate ${contact.read_at ? 'text-silver' : 'text-pearl'}`}>
                    {contact.subject}
                  </div>
                </div>

                {/* Date & Expand */}
                <span className="text-xs text-silver shrink-0">
                  {new Date(contact.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {expandedContact === contact.id ? (
                  <ChevronUp className="w-4 h-4 text-silver shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-silver shrink-0" />
                )}
              </div>

              {/* Expanded Content */}
              {expandedContact === contact.id && (
                <div className="px-6 pb-6 pt-2 border-t border-steel">
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-silver">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${contact.email}`} className="text-electric hover:text-volt transition-colors">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-silver">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${contact.phone}`} className="text-electric hover:text-volt transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="bg-midnight p-4 rounded-lg border border-steel mb-4">
                    <h4 className="text-xs font-semibold text-silver uppercase tracking-wider mb-2">Message</h4>
                    <p className="text-sm text-pearl whitespace-pre-wrap">{contact.message}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleRead(contact) }}
                      className="text-sm text-silver hover:text-pearl transition-colors flex items-center gap-2"
                    >
                      {contact.read_at ? (
                        <><Mail className="w-4 h-4" /> Mark as Unread</>
                      ) : (
                        <><MailOpen className="w-4 h-4" /> Mark as Read</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-steel/30 text-silver hover:text-pearl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-silver">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-steel/30 text-silver hover:text-pearl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

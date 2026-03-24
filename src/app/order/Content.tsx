'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Wrench,
  Zap,
  ListChecks,
  Package,
  Loader2,
} from 'lucide-react'

type ServiceType = 'standard' | 'express' | 'planning'

interface FormData {
  service: ServiceType
  addons: string[]
  hasOwnParts: boolean
  budgetRange: string
  useCase: string
  pcpartpickerUrl: string
  partsList: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  notes: string
}

const services = [
  {
    id: 'standard' as ServiceType,
    name: 'Standard Build',
    price: 150,
    description: 'Complete assembly with cable management and testing',
    icon: Wrench,
    turnaround: '3-5 business days',
  },
  {
    id: 'express' as ServiceType,
    name: 'Express Build',
    price: 300,
    description: 'Priority turnaround with extended testing',
    icon: Zap,
    turnaround: '24-48 hours',
  },
  {
    id: 'planning' as ServiceType,
    name: 'Budget Build Planning',
    price: 49,
    description: 'PC Part Picker list based on your budget',
    icon: ListChecks,
    turnaround: '1-2 business days',
    note: 'Credited toward build service',
  },
]

const addons = [
  { id: 'os', name: 'OS Installation', price: 39, desc: 'Windows or Linux' },
  { id: 'data', name: 'Data Migration', price: 39, desc: 'Transfer from old PC' },
  { id: 'aio', name: 'AIO Cooler Install', price: 29, desc: 'Includes thermal paste' },
]

const budgetRanges = [
  '$500 - $800',
  '$800 - $1,200',
  '$1,200 - $1,500',
  '$1,500 - $2,000',
  '$2,000 - $2,500',
  '$2,500 - $3,500',
  '$3,500+',
]

const useCases = [
  'Gaming (1080p)',
  'Gaming (1440p)',
  'Gaming (4K)',
  'Content Creation / Streaming',
  'Video Editing / 3D Rendering',
  'Workstation / Professional',
  'General Use / Home Office',
  'Other',
]

export default function OrderContent() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<FormData>({
    service: 'standard',
    addons: [],
    hasOwnParts: true,
    budgetRange: '',
    useCase: '',
    pcpartpickerUrl: '',
    partsList: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
  })

  const selectedService = services.find(s => s.id === formData.service)

  const calculateTotal = () => {
    if (!selectedService) return 0
    let total = selectedService.price
    formData.addons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId)
      if (addon) total += addon.price
    })
    return total
  }

  const toggleAddon = (addonId: string) => {
    setFormData(prev => ({
      ...prev,
      addons: prev.addons.includes(addonId)
        ? prev.addons.filter(id => id !== addonId)
        : [...prev.addons, addonId]
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit order')
      }

      const data = await response.json()
      setSubmitStatus('success')
      console.log('Order submitted successfully:', data)

      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push('/order/success')
      }, 500)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit order. Please try again.')
      console.error('Order submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep2Valid = formData.service === 'planning'
    ? (formData.budgetRange && formData.useCase)
    : (formData.hasOwnParts ? true : (formData.budgetRange && formData.useCase))
  const isStep3Valid = formData.name && formData.email && formData.phone

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-pearl">
            Book Your <span className="gradient-text">Build</span>
          </h1>
          <p className="text-silver text-lg">
            Complete the form below to get started.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step >= s
                    ? 'bg-gradient-to-r from-electric to-volt text-midnight'
                    : 'bg-steel text-silver'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {index < 2 && (
                <div
                  className={`w-20 h-1 mx-2 rounded transition-colors ${
                    step > s ? 'bg-gradient-to-r from-electric to-volt' : 'bg-steel'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-center gap-16 mb-12 text-sm">
          <span className={step >= 1 ? 'text-pearl' : 'text-silver'}>Service</span>
          <span className={step >= 2 ? 'text-pearl' : 'text-silver'}>Details</span>
          <span className={step >= 3 ? 'text-pearl' : 'text-silver'}>Contact</span>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-xl font-display font-semibold mb-6 text-pearl">Select a Service</h2>
                <div className="grid gap-4">
                  {services.map((service) => {
                    const IconComponent = service.icon
                    return (
                      <button
                        key={service.id}
                        onClick={() => setFormData(prev => ({ ...prev, service: service.id }))}
                        className={`p-6 rounded-xl border text-left transition-all ${
                          formData.service === service.id
                            ? 'border-electric bg-electric/10'
                            : 'border-steel bg-obsidian hover:border-electric/50'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            formData.service === service.id
                              ? 'bg-electric/20'
                              : 'bg-steel/50'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              formData.service === service.id ? 'text-electric' : 'text-silver'
                            }`} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-display font-semibold text-pearl">{service.name}</h3>
                                <p className="text-sm text-silver">{service.description}</p>
                                <p className="text-xs text-silver mt-1">Turnaround: {service.turnaround}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-2xl font-bold gradient-text">${service.price}</span>
                                {service.note && (
                                  <p className="text-xs text-silver">{service.note}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {formData.service !== 'planning' && (
                <div>
                  <h2 className="text-xl font-display font-semibold mb-6 text-pearl">Add-ons (Optional)</h2>
                  <div className="grid gap-4">
                    {addons.map((addon) => (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          formData.addons.includes(addon.id)
                            ? 'border-volt bg-volt/10'
                            : 'border-steel bg-obsidian hover:border-volt/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-pearl">{addon.name}</h3>
                            <p className="text-sm text-silver">{addon.desc}</p>
                          </div>
                          <span className="text-lg font-bold text-volt">+${addon.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Build Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {formData.service === 'planning' ? (
                <div>
                  <h2 className="text-xl font-display font-semibold mb-6 text-pearl">Tell Us About Your Build</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-pearl mb-2">
                        What&apos;s your budget for parts? *
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                        className="input-field w-full"
                      >
                        <option value="">Select a budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pearl mb-2">
                        What will you use the PC for? *
                      </label>
                      <select
                        value={formData.useCase}
                        onChange={(e) => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
                        className="input-field w-full"
                      >
                        <option value="">Select primary use case</option>
                        {useCases.map((useCase) => (
                          <option key={useCase} value={useCase}>{useCase}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pearl mb-2">
                        Any specific requirements or preferences?
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="e.g., prefer AMD, need lots of storage, specific aesthetic..."
                        className="input-field w-full h-32 resize-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-display font-semibold mb-6 text-pearl">Your Parts</h2>

                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, hasOwnParts: true }))}
                      className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                        formData.hasOwnParts
                          ? 'border-electric bg-electric/10'
                          : 'border-steel bg-obsidian hover:border-electric/50'
                      }`}
                    >
                      <Package className={`w-6 h-6 mx-auto mb-2 ${formData.hasOwnParts ? 'text-electric' : 'text-silver'}`} />
                      <span className="font-semibold text-pearl">I have my parts</span>
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, hasOwnParts: false }))}
                      className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                        !formData.hasOwnParts
                          ? 'border-electric bg-electric/10'
                          : 'border-steel bg-obsidian hover:border-electric/50'
                      }`}
                    >
                      <ListChecks className={`w-6 h-6 mx-auto mb-2 ${!formData.hasOwnParts ? 'text-electric' : 'text-silver'}`} />
                      <span className="font-semibold text-pearl">I need help choosing</span>
                    </button>
                  </div>

                  {formData.hasOwnParts ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-pearl mb-2">
                          PC Part Picker URL (optional)
                        </label>
                        <input
                          type="url"
                          value={formData.pcpartpickerUrl}
                          onChange={(e) => setFormData(prev => ({ ...prev, pcpartpickerUrl: e.target.value }))}
                          placeholder="https://pcpartpicker.com/list/..."
                          className="input-field w-full"
                        />
                        <p className="text-xs text-silver mt-1">If you have a PC Part Picker list, paste the URL here</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-pearl mb-2">
                          Or list your parts
                        </label>
                        <textarea
                          value={formData.partsList}
                          onChange={(e) => setFormData(prev => ({ ...prev, partsList: e.target.value }))}
                          placeholder="CPU: AMD Ryzen 7 7800X3D&#10;GPU: NVIDIA RTX 4070 Ti&#10;RAM: 32GB DDR5..."
                          className="input-field w-full h-40 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-pearl mb-2">
                          Additional notes
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Any special requests or concerns?"
                          className="input-field w-full h-24 resize-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-silver">
                        We&apos;ll add Budget Build Planning ($49) to your order. This fee is credited toward your build service.
                      </p>

                      <div>
                        <label className="block text-sm font-medium text-pearl mb-2">
                          What&apos;s your budget for parts? *
                        </label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                          className="input-field w-full"
                        >
                          <option value="">Select a budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-pearl mb-2">
                          What will you use the PC for? *
                        </label>
                        <select
                          value={formData.useCase}
                          onChange={(e) => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
                          className="input-field w-full"
                        >
                          <option value="">Select primary use case</option>
                          {useCases.map((useCase) => (
                            <option key={useCase} value={useCase}>{useCase}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-pearl mb-2">
                          Any specific requirements?
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="e.g., prefer AMD, need lots of storage, specific aesthetic..."
                          className="input-field w-full h-32 resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-xl font-display font-semibold mb-6 text-pearl">Contact Information</h2>

                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-pearl mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="input-field w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pearl mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="input-field w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pearl mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field w-full"
                      required
                    />
                  </div>

                  {formData.service !== 'planning' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-pearl mb-2">
                          Address (for shipping completed build)
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Street address"
                          className="input-field w-full"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-pearl mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            className="input-field w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-pearl mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                            className="input-field w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-pearl mb-2">
                            ZIP
                          </label>
                          <input
                            type="text"
                            value={formData.zip}
                            onChange={(e) => setFormData(prev => ({ ...prev, zip: e.target.value }))}
                            className="input-field w-full"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6 bg-obsidian rounded-xl border border-steel">
                <h3 className="font-display font-semibold text-lg mb-4 text-pearl">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  {selectedService && (
                    <div className="flex justify-between">
                      <span className="text-silver">{selectedService.name}</span>
                      <span className="text-pearl">${selectedService.price}</span>
                    </div>
                  )}
                  {formData.addons.map(addonId => {
                    const addon = addons.find(a => a.id === addonId)
                    if (!addon) return null
                    return (
                      <div key={addonId} className="flex justify-between">
                        <span className="text-silver">{addon.name}</span>
                        <span className="text-pearl">${addon.price}</span>
                      </div>
                    )
                  })}
                  {!formData.hasOwnParts && formData.service !== 'planning' && (
                    <div className="flex justify-between">
                      <span className="text-silver">Budget Build Planning</span>
                      <span className="text-pearl">$49</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-steel flex justify-between">
                  <span className="font-semibold text-pearl">Total</span>
                  <span className="text-2xl font-bold gradient-text">
                    ${calculateTotal() + (!formData.hasOwnParts && formData.service !== 'planning' ? 49 : 0)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              step === 1
                ? 'bg-steel/30 text-silver cursor-not-allowed'
                : 'bg-steel hover:bg-steel/80 text-pearl'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 2 && !isStep2Valid}
              className="btn-primary flex items-center gap-2"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex flex-col items-end gap-3">
              <button
                onClick={handleSubmit}
                disabled={!isStep3Valid || isSubmitting}
                className="btn-primary flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Order
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm bg-red-950/30 px-4 py-2 rounded-lg border border-red-800/50"
                >
                  {errorMessage}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

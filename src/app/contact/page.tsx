'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage(data.message || 'Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        // Clear success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@inspire-pcs.com',
      description: 'We typically respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '(555) 123-4567',
      description: 'Call us during business hours',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Local Service Area',
      description: 'We serve the entire region',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon-Fri 9am-6pm',
      description: 'Saturday 10am-4pm',
    },
  ];

  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero Section */}
      <motion.section
        className="section relative overflow-hidden pt-20 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-electric rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-volt rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="section-title gradient-text mb-4">Get In Touch</h1>
            <p className="section-subtitle text-silver">
              Have questions about our PC building services? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Contact Section */}
      <motion.section
        className="section relative py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  className="card p-6 border border-steel/30 hover:border-electric/50 transition-colors duration-300"
                  variants={itemVariants}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-electric to-volt">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-pearl mb-2">
                        {info.title}
                      </h3>
                      <p className="text-electric font-semibold mb-1">{info.value}</p>
                      <p className="text-silver text-sm">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              className="order-2 lg:order-1"
              variants={itemVariants}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-pearl font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-pearl font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-pearl font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label htmlFor="subject" className="block text-pearl font-semibold mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                  >
                    <option value="">Select a subject...</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Build Service">Build Service</option>
                    <option value="Troubleshooting/Repair">Troubleshooting/Repair</option>
                    <option value="Upgrade Service">Upgrade Service</option>
                    <option value="Warranty Claim">Warranty Claim</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-pearl font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="input-field w-full resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    className="p-4 rounded-lg bg-green-900/20 border border-green-500/50 text-green-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {statusMessage}
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    className="p-4 rounded-lg bg-red-900/20 border border-red-500/50 text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {statusMessage}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>

                <p className="text-silver text-sm text-center">* Required fields</p>
              </form>
            </motion.div>

            {/* Right Side Content */}
            <motion.div className="order-1 lg:order-2 space-y-8" variants={itemVariants}>
              {/* Map Placeholder */}
              <div className="card p-8 border border-steel/30">
                <div className="w-full h-96 rounded-lg bg-gradient-to-br from-obsidian to-obsidian border border-steel/30 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-steel/50 mx-auto mb-4" />
                    <p className="text-silver text-lg font-display">Google Maps Coming Soon</p>
                    <p className="text-steel text-sm mt-2">
                      Interactive map will be embedded here
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Callout */}
              <motion.div
                className="card p-6 border border-electric/30 bg-gradient-to-br from-electric/5 to-volt/5"
                whileHover={{ borderColor: '#10B981' }}
              >
                <h3 className="font-display text-lg font-bold text-pearl mb-2">
                  Have Questions?
                </h3>
                <p className="text-silver mb-4">
                  Check out our FAQ section for quick answers about pricing and services.
                </p>
                <Link
                  href="/pricing#faq"
                  className="inline-flex items-center gap-2 text-electric hover:text-volt font-semibold transition-colors"
                >
                  View FAQ
                  <span className="text-xl">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="section relative py-16 border-t border-steel/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="section-title gradient-text mb-4">Urgent Request?</h2>
          <p className="text-silver mb-8">
            For urgent matters, feel free to call us directly during business hours.
          </p>
          <motion.a
            href="tel:+15551234567"
            className="btn-primary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Call Now: (555) 123-4567
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}

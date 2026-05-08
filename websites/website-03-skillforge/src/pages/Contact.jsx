import { useState } from 'react'
import { faqs } from '../data/courses'

function FAQAccordion() {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-secondary hover:text-primary transition-colors"
          >
            <span>{faq.question}</span>
            <svg className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-indigo-light py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-secondary mb-4">Get in Touch</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Questions, feedback, or partnership ideas — we love hearing from you.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="font-heading text-2xl font-bold text-secondary mb-2">Message Sent!</h3>
                <p className="text-slate-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }) }} className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`} placeholder="Ada Lovelace" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }} className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`} placeholder="ada@example.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option value="">Select a topic</option>
                    <option>General Inquiry</option>
                    <option>Course Support</option>
                    <option>Billing Question</option>
                    <option>Partnership</option>
                    <option>Press / Media</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                  <textarea value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }) }} rows={5} className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none`} placeholder="How can we help?" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary w-full py-3.5">Send Message</button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-indigo-light rounded-2xl p-6 border border-indigo-100">
              <h3 className="font-heading font-bold text-secondary mb-4">Other Ways to Reach Us</h3>
              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: 'hello@skillforge.io' },
                  { icon: '💬', label: 'Discord', value: 'discord.gg/skillforge' },
                  { icon: '🐦', label: 'Twitter', value: '@skillforge' },
                  { icon: '📍', label: 'Headquarters', value: 'San Francisco, CA' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.label}</div>
                      <div className="text-sm text-secondary font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-bold text-secondary mb-3">Response Times</h3>
              <p className="text-sm text-slate-500 mb-3">We typically respond within:</p>
              <ul className="space-y-2 text-sm">
                {['Email: 24 hours', 'Discord: 4 hours', 'Twitter: 8 hours'].map(t => (
                  <li key={t} className="flex items-center gap-2 text-slate-600">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="section-title text-center mb-8">Frequently Asked Questions</h2>
          <FAQAccordion />
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { faqs } from '../data/fitness'

function FAQAccordion() {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between font-medium text-white hover:text-red-400 transition-colors">
            <span className="font-medium">{faq.question}</span>
            <svg className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
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
      <section className="bg-apex py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-7xl text-white tracking-wider mb-4">CONTACT US</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Questions about memberships, trials, or anything else — we're here.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-dark-grey rounded-2xl p-8 text-center border border-white/5">
                <div className="text-5xl mb-4">💪</div>
                <h3 className="font-heading text-3xl text-white tracking-wide mb-2">Message Sent!</h3>
                <p className="text-slate-400 mb-6">We'll get back to you within 24 hours. Your transformation starts soon.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                  className="btn-accent">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-dark-grey rounded-2xl p-6 md:p-8 border border-white/5">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Name *</label>
                    <input value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }) }}
                      className={`w-full px-4 py-3 rounded-xl bg-apex border ${errors.name ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent`}
                      placeholder="Your name" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
                      className={`w-full px-4 py-3 rounded-xl bg-apex border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent`}
                      placeholder="your@email.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-apex border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    placeholder="(555) 123-4567" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-apex border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent">
                    <option value="">Select a topic</option>
                    <option>Free Trial Request</option>
                    <option>Membership Inquiry</option>
                    <option>Class Schedule Question</option>
                    <option>Personal Training</option>
                    <option>Corporate Wellness</option>
                    <option>General Feedback</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Message *</label>
                  <textarea value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }) }}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-apex border ${errors.message ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none`}
                    placeholder="How can we help?" />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-accent w-full py-3.5">Send Message</button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-dark-grey rounded-2xl p-6 border border-white/5">
              <h3 className="font-heading text-xl text-white tracking-wide mb-4">STUDIO INFO</h3>
              <div className="space-y-4">
                {[
                  { icon: '📍', label: 'Address', value: '420 Bryant Street, SoMa, San Francisco, CA 94107' },
                  { icon: '📞', label: 'Phone', value: '(415) 555-0199' },
                  { icon: '📧', label: 'Email', value: 'hello@apexfitness.io' },
                  { icon: '🕐', label: 'Hours', value: 'Mon–Fri: 5am–11pm\nSat–Sun: 7am–9pm\n(24/7 Elite members)' },
                  { icon: '💬', label: 'Discord', value: 'discord.gg/apexfitness' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm text-slate-300 whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-grey rounded-2xl p-6 border border-white/5">
              <h3 className="font-heading text-xl text-white tracking-wide mb-3">FREE TRIAL</h3>
              <p className="text-slate-400 text-sm mb-4">Try any class for free. No credit card, no commitment.</p>
              <a href="mailto:hello@apexfitness.io?subject=Free Trial Request" className="btn-accent block text-center w-full">
                Request Free Pass
              </a>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16 rounded-2xl overflow-hidden h-64 bg-dark-grey border border-white/5 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📍</div>
            <p className="text-slate-500">420 Bryant Street, SoMa, SF</p>
            <p className="text-slate-600 text-sm mt-1">3 min from Montgomery BART</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="section-title text-center mb-8">FREQUENTLY ASKED</h2>
          <FAQAccordion />
        </div>
      </div>
    </div>
  )
}
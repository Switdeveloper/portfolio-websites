import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
    if (!form.message.trim() || form.message.length < 15) errs.message = 'Please describe your project (15+ chars)'
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
      <section className="py-16 md:py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-3">Let's Talk</h1>
          <p className="text-muted text-lg max-w-xl">Whether it's a wedding, a brand campaign, or a personal portrait project — we'd love to hear about it.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-light shadow-sm">
                <div className="text-5xl mb-4">📸</div>
                <h3 className="font-heading text-3xl font-bold text-frame mb-3">Message Received!</h3>
                <p className="text-muted mb-6 max-w-md mx-auto">Thank you, {form.name.split(' ')[0]}. We'll review your project and get back within 24 hours with availability and a custom quote.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', type: '', date: '', message: '' }) }}
                  className="btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-light shadow-sm">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-frame mb-1">Full Name *</label>
                    <input value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }) }}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-accent transition-colors`}
                      placeholder="Your name" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-frame mb-1">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-accent transition-colors`}
                      placeholder="your@email.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-frame mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent transition-colors"
                      placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-frame mb-1">Project Type</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent transition-colors bg-white">
                      <option value="">Select type</option>
                      <option>Wedding Photography</option>
                      <option>Portrait Session</option>
                      <option>Commercial / Brand</option>
                      <option>Editorial</option>
                      <option>Event</option>
                      <option>Videography</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-frame mb-1">Preferred Date (if known)</label>
                  <input type="text" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. June 15, 2026" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-frame mb-1">Tell Us About Your Project *</label>
                  <textarea value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }) }}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-accent transition-colors resize-none`}
                    placeholder="Describe your project, vision, and any specific requirements..." />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-accent w-full py-3.5 text-base">Send Inquiry</button>
                <p className="text-center text-muted text-xs mt-3">We respond within 24 hours. No obligation. All inquiries are confidential.</p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-light">
              <h3 className="font-heading text-xl font-bold text-frame mb-4">Studio Info</h3>
              <div className="space-y-4">
                {[
                  { icon: '📍', label: 'Studio', value: '147 Spring St, SoHo, New York, NY 10012' },
                  { icon: '📧', label: 'Email', value: 'hello@frameworth.com' },
                  { icon: '📞', label: 'Phone', value: '(212) 555-0199' },
                  { icon: '🕐', label: 'Hours', value: 'Mon–Fri: 9am–6pm\nSat: 10am–4pm (by appt)' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm text-frame whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-frame text-white rounded-2xl p-6">
              <h3 className="font-heading text-xl font-bold mb-2">Follow Our Work</h3>
              <p className="text-gray-400 text-sm mb-4">@frameworth on Instagram for daily inspiration.</p>
              <div className="flex gap-3">
                {['IG', 'FB', 'TW', 'YT'].map(s => (
                  <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center text-xs font-bold transition-colors">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-light">
              <h3 className="font-heading text-xl font-bold text-frame mb-2">Quick Response</h3>
              <p className="text-muted text-sm mb-3">For urgent inquiries, reach us directly:</p>
              <a href="tel:+12125550199" className="text-accent font-bold text-lg hover:underline block">+1 (212) 555-0199</a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <div className="rounded-2xl overflow-hidden h-64 bg-light flex items-center justify-center border border-light">
            <div className="text-center">
              <div className="text-4xl mb-2">📍</div>
              <p className="font-heading text-lg text-frame">147 Spring Street, SoHo</p>
              <p className="text-muted text-sm mt-1">New York, NY 10012 · 2 min from Prince St. Station</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
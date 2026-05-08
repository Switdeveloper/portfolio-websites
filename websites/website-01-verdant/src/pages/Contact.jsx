import { useState } from 'react';

const storeInfo = {
  address: '214 Plant Street, Brooklyn, NY 11201',
  phone: '+1 (718) 555-0178',
  email: 'hello@verdantandco.com',
  hours: [
    { day: 'Monday – Friday', time: '10:00 AM – 7:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 6:00 PM' },
    { day: 'Sunday', time: '11:00 AM – 5:00 PM' },
  ],
  faqs: [
    { q: 'Do you offer plant delivery?', a: 'Yes! We deliver to all 50 states. Shipping is free for orders over $50.' },
    { q: 'What if my plant arrives damaged?', a: 'We have a 30-day guarantee. Contact us with a photo and we will send a replacement immediately.' },
    { q: 'Can I return a plant?', a: 'Due to the living nature of our products, we do not accept returns. However we will always help if your plant is struggling.' },
    { q: 'Do you offer corporate gifting?', a: 'Yes! We offer bulk orders with custom packaging. Reach out to corporate@verdantandco.com.' },
  ],
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div>
      {/* Header */}
      <section className="bg-verdant-50 py-12 border-b border-verdant-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-verdant-700 mb-2">Get in Touch</h1>
          <p className="text-verdant-500">We love hearing from you. Questions, feedback, or just a plant photo — send it over!</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-verdant-50 rounded-2xl p-10 text-center">
                <span className="text-5xl mb-4 block">🎉</span>
                <h3 className="font-display text-2xl font-semibold text-verdant-700 mb-2">Message Sent!</h3>
                <p className="text-verdant-500 mb-6">We will get back to you within 24 hours. Check your inbox!</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-verdant-700 mb-1.5">Name</label>
                    <input value={form.name} onChange={update('name')} required placeholder="Your name"
                      className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-verdant-700 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={update('email')} required placeholder="your@email.com"
                      className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-verdant-700 mb-1.5">Subject</label>
                  <select value={form.subject} onChange={update('subject')} required
                    className="input-field">
                    <option value="">Select a topic</option>
                    <option>Order Question</option>
                    <option>Plant Care Help</option>
                    <option>Returns / Guarantee</option>
                    <option>Corporate Gifting</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-verdant-700 mb-1.5">Message</label>
                  <textarea value={form.message} onChange={update('message')} required rows={5}
                    placeholder="Tell us everything..."
                    className="input-field resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Store Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-verdant-700 mb-4">Visit Our Shop</h3>
              <div className="space-y-3 text-sm">
                <p className="flex gap-3 text-verdant-600">
                  <span className="text-lg">📍</span>
                  <span>{storeInfo.address}</span>
                </p>
                <p className="flex gap-3 text-verdant-600">
                  <span className="text-lg">📞</span>
                  <a href={`tel:${storeInfo.phone}`} className="hover:text-verdant-700">{storeInfo.phone}</a>
                </p>
                <p className="flex gap-3 text-verdant-600">
                  <span className="text-lg">✉️</span>
                  <a href={`mailto:${storeInfo.email}`} className="hover:text-verdant-700">{storeInfo.email}</a>
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-verdant-100">
                <h4 className="font-semibold text-sm text-verdant-700 mb-3">Store Hours</h4>
                {storeInfo.hours.map(h => (
                  <div key={h.day} className="flex justify-between text-sm py-1">
                    <span className="text-verdant-500">{h.day}</span>
                    <span className="text-verdant-700 font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="bg-verdant-50 rounded-2xl p-6">
              <h3 className="font-semibold text-verdant-700 mb-3">Follow Us</h3>
              <p className="text-sm text-verdant-500 mb-4">Share your plant babies with <span className="font-medium text-verdant-600">#VerdantAndCo</span></p>
              <div className="flex gap-3">
                {['📷 Instagram', '📘 Facebook', '📌 Pinterest'].map(s => (
                  <span key={s} className="px-3 py-2 bg-white rounded-lg text-xs font-medium text-verdant-600 shadow-sm cursor-pointer hover:bg-verdant-100 transition-colors">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-14 border-t border-verdant-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {storeInfo.faqs.map((faq, i) => (
              <div key={i} className="bg-cream rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center font-medium text-verdant-700 hover:text-verdant-500 transition-colors"
                >
                  {faq.q}
                  <span className="text-verdant-400">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-verdant-500 leading-relaxed border-t border-verdant-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
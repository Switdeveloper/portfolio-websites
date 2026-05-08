import { Link } from 'react-router-dom'
import { services } from '../data/photography'

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We start with a conversation. Understand your vision, your brand, and your goals. No template approaches — every project starts fresh.' },
  { step: '02', title: 'Planning & Concept', desc: 'Based on our conversation, we develop a creative concept, shot list, and production plan. We handle all logistics and location scouting.' },
  { step: '03', title: 'The Shoot', desc: 'The day itself. We create a comfortable, inspiring environment where great images happen naturally. We work efficiently and joyfully.' },
  { step: '04', title: 'Editing & Delivery', desc: 'Meticulous post-processing. Color grading, retouching, and final quality check. Your finished gallery delivered within 2 weeks.' },
]

export default function Services() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="relative py-20 md:py-28 bg-frame text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4">Services & Pricing</h1>
          <p className="text-gray-400 text-lg max-w-xl">Transparent pricing for photography, videography, and editing. Every package includes professional editing and full print rights.</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={s.name} className="rounded-2xl p-8 border border-light hover:border-accent/40 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-5">{s.icon}</div>
                <h3 className="font-heading text-3xl font-bold text-frame mb-1">{s.name}</h3>
                <div className="text-accent font-semibold text-lg mb-4">{s.price}</div>
                <p className="text-muted text-sm leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-frame">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-dark block text-center rounded">
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">A seamless experience from first call to final delivery</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={p.step} className="text-center">
                <div className="text-accent font-heading text-5xl font-bold mb-3 opacity-50">{p.step}</div>
                <h3 className="font-heading text-xl font-bold text-frame mb-2">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-3">Ready to Start?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-md mx-auto">Tell us about your project and we'll get back within 24 hours.</p>
          <Link to="/contact" className="bg-white text-accent font-bold px-10 py-4 rounded hover:bg-gray-100 transition-colors text-base inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
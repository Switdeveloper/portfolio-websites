import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { portfolio, services, testimonials, clients, stats } from '../data/photography'

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 6000)
    return () => clearInterval(t)
  }, [])
  const t = testimonials[current]
  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
        {testimonials.map((tt, i) => (
          <div key={i} className="w-full flex-shrink-0 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <svg className="w-8 h-8 text-accent mx-auto mb-6 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="font-heading text-xl md:text-2xl text-frame leading-relaxed mb-6">"{tt.quote}"</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(tt.rating)].map((_, si) => (
                  <svg key={si} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="font-medium text-frame">{tt.name}</div>
              <div className="text-sm text-muted">{tt.role}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-accent w-6' : 'bg-gray-300'}`}
            aria-label={`Testimonial ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail('') } }
  return submitted ? (
    <p className="text-accent font-medium">Thank you! You'll hear from us soon.</p>
  ) : (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
        required className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent transition-colors" />
      <button type="submit" className="btn-accent whitespace-nowrap">Subscribe</button>
    </form>
  )
}

export default function Home() {
  const featured = portfolio.filter(p => p.featured).slice(0, 4)

  return (
    <div className="pt-16 md:pt-20">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1800&q=85"
          alt="FrameWorth hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 w-full">
          <div className="max-w-2xl animate-fade-in">
            <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">Award-Winning Photography</p>
            <h1 className="font-heading text-5xl md:text-7xl text-white font-bold leading-tight mb-6">
              Every Frame<br />
              <em className="font-normal">Tells a Story</em>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
              Documentary, portrait, wedding, and commercial photography. Based in New York, working everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/portfolio" className="btn-accent text-base px-8 py-4 text-center rounded">
                View Portfolio
              </Link>
              <Link to="/contact" className="border border-white/40 text-white font-medium px-8 py-4 hover:bg-white hover:text-frame transition-all text-center rounded">
                Book a Session
              </Link>
            </div>
          </div>
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> New York
              </span>
              <span>·</span>
              <span>Los Angeles</span>
              <span>·</span>
              <span>London</span>
              <span>·</span>
              <span>Paris</span>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-12 animate-bounce hidden md:block">
          <div className="text-white/30 text-xs uppercase tracking-widest rotate-90 origin-center translate-x-8">Scroll</div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-20 md:py-28 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="section-title">Selected Work</h2>
                <p className="section-subtitle">Recent projects we're proud of</p>
              </div>
              <Link to="/portfolio" className="text-accent font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                View All Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main large photo */}
            <FadeIn delay={0}>
              <Link to="/portfolio" className="group relative overflow-hidden rounded-xl md:row-span-2 block">
                <img src={featured[0].image} alt={featured[0].title} className="w-full h-[500px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs text-accent uppercase tracking-widest mb-1">{featured[0].category}</p>
                  <p className="font-heading text-2xl">{featured[0].title}</p>
                  <p className="text-sm text-gray-300">{featured[0].location}</p>
                </div>
              </Link>
            </FadeIn>
            {/* 3 smaller photos */}
            {featured.slice(1).map((p, i) => (
              <FadeIn key={p.id} delay={i * 120}>
                <Link to="/portfolio" className="group relative overflow-hidden rounded-xl block">
                  <img src={p.image} alt={p.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-xs text-accent uppercase tracking-widest mb-0.5">{p.category}</p>
                    <p className="font-heading text-lg">{p.title}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="section-title">What We Do</h2>
              <p className="section-subtitle">Full-service photography and videography</p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <FadeIn key={s.name} delay={i * 100}>
                <div className="group text-center p-8 rounded-2xl border border-light hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <div className="text-5xl mb-5">{s.icon}</div>
                  <h3 className="font-heading text-2xl font-bold text-frame mb-1">{s.name}</h3>
                  <div className="text-accent font-semibold text-sm mb-3">{s.price}</div>
                  <p className="text-muted text-sm leading-relaxed mb-5">{s.description}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map(f => (
                      <li key={f} className="flex items-center justify-center gap-2 text-sm text-muted">
                        <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/services" className="btn-outline text-sm px-5 py-2.5 inline-block">
                    Learn More
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 bg-frame text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 80}>
                <div className="text-center">
                  <div className="font-heading text-4xl md:text-5xl text-accent mb-1">{s.value}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-16 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-center text-muted text-sm uppercase tracking-widest mb-10">Trusted by World-Class Brands</p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {clients.map(client => (
                <span key={client} className="font-heading text-lg text-gray-300 hover:text-frame transition-colors cursor-default">
                  {client}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="section-title">Kind Words</h2>
              <p className="section-subtitle">From clients who've trusted us</p>
            </div>
          </FadeIn>
          <FadeIn>
            <TestimonialCarousel />
          </FadeIn>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-28 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">Let's Create Something Beautiful</h2>
            <p className="text-gray-300 text-lg mb-8">Available for weddings, editorial, commercial, and personal projects worldwide.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-accent text-base px-10 py-4 rounded">
                Start a Project
              </Link>
              <Link to="/portfolio" className="border border-white/40 text-white font-medium px-10 py-4 hover:bg-white hover:text-frame transition-all rounded">
                Browse Work
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-offwhite border-t border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h3 className="font-heading text-2xl text-frame mb-2">Stories & Insights</h3>
            <p className="text-muted text-sm mb-6">Behind-the-scenes, tips, and photography stories. Once a month.</p>
            <NewsletterForm />
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
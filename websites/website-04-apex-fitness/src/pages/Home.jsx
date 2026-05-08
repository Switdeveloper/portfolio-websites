import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { classes, trainers, testimonials, stats, pricingPlans, faqs } from '../data/fitness'
import ClassCard from '../components/ClassCard'

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
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

function AnimatedStat({ value, label, suffix }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const t = setInterval(() => {
          start += Math.ceil(value / 60)
          if (start >= value) { setCount(value); clearInterval(t) } else setCount(start)
        }, 33)
        observer.unobserve(el)
        return () => clearInterval(t)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-5xl md:text-6xl text-white">{count.toLocaleString()}{suffix}</div>
      <div className="text-red-300 text-sm mt-1 uppercase tracking-widest">{label}</div>
    </div>
  )
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])
  const testimonial = testimonials[current]
  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
        {testimonials.map((t, i) => (
          <div key={i} className="w-full flex-shrink-0 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, si) => (
                  <svg key={si} className="w-5 h-5 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-red-300">{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-accent w-8' : 'bg-white/20'}`}
            aria-label={`Testimonial ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}

function FAQAccordion() {
  const [open, setOpen] = useState(null)
  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between font-medium text-white hover:text-red-400 transition-colors">
            <span className="font-medium">{faq.question}</span>
            <svg className={`w-5 h-5 transition-transform flex-shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail('') } }
  return submitted ? (
    <div className="flex items-center justify-center gap-2 text-green-400 font-bold text-lg">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      You're in! Check your inbox for a free trial pass.
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
        required className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent" />
      <button type="submit" className="btn-accent whitespace-nowrap rounded-xl">Get Free Trial</button>
    </form>
  )
}

const featuredClasses = classes.slice(0, 6)
const featuredTrainer = trainers[0]
const classTypes = [
  { name: 'HIIT', icon: '🔥', description: 'High-intensity intervals for max calorie burn' },
  { name: 'Strength', icon: '💪', description: 'Build muscle and increase power' },
  { name: 'Yoga', icon: '🧘', description: 'Flexibility, balance, and mindfulness' },
  { name: 'Boxing', icon: '🥊', description: 'Technique, cardio, and mental toughness' },
  { name: 'Spin', icon: '🚴', description: 'High-energy indoor cycling sessions' },
  { name: 'Recovery', icon: '🧊', description: 'Stretching, mobility, and active recovery' },
]

export default function Home() {
  return (
    <div className="pt-16 md:pt-20">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-apex">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80" alt="Gym" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-apex via-apex/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-apex via-transparent to-apex/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-red-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Now open 24/7 — Elite membership
            </div>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-wide mb-6">
              TRANSFORM<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">YOUR BODY</span><br />
              TRANSFORM<br />
              YOUR LIFE
            </h1>
            <p className="text-slate-400 text-lg max-w-md mb-10 leading-relaxed">
              San Francisco's most results-driven fitness studio. Expert coaches, world-class equipment, and a community that pushes you daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/pricing" className="btn-accent text-base px-10 py-4 rounded-xl text-center">
                Start Free Trial
              </Link>
              <Link to="/classes" className="btn-outline text-base px-10 py-4 rounded-xl text-center">
                View Schedule
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                5-Star Rated
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                5,200+ Members
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                200+ Classes/Month
              </div>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimatedStat key={i} value={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </section>

      {/* CLASS TYPES */}
      <section className="py-20 md:py-28 bg-apex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="section-title">WHAT WE OFFER</h2>
              <p className="section-subtitle">Find your discipline. Elevate your performance.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {classTypes.map((ct, i) => (
              <FadeIn key={ct.name} delay={i * 80}>
                <Link to="/classes" className="bg-dark-grey rounded-2xl p-5 text-center border border-white/5 card-hover group block">
                  <div className="text-4xl mb-3">{ct.icon}</div>
                  <h3 className="font-heading text-lg text-white tracking-wide group-hover:text-accent transition-colors">{ct.name.toUpperCase()}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">{ct.description}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CLASSES */}
      <section className="py-20 md:py-28 bg-dark-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-4">
              <div>
                <h2 className="section-title">POPULAR CLASSES</h2>
                <p className="section-subtitle">Join 200+ classes running every month</p>
              </div>
              <Link to="/classes" className="text-accent font-bold text-sm uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
                Full Schedule
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClasses.map((cls, i) => (
              <FadeIn key={cls.id} delay={i * 100}>
                <ClassCard cls={cls} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="text-center mt-12">
              <Link to="/classes" className="btn-dark inline-flex items-center gap-2">
                View All Classes
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TRAINER SPOTLIGHT */}
      <section className="py-20 md:py-28 bg-apex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="section-title">MEET YOUR COACH</h2>
              <p className="section-subtitle">World-class trainers dedicated to your results</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden">
                <img src={featuredTrainer.image} alt={featuredTrainer.name} className="w-full h-80 object-cover" />
              </div>
              <div className="text-white">
                <div className="font-heading text-5xl tracking-wide mb-1">{featuredTrainer.name.toUpperCase()}</div>
                <div className="text-accent text-sm font-medium uppercase tracking-widest mb-4">{featuredTrainer.title}</div>
                <p className="text-slate-400 leading-relaxed mb-6">{featuredTrainer.bio}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredTrainer.specialties.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">{s}</span>
                  ))}
                </div>
                <div className="flex gap-6 text-sm text-slate-400 mb-6">
                  <span>📚 {featuredTrainer.classes} classes</span>
                  <span>👥 {featuredTrainer.members.toLocaleString()} members coached</span>
                </div>
                <Link to="/trainers" className="btn-accent inline-flex items-center gap-2">
                  All Trainers
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-dark-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="section-title">REAL TRANSFORMATIONS</h2>
              <p className="section-subtitle">Results from members who gave it everything</p>
            </div>
          </FadeIn>
          <FadeIn>
            <TestimonialCarousel />
          </FadeIn>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-20 md:py-28 bg-apex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="section-title">CHOOSE YOUR PLAN</h2>
              <p className="section-subtitle">No contracts. Cancel anytime. Start today.</p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.slice(0, 3).map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 100}>
                <div className={`rounded-2xl p-6 border ${plan.popular ? 'bg-accent border-accent ring-4 ring-accent/20' : 'bg-dark-grey border-white/10'}`}>
                  {plan.popular && (
                    <div className="text-center text-xs font-bold text-white bg-apex/40 py-1 rounded-full mb-4 -mx-6 -mt-6 rounded-b-none">MOST POPULAR</div>
                  )}
                  <div className="font-heading text-3xl text-white tracking-wide mb-1">{plan.name.toUpperCase()}</div>
                  <div className="text-sm text-slate-400 mb-4">{plan.description}</div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400 text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/pricing" className={`block w-full py-3 text-center text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${
                    plan.popular ? 'bg-white text-apex hover:bg-slate-100' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                    Get Started
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-dark-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="section-title">QUESTIONS?</h2>
              <p className="section-subtitle">Everything you need to know before joining</p>
            </div>
          </FadeIn>
          <FadeIn>
            <FAQAccordion />
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-heading text-5xl md:text-7xl text-white tracking-wide mb-4">READY TO START?</h2>
            <p className="text-red-100 text-lg mb-10 max-w-lg mx-auto">Your first week is on us. No commitment. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="bg-white text-apex font-bold px-10 py-4 rounded-xl hover:bg-slate-100 transition-colors text-base">
                Claim Free Trial
              </Link>
              <Link to="/contact" className="btn-outline text-base px-10 py-4 rounded-xl">
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-apex border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h3 className="font-heading text-3xl text-white tracking-wide mb-2">GET TRAINING TIPS WEEKLY</h3>
            <p className="text-slate-500 mb-6">No spam. Just actionable fitness and nutrition advice.</p>
            <NewsletterForm />
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
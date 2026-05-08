import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { courses, features, testimonials, stats, partners, pricingPlans, faqs } from '../data/courses'
import CourseCard from '../components/CourseCard'

function AnimatedStat({ value, label }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        observer.unobserve(el)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const numericTarget = parseInt(value.replace(/[^0-9]/g, ''))
    const suffix = value.match(/[^0-9]*$/)?.[0] || ''
    let start = 0
    const step = numericTarget / 60
    const timer = setInterval(() => {
      start += step
      if (start >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 33)
    return () => clearInterval(timer)
  }, [started, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-white font-heading">
        {count.toLocaleString()}{value.match(/[^0-9]*$/)?.[0] || '+'}
      </div>
      <div className="text-indigo-200 mt-1 font-medium">{label}</div>
    </div>
  )
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [])
  const t = testimonials[current]
  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
        {testimonials.map((t, i) => (
          <div key={i} className="w-full flex-shrink-0 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-secondary font-medium leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold text-secondary">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-primary w-8' : 'bg-slate-300'}`}
            aria-label={`Testimonial ${i + 1}`}
          />
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
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-secondary hover:text-primary transition-colors"
          >
            <span>{faq.question}</span>
            <svg className={`w-5 h-5 transition-transform flex-shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }
  return submitted ? (
    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      You're on the list! Check your inbox.
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
        className="flex-1 px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button type="submit" className="btn-accent whitespace-nowrap rounded-xl">
        Subscribe Free
      </button>
    </form>
  )
}

function FadeInSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.unobserve(el)
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <div className="pt-16 md:pt-20">
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero text-white py-24 md:py-36">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            New courses added weekly — May 2026
          </div>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 max-w-4xl mx-auto">
            Learn the Skills<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">That Actually Matter</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert-led courses in Development, Design, Marketing, Business & Data. Join 250,000+ learners building careers they love.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/courses" className="btn-accent text-base px-8 py-4 rounded-xl w-full sm:w-auto">
              Explore All Courses
            </Link>
            <Link to="/stories" className="btn-outline border-white/40 text-white hover:bg-white hover:text-primary w-full sm:w-auto">
              See Student Stories
            </Link>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-indigo-200">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              500+ Courses
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              250K+ Students
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              85 Countries
            </span>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16">
            <path d="M0 60V30C240 10 480 0 720 5C960 10 1200 30 1440 40V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AnimatedStat key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="section-title">Featured Courses</h2>
              <p className="section-subtitle">Hand-picked by our team, taught by industry experts</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(c => c.featured).map((course, i) => (
              <FadeInSection key={course.id} delay={i * 100}>
                <CourseCard course={course} />
              </FadeInSection>
            ))}
          </div>
          <FadeInSection>
            <div className="text-center mt-12">
              <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
                Browse All 500+ Courses
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-indigo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="section-title">How SkillForge Works</h2>
              <p className="section-subtitle">Four steps to mastering any skill</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', icon: '🔍', title: 'Choose Your Path', desc: 'Browse 500+ courses across 6 disciplines. Filter by skill level, duration, and career goal.' },
              { step: '02', icon: '📺', title: 'Learn at Your Pace', desc: 'Watch expert-led video lessons anytime. Download for offline learning. Track your daily progress.' },
              { step: '03', icon: '💻', title: 'Build Real Projects', desc: 'Apply every concept to hands-on projects. Build a portfolio that impresses employers.' },
              { step: '04', icon: '🎓', title: 'Get Certified', desc: 'Earn verified certificates. Land your dream job or promotion with credentials employers trust.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 h-full hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold text-primary mb-2 tracking-widest">{item.step}</div>
                  <h3 className="font-heading font-bold text-secondary text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="section-title">Why Learners Choose SkillForge</h2>
              <p className="section-subtitle">Everything you need to go from curious to career-ready</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeInSection key={i} delay={i * 80}>
                <div className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all h-full">
                  <span className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-50 rounded-xl">
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-secondary mb-1">{f.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="section-title text-white">Student Success Stories</h2>
              <p className="section-subtitle text-slate-400">Real results from real learners</p>
            </div>
          </FadeInSection>
          <FadeInSection>
            <TestimonialCarousel />
          </FadeInSection>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="section-title">Simple, Transparent Pricing</h2>
              <p className="section-subtitle">Start free. Go Pro when you're ready.</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <FadeInSection key={plan.name} delay={i * 100}>
                <div className={`relative rounded-2xl p-6 md:p-8 h-full flex flex-col ${
                  plan.popular
                    ? 'bg-primary text-white ring-4 ring-primary/20 scale-105'
                    : 'bg-white border border-slate-200'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="font-heading font-bold text-xl mb-1">{plan.name}</h3>
                    <p className={`text-sm ${plan.popular ? 'text-indigo-200' : 'text-slate-500'}`}>{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-extrabold font-heading">{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                      {plan.period && <span className={`text-sm ml-1 ${plan.popular ? 'text-indigo-200' : 'text-slate-400'}`}>/{plan.period}</span>}
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-emerald-400' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={plan.popular ? 'text-indigo-100' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-indigo-400' : 'text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                        <span className={plan.popular ? 'text-indigo-300' : 'text-slate-400'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-6 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-accent text-white hover:bg-amber-600'
                      : 'bg-primary text-white hover:bg-indigo-700'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-indigo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Everything you need to know before you start</p>
            </div>
          </FadeInSection>
          <FadeInSection>
            <FAQAccordion />
          </FadeInSection>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
              Get Free Learning Tips Weekly
            </h2>
            <p className="text-indigo-200 mb-8 text-lg">Join 50,000+ learners. No spam, just substance.</p>
            <NewsletterForm />
          </FadeInSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-secondary mb-6">
              Your Future Starts Today
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">
              Join 250,000 learners who decided to invest in themselves. Your next skill is one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="btn-primary text-base px-10 py-4 rounded-xl">
                Start Learning Free
              </Link>
              <Link to="/stories" className="btn-outline text-base px-10 py-4 rounded-xl">
                See Success Stories
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
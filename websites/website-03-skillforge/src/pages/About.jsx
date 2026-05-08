import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { instructors, stats } from '../data/courses'

function AnimatedStat({ value, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const num = parseInt(value.replace(/[^0-9]/g, ''))
        let start = 0
        const t = setInterval(() => {
          start += Math.ceil(num / 60)
          if (start >= num) { setCount(num); clearInterval(t) } else setCount(start)
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
      <div className="text-4xl font-extrabold text-white font-heading">{count.toLocaleString()}{value.match(/[^0-9]*$/)?.[0]}</div>
      <div className="text-indigo-200 mt-1">{label}</div>
    </div>
  )
}

const team = [
  { name: 'Dr. Sarah Chen', role: 'CEO & Co-Founder', bio: 'Former VP of Learning at Coursera. PhD in Education Technology from Stanford.', avatar: 'SC' },
  { name: 'Marcus Rivera', role: 'Head of Design', bio: 'Led design at Figma for 5 years. Passionate about accessible, human-centered interfaces.', avatar: 'MR' },
  { name: 'James Wu', role: 'CTO', bio: 'Built ML infrastructure at Google Brain. Obsessed with making complex concepts simple.', avatar: 'JW' },
  { name: 'Aisha Okonkwo', role: 'Head of Partnerships', bio: 'Former Director at edX. Built partnerships with 50+ universities and Fortune 500 companies.', avatar: 'AO' },
]

const values = [
  { icon: '🎓', title: 'Learning First', desc: 'Every decision starts with one question: does this help someone learn better?' },
  { icon: '🛠️', title: 'Practical Over Theory', desc: 'We teach what employers actually need, not what\'s academically convenient.' },
  { icon: '🌍', title: 'Accessible to All', desc: 'Free courses, scholarships, and pricing that doesn\'t exclude people based on geography.' },
  { icon: '🔄', title: 'Always Improving', desc: 'Courses are living documents. They\'re updated every quarter based on student feedback.' },
]

export default function About() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-indigo-light py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-secondary mb-4">We Build Paths to Careers</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            SkillForge was founded in 2021 by a team of educators, engineers, and designers who believe the best education should be free — or at least, affordable.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Our Mission</span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-secondary mt-2 mb-6 leading-tight">
                Making premium education accessible to every ambitious learner
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                We started SkillForge after watching talented people get locked out of career-changing opportunities because good education was too expensive or too gatekept.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                Today, we partner with 120+ industry experts and offer 12 permanently free courses alongside our Pro subscription — because nobody should have to pay to discover what they want to learn.
              </p>
              <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
                Explore Our Courses
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map(v => (
                <div key={v.title} className="bg-indigo-light rounded-2xl p-5 border border-indigo-100">
                  <span className="text-3xl mb-3 block">{v.icon}</span>
                  <h3 className="font-heading font-bold text-secondary mb-1">{v.title}</h3>
                  <p className="text-slate-500 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => <AnimatedStat key={i} value={s.value} label={s.label} />)}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle">The people building SkillForge every day</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(t => (
              <div key={t.name} className="text-center p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all card-hover">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center font-bold text-2xl text-primary mx-auto mb-4">{t.avatar}</div>
                <h3 className="font-heading font-bold text-secondary">{t.name}</h3>
                <div className="text-sm text-primary font-medium mb-2">{t.role}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 md:py-28 bg-indigo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Expert Instructors</h2>
            <p className="section-subtitle">Learn from people who\'ve done it at the highest level</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {instructors.map(i => (
              <div key={i.name} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xl text-primary mb-4">{i.avatar}</div>
                <h3 className="font-heading font-bold text-secondary">{i.name}</h3>
                <p className="text-sm text-primary mb-3">{i.title}</p>
                <div className="flex gap-4 text-sm text-slate-500">
                  <span>📚 {i.courses} courses</span>
                  <span>⭐ {i.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
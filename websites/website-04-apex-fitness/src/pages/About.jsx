import { Link } from 'react-router-dom'
import { trainers, stats } from '../data/fitness'

const timeline = [
  { year: '2017', event: 'Apex Fitness opens its doors in SoMa, San Francisco. 3 trainers, 1 small gym, 200 founding members.' },
  { year: '2019', event: 'Expanded to 8,000 sq ft with dedicated spin studio, yoga room, and functional training zone. Member count hits 1,500.' },
  { year: '2021', event: 'Launched online training platform during the pandemic. Virtual classes reached 10,000+ members globally.' },
  { year: '2023', event: '24/7 Elite membership launched. Second location opened in Mission Bay. 4,000 active members.' },
  { year: '2026', event: '5,200+ members, 18 expert trainers, and counting. Named Best Gym in San Francisco by SF Chronicle.' },
]

const values = [
  { icon: '🎯', title: 'Results Over Everything', desc: 'We measure success by your transformations — not our marketing.' },
  { icon: '💪', title: 'Train Like an Athlete', desc: 'Every program is built by certified coaches with competitive sports backgrounds.' },
  { icon: '🌱', title: 'Sustainable Progress', desc: 'No crash diets or unsustainable extremes. Just consistent, intelligent training.' },
  { icon: '🔥', title: 'Push Your Limits', desc: 'Our coaches will challenge you. Comfort is the enemy of growth.' },
]

export default function About() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-apex py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-7xl text-white tracking-wider mb-4">OUR STORY</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded by athletes, built for people who refuse to settle. We opened in 2017 with one mission: create a gym that actually delivers results.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-dark-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-bold text-sm tracking-widest uppercase">Why We Exist</span>
              <h2 className="font-heading text-4xl md:text-5xl text-white tracking-wide mt-2 mb-6">WE'RE HERE TO<br />CHANGE LIVES</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Most gyms sell memberships. We sell transformations. The difference is in everything we do — the coaching quality, the equipment selection, the community culture.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Every program at Apex is built by certified coaches who've competed, trained, and succeeded at the highest levels. We bring that knowledge to everyday members who want real results.
              </p>
              <Link to="/trainers" className="btn-accent inline-flex items-center gap-2">
                Meet Our Trainers
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map(v => (
                <div key={v.title} className="bg-apex rounded-2xl p-5 border border-white/5">
                  <span className="text-3xl mb-3 block">{v.icon}</span>
                  <h3 className="font-heading font-bold text-white text-lg tracking-wide mb-1">{v.title.toUpperCase()}</h3>
                  <p className="text-slate-500 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-apex">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">OUR JOURNEY</h2>
          </div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-6 group">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="font-heading text-2xl text-accent">{item.year}</span>
                </div>
                <div className="relative pb-8">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20" />
                  {i < timeline.length - 1 && <div className="absolute left-[5px] top-4 bottom-0 w-px bg-white/10" />}
                  <div className="pl-8">
                    <p className="text-slate-400 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-dark-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">THE TEAM</h2>
            <p className="section-subtitle">18 certified coaches. One shared mission.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map(t => (
              <div key={t.id} className="bg-apex rounded-2xl overflow-hidden border border-white/5 card-hover">
                <img src={t.image} alt={t.name} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-heading text-xl text-white tracking-wide">{t.name.toUpperCase()}</h3>
                  <p className="text-accent text-xs font-medium uppercase tracking-widest mb-2">{t.title}</p>
                  <div className="flex flex-wrap gap-1">
                    {t.specialties.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-400">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-6xl text-white tracking-wide mb-4">JOIN THE COMMUNITY</h2>
          <p className="text-red-100 mb-8 max-w-md mx-auto">5,200+ members transforming together. Your turn is next.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="bg-white text-apex font-bold px-10 py-4 rounded-xl hover:bg-slate-100 transition-colors text-base inline-block">Start Free Trial</Link>
            <Link to="/contact" className="btn-outline text-base px-10 py-4 rounded-xl">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
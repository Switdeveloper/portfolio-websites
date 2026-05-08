import { Link } from 'react-router-dom'
import { stats, testimonials } from '../data/photography'

const timeline = [
  { year: '2013', event: 'FrameWorth founded in a Brooklyn apartment. First client: a small restaurant needing menu photos.' },
  { year: '2015', event: 'First international assignment — fashion editorial in Milan. Published in Vogue Italia.' },
  { year: '2017', event: 'Expanded to a full studio in SoHo. Added videography services. Team grew to 4.' },
  { year: '2020', event: 'Launched virtual shoots during the pandemic. International client base doubled.' },
  { year: '2023', event: 'Named Top Photography Studio by The New York Observer. 800+ projects completed.' },
  { year: '2026', event: 'Expanded to Los Angeles. Continuing to tell stories one frame at a time.' },
]

const gear = [
  { name: 'Sony A1', type: 'Primary Camera' },
  { name: 'Sony A7RV', type: 'Backup / Video' },
  { name: 'Sony 85mm f/1.4 GM', type: 'Portrait' },
  { name: 'Sony 35mm f/1.8', type: 'Documentary' },
  { name: 'Sony 24-70mm f/2.8 GM II', type: 'Events' },
  { name: 'Profoto B10 Plus × 2', type: 'Lighting' },
]

const press = ['Vogue Italia', 'The New York Observer', 'Architectural Digest', 'Forbes', 'Harper\'s Bazaar', 'W Magazine']

export default function About() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&q=80"
          alt="FrameWorth studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-7xl text-white font-bold mb-4">Our Story</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Twelve years of chasing light and capturing moments that matter.</p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt=" Photographer portrait"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>
            <div>
              <span className="text-accent font-medium text-sm tracking-widest uppercase">About FrameWorth</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-frame mt-2 mb-6">
                We Don't Just Take Photos.<br />
                <em className="font-normal">We Capture Essence.</em>
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                FrameWorth was founded in 2013 by a photographer who believed that great photography isn't about the gear — it's about the eye, the moment, and the story.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Today we're a team of 6 photographers, videographers, and editors working across portrait, wedding, commercial, and documentary photography. Our work has been featured in Vogue Italia, Architectural Digest, and Forbes.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Every project is a collaboration. We listen, we envision, and then we execute with craft and care. That's why 90% of our clients come back — and why most of our new clients come through referrals.
              </p>
              <div className="flex flex-wrap gap-8">
                {stats.map(s => (
                  <div key={s.label}>
                    <div className="font-heading text-3xl text-frame font-bold">{s.value}</div>
                    <div className="text-muted text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">The Journey</h2>
          </div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-6 group">
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="font-heading text-2xl text-accent">{item.year}</span>
                </div>
                <div className="relative pb-8">
                  <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-amber-100" />
                  {i < timeline.length - 1 && <div className="absolute left-[4px] top-4 bottom-0 w-px bg-gray-200" />}
                  <div className="pl-8">
                    <p className="text-muted leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gear */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Tools We Trust</h2>
            <p className="section-subtitle">Professional gear used on every shoot</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {gear.map(g => (
              <div key={g.name} className="bg-offwhite rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">{g.type[0]}</div>
                <div>
                  <div className="font-medium text-frame text-sm">{g.name}</div>
                  <div className="text-muted text-xs">{g.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-16 bg-frame">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {press.map(p => (
              <span key={p} className="font-heading text-gray-400 hover:text-accent transition-colors text-lg cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl mb-3">Your Story Awaits</h2>
          <p className="text-muted mb-8">Let's create something beautiful together.</p>
          <Link to="/contact" className="btn-accent inline-block">Start a Project</Link>
        </div>
      </section>
    </div>
  )
}
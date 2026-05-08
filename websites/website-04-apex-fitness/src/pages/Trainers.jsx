import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trainers } from '../data/fitness'

const intensityColor = {
  'Low': 'bg-emerald-500/20 text-emerald-400',
  'Moderate': 'bg-amber-500/20 text-amber-400',
  'High': 'bg-orange-500/20 text-orange-400',
  'Extreme': 'bg-red-500/20 text-red-400',
}

export default function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  const trainer = selectedTrainer !== null ? trainers[selectedTrainer] : null

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-apex py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl md:text-7xl text-white tracking-wider mb-4">OUR TRAINERS</h1>
          <p className="text-slate-400 text-lg max-w-xl">Every Apex trainer is certified, experienced, and obsessed with your results.</p>
        </div>
      </section>

      {/* Trainer Grid */}
      <section className="py-16 md:py-24 bg-dark-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((t, i) => (
              <div key={t.id} className="bg-apex rounded-2xl overflow-hidden card-hover border border-white/5 group cursor-pointer"
                onClick={() => setSelectedTrainer(i)}>
                <div className="relative h-56 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-apex via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-heading text-white text-xl">{t.avatar}</div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-2xl text-white tracking-wide group-hover:text-accent transition-colors mb-1">{t.name.toUpperCase()}</h3>
                  <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">{t.title}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {t.specialties.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-300">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>📚 {t.classes} classes</span>
                    <span>👥 {t.members.toLocaleString()} members</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Modal */}
      {trainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTrainer(null)}>
          <div className="bg-dark-grey rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={trainer.image} alt={trainer.name} className="w-full h-64 object-cover" />
              <button onClick={() => setSelectedTrainer(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-apex/80 text-white flex items-center justify-center hover:bg-apex transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="absolute bottom-4 left-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center font-heading text-white text-2xl">{trainer.avatar}</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-4xl text-white tracking-wide mb-1">{trainer.name.toUpperCase()}</h3>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">{trainer.title}</p>
              <p className="text-slate-400 leading-relaxed mb-5">{trainer.bio}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {trainer.specialties.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-red-400 text-sm font-medium">{s}</span>
                ))}
              </div>
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {trainer.certifications.map(c => (
                    <span key={c} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs">✓ {c}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-6 text-sm text-slate-400 mb-6">
                <span>📚 {trainer.classes} classes/week</span>
                <span>👥 {trainer.members.toLocaleString()} members coached</span>
              </div>
              <Link to="/classes" className="btn-accent block text-center" onClick={() => setSelectedTrainer(null)}>
                Book {trainer.name.split(' ')[0]}'s Classes
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
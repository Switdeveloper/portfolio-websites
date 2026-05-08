import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { classes, classTypes, days } from '../data/fitness'
import ClassCard from '../components/ClassCard'

export default function Classes() {
  const [selectedDay, setSelectedDay] = useState('All Days')
  const [selectedType, setSelectedType] = useState('All')

  const filtered = useMemo(() => {
    return classes.filter(c => {
      const matchDay = selectedDay === 'All Days' || c.day === selectedDay
      const matchType = selectedType === 'All' || c.type === selectedType
      return matchDay && matchType
    })
  }, [selectedDay, selectedType])

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-apex py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl md:text-7xl text-white tracking-wider mb-4">CLASS SCHEDULE</h1>
          <p className="text-slate-400 text-lg max-w-xl">200+ classes running monthly. Find your time, your class, your results.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-dark-grey rounded-2xl p-4 md:p-6 mb-8 border border-white/5">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Day</span>
              <div className="flex flex-wrap gap-2">
                {days.map(d => (
                  <button key={d} onClick={() => setSelectedDay(d)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDay === d ? 'bg-accent text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Class Type</span>
              <div className="flex flex-wrap gap-2">
                {classTypes.map(ct => (
                  <button key={ct} onClick={() => setSelectedType(ct)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedType === ct ? 'bg-white text-apex font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}>
                    {ct}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm">
            Showing <span className="text-white font-bold">{filtered.length}</span> class{filtered.length !== 1 ? 'es' : ''}
          </p>
          {(selectedDay !== 'All Days' || selectedType !== 'All') && (
            <button onClick={() => { setSelectedDay('All Days'); setSelectedType('All') }}
              className="text-accent text-sm font-bold hover:underline">
              Clear filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(cls => (
              <ClassCard key={cls.id} cls={cls} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏋️</div>
            <h3 className="font-heading text-2xl text-white tracking-wide mb-2">No classes match</h3>
            <p className="text-slate-400 mb-4">Try a different day or class type.</p>
            <button onClick={() => { setSelectedDay('All Days'); setSelectedType('All') }}
              className="btn-accent inline-block">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
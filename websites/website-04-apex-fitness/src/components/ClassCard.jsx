import { Link } from 'react-router-dom'

const intensityColor = {
  'Low': 'bg-emerald-500/20 text-emerald-400',
  'Moderate': 'bg-amber-500/20 text-amber-400',
  'High': 'bg-orange-500/20 text-orange-400',
  'Extreme': 'bg-red-500/20 text-red-400',
}

export default function ClassCard({ cls, showDayTime = true }) {
  return (
    <div className="bg-dark-grey rounded-2xl overflow-hidden card-hover group border border-white/5">
      <div className="relative h-44 overflow-hidden">
        <img
          src={cls.image}
          alt={cls.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-apex/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-bold bg-apex/80 text-white backdrop-blur-sm">{cls.type}</span>
          <span className={`px-2.5 py-1 rounded text-xs font-bold ${intensityColor[cls.intensity]}`}>{cls.intensity}</span>
        </div>
        {cls.spots <= 5 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-bold bg-amber-500 text-apex">
            Only {cls.spots} spots left!
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-heading text-xl text-white tracking-wide mb-1 group-hover:text-accent transition-colors">{cls.name}</h3>
        <p className="text-slate-400 text-sm mb-3">{cls.trainer}</p>

        {showDayTime && (
          <div className="flex items-center gap-3 mb-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {cls.day}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {cls.time}
            </span>
            <span>·</span>
            <span>{cls.duration}</span>
          </div>
        )}

        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{cls.description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">{cls.trainerAvatar}</div>
            {cls.spots} spots left
          </div>
          <Link to="/contact" className="text-accent text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            Book Class
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
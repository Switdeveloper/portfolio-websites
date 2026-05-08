import { Link } from 'react-router-dom'
import { testimonials } from '../data/courses'

const featuredStories = [
  { name: 'Priya Sharma', role: 'Senior Frontend Developer at Shopify', avatar: 'PS', course: 'React Masterclass', quote: 'Within 6 months of finishing the React course, I landed a senior role at Shopify with a 40% pay raise. The portfolio projects were what made the difference — my interviewer said they were the best they\'d seen from a candidate.', result: '40% salary increase', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80' },
  { name: 'Tom Mitchell', role: 'Product Designer at Spotify', avatar: 'TM', course: 'UI/UX Design', quote: 'I went from zero Figma knowledge to designing features used by 200 million monthly users. Marcus explains complex UX theory in a way that finally makes sense.', result: 'Landed dream job at Spotify', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  { name: 'Layla Hassan', role: 'Data Scientist at Netflix', avatar: 'LH', course: 'Python & ML', quote: 'The hands-on projects were brutal but worth it. I built a recommendation engine that\'s very similar to what I now do at Netflix. The gap between "learned" and "can do" is everything.', result: 'Career pivot to Data Science', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80' },
  { name: 'Marco Silva', role: 'DevOps Engineer at AWS', avatar: 'MS', course: 'AWS Solutions Architect', quote: 'I passed the AWS Solutions Architect certification on my first try. The practice exams and real-world scenarios were exactly what I needed. My employer paid for the course as a benefit.', result: 'AWS Certification + Promotion', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80' },
  { name: 'Yuki Tanaka', role: 'Freelance Brand Designer', avatar: 'YT', course: 'Brand Strategy', quote: 'My freelance income tripled after taking the brand strategy course. I went from charging $500 logos to $5,000 brand packages. The business side of design was the missing piece.', result: '3x freelance income', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80' },
  { name: 'Daniel Osei', role: 'Growth PM at a Y Combinator Startup', avatar: 'DO', course: 'Product Management', quote: 'I got hired as a Product Manager without any prior PM experience. The project-focused curriculum gave me real artifacts to show in interviews. Nina is an incredible instructor.', result: 'PM role at YC startup', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80' },
]

const outcomes = [
  { stat: '78%', label: 'of graduates report a career change or promotion within 6 months' },
  { stat: '92%', label: 'complete their courses within 90 days of enrollment' },
  { stat: '$42K', label: 'average salary increase for learners who transition to tech roles' },
  { stat: '4.8/5', label: 'average course rating across 85,000+ student reviews' },
]

export default function Stories() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">Real Stories. Real Outcomes.</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            250,000+ learners have transformed their careers with SkillForge. Here are some of their stories.
          </p>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {outcomes.map((o, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white font-heading">{o.stat}</div>
                <div className="text-indigo-200 mt-1 text-sm leading-snug">{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Featured Success Stories</h2>
            <p className="section-subtitle">From curious beginners to industry professionals</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story, i) => (
              <div key={i} className={`bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover flex flex-col ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="h-40 bg-slate-100 overflow-hidden relative">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">{story.avatar}</div>
                    <div>
                      <div className="font-semibold text-secondary text-sm">{story.name}</div>
                      <div className="text-xs text-slate-500">{story.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">"{story.quote}"</p>
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      ✨ {story.result}
                    </span>
                    <div className="text-xs text-slate-400 mt-2">via {story.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials carousel (same as Home) */}
      <section className="py-20 md:py-28 bg-indigo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What Students Say</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, si) => (
                    <svg key={si} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-secondary font-medium mb-4 leading-relaxed">"{t.quote}"</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-secondary text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role} · {t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">Your Story Could Be Next</h2>
          <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">Join 250,000+ learners and start your transformation today.</p>
          <Link to="/courses" className="btn-accent px-10 py-4 rounded-xl text-base">
            Start Learning for Free
          </Link>
        </div>
      </section>
    </div>
  )
}
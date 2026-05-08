import { useState, useMemo } from 'react'
import { courses, categories, levels } from '../data/courses'
import CourseCard from '../components/CourseCard'

export default function Courses() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [level, setLevel] = useState('All')

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All' || c.category === category
      const matchLevel = level === 'All' || c.level === level
      return matchSearch && matchCategory && matchLevel
    })
  }, [search, category, level])

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-indigo-light py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-secondary mb-4">
            Explore 500+ Courses
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            From React to brand strategy — find exactly what you need to level up your career.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-8 shadow-sm">
          {/* Search */}
          <div className="relative mb-4">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 font-medium">Category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      category === cat
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-slate-500 font-medium">Level:</span>
              {levels.map(l => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    level === l
                      ? 'bg-secondary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-500">
            Showing <span className="font-semibold text-secondary">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
          </p>
          {(search || category !== 'All' || level !== 'All') && (
            <button
              onClick={() => { setSearch(''); setCategory('All'); setLevel('All') }}
              className="text-sm text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-heading text-xl font-bold text-secondary mb-2">No courses found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); setLevel('All') }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
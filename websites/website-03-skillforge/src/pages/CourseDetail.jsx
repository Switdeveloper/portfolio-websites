import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { courses } from '../data/courses'

function CurriculumAccordion({ curriculum }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="space-y-2">
      {curriculum.map((mod, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-secondary hover:text-primary transition-colors"
          >
            <span className="text-sm md:text-base">{mod.module}</span>
            <svg className={`w-5 h-5 transition-transform flex-shrink-0 ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <ul className="px-5 pb-4 space-y-2">
              {mod.lessons.map((lesson, li) => (
                <li key={li} className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {lesson}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

function EnrollmentModal({ course, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', agree: false })
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.agree) setSubmitted(true)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-heading text-2xl font-bold text-secondary mb-2">You're Enrolled!</h3>
            <p className="text-slate-500 mb-6">Check your inbox at <strong>{form.email}</strong> for access instructions.</p>
            <Link to="/courses" onClick={onClose} className="btn-primary block text-center">
              Continue Browsing
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-bold text-secondary">Enroll in Course</h3>
              <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 mb-5 flex items-center gap-3">
              <img src={course.image} alt={course.title} className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <div className="font-semibold text-secondary text-sm">{course.title}</div>
                <div className="text-sm text-primary font-bold">{course.price === 0 ? 'Free' : `$${course.price}`}</div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Ada Lovelace" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="ada@example.com" />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required checked={form.agree} onChange={e => setForm({ ...form, agree: e.target.checked })} className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary" />
                <span className="text-sm text-slate-500">I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>.</span>
              </label>
              <button type="submit" className="w-full btn-primary py-3">
                Complete Enrollment — {course.price === 0 ? 'Free' : `$${course.price}`}
              </button>
              <p className="text-xs text-center text-slate-400">30-day money-back guarantee · Lifetime access</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function CourseDetail() {
  const { id } = useParams()
  const [enrolled, setEnrolled] = useState(false)
  const course = courses.find(c => c.id === parseInt(id))

  if (!course) {
    return (
      <div className="pt-32 text-center">
        <h1 className="font-heading text-2xl font-bold text-secondary">Course not found</h1>
        <Link to="/courses" className="btn-primary mt-4 inline-block">Browse Courses</Link>
      </div>
    )
  }

  const related = courses.filter(c => c.id !== course.id && c.category === course.category).slice(0, 3)

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">{course.category}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.level === 'Beginner' ? 'bg-emerald-500/20 text-emerald-300' :
                  course.level === 'Intermediate' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-red-500/20 text-red-300'
                }`}>{course.level}</span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{course.title}</h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span>rating</span>
                </div>
                <span>·</span>
                <span>{course.students.toLocaleString()} students</span>
                <span>·</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center font-bold text-white text-sm">{course.instructorAvatar}</div>
                <div className="text-sm">
                  <div className="font-semibold text-white">{course.instructor}</div>
                  <div className="text-slate-400">{course.instructorTitle}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mb-2 text-xs text-slate-400">
                {course.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-800 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={course.image} alt={course.title} className="w-full h-56 object-cover" />
                <div className="p-6 bg-white">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-secondary">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                    {course.price > 0 && (
                      <>
                        <span className="text-lg text-slate-400 line-through">${course.originalPrice}</span>
                        <span className="text-sm text-emerald-600 font-semibold">{Math.round((1 - course.price / course.originalPrice) * 100)}% off</span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setEnrolled(true)}
                    className="w-full btn-accent py-3.5 text-base rounded-xl mb-3"
                  >
                    {course.price === 0 ? 'Enroll for Free' : `Buy for $${course.price}`}
                  </button>
                  <p className="text-xs text-center text-slate-400">30-day money-back guarantee · Lifetime access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* What you'll learn */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.curriculum.flatMap(mod => mod.lessons).map((l, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {l}
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-4">Course Curriculum</h2>
              <p className="text-slate-500 text-sm mb-4">{course.curriculum.reduce((acc, m) => acc + m.lessons.length, 0)} lessons across {course.curriculum.length} modules</p>
              <CurriculumAccordion curriculum={course.curriculum} />
            </div>

            {/* Instructor */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-4">Your Instructor</h2>
              <div className="flex items-start gap-4 p-5 bg-indigo-light rounded-2xl border border-indigo-100">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xl text-primary flex-shrink-0">{course.instructorAvatar}</div>
                <div>
                  <div className="font-heading font-bold text-lg text-secondary">{course.instructor}</div>
                  <div className="text-sm text-primary mb-2">{course.instructorTitle}</div>
                  <div className="flex gap-4 text-sm text-slate-500">
                    <span>{course.students.toLocaleString()} students</span>
                    <span>{course.curriculum.length} courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — sticky enrollment */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-5">
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-2xl font-extrabold text-secondary">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                  {course.price > 0 && <span className="text-slate-400 line-through text-sm">${course.originalPrice}</span>}
                </div>
                <button onClick={() => setEnrolled(true)} className="w-full btn-accent py-3 mb-2">
                  {course.price === 0 ? 'Enroll for Free' : `Buy for $${course.price}`}
                </button>
                <p className="text-xs text-center text-slate-400 mb-4">30-day money-back guarantee</p>
                <ul className="space-y-2">
                  {['Lifetime access', 'Certificate of completion', 'Downloadable resources', 'Access on mobile & desktop'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-secondary mb-6">More in {course.category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(c => <CourseCard key={c.id} course={c} />)}
            </div>
          </div>
        )}
      </div>

      {enrolled && <EnrollmentModal course={course} onClose={() => setEnrolled(false)} />}
    </div>
  )
}
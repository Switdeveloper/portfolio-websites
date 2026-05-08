import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover group block"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/90 text-white backdrop-blur-sm">
            {course.category}
          </span>
        </div>
        {course.price === 0 && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
              FREE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
            course.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
            'bg-red-100 text-red-700'
          }`}>
            {course.level}
          </span>
          <span className="text-xs text-slate-400">{course.duration}</span>
        </div>

        <h3 className="font-heading font-bold text-secondary text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-slate-500 mb-3 line-clamp-1">{course.instructor}</p>

        <div className="flex items-center gap-3 mb-4 text-sm">
          <div className="flex items-center gap-1 text-amber-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-slate-700">{course.rating}</span>
          </div>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{course.students.toLocaleString()} students</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {course.price === 0 ? (
              <span className="font-bold text-emerald-600 text-lg">Free</span>
            ) : (
              <>
                <span className="font-bold text-secondary text-lg">${course.price}</span>
                <span className="text-sm text-slate-400 line-through">${course.originalPrice}</span>
              </>
            )}
          </div>
          <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            View Course
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
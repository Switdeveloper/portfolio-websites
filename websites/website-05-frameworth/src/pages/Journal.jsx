import { Link } from 'react-router-dom'
import { journalPosts } from '../data/photography'

export default function Journal() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-16 md:py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-3">Journal</h1>
          <p className="text-muted text-lg max-w-xl">Behind-the-scenes, photography techniques, and stories from our work.</p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="#" className="group grid md:grid-cols-2 gap-8 items-center hover:opacity-90 transition-opacity">
            <div className="overflow-hidden rounded-xl">
              <img src={journalPosts[0].image} alt={journalPosts[0].title}
                className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div>
              <span className="text-xs font-medium text-accent uppercase tracking-widest">Featured · {journalPosts[0].date}</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-frame mt-2 mb-3 leading-snug">{journalPosts[0].title}</h2>
              <p className="text-muted leading-relaxed mb-4">{journalPosts[0].excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-muted">
                <span>{journalPosts[0].category}</span>
                <span>·</span>
                <span>{journalPosts[0].readTime} read</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {journalPosts.map((post) => (
              <Link key={post.id} to="#" className="group block">
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-medium text-accent uppercase tracking-widest">{post.category}</span>
                <h3 className="font-heading text-xl font-bold text-frame mt-1 mb-2 group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
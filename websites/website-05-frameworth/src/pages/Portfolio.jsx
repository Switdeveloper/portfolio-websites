import { useState, useMemo } from 'react'
import { portfolio, categories } from '../data/photography'
import Lightbox from '../components/Lightbox'

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = useMemo(() => {
    return activeCategory === 'All'
      ? portfolio
      : portfolio.filter(p => p.category === activeCategory)
  }, [activeCategory])

  const openLightbox = (index) => {
    const globalIndex = portfolio.indexOf(filtered[index])
    setLightboxIndex(globalIndex)
  }

  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () => setLightboxIndex(i => (i + 1) % portfolio.length)
  const prevImage = () => setLightboxIndex(i => (i - 1 + portfolio.length) % portfolio.length)

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-16 md:py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-3">Portfolio</h1>
          <p className="text-muted text-lg">12 years. 28 countries. 800+ stories told.</p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 md:top-20 z-40 bg-offwhite border-b border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-frame text-white'
                    : 'bg-light text-muted hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — Masonry-ish grid using CSS columns */}
      <section className="py-10 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted text-sm mb-6">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</p>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <p className="font-heading text-lg">{item.title}</p>
                      <p className="text-sm text-gray-300">{item.category} · {item.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={portfolio}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  )
}
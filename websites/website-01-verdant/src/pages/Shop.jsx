import { useState, useMemo } from 'react';
import PlantCard from '../components/PlantCard';
import { plants } from '../data/plants';

const categories = ['All', 'Indoor', 'Succulents', 'Rare'];

export default function Shop() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    let result = plants;

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, category, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-verdant-700 mb-2">Shop Plants</h1>
        <p className="text-verdant-500">{plants.length} plants to explore</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-verdant-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search plants..."
            className="input-field pl-10"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-verdant-500 text-white'
                  : 'bg-verdant-50 text-verdant-600 hover:bg-verdant-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-4 py-2.5 border border-verdant-200 rounded-xl text-sm text-verdant-600 bg-white focus:outline-none focus:ring-2 focus:ring-verdant-400"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🌱</span>
          <h3 className="font-display text-xl font-semibold text-verdant-700 mb-2">No plants found</h3>
          <p className="text-verdant-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-verdant-400 mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
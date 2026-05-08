import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function PlantCard({ plant }) {
  const { addItem } = useCart();

  return (
    <div className="plant-card group">
      <div className="relative overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!plant.inStock && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Out of Stock
          </div>
        )}
        {plant.tags.includes('trending') && (
          <div className="absolute top-3 right-3 bg-verdant-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Trending
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-verdant-400 uppercase tracking-wide">{plant.category}</span>
          <span className="text-xs text-verdant-300">{plant.careLevel}</span>
        </div>

        <h3 className="font-display text-lg font-semibold text-verdant-700 mb-1 group-hover:text-verdant-500 transition-colors">
          {plant.name}
        </h3>

        <p className="text-sm text-verdant-500 mb-3 leading-relaxed">{plant.description}</p>

        <div className="flex items-center gap-3 mb-3 text-xs text-verdant-400">
          <span>☀️ {plant.light}</span>
          <span>💧 {plant.water}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-xl font-bold text-verdant-600">${plant.price}</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-amber-400 text-sm">{'★'.repeat(Math.floor(plant.rating))}</span>
              <span className="text-xs text-verdant-400">({plant.reviews})</span>
            </div>
          </div>
          <button
            onClick={() => addItem(plant)}
            disabled={!plant.inStock}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              plant.inStock
                ? 'bg-verdant-500 text-white hover:bg-verdant-600 active:scale-95 shadow-sm'
                : 'bg-verdant-100 text-verdant-400 cursor-not-allowed'
            }`}
          >
            {plant.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
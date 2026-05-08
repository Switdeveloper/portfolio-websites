import { useState } from 'react';
import { careGuides } from '../data/plants';
import { plants } from '../data/plants';

const lightLevels = ['Low Light', 'Medium Light', 'Bright Indirect', 'Direct Sun'];

export default function PlantCare() {
  const [activeGuide, setActiveGuide] = useState(null);
  const popularPlants = plants.filter(p => p.inStock).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-verdant-500 to-verdant-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Plant Care Guides</h1>
          <p className="text-verdant-100 text-lg max-w-xl mx-auto">
            Everything you need to help your green companions thrive. From watering basics to pest control.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="section-heading mb-8">Essential Care Guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careGuides.map((guide, i) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-verdant-200"
              onClick={() => setActiveGuide(activeGuide === i ? null : i)}
            >
              <span className="text-4xl mb-4 block">{guide.icon}</span>
              <h3 className="font-display text-lg font-semibold text-verdant-700 mb-2">{guide.title}</h3>
              <p className="text-sm text-verdant-500 leading-relaxed">{guide.content}</p>
              {activeGuide === i && (
                <div className="mt-4 p-4 bg-verdant-50 rounded-xl">
                  <p className="text-sm text-verdant-600 font-medium">💡 Pro tip:</p>
                  <p className="text-sm text-verdant-500 mt-1">{guide.tip}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Light Requirements */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">Understanding Light Levels</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { level: 'Low Light', desc: 'North-facing windows or interior rooms. Perfect for: Snake Plant, ZZ Plant, Pothos.', icon: '🌙' },
              { level: 'Medium Light', desc: 'East-facing windows or a few feet from south/west windows. Perfect for: Peace Lily, Ferns.', icon: '⛅' },
              { level: 'Bright Indirect', desc: 'Near south/west windows, screened. Perfect for: Monstera, Fiddle Leaf, Pothos.', icon: '🌤️' },
              { level: 'Direct Sun', desc: 'Unobstructed south or west windows. Perfect for: Succulents, Cacti, Bird of Paradise.', icon: '☀️' },
            ].map(item => (
              <div key={item.level} className="bg-cream rounded-xl p-5 border border-verdant-100">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold text-verdant-700 mb-2">{item.level}</h3>
                <p className="text-sm text-verdant-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Watering Schedule Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="section-heading mb-8">Quick Watering Reference</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-verdant-100">
            {[
              { freq: 'Daily', desc: 'Only for water plants or very dry climates', icon: '🔥', color: 'text-red-500' },
              { freq: 'Weekly', desc: 'Most tropical plants in summer', icon: '💧', color: 'text-blue-500' },
              { freq: 'Every 2 Weeks', desc: 'Succulents and cacti', icon: '🌵', color: 'text-amber-500' },
              { freq: 'Monthly', desc: 'ZZ Plant, Snake Plant in winter', icon: '❄️', color: 'text-verdant-400' },
            ].map(item => (
              <div key={item.freq} className="p-6 text-center">
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <h3 className={`font-semibold text-lg mb-1 ${item.color}`}>{item.freq}</h3>
                <p className="text-sm text-verdant-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Plants Care Summary */}
      <section className="bg-verdant-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">Care at a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-verdant-500 text-white">
                  <th className="text-left px-6 py-4 text-sm font-medium">Plant</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Light</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Water</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Humidity</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-verdant-100">
                {popularPlants.map(plant => (
                  <tr key={plant.id} className="hover:bg-verdant-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={plant.image} alt={plant.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-verdant-700">{plant.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-verdant-600">☀️ {plant.light}</td>
                    <td className="px-6 py-4 text-sm text-verdant-600">💧 {plant.water}</td>
                    <td className="px-6 py-4 text-sm text-verdant-600">{plant.humidity}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        plant.careLevel === 'Very Easy' ? 'bg-verdant-100 text-verdant-600' :
                        plant.careLevel === 'Easy' ? 'bg-green-100 text-green-700' :
                        plant.careLevel === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {plant.careLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
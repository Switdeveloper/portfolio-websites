import { useState } from 'react';
import { Link } from 'react-router-dom';
import PlantCard from '../components/PlantCard';
import { plants } from '../data/plants';

const benefits = [
  { icon: '🚚', title: 'Free Carbon-Neutral Shipping', desc: 'On all orders over $50' },
  { icon: '💚', title: '30-Day Plant Guarantee', desc: 'We replace any plant that doesn\'t thrive' },
  { icon: '📦', title: 'Eco-Friendly Packaging', desc: '100% compostable materials' },
  { icon: '🌱', title: 'Expert Care Support', desc: 'Lifetime guidance for every plant' },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const featuredPlants = plants.filter(p => p.inStock).slice(0, 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-verdant-600 via-verdant-500 to-verdant-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #3D9E2F 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8B6914 0%, transparent 40%)'}} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur rounded-full text-sm font-medium mb-6">
                🌿 Spring Collection 2026 is Here
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
                Bring Nature <br />
                <span className="text-verdant-200">Into Every Room</span>
              </h1>
              <p className="text-lg text-verdant-100 leading-relaxed mb-8 max-w-md">
                Premium, ethically sourced houseplants delivered to your door with care instructions tailored to your space and lifestyle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary bg-white text-verdant-600 hover:bg-verdant-50">
                  Shop Plants →
                </Link>
                <Link to="/plant-care" className="btn-outline border-white text-white hover:bg-white hover:text-verdant-600">
                  Care Guides
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=700"
                alt="Indoor plants collection"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-verdant-700 rounded-2xl px-5 py-3 shadow-lg">
                <p className="text-2xl font-bold text-verdant-600">10K+</p>
                <p className="text-sm text-verdant-500">Happy Plant Parents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-8 border-b border-verdant-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-verdant-700">{b.title}</p>
                  <p className="text-xs text-verdant-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-heading">Our Favorites</h2>
            <p className="text-verdant-500">Hand-picked plants our team loves most</p>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-verdant-500 font-medium hover:text-verdant-700 transition-colors">
            View All <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
        <Link to="/shop" className="sm:hidden flex justify-center mt-6 text-verdant-500 font-medium">
          View All Plants →
        </Link>
      </section>

      {/* Value Props */}
      <section className="bg-verdant-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading">Why Choose Verdant & Co?</h2>
            <p className="text-verdant-500 max-w-lg mx-auto">
              We are more than a plant shop — we are a community of plant lovers committed to bringing green into every space.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏡',
                title: 'Curated for Your Space',
                desc: 'Not sure what fits your home? Take our quick plant quiz and get personalized recommendations based on your light, space, and lifestyle.',
              },
              {
                icon: '🌍',
                title: 'Sustainably Sourced',
                desc: 'Every plant is sourced from ethical nurseries that prioritize environmental health. We offset 200% of our carbon footprint.',
              },
              {
                icon: '🤝',
                title: 'Community First',
                desc: 'Join 10,000+ plant lovers in our community. Share tips, get advice, and celebrate your green wins with fellow plant parents.',
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-display text-xl font-semibold text-verdant-700 mb-3">{item.title}</h3>
                <p className="text-verdant-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plant Care Teaser */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
              alt="Plant care"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="section-heading">We Help Your Plants Thrive</h2>
            <p className="text-verdant-500 mb-6 leading-relaxed">
              Every plant comes with a detailed care guide, but our support does not stop there. From watering schedules to pest management, we have your plants covered.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Personalized watering reminders',
                'Light requirement guides',
                'Pest diagnosis support',
                'Seasonal care tips',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-verdant-600">
                  <span className="w-6 h-6 bg-verdant-100 rounded-full flex items-center justify-center text-verdant-500 text-sm">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/plant-care" className="btn-primary inline-block">
              Explore Care Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-verdant-600 text-white py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-3">Join Our Plant Community 🌱</h2>
          <p className="text-verdant-200 mb-8">Get plant tips, care reminders, and exclusive offers delivered to your inbox.</p>
          {subscribed ? (
            <div className="bg-verdant-500 rounded-2xl px-8 py-6">
              <span className="text-3xl">🎉</span>
              <p className="font-semibold mt-2">Welcome to the Verdant family!</p>
              <p className="text-sm text-verdant-200 mt-1">Check your inbox for a care guide PDF on us.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3 bg-white/15 border border-white/20 rounded-xl text-white placeholder-verdant-200 focus:outline-none focus:ring-2 focus:ring-verdant-300"
              />
              <button type="submit" className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-400 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
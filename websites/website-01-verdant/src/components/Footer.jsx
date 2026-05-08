import { Link } from 'react-router-dom';

const footerLinks = {
  Shop: [{ label: 'All Plants', to: '/shop' }, { label: 'Indoor Plants', to: '/shop?category=Indoor' }, { label: 'Succulents', to: '/shop?category=Succulents' }],
  Learn: [{ label: 'Plant Care', to: '/plant-care' }, { label: 'Watering Guide', to: '/plant-care' }, { label: 'Light Guide', to: '/plant-care' }],
  Company: [{ label: 'About Us', to: '/about' }, { label: 'Contact', to: '/contact' }],
};

export default function Footer() {
  return (
    <footer className="bg-verdant-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-verdant-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🌿</span>
              </div>
              <span className="font-display text-xl font-semibold">Verdant & Co</span>
            </div>
            <p className="text-verdant-200 text-sm leading-relaxed">
              Bringing nature indoors since 2019. Premium plants, curated with care for every space and every soul.
            </p>
            <div className="flex gap-3 mt-4">
              {['instagram', 'facebook', 'pinterest'].map(s => (
                <span key={s} className="w-9 h-9 bg-verdant-600 rounded-full flex items-center justify-center hover:bg-verdant-500 transition-colors cursor-pointer">
                  {s === 'instagram' ? '📷' : s === 'facebook' ? '📘' : '📌'}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-verdant-200">{heading}</h3>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-verdant-100 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter mini */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-verdant-200">Stay in Bloom</h3>
            <p className="text-sm text-verdant-200 mb-3">Plant tips, new arrivals, and exclusive offers.</p>
            <form onSubmit={e => e.preventTarget?.()} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-verdant-600 border border-verdant-500 rounded-lg text-sm text-white placeholder-verdant-300 focus:outline-none focus:ring-2 focus:ring-verdant-400"
              />
              <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-verdant-600 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-verdant-300">
            © 2026 Verdant & Co. All rights reserved.
          </p>
          <p className="text-sm text-verdant-300">🌱 Carbon-neutral shipping on all orders</p>
        </div>
      </div>
    </footer>
  );
}
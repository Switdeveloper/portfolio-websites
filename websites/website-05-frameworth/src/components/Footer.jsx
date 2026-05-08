import { Link } from 'react-router-dom'

const footerLinks = {
  'Work': [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/services' },
    { name: 'Journal', path: '/journal' },
  ],
  'Studio': [
    { name: 'About', path: '/about' },
    { name: 'Behind the Scenes', path: '/journal' },
    { name: 'Press & Awards', path: '/about' },
    { name: 'Collaborate', path: '/contact' },
  ],
  'Support': [
    { name: 'Contact', path: '/contact' },
    { name: 'Book a Session', path: '/contact' },
    { name: 'FAQs', path: '/contact' },
    { name: 'Referrals', path: '/contact' },
  ],
  'Legal': [
    { name: 'Privacy Policy', path: '/contact' },
    { name: 'Terms of Use', path: '/contact' },
    { name: 'Print Licensing', path: '/contact' },
    { name: 'Cookie Policy', path: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-frame text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <span className="font-heading text-xl font-bold text-white">FrameWorth</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Award-winning photography studio. New York based, working worldwide since 2013.
            </p>
            <div className="flex gap-3 mt-4">
              {['IG', 'FB', 'TW', 'YT'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center text-xs font-bold transition-colors">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="font-heading text-sm tracking-widest text-gray-400 mb-4">{cat.toUpperCase()}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.name}>
                    <Link to={l.path} className="text-gray-400 text-sm hover:text-white transition-colors">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FrameWorth Photography. All rights reserved.</p>
          <p className="text-gray-600">Every frame tells a story worth keeping.</p>
        </div>
      </div>
    </footer>
  )
}
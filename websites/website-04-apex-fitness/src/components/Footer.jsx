import { Link } from 'react-router-dom'

const footerLinks = {
  'Programs': [
    { name: 'Classes', path: '/classes' },
    { name: 'Personal Training', path: '/trainers' },
    { name: 'Nutrition Coaching', path: '/pricing' },
    { name: 'Corporate Wellness', path: '/contact' },
  ],
  'Studio': [
    { name: 'About', path: '/about' },
    { name: 'Our Trainers', path: '/trainers' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ],
  'Support': [
    { name: 'Membership FAQ', path: '/contact' },
    { name: 'Class Schedule', path: '/classes' },
    { name: 'Trial Pass', path: '/contact' },
    { name: 'Refer a Friend', path: '/contact' },
  ],
  'Legal': [
    { name: 'Privacy Policy', path: '/contact' },
    { name: 'Terms of Service', path: '/contact' },
    { name: 'Membership Agreement', path: '/contact' },
    { name: 'Refund Policy', path: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-apex text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded bg-accent flex items-center justify-center font-heading text-white text-xl">A</div>
              <span className="font-heading text-white text-2xl tracking-wider">APEX</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xs">
              San Francisco's premier fitness studio. 5,200+ members transforming daily since 2017.
            </p>
            <div className="flex gap-3">
              {['IG', 'FB', 'TT', 'YT'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded bg-white/10 hover:bg-accent flex items-center justify-center text-xs font-bold transition-colors">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="font-heading text-sm tracking-widest text-slate-400 mb-4">{cat.toUpperCase()}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.name}>
                    <Link to={l.path} className="text-slate-400 text-sm hover:text-white transition-colors">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Apex Fitness. All rights reserved.</p>
          <p className="text-slate-600">Built for people who refuse to settle.</p>
        </div>
      </div>
    </footer>
  )
}
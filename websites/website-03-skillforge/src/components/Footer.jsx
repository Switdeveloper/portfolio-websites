import { Link } from 'react-router-dom'

const footerLinks = {
  Platform: [
    { name: 'Browse Courses', path: '/courses' },
    { name: 'Success Stories', path: '/stories' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'For Teams', path: '/contact' },
  ],
  Company: [
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/contact' },
    { name: 'Blog', path: '/contact' },
    { name: 'Press', path: '/contact' },
  ],
  Support: [
    { name: 'Help Center', path: '/contact' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Accessibility', path: '/contact' },
    { name: 'Community', path: '/contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/contact' },
    { name: 'Terms of Service', path: '/contact' },
    { name: 'Cookie Policy', path: '/contact' },
    { name: 'Refund Policy', path: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-lg">SkillForge</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Master in-demand skills with expert-led courses. Join 250,000+ learners worldwide.
            </p>
            <div className="flex gap-3 mt-4">
              {['twitter', 'linkedin', 'youtube', 'instagram'].map(social => (
                <a key={social} href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary transition-colors flex items-center justify-center" aria-label={social}>
                  <span className="text-xs capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-sm text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} SkillForge Learning. All rights reserved.</p>
          <p>Built for learners who don't settle.</p>
        </div>
      </div>
    </footer>
  )
}
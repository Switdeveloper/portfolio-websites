import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pricingPlans, faqs } from '../data/fitness'

function FAQAccordion() {
  const [open, setOpen] = useState(null)
  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between font-medium text-white hover:text-red-400 transition-colors">
            <span className="font-medium">{faq.question}</span>
            <svg className={`w-5 h-5 transition-transform flex-shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Pricing() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-apex py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-7xl text-white tracking-wider mb-4">MEMBERSHIP PLANS</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">No contracts. Cancel anytime. Your first week is always free.</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-dark-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div key={plan.name}
                className={`rounded-2xl p-6 flex flex-col h-full border ${plan.popular ? 'bg-accent border-accent ring-4 ring-accent/20' : 'bg-apex border-white/10'}`}>
                {plan.popular && (
                  <div className="text-center text-xs font-bold text-white bg-apex/40 py-1 rounded-full mb-4 -mx-6 -mt-6 rounded-b-none">MOST POPULAR</div>
                )}
                <div className="font-heading text-3xl text-white tracking-wide mb-1">{plan.name.toUpperCase()}</div>
                <div className="text-sm text-slate-400 mb-4">{plan.description}</div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-slate-400 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact"
                  className={`block w-full py-3 text-center text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${
                    plan.popular ? 'bg-white text-apex hover:bg-slate-100' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 text-slate-500 text-sm">
            All plans include a <strong className="text-white">7-day free trial</strong>. No credit card required. Cancel anytime.
          </div>
        </div>
      </section>

      {/* Comparison Features */}
      <section className="py-16 md:py-24 bg-apex">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">FULL COMPARISON</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-slate-400 font-medium">Feature</th>
                  {pricingPlans.map(p => (
                    <th key={p.name} className={`text-center py-3 font-heading text-lg tracking-wider ${p.popular ? 'text-accent' : 'text-white'}`}>{p.name.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Gym Access', '6am-10pm', '24/7', '24/7', '24/7'],
                  ['Group Classes', '2/week', 'Unlimited', 'Unlimited', 'Unlimited'],
                  ['Personal Training', '❌', '❌', '4/month', 'Custom'],
                  ['Nutrition Coaching', '❌', 'App only', '1-on-1', 'Team workshops'],
                  ['Recovery Zone', '❌', '✓', '✓', '✓'],
                  ['Body Scans', '❌', 'Monthly', 'Monthly', 'Monthly'],
                  ['Guest Passes', '❌', '2/month', 'Unlimited', 'Unlimited'],
                  ['Priority Booking', '❌', '❌', '✓', '✓'],
                  ['Elite Events', '❌', '❌', '✓', '✓'],
                  ['Team Reports', '❌', '❌', '❌', '✓'],
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                    <td className="py-3 pl-2 text-slate-400">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className={`py-3 text-center ${pricingPlans[j].popular ? 'text-white' : 'text-slate-300'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-dark-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">MEMBERSHIP FAQ</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-6xl text-white tracking-wide mb-4">NOT SURE YET?</h2>
          <p className="text-red-100 mb-8 text-lg">Try us free for 7 days. Zero commitment.</p>
          <Link to="/contact" className="bg-white text-apex font-bold px-10 py-4 rounded-xl hover:bg-slate-100 transition-colors text-base inline-block">
            Claim Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}
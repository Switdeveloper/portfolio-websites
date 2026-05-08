const team = [
  { name: 'Amara Osei', role: 'Founder & Plant Curator', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300', note: '15 years of horticulture experience' },
  { name: 'Marco Rossi', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', note: 'Supply chain & sustainability expert' },
  { name: 'Priya Nair', role: 'Customer Experience', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', note: 'Plant parent to 47 plants (and counting)' },
  { name: 'Leo Tanaka', role: 'Content & Education', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', note: 'Botany graduate, plant educator' },
];

const milestones = [
  { year: '2019', event: 'Started in a small apartment kitchen in Brooklyn' },
  { year: '2020', event: 'Shipped our first 500 plants during the plant boom' },
  { year: '2021', event: 'Launched the Plant Care Community with 2,000 members' },
  { year: '2022', event: 'Reached 5,000 happy plant parents across 48 states' },
  { year: '2023', event: 'Became carbon-neutral certified business' },
  { year: '2024', event: 'Partnered with regenerative farms in California and Oregon' },
  { year: '2025', event: '10,000+ plants delivered, zero plant lost in shipping' },
  { year: '2026', event: 'Launched the Plant Quiz — personalized recommendations for everyone' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-verdant-50 to-verdant-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-verdant-500 font-medium text-sm uppercase tracking-wider">Our Story</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-verdant-700 mt-2 mb-6">
              Rooted in Passion, Grown with Purpose
            </h1>
            <p className="text-lg text-verdant-600 leading-relaxed">
              Verdant & Co was born from a simple belief: every person deserves the joy and calm that comes from living with plants. What started as one woman's mission to fill her apartment with greenery has grown into a community of 10,000+ plant lovers — all committed to bringing nature closer to home.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600"
              alt="Our greenhouse"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="section-heading">Our Mission</h2>
            <p className="text-verdant-600 leading-relaxed mb-6">
              We believe plants are not just decor — they are companions. They clean our air, calm our minds, and connect us to the natural world even in the heart of cities.
            </p>
            <p className="text-verdant-600 leading-relaxed mb-6">
              Every plant we source is grown with organic methods by partner nurseries we visit personally. We reject the idea of fast plant commerce. Instead, we take time to propagate, nurture, and ensure each plant is ready for its forever home.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { num: '10K+', label: 'Happy Customers' },
                { num: '30+', label: 'Farm Partners' },
                { num: '100%', label: 'Carbon Neutral' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-verdant-600">{stat.num}</p>
                  <p className="text-sm text-verdant-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-12 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-verdant-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:text-right">
                    <div className="bg-verdant-50 inline-block px-4 py-2 rounded-xl">
                      <p className="font-display text-lg font-bold text-verdant-600">{m.year}</p>
                      <p className="text-sm text-verdant-500">{m.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-verdant-500 rounded-full border-4 border-white shadow hidden md:block" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-heading mb-4 text-center">Meet the Team</h2>
        <p className="text-verdant-500 text-center mb-12 max-w-lg mx-auto">
          We are a small team of plant obsessives, united by the love of green things and good design.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all text-center group">
              <div className="overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-verdant-700">{member.name}</h3>
                <p className="text-sm text-verdant-400 mb-1">{member.role}</p>
                <p className="text-xs text-verdant-300">{member.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-verdant-600 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-4xl mb-4 block">🌍</span>
          <h2 className="font-display text-3xl font-bold mb-4">Our Sustainability Promise</h2>
          <p className="text-verdant-100 leading-relaxed mb-8">
            We are a carbon-neutral business, certified by Carbon Trust. We offset 200% of our emissions through reforestation projects in the Pacific Northwest. Our packaging is 100% compostable, our logistics partner runs on renewable energy, and we pay living wages to every person in our supply chain.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {['🌱 100% compostable packaging', '🚚 Carbon-neutral shipping', '🤝 Fair wage certified', '🌲 200% emissions offset'].map(badge => (
              <span key={badge} className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">{badge}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
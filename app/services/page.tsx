'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function ServicesPage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedTier, setSelectedTier] = useState('')

  const handleBookCall = (tier: string) => {
    setSelectedTier(tier)
    setShowForm(true)
    // Scroll to form
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const services = [
    {
      name: 'AI Readiness Assessment',
      price: 'Starting at $3,500',
      duration: '2-week engagement',
      description: 'Perfect for organizations exploring AI opportunities',
      features: [
        'Current state analysis',
        'AI opportunity identification across departments',
        'ROI projections with realistic timelines',
        'Strategic roadmap with prioritized initiatives',
        'Technology stack recommendations',
        'Risk assessment and mitigation strategies'
      ],
      cta: 'Book Discovery Call',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'AI Pilot Implementation',
      price: '$15K-$25K',
      duration: '6-8 week engagement',
      description: 'Launch your first AI solution with expert guidance',
      features: [
        'One AI agent/solution deployment',
        'Custom prompt library (20+ prompts)',
        'Integration with existing systems',
        'Team training and documentation',
        'Success metrics tracking dashboard',
        '30-day post-launch support'
      ],
      cta: 'Book Discovery Call',
      gradient: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'AI Transformation Program',
      price: '$50K+ (Custom Scope)',
      duration: '3-6 month engagement',
      description: 'Enterprise-wide AI implementation and optimization',
      features: [
        'Multi-agent system implementation',
        'Product owner and strategic advisory',
        'Change management and adoption strategy',
        'Cross-functional team enablement',
        'Continuous optimization and iteration',
        'Executive reporting and governance'
      ],
      cta: 'Book Strategy Call',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-neural-50 via-primary-50 to-accent-50 py-20">
          <div className="section-container text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200 shadow-lg mb-8">
              <Sparkles className="w-4 h-4 text-accent-600" />
              <span className="text-sm font-semibold text-neural-700">Flexible, Results-Driven Engagements</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold text-neural-900 mb-6">
              AI Implementation Services
            </h1>
            <p className="text-xl text-neural-600 max-w-3xl mx-auto mb-8">
              From strategy to deployment, I help you build AI systems that deliver measurable business outcomes. Choose the engagement level that fits your needs.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`card relative ${service.popular ? 'ring-2 ring-accent-500' : ''}`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}>
                  <Check className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-display font-bold text-neural-900 mb-2">
                  {service.name}
                </h3>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {service.price}
                  </div>
                  <div className="text-sm text-neural-600">
                    {service.duration}
                  </div>
                </div>

                <p className="text-neural-600 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neural-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBookCall(service.name)}
                  className={`w-full btn-primary flex items-center justify-center space-x-2 group ${
                    service.popular ? 'bg-accent-600 hover:bg-accent-700' : ''
                  }`}
                >
                  <span>{service.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="bg-neural-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-display font-bold text-neural-900 mb-6 text-center">
              How I Work
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Discovery Call', desc: 'Understand your needs and goals' },
                { step: '2', title: 'Custom Proposal', desc: 'Tailored scope and pricing' },
                { step: '3', title: 'Implementation', desc: 'Build and deploy solutions' },
                { step: '4', title: 'Optimization', desc: 'Measure, iterate, improve' }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-neural-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-neural-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        {showForm && (
          <section id="booking-form" className="section-container bg-white">
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <h2 className="text-3xl font-display font-bold text-neural-900 mb-2">
                  Book Your Discovery Call
                </h2>
                <p className="text-neural-600 mb-8">
                  Selected: <span className="font-semibold text-primary-600">{selectedTier}</span>
                </p>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neural-900 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neural-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neural-900 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neural-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neural-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neural-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neural-900 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neural-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neural-900 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neural-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neural-900 mb-2">
                      Industry *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neural-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                    >
                      <option value="">Select your industry</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="financial">Financial Services</option>
                      <option value="retail">Retail / E-commerce</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="education">Education</option>
                      <option value="technology">Technology / SaaS</option>
                      <option value="professional">Professional Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neural-900 mb-2">
                      Budget Range (Optional)
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-neural-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                    >
                      <option value="">Select a range</option>
                      <option value="under5k">Under $5K</option>
                      <option value="5-15k">$5K - $15K</option>
                      <option value="15-50k">$15K - $50K</option>
                      <option value="50k+">$50K+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neural-900 mb-2">
                      Tell me about your AI needs *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-neural-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                      placeholder="What challenges are you trying to solve? What are your goals?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2 group"
                  >
                    <span>Submit Request</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-sm text-neural-500 text-center">
                    By submitting, you agree to receive email communications. I respect your privacy and you can unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

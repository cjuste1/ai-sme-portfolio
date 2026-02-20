'use client'

import { Calendar, Download, ArrowRight } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="section-container bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-neural-grid opacity-10"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Ready to AI-ify Your Operations?
        </h2>
        <p className="text-xl text-primary-100 mb-12 leading-relaxed">
          Let's transform your business challenges into AI-powered solutions that deliver measurable results.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 group">
            <Calendar className="w-5 h-5" />
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-900 transition-all duration-200 flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download My AI Playbook</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection

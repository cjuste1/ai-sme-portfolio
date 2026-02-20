'use client'

import { ArrowRight, Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neural-50 via-primary-50 to-accent-50">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-neural-grid opacity-30"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 section-container text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200 shadow-lg mb-8">
          <Sparkles className="w-4 h-4 text-accent-600" />
          <span className="text-sm font-semibold text-neural-700">AI SME | AI Operator | Industry-Specific Solutions</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-display font-bold text-neural-900 mb-6 leading-tight">
          From AI Tools to{' '}
          <span className="gradient-text">AI Systems</span>
        </h1>
        
        <p className="text-3xl md:text-4xl font-display font-semibold text-neural-700 mb-8">
          Turning Ideas into Real Business Outcomes
        </p>

        <p className="text-xl text-neural-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          I help organizations transform AI capabilities into measurable business results. 
          From strategy to implementation, I build systems that work.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-primary flex items-center space-x-2 group">
            <span>View My Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="btn-secondary">
            Explore AI Demos
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-neural-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero

'use client'

import { ArrowRight, TrendingUp, Users, Clock } from 'lucide-react'
import Image from 'next/image'

const FeaturedCaseStudy = () => {
  return (
    <section className="section-container bg-gradient-to-b from-neutral-50 to-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
          Featured Case Study
        </h2>
      </div>

      <div className="card max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image placeholder */}
          <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-16 h-16 text-primary-600" />
              </div>
              <p className="text-neutral-600 text-sm">Case study illustration</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4 w-fit">
              Financial Services
            </span>

            <h3 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              AI in Financial Services
            </h3>

            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              Boosting Efficiency with AI Solutions
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">40%</div>
                <div className="text-xs text-neutral-600">Efficiency Gain</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <Users className="w-6 h-6 text-accent-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">25%</div>
                <div className="text-xs text-neutral-600">Cost Reduction</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">60%</div>
                <div className="text-xs text-neutral-600">Faster Processing</div>
              </div>
            </div>

            <button className="btn-primary flex items-center space-x-2 w-fit group">
              <span>Read Case Study</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCaseStudy

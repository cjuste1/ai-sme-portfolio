'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { LucideIcon } from 'lucide-react'

interface PlaceholderPageProps {
  title: string
  subtitle: string
  description: string
  Icon: LucideIcon
  comingSoon?: boolean
}

const PlaceholderPage = ({ title, subtitle, description, Icon, comingSoon = true }: PlaceholderPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-neural-50 via-primary-50 to-accent-50 relative overflow-hidden pt-16">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-neural-grid opacity-30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <Icon className="w-12 h-12 text-white" />
          </div>

          {comingSoon && (
            <div className="inline-block px-4 py-2 bg-accent-100 text-accent-700 text-sm font-semibold rounded-full mb-6">
              Coming Soon
            </div>
          )}

          <h1 className="text-5xl md:text-6xl font-display font-bold text-neural-900 mb-6">
            {title}
          </h1>

          <p className="text-2xl font-display text-neural-700 mb-4">
            {subtitle}
          </p>

          <p className="text-xl text-neural-600 leading-relaxed">
            {description}
          </p>

          <div className="mt-12">
            <a
              href="/"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>← Back to Home</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PlaceholderPage

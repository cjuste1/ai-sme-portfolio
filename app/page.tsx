import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import LiveDemoShowcase from '@/components/LiveDemoShowcase'
import QuickStats from '@/components/QuickStats'
import ExploreWork from '@/components/ExploreWork'
import FeaturedCaseStudy from '@/components/FeaturedCaseStudy'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <LiveDemoShowcase />
      <QuickStats />
      <ExploreWork />
      <FeaturedCaseStudy />
      <CTASection />
      <Footer />
    </main>
  )
}

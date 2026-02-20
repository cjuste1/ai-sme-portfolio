import PlaceholderPage from '@/components/PlaceholderPage'
import { Mail } from 'lucide-react'

export default function ContactPage() {
  return (
    <PlaceholderPage
      title="Get In Touch"
      subtitle="Let's Build Something Together"
      description="Ready to transform your business with AI? Book a strategy call to discuss your challenges and explore how we can build AI solutions that deliver measurable results."
      Icon={Mail}
      comingSoon={false}
    />
  )
}

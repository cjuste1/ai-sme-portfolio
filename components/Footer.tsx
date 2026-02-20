'use client'

import { Linkedin, Mail, Github } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'Substack', href: '#', icon: Mail },
    { label: 'GitHub', href: '#', icon: Github },
  ]

  return (
    <footer className="bg-neural-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Chrystelle | AI SME
            </h3>
            <p className="text-neural-400 mb-4 leading-relaxed">
              AI Subject Matter Expert specializing in turning AI capabilities into measurable business outcomes across multiple industries.
            </p>
            <div className="flex space-x-4">
              {footerLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 bg-neural-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/expertise" className="text-neural-400 hover:text-primary-400 transition-colors">Expertise</Link></li>
              <li><Link href="/case-studies" className="text-neural-400 hover:text-primary-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/services" className="text-neural-400 hover:text-primary-400 transition-colors">Services</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-primary-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/prompts" className="text-neural-400 hover:text-primary-400 transition-colors">Prompt Library</Link></li>
              <li><Link href="/agents" className="text-neural-400 hover:text-primary-400 transition-colors">AI Agents</Link></li>
              <li><Link href="/contact" className="text-neural-400 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neural-800 pt-8 text-center text-neural-400 text-sm">
          <p>© {currentYear} Chrystelle - AI Upscale Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

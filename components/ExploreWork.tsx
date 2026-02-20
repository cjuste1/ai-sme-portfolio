'use client'

import { Brain, Building2, FileCode, Bot, Newspaper, Wrench } from 'lucide-react'
import Link from 'next/link'

const ExploreWork = () => {
  const sections = [
    {
      icon: Brain,
      title: 'AI Expertise Showcase',
      description: 'Comprehensive AI capability matrix and industry frameworks',
      href: '/expertise',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      icon: Building2,
      title: 'Industry Case Studies',
      description: '5+ real-world implementations across major sectors',
      href: '/case-studies',
      gradient: 'from-accent-500 to-accent-600',
    },
    {
      icon: FileCode,
      title: 'Prompt Library',
      description: '50+ production-ready prompts with documentation',
      href: '/prompts',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Bot,
      title: 'AI Agent Gallery',
      description: 'Working demonstrations of autonomous AI systems',
      href: '/agents',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Wrench,
      title: 'Consulting Services',
      description: 'Strategic AI implementation packages',
      href: '/services',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Newspaper,
      title: 'Blog / Thought Leadership',
      description: 'Insights on AI strategy and implementation',
      href: '/blog',
      gradient: 'from-green-500 to-emerald-600',
    },
  ]

  return (
    <section className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
          Explore My Work
        </h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Browse my portfolio of AI implementations, frameworks, and thought leadership
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {sections.map((section, index) => {
          const Icon = section.icon
          return (
            <Link
              key={index}
              href={section.href}
              className="card card-hover group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                {section.title}
              </h3>

              <p className="text-neutral-600 leading-relaxed">
                {section.description}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default ExploreWork

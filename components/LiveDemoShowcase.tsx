'use client'

import { Bot, FileText, Play } from 'lucide-react'

const LiveDemoShowcase = () => {
  const demos = [
    {
      icon: Bot,
      title: 'AI Agent Demo',
      description: 'Interactive examples of autonomous AI agents solving real business problems',
      gradient: 'from-primary-500 to-primary-700',
      badge: 'Live Demo',
    },
    {
      icon: FileText,
      title: 'Prompt Demo',
      description: 'Production-ready prompt templates with real-time examples and results',
      gradient: 'from-accent-500 to-accent-700',
      badge: 'Interactive',
    },
  ]

  return (
    <section className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-neural-900 mb-4">
          Live Demo Showcase
        </h2>
        <p className="text-xl text-neural-600 max-w-2xl mx-auto">
          Interactive examples of workflows and prompt systems.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {demos.map((demo, index) => {
          const Icon = demo.icon
          return (
            <div
              key={index}
              className="card card-hover group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${demo.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-display font-bold text-neural-900">
                  {demo.title}
                </h3>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                  {demo.badge}
                </span>
              </div>

              <p className="text-neural-600 mb-6 leading-relaxed">
                {demo.description}
              </p>

              <button className="flex items-center space-x-2 text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                <Play className="w-5 h-5" />
                <span>Try Demo</span>
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LiveDemoShowcase

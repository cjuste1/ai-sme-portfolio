'use client'

import { Briefcase, FileCode, Bot, GraduationCap } from 'lucide-react'

const QuickStats = () => {
  const stats = [
    {
      icon: Briefcase,
      number: '5+',
      label: 'Industries',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileCode,
      number: '50+',
      label: 'Prompts',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Bot,
      number: '10+',
      label: 'AI Agents Built',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: GraduationCap,
      number: '6',
      label: 'Bootcamp Modules',
      gradient: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <section className="section-container bg-gradient-to-b from-white to-neural-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-neural-900 mb-4">
          Quick Stats
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="card card-hover text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-display font-bold text-neural-900 mb-2">
                {stat.number}
              </div>
              <div className="text-neural-600 font-medium">
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default QuickStats

'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Headphones, MapPin, Utensils, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  const router = useRouter()
  
  const domains = [
    { icon: BookOpen, name: 'Books', description: 'Curated reads that shape your thinking' },
    { icon: Headphones, name: 'Podcasts', description: 'Inspiring conversations and insights' },
    { icon: Utensils, name: 'Restaurants', description: 'Culinary experiences that expand your palate' },
    { icon: MapPin, name: 'Travel & POI', description: 'Places that broaden your perspective' },
    { icon: Activity, name: 'Sport & Fitness', description: 'Activities that strengthen your body' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
            Capsule
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Build Your Next Self
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Transform yourself with curated 7-day micro-curriculums that blend books, podcasts, 
            restaurants, travel, and fitness into a cohesive personal growth journey.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            onClick={() => router.push('/onboarding')}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Five Domains of Growth
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="p-6 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 group">
                  <domain.icon className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {domain.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {domain.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 border-none">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Profile Your Taste
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Rate 20 carefully selected items across all five domains to create your unique taste profile.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Get Your Capsule
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive a personalized 7-day journey with 5 curated artifacts and daily micro-quests.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Earn Your Badge
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete your journey and unlock a unique generative badge that represents your growth.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
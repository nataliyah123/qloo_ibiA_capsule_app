'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RatingSelector } from '@/components/onboarding/rating-selector'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { seedEntities } from '@/lib/data/seed-entities'

export default function OnboardingPage() {
  const router = useRouter()
  const { ratings, setRating, generateTasteVector } = useOnboardingStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const currentEntity = seedEntities[currentIndex]
  const progress = ((currentIndex + 1) / seedEntities.length) * 100

  const handleNext = () => {
    if (currentIndex < seedEntities.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleComplete = async () => {
    setIsGenerating(true)
    
    // Simulate API call to generate taste vector
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate taste vector from ratings
    await generateTasteVector(ratings)
    
    // Redirect to capsule page
    router.push('/capsule/1')
  }

  const canProceed = ratings[currentEntity.id] !== undefined
  const isLastItem = currentIndex === seedEntities.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
              Discover Your Taste Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Rate these carefully curated items to help us understand your preferences
            </p>
            <Progress value={progress} className="w-full h-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {currentIndex + 1} of {seedEntities.length}
            </p>
          </motion.div>

          {/* Entity Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEntity.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <currentEntity.icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
                    {currentEntity.domain}
                  </span>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                    {currentEntity.title}
                  </h2>
                  {currentEntity.author && (
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      by {currentEntity.author}
                    </p>
                  )}
                  <p className="text-gray-500 dark:text-gray-400">
                    {currentEntity.description}
                  </p>
                </div>

                <RatingSelector
                  value={ratings[currentEntity.id]}
                  onChange={(rating) => setRating(currentEntity.id, rating)}
                />
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed || isGenerating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center"
            >
              {isGenerating ? (
                'Generating Your Profile...'
              ) : isLastItem ? (
                'Complete Profile'
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, Circle, MessageCircle, Sparkles, RefreshCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArtifactCard } from '@/components/capsule/artifact-card'
import { CoachChat } from '@/components/capsule/coach-chat'
import { ReflectionModal } from '@/components/capsule/reflection-modal'
import { BadgeModal } from '@/components/capsule/badge-modal'
import { useCapsuleStore } from '@/lib/stores/capsule-store'
import { ThemeToggle } from '@/components/theme-toggle'

interface CapsulePageProps {
  params: {
    id: string
  }
}

export default function CapsulePage({ params }: CapsulePageProps) {
  const { currentCapsule, loadCapsule, completeDay, setCurrentDay } = useCapsuleStore()
  const [showCoachChat, setShowCoachChat] = useState(false)
  const [showReflection, setShowReflection] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [currentDay, setCurrentDayState] = useState(1)

  useEffect(() => {
    loadCapsule(params.id)
  }, [params.id, loadCapsule])

  if (!currentCapsule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading your Capsule...</p>
        </div>
      </div>
    )
  }

  const completedDays = currentCapsule.completedDays || []
  const progress = (completedDays.length / 7) * 100
  const isCurrentDayComplete = completedDays.includes(currentDay)
  const canCompleteDay = !isCurrentDayComplete

  const handleCompleteDay = () => {
    if (canCompleteDay) {
      completeDay(currentDay)
      setShowReflection(true)
      
      if (currentDay === 7) {
        setTimeout(() => {
          setShowBadge(true)
        }, 2000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            {currentCapsule.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {currentCapsule.theme}
          </p>
          
          <div className="max-w-md mx-auto mb-6">
            <Progress value={progress} className="w-full h-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {completedDays.length} of 7 days completed
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
              <Button
                key={day}
                variant={currentDay === day ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentDayState(day)}
                className={`
                  ${completedDays.includes(day) ? 'bg-green-500 hover:bg-green-600 text-white' : ''}
                  ${currentDay === day ? 'ring-2 ring-purple-500' : ''}
                `}
              >
                {completedDays.includes(day) ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <Circle className="h-4 w-4 mr-1" />
                )}
                Day {day}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Current Day Content */}
        <motion.div 
          key={currentDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-6 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-purple-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Day {currentDay}
                </h2>
                {isCurrentDayComplete && (
                  <Badge className="ml-3 bg-green-500 text-white">
                    Completed
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCoachChat(true)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Coach
                </Button>
                
                {canCompleteDay && (
                  <Button
                    onClick={handleCompleteDay}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Day
                  </Button>
                )}
              </div>
            </div>

            {/* Daily Quest */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
                Today's Quest
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {currentCapsule.dailyQuests?.[currentDay - 1] || `Complete your Day ${currentDay} activities and reflect on your experience.`}
              </p>
            </div>

            {/* Artifacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCapsule.artifacts.map((artifact, index) => (
                <ArtifactCard 
                  key={artifact.id} 
                  artifact={artifact}
                  onRemix={() => {
                    // Handle remix logic
                    console.log('Remix artifact:', artifact.id)
                  }}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Floating Coach Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="lg"
            onClick={() => setShowCoachChat(true)}
            className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Modals */}
      <CoachChat 
        isOpen={showCoachChat}
        onClose={() => setShowCoachChat(false)}
        capsule={currentCapsule}
      />

      <ReflectionModal
        isOpen={showReflection}
        onClose={() => setShowReflection(false)}
        day={currentDay}
        capsuleId={currentCapsule.id}
      />

      <BadgeModal
        isOpen={showBadge}
        onClose={() => setShowBadge(false)}
        capsule={currentCapsule}
      />
    </div>
  )
}
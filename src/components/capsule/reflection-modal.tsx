"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Mic, MicOff } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface ReflectionModalProps {
  isOpen: boolean
  onClose: () => void
  day: number
  capsuleId: string
}

export function ReflectionModal({ isOpen, onClose, day, capsuleId }: ReflectionModalProps) {
  const [reflection, setReflection] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    if (!reflection.trim()) return
    
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Reflection Saved!",
      description: `Your Day ${day} reflection has been saved successfully.`,
    })
    
    setIsSaving(false)
    onClose()
    setReflection('')
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, this would interface with the Web Audio API
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Speak your reflection aloud (max 30 seconds)",
      })
    } else {
      toast({
        title: "Recording Stopped", 
        description: "Your audio reflection has been captured",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Day {day} Reflection
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Take a moment to reflect on today's experiences. What insights did you gain?
            </p>
          </div>

          <div className="space-y-4">
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Share your thoughts about today's journey..."
              className="min-h-32 resize-none"
              maxLength={500}
            />
            
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={toggleRecording}
                className={`${isRecording ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
              >
                {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isRecording ? 'Stop Recording' : 'Voice Reflection'}
              </Button>
              
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {reflection.length}/500 characters
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Skip for Now
            </Button>
            <Button
              onClick={handleSave}
              disabled={!reflection.trim() || isSaving}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {isSaving ? (
                'Saving...'
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Reflection
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
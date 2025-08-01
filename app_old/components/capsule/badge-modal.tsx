import { motion } from 'framer-motion'
import { Download, Share2, Award } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Capsule } from '@/lib/types'
import { BadgeRenderer } from './badge-renderer'

interface BadgeModalProps {
  isOpen: boolean
  onClose: () => void
  capsule: Capsule
}

export function BadgeModal({ isOpen, onClose, capsule }: BadgeModalProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download the SVG
    console.log('Downloading badge for:', capsule.title)
  }

  const handleShare = () => {
    // In a real app, this would open native share dialog
    if (navigator.share) {
      navigator.share({
        title: `I completed "${capsule.title}" on Capsule!`,
        text: 'Check out my personal growth journey',
        url: window.location.href,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center">
            <Award className="h-5 w-5 mr-2 text-yellow-500" />
            Congratulations!
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              You've completed your journey!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              "{capsule.title}" - You've earned this unique badge representing your growth.
            </p>
          </div>

          <div className="flex justify-center">
            <BadgeRenderer capsule={capsule} />
          </div>

          <div className="flex justify-center space-x-3">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleShare} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              🎉 Ready for your next transformation? Start a new Capsule and continue your growth journey!
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
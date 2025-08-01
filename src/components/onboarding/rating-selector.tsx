"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingSelectorProps {
  value?: number
  onChange: (rating: number) => void
}

export function RatingSelector({ value, onChange }: RatingSelectorProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  
  const labels = [
    'Not for me',
    'Slightly interested',
    'Somewhat interested', 
    'Very interested',
    'Love this!'
  ]

  return (
    <div className="text-center space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        How interested are you in this?
      </p>
      
      <div className="flex justify-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((rating) => (
          <motion.button
            key={rating}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(rating)}
            onMouseEnter={() => setHoverValue(rating)}
            onMouseLeave={() => setHoverValue(null)}
            className={cn(
              "p-2 rounded-full transition-colors duration-200",
              "hover:bg-purple-100 dark:hover:bg-purple-900/20"
            )}
          >
            <Star
              className={cn(
                "h-8 w-8 transition-colors duration-200",
                (hoverValue !== null ? rating <= hoverValue : rating <= (value || 0))
                  ? "fill-purple-500 text-purple-500"
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          </motion.button>
        ))}
      </div>
      
      {(value || hoverValue) && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-purple-600 dark:text-purple-400"
        >
          {labels[(hoverValue || value || 1) - 1]}
        </motion.p>
      )}
    </div>
  )
}
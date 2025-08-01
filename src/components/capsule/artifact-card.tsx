import { motion } from 'framer-motion'
import { BookOpen, Headphones, MapPin, Utensils, Activity, ExternalLink, RefreshCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Artifact } from '@/lib/types'

interface ArtifactCardProps {
  artifact: Artifact
  onRemix: () => void
}

const iconMap = {
  BOOK: BookOpen,
  PODCAST: Headphones,
  DINING: Utensils,
  TRAVEL: MapPin,
  SPORT: Activity,
}

export function ArtifactCard({ artifact, onRemix }: ArtifactCardProps) {
  const Icon = iconMap[artifact.type]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center">
          <Icon className="h-12 w-12 text-purple-600 dark:text-purple-400" />
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {artifact.type.toLowerCase()}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemix}
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
          
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
            {artifact.metadata.title}
          </h3>
          
          {artifact.metadata.author && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              by {artifact.metadata.author}
            </p>
          )}
          
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">
            {artifact.metadata.description}
          </p>
          
          {artifact.metadata.url && (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open(artifact.metadata.url, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-2" />
              View Details
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
import { motion } from 'framer-motion'
import { Capsule } from '@/lib/types'

interface BadgeRendererProps {
  capsule: Capsule
}

export function BadgeRenderer({ capsule }: BadgeRendererProps) {
  // Generate a unique color scheme based on the capsule
  const colors = [
    { primary: '#8B5CF6', secondary: '#3B82F6', accent: '#10B981' },
    { primary: '#EF4444', secondary: '#F59E0B', accent: '#8B5CF6' },
    { primary: '#10B981', secondary: '#06B6D4', accent: '#8B5CF6' },
    { primary: '#F59E0B', secondary: '#EF4444', accent: '#3B82F6' },
  ]
  
  const colorScheme = colors[Math.abs(capsule.id.charCodeAt(0)) % colors.length]

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="relative"
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorScheme.primary} />
            <stop offset="50%" stopColor={colorScheme.secondary} />
            <stop offset="100%" stopColor={colorScheme.accent} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="url(#badgeGradient)"
          filter="url(#glow)"
        />
        
        {/* Inner circle */}
        <circle
          cx="100"
          cy="100"
          r="75"
          fill="white"
          fillOpacity="0.9"
        />
        
        {/* Center star */}
        <motion.path
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          d="M100,40 L110,70 L140,70 L118,88 L128,118 L100,100 L72,118 L82,88 L60,70 L90,70 Z"
          fill="url(#badgeGradient)"
        />
        
        {/* Badge text */}
        <text
          x="100"
          y="140"
          textAnchor="middle"
          className="text-xs font-bold"
          fill={colorScheme.primary}
        >
          COMPLETED
        </text>
        
        <text
          x="100"
          y="155"
          textAnchor="middle"
          className="text-xs"
          fill={colorScheme.secondary}
        >
          {new Date().getFullYear()}
        </text>
      </svg>
      
      {/* Animated sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  )
}
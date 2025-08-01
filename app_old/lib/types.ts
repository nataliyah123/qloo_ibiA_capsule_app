export interface User {
  id: string
  email: string
  tasteVector: number[]
  createdAt: Date
}

export interface Capsule {
  id: string
  title: string
  theme: string
  userId: string
  status: 'ACTIVE' | 'COMPLETED'
  artifacts: Artifact[]
  dailyQuests?: string[]
  completedDays?: number[]
  createdAt: Date
}

export interface Artifact {
  id: string
  capsuleId: string
  type: 'BOOK' | 'PODCAST' | 'DINING' | 'TRAVEL' | 'SPORT'
  entityId: string
  metadata: {
    title: string
    author?: string
    description: string
    url?: string
    imageUrl?: string
    rating?: number
    category?: string
  }
  orderIndex: number
}

export interface Reflection {
  id: string
  capsuleId: string
  day: number
  text?: string
  audioUri?: string
  createdAt: Date
}

export interface CoachMessage {
  id: string
  userId: string
  capsuleId?: string
  role: 'USER' | 'ASSISTANT'
  content: string
  tokensUsed: number
  createdAt: Date
}

export interface SeedEntity {
  id: string
  domain: string
  type: 'BOOK' | 'PODCAST' | 'DINING' | 'TRAVEL' | 'SPORT'
  title: string
  author?: string
  description: string
  icon: any
}

export interface QlooTasteResponse {
  taste_vector: number[]
  confidence: number
}

export interface QlooRecommendationResponse {
  recommendations: {
    books: any[]
    podcasts: any[]
    dining: any[]
    travel: any[]
    sports: any[]
  }
}